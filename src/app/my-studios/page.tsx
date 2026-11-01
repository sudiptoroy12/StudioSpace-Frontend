
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CirclePlus,
  Edit3,
  Heart,
  MapPin,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

type Studio = {
  id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  deposit: number;
  capacity: number;
  image: string;
};

const initialStudios: Studio[] = [
  {
    id: "1",
    title: "Et eaque iusto velit",
    category: "Music Suite",
    location: "In dolore dolore min",
    hourlyRate: 42,
    deposit: 0,
    capacity: 183,
    image: "/images/studio-1.jpg",
  },
  {
    id: "2",
    title: "Neon Vault 4K Cinema Soundstage & Cyclorama",
    category: "Film Stage",
    location: "Arts District, Downtown Los Angeles, CA",
    hourlyRate: 135,
    deposit: 150,
    capacity: 30,
    image: "/images/studio-2.jpg",
  },
];

export default function MyStudiosPage() {
  const [studios, setStudios] = useState<Studio[]>(initialStudios);
  const [deleteStudio, setDeleteStudio] = useState<Studio | null>(null);

  function handleDelete() {
    if (!deleteStudio) return;

    // Demo behavior: removes the listing from the current page only.
    // Connect this to your backend DELETE endpoint for permanent deletion.
    setStudios((current) =>
      current.filter((studio) => studio.id !== deleteStudio.id)
    );

    setDeleteStudio(null);
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Main content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-600">
              <BadgeCheck size={15} />
              Host Workspace Manager
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-sm leading-6 text-neutral-500 sm:text-base">
              Manage your published creative production spaces, rates, and
              listings
            </p>
          </div>

          <Link
            href="/studios/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 shadow-sm transition hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200"
          >
            <CirclePlus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Listings table */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {studios.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead className="border-b border-neutral-200 bg-neutral-50">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    <th className="px-6 py-4">Studio Space</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Hourly Rate</th>
                    <th className="px-5 py-4">Deposit</th>
                    <th className="px-5 py-4">Capacity</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-100">
                  {studios.map((studio) => (
                    <tr
                      key={studio.id}
                      className="transition-colors hover:bg-amber-50/30"
                    >
                      {/* Studio details */}
                      <td className="px-6 py-4">
                        <div className="flex min-w-[320px] items-center gap-3.5">
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                            <Image
                              src={studio.image}
                              alt={studio.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                              onError={() => {}}
                            />
                          </div>

                          <div className="min-w-0">
                            <h2 className="line-clamp-2 text-sm font-bold text-neutral-900">
                              {studio.title}
                            </h2>

                            <p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                              <MapPin
                                size={12}
                                className="shrink-0 text-amber-500"
                              />
                              <span className="truncate">
                                {studio.location}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex whitespace-nowrap rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                          {studio.category}
                        </span>
                      </td>

                      {/* Rate */}
                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap text-sm font-extrabold text-amber-600">
                          ${studio.hourlyRate}/hr
                        </span>
                      </td>

                      {/* Deposit */}
                      <td className="px-5 py-4 text-sm text-neutral-700">
                        ${studio.deposit}
                      </td>

                      {/* Capacity */}
                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap text-sm text-neutral-600">
                          {studio.capacity} people
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/studios/${studio.id}`}
                            aria-label={`View ${studio.title}`}
                            title="View studio"
                            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                          >
                            <ArrowUpRight size={17} />
                          </Link>

                          <Link
                            href={`/my-studios/${studio.id}/edit`}
                            aria-label={`Edit ${studio.title}`}
                            title="Edit studio"
                            className="rounded-lg p-2 text-cyan-700 transition hover:bg-cyan-50"
                          >
                            <Edit3 size={17} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteStudio(studio)}
                            aria-label={`Delete ${studio.title}`}
                            title="Delete studio"
                            className="rounded-lg p-2 text-rose-700 transition hover:bg-rose-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                <CirclePlus size={30} />
              </div>

              <h2 className="text-xl font-bold">No studios listed yet</h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                Share your creative space with filmmakers, photographers, and
                other creators by publishing your first studio listing.
              </p>

              <Link
                href="/studios/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-amber-500"
              >
                <CirclePlus size={17} />
                Add Your First Studio
              </Link>
            </div>
          )}
        </div>

        {/* Listing count */}
        <p className="mt-4 text-xs text-neutral-400">
          Showing {studios.length} {studios.length === 1 ? "listing" : "listings"}
        </p>
      </section>

      {/* Benefits strip */}
      <section className="border-y border-neutral-200 bg-neutral-50/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8">
          <Benefit
            icon={<ShieldCheck size={20} />}
            title="Host Guarantee"
            description="Comprehensive liability & gear protection"
          />

          <Benefit
            icon={<BadgeCheck size={20} />}
            title="Verified Workspaces"
            description="Inspected acoustics, power, & gear"
          />

          <Benefit
            icon={<Heart size={20} />}
            title="Creator First"
            description="Zero hidden fees, transparent booking"
          />
        </div>
      </section>

      {/* Delete confirmation modal */}
      {deleteStudio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-sm"
          onClick={() => setDeleteStudio(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Trash2 size={21} />
              </div>

              <button
                type="button"
                onClick={() => setDeleteStudio(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800"
              >
                <X size={19} />
              </button>
            </div>

            <h2 id="delete-title" className="text-xl font-bold">
              Delete this listing?
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-neutral-800">
                {deleteStudio.title}
              </span>
              ? This demo action removes it from the current page only.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteStudio(null)}
                className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold transition hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-700"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  );
}
