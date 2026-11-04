
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
      <main className="min-h-screen bg-[#faf9f6] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-amber-100" />
            <div className="h-10 w-64 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-5 w-80 max-w-full animate-pulse rounded bg-neutral-200" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-5 rounded-3xl border border-neutral-200 bg-white p-5 sm:flex-row"
              >
                <div className="h-48 w-full animate-pulse rounded-2xl bg-neutral-200 sm:h-32 sm:w-44" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 w-1/2 animate-pulse rounded bg-neutral-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-200" />
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
    <main className="relative min-h-screen overflow-hidden bg-[#faf9f6] px-4 py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700 shadow-sm">
              <Building2 size={14} />
              StudioSpace Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              My Listings
              <span className="ml-3 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-amber-100 px-2 text-sm font-bold text-amber-700">
                {studios.length}
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
              Manage your creative spaces, update your studio information,
              and keep your listings looking their best.
            </p>
          </div>

          <button
            onClick={() => router.push("/add-studios")}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600"
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
            <h2 className="text-lg font-bold text-neutral-900">
              Your studio spaces
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {studios.length} {studios.length === 1 ? "listing" : "listings"} available
            </p>
          </div>

          <span className="hidden rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-500 sm:inline-flex">
            Recently added
          </span>
        </div>

        {/* Empty state */}
        {studios.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Camera size={30} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-neutral-900">
              No studio listings yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              Your creative spaces deserve to be discovered. Add your first
              studio and start welcoming creators.
            </p>

            <button
              onClick={() => router.push("/add-studios")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
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
                className="group overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-[0_5px_25px_rgba(0,0,0,0.025)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-[0_15px_40px_rgba(0,0,0,0.07)] sm:p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Studio image */}
                  <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-36 sm:w-48 lg:h-40 lg:w-56">
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
                      <div className="flex h-full items-center justify-center text-neutral-400">
                        <Camera size={36} />
                      </div>
                    )}

                    <div className="absolute left-3 top-3 rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-amber-700 shadow-sm backdrop-blur">
                      {studio.category}
                    </div>
                  </div>

                  {/* Studio information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="truncate text-xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-amber-700 sm:text-2xl">
                        {studio.title}
                      </h3>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Your listing
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} className="shrink-0 text-amber-600" />
                        <span className="line-clamp-1">{studio.location}</span>
                      </span>

                      <span className="flex items-center gap-2">
                        <Users size={16} className="shrink-0 text-amber-600" />
                        Capacity: {studio.capacity}
                      </span>
                    </div>

                    <div className="mt-5">
                      <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                        Hourly rate
                      </span>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
                        ${studio.hourlyRate}
                        <span className="ml-1 text-sm font-medium text-neutral-400">
                          / hour
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row flex-wrap items-center gap-2 border-t border-neutral-100 pt-4 sm:w-40 sm:shrink-0 sm:flex-col sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-3 text-xs font-semibold text-white transition hover:bg-amber-600 sm:w-full"
                    >
                      View Details
                      <ArrowUpRight size={15} />
                    </Link>

                    <button
                      onClick={() =>
                        router.push(`/studios/edit/${studio._id}`)
                      }
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-3 text-xs font-semibold text-neutral-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 sm:w-full"
                    >
                      <Edit size={15} />
                      Update
                    </button>

                    <button
                      onClick={() => setSelectedStudio(studio)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-100 px-4 py-3 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 sm:w-full"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-3xl border border-neutral-100 bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Trash2 size={23} />
              </div>

              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                aria-label="Close confirmation"
                className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-title"
              className="mt-6 text-xl font-bold text-neutral-900"
            >
              Delete this studio?
            </h2>

            <p className="mt-3 text-sm leading-7 text-neutral-500">
              Are you sure you want to delete{" "}
              <strong className="text-neutral-800">
                {selectedStudio.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                className="flex-1 rounded-full border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
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
