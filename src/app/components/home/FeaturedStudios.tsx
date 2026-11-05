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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(`${apiUrl}/api/featured-studios`, {
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

    void fetchFeaturedStudios();

    return () => controller.abort();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F7F1E8] py-20 transition-colors duration-500 sm:py-24 dark:bg-[#211629]">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/15" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#D6B98C]/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#805F3C] shadow-sm backdrop-blur-sm dark:border-[#D6B98C]/30 dark:bg-[#39243F]/70 dark:text-[#D6B98C]">
              <Sparkles size={14} />
              Handpicked spaces
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-[#211629] transition-colors sm:text-5xl lg:text-[56px] dark:text-[#F7F1E8]">
              Spaces that inspire
              <span className="block font-serif italic text-[#A78BBA]">
                great ideas.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#756A7C] sm:text-lg dark:text-[#C5B9CC]">
              Discover exceptional creative spaces designed to bring
              your next big idea to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#D6B98C]/60 bg-white/80 px-6 py-3 text-sm font-semibold text-[#39243F] backdrop-blur-sm transition-all duration-300 hover:border-[#D6B98C] hover:bg-[#39243F] hover:text-[#F7F1E8] dark:border-[#A78BBA]/40 dark:bg-[#39243F] dark:text-[#F7F1E8] dark:hover:border-[#D6B98C] dark:hover:bg-[#D6B98C] dark:hover:text-[#211629]"
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
          <div className="rounded-3xl border border-red-200 bg-white/80 p-10 text-center dark:border-red-400/20 dark:bg-[#39243F]/70">
            <p className="font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && studios.length === 0 && (
          <div className="rounded-3xl border border-[#D6B98C]/40 bg-white/70 p-12 text-center backdrop-blur-sm dark:border-[#A78BBA]/20 dark:bg-[#39243F]/60">
            <p className="text-lg font-semibold text-[#39243F] dark:text-[#F7F1E8]">
              No featured studios available yet.
            </p>

            <p className="mt-2 text-sm text-[#756A7C] dark:text-[#C5B9CC]">
              Check back soon for new creative spaces.
            </p>
          </div>
        )}

        {/* Studio cards */}
        {!loading && !error && studios.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => {
              const studioId = studio._id || studio.id;

              return (
                <article
                  key={studioId}
                  className="group overflow-hidden rounded-[26px] border border-[#D6B98C]/40 bg-white/85 shadow-[0_8px_30px_rgba(33,22,41,0.05)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#D6B98C] hover:shadow-[0_24px_60px_rgba(33,22,41,0.12)] dark:border-[#A78BBA]/20 dark:bg-[#39243F]/70 dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:hover:border-[#D6B98C]/70 dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
                >

                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#39243F]">
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

                    <div className="absolute inset-0 bg-gradient-to-t from-[#211629]/70 via-transparent to-[#211629]/10" />

                    {/* Category */}
                    <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-[#F7F1E8]/95 px-4 py-2 text-xs font-semibold text-[#39243F] shadow-sm backdrop-blur-md">
                      {getCategoryLabel(studio.category)}
                    </span>

                    {/* Rating */}
                    {typeof studio.rating === "number" && (
                      <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/30 bg-[#F7F1E8]/95 px-3 py-2 text-sm font-bold text-[#211629] shadow-sm backdrop-blur-md">
                        <Star
                          size={14}
                          className="fill-[#D6B98C] text-[#B58B48]"
                        />
                        {studio.rating.toFixed(1)}
                      </div>
                    )}

                    {/* Image bottom label */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-medium text-white">
                      <MapPin size={15} className="shrink-0 text-[#D6B98C]" />
                      <span className="line-clamp-1">
                        {studio.location}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6">

                    <div className="mb-5 flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight text-[#211629] transition-colors duration-300 group-hover:text-[#805F3C] dark:text-[#F7F1E8] dark:group-hover:text-[#D6B98C]">
                        {studio.title}
                      </h3>
                    </div>

                    {/* Pricing and action */}
                    <div className="flex items-center justify-between border-t border-[#D6B98C]/30 pt-5 dark:border-[#A78BBA]/20">

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-[#9A8DA0] dark:text-[#A78BBA]">
                          Starting from
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-[#39243F] dark:text-[#F7F1E8]">
                          ${studio.hourlyRate}
                          <span className="ml-1 text-sm font-medium text-[#9A8DA0] dark:text-[#A78BBA]">
                            / hr
                          </span>
                        </p>
                      </div>

                      <Link
                        href={`/studios/${studioId}`}
                        className="group/button inline-flex items-center gap-2 rounded-full bg-[#39243F] px-5 py-3 text-sm font-semibold text-[#F7F1E8] transition-all duration-300 hover:bg-[#D6B98C] hover:text-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#F7F1E8]"
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