
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleDollarSign,
  Compass,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
} from "lucide-react";

const creatorSteps = [
  {
    number: "01",
    title: "Discover your space",
    description:
      "Explore unique photography studios, film stages, podcast rooms, and creative spaces that match your vision.",
    icon: Search,
    detail: "Find the right vibe, location, and equipment.",
  },
  {
    number: "02",
    title: "Book with confidence",
    description:
      "Compare studio details, check amenities, review pricing, and arrange a space for your next creative session.",
    icon: CalendarCheck,
    detail: "Know what you're getting before you arrive.",
  },
  {
    number: "03",
    title: "Show up & create",
    description:
      "Bring your ideas to life in a space built for creativity. Focus on the work that matters most.",
    icon: Sparkles,
    detail: "Less searching. More making.",
  },
];

const hostSteps = [
  {
    number: "01",
    title: "List your studio",
    description:
      "Showcase your workspace with photos, equipment details, amenities, and your hourly rate.",
    icon: UploadCloud,
    detail: "Your space deserves to be discovered.",
  },
  {
    number: "02",
    title: "Connect with creators",
    description:
      "Help photographers, filmmakers, musicians, and other creatives find a space that fits their project.",
    icon: Users,
    detail: "Meet people who value your workspace.",
  },
  {
    number: "03",
    title: "Grow your earnings",
    description:
      "Make your creative space available for bookings and turn unused studio time into an opportunity.",
    icon: CircleDollarSign,
    detail: "Put your space to work for you.",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"creators" | "hosts">("creators");

  const steps = activeTab === "creators" ? creatorSteps : hostSteps;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#faf9f7] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-violet-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-100/40 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-violet-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Simple by design
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Great spaces.
            <span className="mt-1 block bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Extraordinary creations.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            Your next big idea deserves the right space. Discover how
            StudioSpace brings creators and inspiring workspaces together.
          </p>
        </div>

        {/* Audience switcher */}
        <div className="mt-10 flex justify-center">
          <div
            className="inline-flex rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-sm"
            role="tablist"
            aria-label="How StudioSpace works"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "creators"}
              onClick={() => setActiveTab("creators")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 sm:px-7 ${
                activeTab === "creators"
                  ? "bg-neutral-950 text-white shadow-md"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Compass className="h-4 w-4" />
              For Creators
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "hosts"}
              onClick={() => setActiveTab("hosts")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 sm:px-7 ${
                activeTab === "hosts"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <UploadCloud className="h-4 w-4" />
              For Hosts
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[52px] hidden border-t border-dashed border-violet-300 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={`${activeTab}-${step.number}`}
                className="group relative rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/[0.06] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:rotate-[-5deg] group-hover:scale-110 ${
                      activeTab === "creators"
                        ? "bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white"
                        : "bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <span className="text-4xl font-black tracking-tight text-neutral-100 transition-colors duration-300 group-hover:text-violet-100">
                    {step.number}
                  </span>
                </div>

                <div className="mt-7">
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-neutral-100 pt-5">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      activeTab === "creators"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>

                  <span className="text-xs font-medium text-neutral-500">
                    {step.detail}
                  </span>
                </div>

                {index < 2 && (
                  <div className="mt-5 flex justify-end md:hidden">
                    <ArrowDownRight className="h-5 w-5 text-violet-300" />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-10 overflow-hidden rounded-3xl bg-neutral-950 px-6 py-9 sm:px-10 sm:py-10 lg:px-12">
          <div className="pointer-events-none absolute -right-10 -top-28 h-64 w-64 rounded-full border border-violet-400/20" />
          <div className="pointer-events-none absolute -right-1 top-[-90px] h-64 w-64 rounded-full border border-violet-400/20" />
          <div className="pointer-events-none absolute right-24 top-10 h-32 w-32 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-300">
                <ShieldCheck className="h-4 w-4" />
                Your next chapter starts here
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {activeTab === "creators"
                  ? "Ready to make something amazing?"
                  : "Your space could be someone's next big idea."}
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                {activeTab === "creators"
                  ? "Find a space that fits your vision and start creating."
                  : "Showcase your workspace and connect with creative people."}
              </p>
            </div>

            <Link
              href={activeTab === "creators" ? "/studios" : "/studios/new"}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                activeTab === "creators"
                  ? "bg-white text-neutral-950 hover:bg-violet-100"
                  : "bg-violet-500 text-white hover:bg-violet-400"
              }`}
            >
              {activeTab === "creators" ? "Explore Studios" : "List Your Studio"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Trust footer */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-neutral-400">
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-violet-500" />
            Spaces for every creative vision
          </span>

          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-violet-500" />
            Flexible creative possibilities
          </span>

          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-violet-500" />
            Built for creators and hosts
          </span>
        </div>
      </div>
    </section>
  );
}
