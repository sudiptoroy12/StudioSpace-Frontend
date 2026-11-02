
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
      className="relative overflow-hidden bg-[#faf9f7] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-700">
            Simple booking process
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            How Booking Works
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
            From finding your ideal studio to producing your next big idea,
            StudioSpace makes the process simple.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-neutral-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5 sm:p-7"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 transition duration-300 group-hover:bg-violet-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="text-3xl font-extrabold text-neutral-200 transition group-hover:text-violet-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-500">
                  {step.description}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-violet-200 transition-all duration-300 group-hover:w-16 group-hover:bg-violet-600" />
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-violet-700"
          >
            Explore Studios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
