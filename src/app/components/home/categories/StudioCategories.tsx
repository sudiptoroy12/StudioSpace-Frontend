"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Camera,
  Speaker,
  Mic,
  Music,
  Palette,
  Sparkles,
} from "lucide-react";

type Studio = {
  category?: string;
};

type Category = {
  name: string;
  slug: string;
  description: string;
  icon: typeof Camera;
  accent: string;
  iconBackground: string;
  glow: string;
  number: string;
};

const categories: Category[] = [
  {
    name: "Photo Studio",
    slug: "photo-studios",
    description:
      "Discover daylight studios, cyclorama walls, and professional photography setups.",
    icon: Camera,
    accent: "text-sky-600 dark:text-sky-300",
    iconBackground: "bg-sky-100 dark:bg-sky-500/15",
    glow: "group-hover:bg-sky-200/50 dark:group-hover:bg-sky-400/15",
    number: "01",
  },
  {
  name: "Sound Stages",
  slug: "sound-stages",
  description:
    "Discover professional sound stages, acoustically treated production spaces, and fully equipped filming environments.",
  icon: Speaker,
  accent: "text-violet-600 dark:text-violet-300",
  iconBackground: "bg-violet-100 dark:bg-violet-500/15",
  glow: "group-hover:bg-violet-200/50 dark:group-hover:bg-violet-400/15",
  number: "02",
},
  {
    name: "Podcast Room",
    slug: "podcast-rooms",
    description:
      "Create your next episode in professional recording rooms built for great sound.",
    icon: Mic,
    accent: "text-emerald-600 dark:text-emerald-300",
    iconBackground: "bg-emerald-100 dark:bg-emerald-500/15",
    glow: "group-hover:bg-emerald-200/50 dark:group-hover:bg-emerald-400/15",
    number: "03",
  },
  {
    name: "Music Suite",
    slug: "music-suites",
    description:
      "Explore recording suites, vocal booths, and spaces for your next track.",
    icon: Music,
    accent: "text-amber-600 dark:text-amber-300",
    iconBackground: "bg-amber-100 dark:bg-amber-500/15",
    glow: "group-hover:bg-amber-200/50 dark:group-hover:bg-amber-400/15",
    number: "04",
  },
  {
    name: "Art Workshop",
    slug: "art-workshops",
    description:
      "Find inspiring maker spaces for painting, pottery, and hands-on creativity.",
    icon: Palette,
    accent: "text-pink-600 dark:text-pink-300",
    iconBackground: "bg-pink-100 dark:bg-pink-500/15",
    glow: "group-hover:bg-pink-200/50 dark:group-hover:bg-pink-400/15",
    number: "05",
  },
];

function normalizeCategory(value: string | undefined): string {
  const category = (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");

  const aliases: Record<string, string> = {
    "photo-studio": "photo-studios",
    "photo-studios": "photo-studios",
   
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
          throw new Error("NEXT_PUBLIC_API_URL is not configured.");
        }

        const response = await fetch(`${apiUrl}/studios`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch studios: ${response.status}`);
        }

        const result = await response.json();

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
    <section className="relative  overflow-hidden bg-[#F7F1E8]  py-16 transition-colors duration-500 dark:bg-[#211629] px-3 sm:px-6  sm:py-20 lg:px-8 lg:py-24">

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#D6B98C]/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-10  flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between  ">
          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/60 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#805F3C] shadow-sm backdrop-blur-sm dark:border-[#D6B98C]/30 dark:bg-[#39243F]/70 dark:text-[#D6B98C]">
              <Sparkles className="h-3.5 w-3.5" />
              Find your creative space
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#211629] sm:text-4xl lg:text-5xl dark:text-[#F7F1E8]">
              One space.
              <span className="mt-1 block text-[#A78BBA] dark:text-[#A78BBA]">
                Endless possibilities.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#62566A] sm:text-base dark:text-[#C5B9CC]">
              From professional photo studios to recording rooms, discover
              the perfect space to bring your next big idea to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-xl bg-[#39243F] px-5 py-3.5 text-sm font-bold text-[#F7F1E8] shadow-lg shadow-[#211629]/10 transition duration-300 hover:bg-[#D6B98C] hover:text-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#F7F1E8]"
          >
            Explore all studios
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = categoryCounts[category.slug] ?? 0;

            return (
              <Link
                key={category.slug}
                href={`/studios?category=${encodeURIComponent(category.slug)}`}
                className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-[#D6B98C]/40 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D6B98C] hover:shadow-xl hover:shadow-[#211629]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BBA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F1E8] sm:p-6 dark:border-[#A78BBA]/20 dark:bg-[#39243F]/65 dark:hover:border-[#D6B98C]/70 dark:hover:shadow-black/20 dark:focus-visible:ring-offset-[#211629]"
              >

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-2xl transition-colors duration-300 ${category.glow}`}
                />

                {/* Card top row */}
                <div className="relative mb-8 flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110 ${category.iconBackground} ${category.accent}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <span className="font-mono text-xs font-medium tracking-wider text-[#B6A9BC] transition-colors group-hover:text-[#805F3C] dark:text-[#796783] dark:group-hover:text-[#D6B98C]">
                    {category.number}
                  </span>
                </div>

                {/* Category details */}
                <div className="relative flex-1">
                  <h3 className="text-lg font-extrabold tracking-tight text-[#211629] transition-colors duration-200 group-hover:text-[#805F3C] dark:text-[#F7F1E8] dark:group-hover:text-[#D6B98C]">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-[#756A7C] dark:text-[#C5B9CC]">
                    {category.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="relative mt-6 flex items-center justify-between border-t border-[#D6B98C]/30 pt-4 dark:border-[#A78BBA]/20">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-[#39243F] dark:text-[#F7F1E8]">
                      {loading
                        ? "Loading..."
                        : hasError
                          ? "Count unavailable"
                          : `${count} ${count === 1 ? "space" : "spaces"}`}
                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9A8DA0] dark:text-[#A78BBA]">
                      Available listings
                    </span>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6B98C]/50 text-[#805F3C] transition-all duration-300 group-hover:border-[#D6B98C] group-hover:bg-[#D6B98C] group-hover:text-[#211629] dark:border-[#A78BBA]/30 dark:text-[#D6B98C] dark:group-hover:border-[#D6B98C] dark:group-hover:bg-[#D6B98C] dark:group-hover:text-[#211629]">
                    <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#96889A] dark:text-[#A78BBA]">
          <p>Five disciplines. One creative destination.</p>

          <p className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Explore spaces for your next project
          </p>
        </div>
      </div>
    </section>
  );
}