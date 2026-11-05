import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Lightbulb,
  Sparkles,
  PanelsTopLeft,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F1E8] px-5 py-16 text-[#211629] transition-colors duration-300 dark:bg-[#211629] dark:text-[#F7F1E8]">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Creative illustration */}
          <div className="relative order-1 mx-auto w-full max-w-md">
            <div className="absolute inset-5 rounded-[3rem] bg-[#D6B98C]/25 blur-2xl dark:bg-[#A78BBA]/20" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#E8DCCB] bg-white p-6 shadow-[0_25px_80px_rgba(33,22,41,0.10)] dark:border-[#59465F] dark:bg-[#39243F] sm:p-10">
              {/* Illustration header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B98C] text-[#211629]">
                    <PanelsTopLeft size={19} />
                  </div>

                  <span className="text-sm font-bold tracking-tight text-[#211629] dark:text-[#F7F1E8]">
                    StudioSpace
                  </span>
                </div>

                <span className="rounded-full border border-[#D6B98C]/30 bg-[#D6B98C]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#80613D] dark:text-[#D6B98C]">
                  Lost in space
                </span>
              </div>

              {/* Creative studio scene */}
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-[#F7F1E8] dark:bg-[#211629]">
                {/* Decorative circles */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[20px] border-white/60 dark:border-[#39243F]/70" />
                <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-[#D6B98C]/40 dark:bg-[#A78BBA]/20" />

                {/* Studio floor */}
                <div className="absolute bottom-0 h-12 w-full bg-[#E8DCCB] dark:bg-[#39243F]" />

                {/* Light stand */}
                <div className="absolute bottom-10 left-[18%] h-36 w-1 rotate-6 rounded-full bg-[#766B7D] dark:bg-[#A78BBA]" />
                <div className="absolute bottom-10 left-[13%] h-1 w-16 -rotate-12 rounded-full bg-[#766B7D] dark:bg-[#A78BBA]" />
                <div className="absolute bottom-10 left-[15%] h-1 w-16 rotate-12 rounded-full bg-[#766B7D] dark:bg-[#A78BBA]" />

                {/* Studio light */}
                <div className="absolute left-[9%] top-[19%] flex h-16 w-20 -rotate-12 items-center justify-center rounded-t-[50%] rounded-b-xl border-4 border-[#39243F] bg-[#D6B98C] shadow-lg dark:border-[#A78BBA]">
                  <Lightbulb size={28} className="text-[#39243F]" />
                </div>

                {/* Main camera */}
                <div className="studio-float relative z-10 -translate-y-1 rotate-[-5deg]">
                  <div className="relative flex h-28 w-40 items-center justify-center rounded-2xl border-[5px] border-[#59465F] bg-[#211629] shadow-2xl sm:h-32 sm:w-48">
                    {/* Camera top */}
                    <div className="absolute -top-4 left-8 h-5 w-12 rounded-t-lg bg-[#39243F]" />

                    {/* Camera flash */}
                    <div className="absolute right-5 top-3 h-3 w-7 rounded-sm bg-[#A78BBA]" />

                    {/* Camera lens */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-[#A78BBA] bg-[#211629] shadow-inner">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#D6B98C] bg-[#39243F]">
                        <div className="h-5 w-5 rounded-full bg-[#D6B98C]/80 blur-[2px]" />
                      </div>
                    </div>

                    {/* Camera indicator */}
                    <div className="absolute bottom-3 right-4 h-2 w-2 rounded-full bg-[#D6B98C]" />
                  </div>
                </div>

                {/* Floating sparkles */}
                <Sparkles
                  size={25}
                  className="absolute right-[14%] top-[16%] animate-pulse text-[#A78BBA]"
                />

                <Sparkles
                  size={18}
                  className="absolute bottom-[25%] right-[12%] text-[#D6B98C]"
                />

                {/* 404 badge */}
                <div className="absolute bottom-5 left-5 rounded-xl border border-[#D6B98C]/40 bg-white/90 px-4 py-2 shadow-lg backdrop-blur dark:bg-[#39243F]/90">
                  <span className="text-sm font-black tracking-widest text-[#211629] dark:text-[#F7F1E8]">
                    404
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs font-medium text-[#766B7D] dark:text-[#C6B8CB]">
                  Creative spaces, endless possibilities.
                </p>

                <Sparkles size={17} className="text-[#D6B98C]" />
              </div>
            </div>
          </div>

          {/* Error content */}
          <div className="order-2 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/50 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#80613D] shadow-sm dark:bg-[#39243F] dark:text-[#D6B98C]">
              <Sparkles size={14} />
              Page not found
            </div>

            <h1 className="text-7xl font-bold tracking-[-0.07em] text-[#211629] dark:text-[#F7F1E8] sm:text-8xl lg:text-[110px]">
              404<span className="text-[#D6B98C]">.</span>
            </h1>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#211629] dark:text-[#F7F1E8] sm:text-4xl">
              Oops! This space
              <span className="block font-serif italic text-[#A78BBA]">
                doesn&apos;t exist.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-[#766B7D] dark:text-[#C6B8CB] lg:mx-0">
              Looks like you&apos;ve wandered into an empty studio. The page
              you&apos;re looking for may have been moved, deleted, or never
              existed.
            </p>

            {/* Home button */}
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] px-8 py-4 text-sm font-semibold text-[#F7F1E8] shadow-lg shadow-[#211629]/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#39243F]/25 sm:w-auto"
              >
                <ArrowLeft
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                Return to Home

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>

            <p className="mt-8 text-xs font-medium tracking-wide text-[#766B7D] dark:text-[#C6B8CB]">
              STUDIO SPACE · CREATE SOMETHING AMAZING
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}