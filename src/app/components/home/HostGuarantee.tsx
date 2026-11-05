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
    <section className="relative overflow-hidden bg-[#F7F1E8] px-5 py-20 transition-colors duration-500 sm:px-8 sm:py-24 dark:bg-[#211629]">

      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#A78BBA]/20 blur-[100px] dark:bg-[#A78BBA]/15" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#D6B98C]/20 blur-[100px] dark:bg-[#D6B98C]/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">

          {/* Section introduction */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/60 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#805F3C] backdrop-blur-sm dark:border-[#D6B98C]/30 dark:bg-[#39243F]/70 dark:text-[#D6B98C]">
              <ShieldCheck className="h-4 w-4" />
              Trust & support
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-[#211629] sm:text-4xl lg:text-5xl dark:text-[#F7F1E8]">
              Your creativity deserves
              <span className="block bg-gradient-to-r from-[#805F3C] to-[#A78BBA] bg-clip-text text-transparent dark:from-[#D6B98C] dark:to-[#A78BBA]">
                a space you can trust.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#756A7C] sm:text-base dark:text-[#C5B9CC]">
              Booking a creative space should feel straightforward.
              StudioSpace helps creators understand studio details, connect
              with hosts, and prepare for a smoother booking experience.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#39243F] dark:text-[#E8DCEC]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D6B98C]/40 bg-[#D6B98C]/20 text-[#805F3C] dark:border-[#D6B98C]/20 dark:bg-[#39243F] dark:text-[#D6B98C]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              More confidence for every creative session
            </div>
          </div>

          {/* Assurance cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {assurances.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group rounded-2xl border border-[#D6B98C]/40 bg-white/65 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D6B98C] hover:bg-white hover:shadow-xl hover:shadow-[#211629]/5 sm:p-6 dark:border-[#A78BBA]/20 dark:bg-[#39243F]/60 dark:hover:border-[#D6B98C]/60 dark:hover:bg-[#39243F]/90 dark:hover:shadow-black/20"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D6B98C]/30 bg-[#D6B98C]/20 text-[#805F3C] transition-all duration-300 group-hover:border-[#39243F] group-hover:bg-[#39243F] group-hover:text-[#F7F1E8] dark:border-[#A78BBA]/20 dark:bg-[#211629] dark:text-[#D6B98C] dark:group-hover:border-[#D6B98C] dark:group-hover:bg-[#D6B98C] dark:group-hover:text-[#211629]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-sm font-bold tracking-wider text-[#C5B9CC] dark:text-[#796783]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#39243F] dark:text-[#F7F1E8]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#756A7C] dark:text-[#C5B9CC]">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#805F3C] transition-colors group-hover:text-[#39243F] dark:text-[#D6B98C] dark:group-hover:text-[#F7F1E8]">
                    Creator-first experience
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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