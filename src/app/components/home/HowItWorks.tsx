
"use client";

import Link from "next/link";
import {
  Search,
  CalendarClock,
  BadgeCheck,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore creative studios and find the perfect space for your project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, time, and booking duration.",
    icon: CalendarClock,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Review the studio details and complete your reservation.",
    icon: BadgeCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Arrive at your chosen space and bring your creative vision to life.",
    icon: Clapperboard,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#F7F1E8] px-5 py-20 transition-colors duration-300 dark:bg-[#211629] sm:px-8 sm:py-24"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#D6B98C]/10 blur-3xl dark:bg-[#A78BBA]/10" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#A78BBA]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-[#D6B98C]/50 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#72552F] dark:border-[#D6B98C]/30 dark:bg-[#39243F] dark:text-[#D6B98C]">
            Simple booking process
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#211629] dark:text-[#F7F1E8] sm:text-4xl lg:text-5xl">
            How Booking Works
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#6F6472] dark:text-[#C5B9CA] sm:text-base">
            From finding your ideal studio to producing your next big idea,
            StudioSpace makes the process simple.
          </p>
        </div>

        {/* Booking steps */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-[#D6B98C]/30 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D6B98C] hover:shadow-xl hover:shadow-[#211629]/10 dark:border-[#A78BBA]/20 dark:bg-[#39243F]/60 dark:hover:border-[#D6B98C]/60 dark:hover:shadow-black/20 sm:p-7"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1E7F3] text-[#72517F] transition duration-300 group-hover:bg-[#39243F] group-hover:text-[#D6B98C] dark:bg-[#211629] dark:text-[#D6B98C] dark:group-hover:bg-[#D6B98C] dark:group-hover:text-[#211629]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="text-3xl font-extrabold text-[#E9DFD1] transition duration-300 group-hover:text-[#D6B98C] dark:text-[#59465F] dark:group-hover:text-[#D6B98C]">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#211629] dark:text-[#F7F1E8]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#786D7A] dark:text-[#C5B9CA]">
                  {step.description}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-[#D6B98C]/60 transition-all duration-300 group-hover:w-16 group-hover:bg-[#A78BBA] dark:bg-[#A78BBA]/50 dark:group-hover:bg-[#D6B98C]" />
              </article>
            );
          })}
        </div>

        {/* Explore studios button */}
        <div className="mt-10 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#39243F] px-6 py-3.5 text-sm font-bold text-[#F7F1E8] shadow-lg shadow-[#211629]/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#4B3153] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E5CCA6]"
          >
            Explore Studios
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
