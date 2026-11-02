
"use client";

import {
  ShieldCheck,
  BadgeCheck,
  Settings,
  Headset,
  ArrowRight,
} from "lucide-react";

const assurances = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Understand applicable liability coverage, booking terms, and responsibilities before your session.",
    number: "01",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Make more informed booking decisions with clear host information and profile verification details.",
    number: "02",
  },
  {
    icon: Settings,
    title: "Equipment Safety",
    description:
      "Review equipment details, studio rules, and safety instructions before starting your project.",
    number: "03",
  },
  {
    icon: Headset,
    title: "24/7 Host Support",
    description:
      "Know where to turn for help with booking questions, studio access, and host communication.",
    number: "04",
  },
];

export default function HostGuarantee() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-5 py-20 text-white sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-300">
              <ShieldCheck className="h-4 w-4" />
              Trust & support
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Your creativity deserves
              <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                a space you can trust.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Booking a creative space should feel straightforward.
              StudioSpace helps creators understand studio details, connect
              with hosts, and prepare for a smoother booking experience.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-neutral-300">
              <ShieldCheck className="h-5 w-5 text-violet-400" />
              More confidence for every creative session
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {assurances.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 transition group-hover:bg-violet-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-bold text-neutral-600">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-400">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-violet-300 transition group-hover:text-violet-200">
                    Creator-first experience
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
