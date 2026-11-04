
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Star,
  Sparkles,
} from "lucide-react";
import { FeaturedStudiosLoading } from "../ui/StudioSkeleton";

type Studio = {
  _id: string;
  id?: string;
  title: string;
  category: string;
  hourlyRate: number;
  imageUrl?: string;
  location: string;
  rating?: number;
  capacity?: number;
};

const categoryLabels: Record<string, string> = {
  "photo-studios": "Photo Studio",
  "photo studio": "Photo Studio",
  "photo-studio": "Photo Studio",
  "sound-stages": "Film Stage",
  "film stage": "Film Stage",
  "sound stage": "Film Stage",
  "podcast-rooms": "Podcast Room",
  "podcast room": "Podcast Room",
  "music-suites": "Music Suite",
  "music suite": "Music Suite",
  "art-workshops": "Art Workshop",
  "art workshop": "Art Workshop",
};

function getCategoryLabel(category: string) {
  const normalized = category.toLowerCase().trim();
  return (
    categoryLabels[normalized] ??
    category.replaceAll("-", " ").replace(/\b\w/g, (char) =>
      char.toUpperCase()
    )
  );
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFeaturedStudios() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(`${apiUrl}/featured-studios`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load featured studios.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid studios response.");
        }

        setStudios(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchFeaturedStudios();

    return () => controller.abort();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-20 sm:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 shadow-sm">
              <Sparkles size={14} />
              Handpicked spaces
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-[#191919] sm:text-5xl lg:text-[56px]">
              Spaces that inspire
              <span className="block font-serif italic text-amber-600">
                great ideas.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
              Discover exceptional creative spaces designed to bring
              your next big idea to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
          >
            Explore all studios
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Loading state */}
        {loading && <FeaturedStudiosLoading />}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-10 text-center">
            <p className="font-medium text-red-600">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && studios.length === 0 && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-neutral-800">
              No featured studios available yet.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              Check back soon for new creative spaces.
            </p>
          </div>
        )}

        {/* Studio cards */}
        {!loading && !error && studios.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio, index) => {
              const studioId = studio._id || studio.id;

              return (
                <article
                  key={studioId}
                  className="group overflow-hidden rounded-[26px] border border-neutral-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <Image
                      src={
                        studio.imageUrl ||
                        "/images/studio-placeholder.png"
                      }
                      alt={studio.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    {/* Category */}
                    <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-md">
                      {getCategoryLabel(studio.category)}
                    </span>

                    {/* Rating */}
                    {typeof studio.rating === "number" && (
                      <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-sm font-bold text-neutral-900 shadow-sm backdrop-blur-md">
                        <Star
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                        {studio.rating.toFixed(1)}
                      </div>
                    )}

                    {/* Image bottom label */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-medium text-white">
                      <MapPin size={15} />
                      <span className="line-clamp-1">
                        {studio.location}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-amber-700">
                        {studio.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-100 pt-5">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                          Starting from
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
                          ${studio.hourlyRate}
                          <span className="ml-1 text-sm font-medium text-neutral-400">
                            / hr
                          </span>
                        </p>
                      </div>

                      <Link
                        href={`/studios/${studioId}`}
                        className="group/button inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-600"
                      >
                        View Details
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
