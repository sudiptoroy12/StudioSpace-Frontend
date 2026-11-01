
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Aperture,
  Check,
  Heart,
  Lightbulb,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Made for creativity",
    description:
      "A home for photography, film, music, podcasts, and the ideas that bring them together.",
  },
  {
    icon: Users,
    title: "Built on connection",
    description:
      "We bring creators and unique workspaces together to make great projects possible.",
  },
  {
    icon: Heart,
    title: "Space for everyone",
    description:
      "From independent creators to production teams, every creative journey deserves room to grow.",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-violet-100/70 blur-[110px]" />
      <div className="pointer-events-none absolute -right-36 bottom-10 h-80 w-80 rounded-full bg-fuchsia-100/40 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main story */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual collage */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="relative pr-9 sm:pr-14">
              <div className="relative h-[340px] overflow-hidden rounded-[28px] bg-neutral-100 sm:h-[430px] sm:rounded-[36px]">
                <Image height={430} width={700}
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
                  alt="Bright, modern creative workspace with natural light"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                />                  
                
             
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/65 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Aperture className="h-3.5 w-3.5" />
                    A space for every vision
                  </div>

                  <p className="max-w-sm text-2xl font-bold leading-snug text-white sm:text-3xl">
                    Every great idea deserves a place to begin.
                  </p>
                </div>
              </div>

              {/* Floating secondary image */}
              <div className="absolute -bottom-8 right-0 w-[43%] rounded-2xl border-4 border-white bg-white p-1.5 shadow-xl sm:-bottom-10 sm:rounded-3xl sm:border-[6px]">
                <div className="h-36 overflow-hidden rounded-xl sm:h-44 sm:rounded-2xl">
                  <Image
                    width={700}
                    height={400}
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=700&q=85"
                    alt="Professional music recording equipment in a studio"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="px-2 pb-2 pt-3 sm:px-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 sm:text-sm">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    Your next creative chapter
                  </div>
                </div>
              </div>

              {/* Floating creative badge */}
              <div className="absolute -left-1 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-violet-700 shadow-lg backdrop-blur-md sm:-left-5 sm:h-16 sm:w-16">
                <Lightbulb className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
            </div>

            <div className="mt-16 flex items-center gap-3 pl-2 sm:mt-20">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-violet-700">
                  <Aperture className="h-4 w-4" />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-amber-700">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-fuchsia-100 text-fuchsia-700">
                  <Heart className="h-4 w-4" />
                </div>
              </div>

              <p className="text-xs leading-5 text-neutral-500 sm:text-sm">
                One creative community.
                <span className="block font-semibold text-neutral-800">
                  Endless possibilities.
                </span>
              </p>
            </div>
          </div>

          {/* About copy */}
          <div className="pt-4 lg:pt-0">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-700">
              <Sparkles className="h-4 w-4" />
              Get to know StudioSpace
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              We believe great
              <span className="block bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
                work starts with
              </span>
              the right space.
            </h2>

            <p className="mt-6 text-base leading-8 text-neutral-600">
              StudioSpace is built around a simple idea: finding a place to
              create should be just as inspiring as the work itself.
            </p>

            <p className="mt-4 text-sm leading-7 text-neutral-500 sm:text-base">
              Whether you&apos;re shooting your next campaign, recording a podcast,
              producing music, or bringing an artistic vision to life, we&apos;re
              here to help you discover a space that fits your project. And
              for studio owners, we&apos;re creating a way to showcase your
              workspace and connect with the people who need it.
            </p>

            {/* Mission statement */}
            <div className="mt-7 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/90 to-fuchsia-50/60 p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                  <Heart className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-neutral-900">
                    Our mission
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Make creative spaces easier to discover, easier to share,
                    and more accessible to the people who bring ideas to life.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Explore Studios
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/studios/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-bold text-neutral-800 transition hover:border-violet-200 hover:bg-violet-50"
              >
                Become a Host
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 border-t border-neutral-200 pt-12 sm:mt-28 sm:pt-16">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-violet-700">
                What matters to us
              </p>

              <h3 className="text-2xl font-extrabold tracking-tight text-neutral-950 sm:text-3xl">
                More than just a place to work.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-neutral-500">
              We&apos;re creating an easier way for creative people and inspiring
              workspaces to find each other.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group rounded-2xl border border-neutral-200 bg-[#faf9f7] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-lg hover:shadow-violet-950/[0.04] sm:p-7"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-bold text-neutral-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-neutral-900">
                    {value.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    {value.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-violet-700 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                    The StudioSpace way
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl bg-neutral-950 px-6 py-8 text-center sm:flex-row sm:gap-4 sm:py-7">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
            <Sparkles className="h-5 w-5" />
          </div>

          <p className="text-sm leading-6 text-neutral-300 sm:text-base">
            Your ideas bring the magic.
            <span className="font-bold text-white">
              {" "}We&apos;ll help you find the space.
            </span>
          </p>

          <ArrowDownRight className="hidden h-5 w-5 text-violet-300 sm:block" />
        </div>
      </div>
    </section>
  );
}
