
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Edit,
  Trash2,
  MapPin,
  Users,
  Plus,
  LoaderCircle,
  X,
  Building2,
  Camera,
} from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { Studio } from "@/lib/types/studio";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  const fetchListings = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
      }

      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/my-listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load your studio listings.");
      }

      const data: Studio[] = await response.json();
      setStudios(data);
    } catch (error) {
      console.error("Fetch listings error:", error);
      toast.error("Could not load your studio listings.");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/signin");
      return;
    }

    const timer = setTimeout(() => {
      void fetchListings();
    }, 0);

    return () => clearTimeout(timer);
  }, [isPending, session?.user?.email, fetchListings, router]);

  async function handleDelete() {
    if (!selectedStudio) return;

    try {
      setDeletingId(selectedStudio._id);

      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
      }

      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(
        `${API_URL}/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete studio.");
      }

      setStudios((previous) =>
        previous.filter((studio) => studio._id !== selectedStudio._id)
      );

      setSelectedStudio(null);
      toast.success("Studio deleted successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setDeletingId(null);
    }
  }

  // Loading state
  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#F7F1E8] px-5 py-12 dark:bg-[#211629] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-[#D6B98C]/30 dark:bg-[#A78BBA]/20" />
            <div className="h-10 w-64 animate-pulse rounded-lg bg-[#E8DCCB] dark:bg-[#39243F]" />
            <div className="h-5 w-80 max-w-full animate-pulse rounded bg-[#E8DCCB] dark:bg-[#39243F]" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-5 rounded-3xl border border-[#E8DCCB] bg-white p-5 dark:border-[#59465F] dark:bg-[#39243F] sm:flex-row"
              >
                <div className="h-48 w-full animate-pulse rounded-2xl bg-[#E8DCCB] dark:bg-[#211629] sm:h-32 sm:w-44" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 w-1/2 animate-pulse rounded bg-[#E8DCCB] dark:bg-[#211629]" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#E8DCCB] dark:bg-[#211629]" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-[#E8DCCB] dark:bg-[#211629]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-12 dark:bg-[#211629] sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

      <div className="relative mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/50 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#39243F] shadow-sm dark:border-[#A78BBA]/30 dark:bg-[#39243F] dark:text-[#D6B98C]">
              <Building2 size={14} />
              StudioSpace Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#211629] dark:text-[#F7F1E8] sm:text-4xl">
              My Listings
              <span className="ml-3 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#D6B98C]/30 px-2 text-sm font-bold text-[#39243F] dark:bg-[#D6B98C]/15 dark:text-[#D6B98C]">
                {studios.length}
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#766B7D] dark:text-[#C6B8CB] sm:text-base">
              Manage your creative spaces, update your studio information,
              and keep your listings looking their best.
            </p>
          </div>

          <button
            onClick={() => router.push("/add-studios")}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#39243F] px-6 py-3.5 text-sm font-semibold text-[#F7F1E8] shadow-lg shadow-[#211629]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:shadow-black/20 dark:hover:bg-[#E3CBA5]"
          >
            <Plus size={18} />
            Add New Studio
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* Listing heading */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#211629] dark:text-[#F7F1E8]">
              Your studio spaces
            </h2>
            <p className="mt-1 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
              {studios.length}{" "}
              {studios.length === 1 ? "listing" : "listings"} available
            </p>
          </div>

          <span className="hidden rounded-full border border-[#E8DCCB] bg-white px-4 py-2 text-xs font-semibold text-[#766B7D] dark:border-[#59465F] dark:bg-[#39243F] dark:text-[#C6B8CB] sm:inline-flex">
            Recently added
          </span>
        </div>

        {/* Empty state */}
        {studios.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[#D6B98C] bg-white px-6 py-20 text-center shadow-sm dark:border-[#59465F] dark:bg-[#39243F]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D6B98C]/20 text-[#39243F] dark:bg-[#D6B98C]/15 dark:text-[#D6B98C]">
              <Camera size={30} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#211629] dark:text-[#F7F1E8]">
              No studio listings yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#766B7D] dark:text-[#C6B8CB]">
              Your creative spaces deserve to be discovered. Add your first
              studio and start welcoming creators.
            </p>

            <button
              onClick={() => router.push("/add-studios")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#39243F] px-6 py-3 font-semibold text-[#F7F1E8] transition hover:bg-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E3CBA5]"
            >
              <Plus size={18} />
              Create a Listing
            </button>
          </div>
        ) : (
          /* Horizontal listing layout */
          <div className="space-y-4">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-3xl border border-[#E8DCCB] bg-white p-4 shadow-[0_5px_25px_rgba(33,22,41,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D6B98C] hover:shadow-[0_15px_40px_rgba(33,22,41,0.09)] dark:border-[#59465F] dark:bg-[#39243F] dark:shadow-black/10 dark:hover:border-[#A78BBA] dark:hover:shadow-black/20 sm:p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Studio image */}
                  <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-[#E8DCCB] dark:bg-[#211629] sm:h-36 sm:w-48 lg:h-40 lg:w-56">
                    {studio.imageUrl ? (
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 224px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#A78BBA]">
                        <Camera size={36} />
                      </div>
                    )}

                    <div className="absolute left-3 top-3 rounded-full border border-white/50 bg-[#F7F1E8]/95 px-3 py-1.5 text-[11px] font-bold text-[#39243F] shadow-sm backdrop-blur dark:border-[#A78BBA]/30 dark:bg-[#211629]/90 dark:text-[#D6B98C]">
                      {studio.category}
                    </div>
                  </div>

                  {/* Studio information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="truncate text-xl font-bold tracking-tight text-[#211629] transition-colors group-hover:text-[#A78BBA] dark:text-[#F7F1E8] dark:group-hover:text-[#D6B98C] sm:text-2xl">
                        {studio.title}
                      </h3>

                      <span className="rounded-full bg-[#A78BBA]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#39243F] dark:bg-[#A78BBA]/20 dark:text-[#D6B98C]">
                        Your listing
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 text-sm text-[#766B7D] dark:text-[#C6B8CB] sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                      <span className="flex items-center gap-2">
                        <MapPin
                          size={16}
                          className="shrink-0 text-[#A78BBA] dark:text-[#D6B98C]"
                        />
                        <span className="line-clamp-1">{studio.location}</span>
                      </span>

                      <span className="flex items-center gap-2">
                        <Users
                          size={16}
                          className="shrink-0 text-[#A78BBA] dark:text-[#D6B98C]"
                        />
                        Capacity: {studio.capacity}
                      </span>
                    </div>

                    <div className="mt-5">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#A092A7] dark:text-[#B6A5BC]">
                        Hourly rate
                      </span>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-[#211629] dark:text-[#F7F1E8]">
                        ${studio.hourlyRate}
                        <span className="ml-1 text-sm font-medium text-[#A092A7] dark:text-[#B6A5BC]">
                          / hour
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row flex-wrap items-center gap-2 border-t border-[#E8DCCB] pt-4 dark:border-[#59465F] sm:w-40 sm:shrink-0 sm:flex-col sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#39243F] px-4 py-3 text-xs font-semibold text-[#F7F1E8] transition hover:bg-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E3CBA5] sm:w-full"
                    >
                      View Details
                      <ArrowUpRight size={15} />
                    </Link>

                    <button
                      onClick={() =>
                        router.push(`/studios/edit/${studio._id}`)
                      }
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D6B98C]/60 px-4 py-3 text-xs font-semibold text-[#39243F] transition hover:border-[#A78BBA] hover:bg-[#A78BBA]/10 hover:text-[#211629] dark:border-[#A78BBA]/40 dark:text-[#F7F1E8] dark:hover:border-[#D6B98C] dark:hover:bg-[#D6B98C]/10 dark:hover:text-[#D6B98C] sm:w-full"
                    >
                      <Edit size={15} />
                      Update
                    </button>

                    <button
                      onClick={() => setSelectedStudio(studio)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 dark:border-red-400/20 dark:text-red-300 dark:hover:border-red-400/40 dark:hover:bg-red-400/10 sm:w-full"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211629]/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-3xl border border-[#E8DCCB] bg-[#F7F1E8] p-6 shadow-2xl dark:border-[#59465F] dark:bg-[#39243F] sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-400/10 dark:text-red-300">
                <Trash2 size={23} />
              </div>

              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                aria-label="Close confirmation"
                className="rounded-full p-2 text-[#A092A7] transition hover:bg-[#E8DCCB] hover:text-[#211629] disabled:opacity-50 dark:text-[#C6B8CB] dark:hover:bg-[#211629] dark:hover:text-[#F7F1E8]"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-title"
              className="mt-6 text-xl font-bold text-[#211629] dark:text-[#F7F1E8]"
            >
              Delete this studio?
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#766B7D] dark:text-[#C6B8CB]">
              Are you sure you want to delete{" "}
              <strong className="text-[#39243F] dark:text-[#D6B98C]">
                {selectedStudio.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                className="flex-1 rounded-full border border-[#D6B98C]/60 px-4 py-3 text-sm font-semibold text-[#39243F] transition hover:bg-[#E8DCCB] disabled:opacity-50 dark:border-[#A78BBA]/40 dark:text-[#F7F1E8] dark:hover:bg-[#211629]"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deletingId !== null}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deletingId ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Trash2 size={17} />
                )}
                {deletingId ? "Deleting..." : "Delete Listing"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
