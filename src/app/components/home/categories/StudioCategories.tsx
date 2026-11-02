
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Film,
  Mic,
  Music,
  Palette,
} from "lucide-react";

type Studio = {
  category?: string;
};

type Category = {
  name: string;
  slug: string;
  description: string;
  icon: typeof Camera;
  color: string;
};

const categories: Category[] = [
  {
    name: "Photo Studios",
    slug: "photo-studios",
    description:
      "Cyclorama walls, natural daylight lofts, and profoto lighting setups.",
    icon: Camera,
    color: "bg-sky-100 text-sky-500",
  },
  {
    name: "Sound Stages",
    slug: "sound-stages",
    description:
      "Acoustic blackboxes, green screens, camlock power, and drive-in access.",
    icon: Film,
    color: "bg-purple-100 text-purple-500",
  },
  {
    name: "Podcast Rooms",
    slug: "podcast-rooms",
    description:
      "Turnkey audio/video recording with multi-cam 4K switchers and Shure mics.",
    icon: Mic,
    color: "bg-emerald-100 text-emerald-500",
  },
  {
    name: "Music Suites",
    slug: "music-suites",
    description:
      "Dolby Atmos monitoring, analog consoles, vocal booths, and live rooms.",
    icon: Music,
    color: "bg-amber-100 text-amber-500",
  },
  {
    name: "Art Workshops",
    slug: "art-workshops",
    description:
      "Ceramic kilns, pottery wheels, printmaking presses, and raw maker space.",
    icon: Palette,
    color: "bg-pink-100 text-pink-500",
  },
];

// Normalize category values received from the backend.
function normalizeCategory(value: string | undefined): string {
  const category = (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");

  const aliases: Record<string, string> = {
    "photo-studio": "photo-studios",
    "photo-studios": "photo-studios",
    "film-stage": "sound-stages",
    "film-stages": "sound-stages",
    "sound-stage": "sound-stages",
    "sound-stages": "sound-stages",
    "podcast-room": "podcast-rooms",
    "podcast-rooms": "podcast-rooms",
    "music-suite": "music-suites",
    "music-suites": "music-suites",
    "art-workshop": "art-workshops",
    "art-workshops": "art-workshops",
  };

  return aliases[category] ?? category;
}

export default function StudioCategories() {
  const [categoryCounts, setCategoryCounts] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudios() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured");
        }

        const response = await fetch(`${apiUrl}/studios`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch studios: ${response.status}`);
        }

        const result = await response.json();

        // Support an array or common API response wrappers.
        const studios: Studio[] = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.studios)
              ? result.studios
              : [];

        const counts: Record<string, number> = {};

        for (const studio of studios) {
          const slug = normalizeCategory(studio.category);

          if (slug) {
            counts[slug] = (counts[slug] ?? 0) + 1;
          }
        }

        if (!controller.signal.aborted) {
          setCategoryCounts(counts);
          setHasError(false);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching studio categories:", error);
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchStudios();

    return () => controller.abort();
  }, []);

  return (
    <section className="bg-[#faf9f7] px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-600">
              Curated Production Categories
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Browse by Creative Discipline
            </h2>
          </div>

          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
          >
            Explore All Workspaces
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = categoryCounts[category.slug] ?? 0;

            return (
              <Link
                key={category.slug}
                href={`/studios?category=${encodeURIComponent(category.slug)}`}
                className="group flex min-h-[238px] flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg hover:shadow-neutral-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                {/* Icon */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Title and description */}
                <h3 className="mb-2 text-base font-bold text-neutral-900 transition-colors group-hover:text-amber-700">
                  {category.name}
                </h3>

                <p className="flex-1 text-[13px] leading-5 text-neutral-500">
                  {category.description}
                </p>

                {/* Dynamic category count */}
                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <span className="text-xs font-medium text-neutral-400">
                    {loading
                      ? "Loading spaces..."
                      : hasError
                        ? "Count unavailable"
                        : `${count} ${count === 1 ? "Space" : "Spaces"}`}
                  </span>

                  <ArrowRight className="h-4 w-4 text-neutral-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
