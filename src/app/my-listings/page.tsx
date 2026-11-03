
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   ArrowUpRight,
//   BadgeCheck,
//   CirclePlus,
//   Edit3,
//   Heart,
//   MapPin,
//   ShieldCheck,
//   Trash2,
//   X,
// } from "lucide-react";

// type Studio = {
//   id: string;
//   title: string;
//   category: string;
//   location: string;
//   hourlyRate: number;
//   deposit: number;
//   capacity: number;
//   image: string;
// };

// const initialStudios: Studio[] = [
//   {
//     id: "1",
//     title: "Et eaque iusto velit",
//     category: "Music Suite",
//     location: "In dolore dolore min",
//     hourlyRate: 42,
//     deposit: 0,
//     capacity: 183,
//     image: "/images/studio-1.jpg",
//   },
//   {
//     id: "2",
//     title: "Neon Vault 4K Cinema Soundstage & Cyclorama",
//     category: "Film Stage",
//     location: "Arts District, Downtown Los Angeles, CA",
//     hourlyRate: 135,
//     deposit: 150,
//     capacity: 30,
//     image: "/images/studio-2.jpg",
//   },
// ];

// export default function MyListingsPage() {
//   const [studios, setStudios] = useState<Studio[]>(initialStudios);
//   const [deleteStudio, setDeleteStudio] = useState<Studio | null>(null);

//   function handleDelete() {
//     if (!deleteStudio) return;

//     // Demo behavior: removes the listing from the current page only.
//     // Connect this to your backend DELETE endpoint for permanent deletion.
//     setStudios((current) =>
//       current.filter((studio) => studio.id !== deleteStudio.id)
//     );

//     setDeleteStudio(null);
//   }

//   return (
//     <main className="min-h-screen bg-white text-neutral-900">
//       {/* Main content */}
//       <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
//         {/* Page heading */}
//         <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-600">
//               <BadgeCheck size={15} />
//               Host Workspace Manager
//             </div>

//             <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
//               My Studio Listings
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-neutral-500 sm:text-base">
//               Manage your published creative production spaces, rates, and
//               listings
//             </p>
//           </div>

//           <Link
//             href="/studios/new"
//             className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 shadow-sm transition hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200"
//           >
//             <CirclePlus size={18} />
//             Add New Studio
//           </Link>
//         </div>

//         {/* Listings table */}
//         <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
//           {studios.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[900px] border-collapse text-left">
//                 <thead className="border-b border-neutral-200 bg-neutral-50">
//                   <tr className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
//                     <th className="px-6 py-4">Studio Space</th>
//                     <th className="px-5 py-4">Category</th>
//                     <th className="px-5 py-4">Hourly Rate</th>
//                     <th className="px-5 py-4">Deposit</th>
//                     <th className="px-5 py-4">Capacity</th>
//                     <th className="px-6 py-4 text-center">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-neutral-100">
//                   {studios.map((studio) => (
//                     <tr
//                       key={studio.id}
//                       className="transition-colors hover:bg-amber-50/30"
//                     >
//                       {/* Studio details */}
//                       <td className="px-6 py-4">
//                         <div className="flex min-w-[320px] items-center gap-3.5">
//                           <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
//                             <Image
//                               src={studio.image}
//                               alt={studio.title}
//                               fill
//                               sizes="64px"
//                               className="object-cover"
//                               onError={() => {}}
//                             />
//                           </div>

//                           <div className="min-w-0">
//                             <h2 className="line-clamp-2 text-sm font-bold text-neutral-900">
//                               {studio.title}
//                             </h2>

//                             <p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
//                               <MapPin
//                                 size={12}
//                                 className="shrink-0 text-amber-500"
//                               />
//                               <span className="truncate">
//                                 {studio.location}
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Category */}
//                       <td className="px-5 py-4">
//                         <span className="inline-flex whitespace-nowrap rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
//                           {studio.category}
//                         </span>
//                       </td>

//                       {/* Rate */}
//                       <td className="px-5 py-4">
//                         <span className="whitespace-nowrap text-sm font-extrabold text-amber-600">
//                           ${studio.hourlyRate}/hr
//                         </span>
//                       </td>

//                       {/* Deposit */}
//                       <td className="px-5 py-4 text-sm text-neutral-700">
//                         ${studio.deposit}
//                       </td>

//                       {/* Capacity */}
//                       <td className="px-5 py-4">
//                         <span className="whitespace-nowrap text-sm text-neutral-600">
//                           {studio.capacity} people
//                         </span>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-6 py-4">
//                         <div className="flex items-center justify-center gap-2">
//                           <Link
//                             href={`/studios/${studio.id}`}
//                             aria-label={`View ${studio.title}`}
//                             title="View studio"
//                             className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
//                           >
//                             <ArrowUpRight size={17} />
//                           </Link>

//                           <Link
//                             href={`/my-studios/${studio.id}/edit`}
//                             aria-label={`Edit ${studio.title}`}
//                             title="Edit studio"
//                             className="rounded-lg p-2 text-cyan-700 transition hover:bg-cyan-50"
//                           >
//                             <Edit3 size={17} />
//                           </Link>

//                           <button
//                             type="button"
//                             onClick={() => setDeleteStudio(studio)}
//                             aria-label={`Delete ${studio.title}`}
//                             title="Delete studio"
//                             className="rounded-lg p-2 text-rose-700 transition hover:bg-rose-50"
//                           >
//                             <Trash2 size={17} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center px-6 py-16 text-center">
//               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
//                 <CirclePlus size={30} />
//               </div>

//               <h2 className="text-xl font-bold">No studios listed yet</h2>

//               <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
//                 Share your creative space with filmmakers, photographers, and
//                 other creators by publishing your first studio listing.
//               </p>

//               <Link
//                 href="/studios/new"
//                 className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-amber-500"
//               >
//                 <CirclePlus size={17} />
//                 Add Your First Studio
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Listing count */}
//         <p className="mt-4 text-xs text-neutral-400">
//           Showing {studios.length} {studios.length === 1 ? "listing" : "listings"}
//         </p>
//       </section>

//       {/* Benefits strip */}
//       <section className="border-y border-neutral-200 bg-neutral-50/70">
//         <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8">
//           <Benefit
//             icon={<ShieldCheck size={20} />}
//             title="Host Guarantee"
//             description="Comprehensive liability & gear protection"
//           />

//           <Benefit
//             icon={<BadgeCheck size={20} />}
//             title="Verified Workspaces"
//             description="Inspected acoustics, power, & gear"
//           />

//           <Benefit
//             icon={<Heart size={20} />}
//             title="Creator First"
//             description="Zero hidden fees, transparent booking"
//           />
//         </div>
//       </section>

//       {/* Delete confirmation modal */}
//       {deleteStudio && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-sm"
//           onClick={() => setDeleteStudio(null)}
//         >
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="delete-title"
//             className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="mb-4 flex items-start justify-between">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
//                 <Trash2 size={21} />
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setDeleteStudio(null)}
//                 aria-label="Close dialog"
//                 className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800"
//               >
//                 <X size={19} />
//               </button>
//             </div>

//             <h2 id="delete-title" className="text-xl font-bold">
//               Delete this listing?
//             </h2>

//             <p className="mt-2 text-sm leading-6 text-neutral-500">
//               Are you sure you want to delete{" "}
//               <span className="font-semibold text-neutral-800">
//                 {deleteStudio.title}
//               </span>
//               ? This demo action removes it from the current page only.
//             </p>

//             <div className="mt-6 flex gap-3">
//               <button
//                 type="button"
//                 onClick={() => setDeleteStudio(null)}
//                 className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold transition hover:bg-neutral-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="flex-1 rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-700"
//               >
//                 Delete Listing
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// function Benefit({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="flex items-center gap-3.5">
//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600">
//         {icon}
//       </div>

//       <div>
//         <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
//         <p className="mt-1 text-xs leading-5 text-neutral-500">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }



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
      setLoading(true);

      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(`${API_URL}/my-listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load your studio listings");
      }

      const data: Studio[] = await response.json();
      setStudios(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load your studio listings.");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      setLoading(false);
      router.replace("/signin");
      return;
    }

    void fetchListings();
  }, [isPending, session, router, fetchListings]);

  async function handleDelete() {
    if (!selectedStudio) return;

    try {
      setDeletingId(selectedStudio._id);

      const tokenResult = await authClient.token();
      const token = tokenResult.data?.token;

      if (!token) {
        throw new Error("Authentication token not found");
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
        throw new Error(data.message || "Failed to delete studio");
      }

      setStudios((previous) =>
        previous.filter((studio) => studio._id !== selectedStudio._id)
      );

      setSelectedStudio(null);
      toast.success("Studio deleted successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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
                      {" "}
                      / hour
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