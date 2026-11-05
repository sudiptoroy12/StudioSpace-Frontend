"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Aperture,
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
    <section
      id="about"
      className="relative overflow-hidden bg-[#F7F1E8] px-5 py-20 transition-colors duration-500 sm:px-8 sm:py-24 lg:py-28 dark:bg-[#211629]"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-[#A78BBA]/20 blur-[110px] dark:bg-[#A78BBA]/15" />

      <div className="pointer-events-none absolute -right-36 bottom-10 h-80 w-80 rounded-full bg-[#D6B98C]/20 blur-[110px] dark:bg-[#D6B98C]/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main story */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Visual collage */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="relative pr-9 sm:pr-14">

              {/* Main image */}
              <div className="relative h-[340px] overflow-hidden rounded-[28px] bg-[#39243F] sm:h-[430px] sm:rounded-[36px]">
                <Image
                  height={430}
                  width={700}
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
                  alt="Bright, modern creative workspace with natural light"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#211629]/80 via-[#211629]/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Aperture className="h-3.5 w-3.5 text-[#D6B98C]" />
                    A space for every vision
                  </div>

                  <p className="max-w-sm text-2xl font-bold leading-snug text-white sm:text-3xl">
                    Every great idea deserves a place to begin.
                  </p>
                </div>
              </div>

              {/* Floating secondary image */}
              <div className="absolute -bottom-8 right-0 w-[43%] rounded-2xl border-4 border-[#F7F1E8] bg-[#F7F1E8] p-1.5 shadow-xl transition-colors duration-500 sm:-bottom-10 sm:rounded-3xl sm:border-[6px] dark:border-[#211629] dark:bg-[#211629]">
                <div className="h-36 overflow-hidden rounded-xl sm:h-44 sm:rounded-2xl">
                  <Image
                    width={700}
                    height={400}
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=700&q=85"
                    alt="Professional music recording equipment in a studio"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    unoptimized
                  />
                </div>

                <div className="px-2 pb-2 pt-3 sm:px-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#39243F] sm:text-sm dark:text-[#F7F1E8]">
                    <span className="h-2 w-2 rounded-full bg-[#A78BBA]" />
                    Your next creative chapter
                  </div>
                </div>
              </div>

              {/* Floating creative badge */}
              <div className="absolute -left-1 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6B98C]/50 bg-[#F7F1E8]/95 text-[#805F3C] shadow-lg backdrop-blur-md sm:-left-5 sm:h-16 sm:w-16 dark:border-[#D6B98C]/30 dark:bg-[#39243F]/95 dark:text-[#D6B98C]">
                <Lightbulb className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
            </div>

            {/* Community indicator */}
            <div className="mt-16 flex items-center gap-3 pl-2 sm:mt-20">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F7F1E8] bg-[#A78BBA]/20 text-[#805F3C] dark:border-[#211629] dark:bg-[#A78BBA]/20 dark:text-[#D6B98C]">
                  <Aperture className="h-4 w-4" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F7F1E8] bg-[#D6B98C]/30 text-[#805F3C] dark:border-[#211629] dark:bg-[#D6B98C]/20 dark:text-[#D6B98C]">
                  <Lightbulb className="h-4 w-4" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F7F1E8] bg-[#A78BBA]/30 text-[#805F3C] dark:border-[#211629] dark:bg-[#A78BBA]/20 dark:text-[#D6B98C]">
                  <Heart className="h-4 w-4" />
                </div>
              </div>

              <p className="text-xs leading-5 text-[#756A7C] sm:text-sm dark:text-[#A78BBA]">
                One creative community.
                <span className="block font-semibold text-[#39243F] dark:text-[#F7F1E8]">
                  Endless possibilities.
                </span>
              </p>
            </div>
          </div>

          {/* About copy */}
          <div className="pt-4 lg:pt-0">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/60 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#805F3C] backdrop-blur-sm dark:border-[#D6B98C]/30 dark:bg-[#39243F]/70 dark:text-[#D6B98C]">
              <Sparkles className="h-4 w-4" />
              Get to know StudioSpace
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#211629] sm:text-4xl lg:text-5xl dark:text-[#F7F1E8]">
              We believe great
              <span className="block bg-gradient-to-r from-[#805F3C] to-[#A78BBA] bg-clip-text text-transparent dark:from-[#D6B98C] dark:to-[#A78BBA]">
                work starts with
              </span>
              the right space.
            </h2>

            <p className="mt-6 text-base leading-8 text-[#62566A] dark:text-[#C5B9CC]">
              StudioSpace is built around a simple idea: finding a place to
              create should be just as inspiring as the work itself.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#756A7C] sm:text-base dark:text-[#AFA1B9]">
              Whether you&apos;re shooting your next campaign, recording a podcast,
              producing music, or bringing an artistic vision to life, we&apos;re
              here to help you discover a space that fits your project. And
              for studio owners, we&apos;re creating a way to showcase your
              workspace and connect with the people who need it.
            </p>

            {/* Mission statement */}
            <div className="mt-7 rounded-2xl border border-[#D6B98C]/40 bg-gradient-to-br from-white/80 to-[#D6B98C]/15 p-5 transition-colors duration-500 sm:p-6 dark:border-[#A78BBA]/20 dark:from-[#39243F]/90 dark:to-[#39243F]/50">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D6B98C]/30 bg-[#F7F1E8] text-[#805F3C] shadow-sm dark:border-[#D6B98C]/20 dark:bg-[#211629] dark:text-[#D6B98C]">
                  <Heart className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-[#39243F] dark:text-[#F7F1E8]">
                    Our mission
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#756A7C] dark:text-[#C5B9CC]">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#39243F] px-6 py-3.5 text-sm font-bold text-[#F7F1E8] shadow-lg shadow-[#211629]/10 transition hover:-translate-y-0.5 hover:bg-[#D6B98C] hover:text-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#F7F1E8]"
              >
                Explore Studios
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/add-studios"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6B98C]/60 bg-white/70 px-6 py-3.5 text-sm font-bold text-[#39243F] transition hover:border-[#D6B98C] hover:bg-[#D6B98C]/20 dark:border-[#A78BBA]/40 dark:bg-[#39243F]/60 dark:text-[#F7F1E8] dark:hover:border-[#D6B98C] dark:hover:bg-[#D6B98C]/15"
              >
                Become a Host
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 border-t border-[#D6B98C]/40 pt-12 sm:mt-28 sm:pt-16 dark:border-[#A78BBA]/20">

          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#805F3C] dark:text-[#D6B98C]">
                What matters to us
              </p>

              <h3 className="text-2xl font-extrabold tracking-tight text-[#211629] sm:text-3xl dark:text-[#F7F1E8]">
                More than just a place to work.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#756A7C] dark:text-[#AFA1B9]">
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
                  className="group rounded-2xl border border-[#D6B98C]/40 bg-white/65 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D6B98C] hover:bg-white hover:shadow-lg hover:shadow-[#211629]/5 sm:p-7 dark:border-[#A78BBA]/20 dark:bg-[#39243F]/55 dark:hover:border-[#D6B98C]/60 dark:hover:bg-[#39243F]/90 dark:hover:shadow-black/20"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D6B98C]/30 bg-[#D6B98C]/20 text-[#805F3C] transition-colors duration-300 group-hover:border-[#39243F] group-hover:bg-[#39243F] group-hover:text-[#F7F1E8] dark:border-[#A78BBA]/20 dark:bg-[#211629] dark:text-[#D6B98C] dark:group-hover:border-[#D6B98C] dark:group-hover:bg-[#D6B98C] dark:group-hover:text-[#211629]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-bold text-[#C5B9CC] dark:text-[#796783]">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[#39243F] dark:text-[#F7F1E8]">
                    {value.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-[#756A7C] dark:text-[#C5B9CC]">
                    {value.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#805F3C] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 dark:text-[#D6B98C]">
                    The StudioSpace way
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <div className="relative mt-12 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[#A78BBA]/20 bg-[#211629] px-6 py-8 text-center shadow-xl shadow-[#211629]/10 sm:flex-row sm:gap-4 sm:py-7 dark:border-[#D6B98C]/20 dark:bg-[#39243F]">
          <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-[#A78BBA]/20 blur-3xl" />

          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6B98C]/15 text-[#D6B98C]">
            <Sparkles className="h-5 w-5" />
          </div>

          <p className="relative text-sm leading-6 text-[#C5B9CC] sm:text-base">
            Your ideas bring the magic.
            <span className="font-bold text-[#F7F1E8]">
              {" "}We&apos;ll help you find the space.
            </span>
          </p>

          <ArrowDownRight className="relative hidden h-5 w-5 text-[#D6B98C] sm:block" />
        </div>
      </div>
    </section>
  );
}