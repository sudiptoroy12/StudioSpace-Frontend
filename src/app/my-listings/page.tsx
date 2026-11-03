
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  MapPin,
  Users,
  Plus,
  LoaderCircle,
  X,
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

  // Show a loader while the session is being checked or listings are fetched.
  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // The effect redirects unauthenticated users to the sign-in page.
  if (!session?.user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              StudioSpace
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              My Studio Listings
            </h1>

            <p className="mt-2 text-slate-600">
              Manage your spaces, update details, or remove a listing.
            </p>
          </div>

          <button
            onClick={() => router.push("/add-studios")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Add New Studio
          </button>
        </div>

        {/* Listings */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No studio listings yet
            </h2>

            <p className="mt-2 text-slate-600">
              Add your first studio to start managing your listings.
            </p>

            <button
              onClick={() => router.push("/studios/add")}
              className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Create a Listing
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-56 bg-slate-100">
                  {studio.imageUrl && (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {studio.category}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {studio.title}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} />
                    {studio.location}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} />
                    Capacity: {studio.capacity}
                  </p>

                  <p className="mt-4 text-xl font-bold text-emerald-700">
                    ${studio.hourlyRate}
                    <span className="text-sm font-normal text-slate-500">
                      {" "}/ hour
                    </span>
                  </p>

                  <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                    <button
                      onClick={() =>
                        router.push(`/studios/edit/${studio._id}`)
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 px-3 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                      <Edit size={16} />
                      Update
                    </button>

                    <button
                      onClick={() => setSelectedStudio(studio)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 size={23} />
              </div>

              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                aria-label="Close confirmation"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-title"
              className="mt-5 text-xl font-bold text-slate-900"
            >
              Delete this studio?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Are you sure you want to delete{" "}
              <strong>{selectedStudio.title}</strong>? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deletingId !== null}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deletingId ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}

                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}