"use client";

import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Film,
  Mic,
  Music,
  Palette,
} from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    slug: "photo-studios",
    description:
      "Cyclorama walls, natural daylight lofts, and profoto lighting setups.",
    count: "24+ Spaces",
    icon: Camera,
    color: "bg-sky-100 text-sky-500",
  },
  {
    name: "Sound Stages",
    slug: "sound-stages",
    description:
      "Acoustic blackboxes, green screens, camlock power, and drive-in access.",
    count: "16+ Spaces",
    icon: Film,
    color: "bg-purple-100 text-purple-500",
  },
  {
    name: "Podcast Rooms",
    slug: "podcast-rooms",
    description:
      "Turnkey audio/video recording with multi-cam 4K switchers and Shure mics.",
    count: "19+ Spaces",
    icon: Mic,
    color: "bg-emerald-100 text-emerald-500",
  },
  {
    name: "Music Suites",
    slug: "music-suites",
    description:
      "Dolby Atmos monitoring, analog consoles, vocal booths, and live rooms.",
    count: "14+ Spaces",
    icon: Music,
    color: "bg-amber-100 text-amber-500",
  },
  {
    name: "Art Workshops",
    slug: "art-workshops",
    description:
      "Ceramic kilns, pottery wheels, printmaking presses, and raw maker space.",
    count: "11+ Spaces",
    icon: Palette,
    color: "bg-pink-100 text-pink-500",
  },
];

export default function StudioCategories() {
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

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <span className="text-xs font-medium text-neutral-400">
                    {category.count}
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