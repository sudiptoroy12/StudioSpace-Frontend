
import { Suspense } from "react";
import StudiosContent from "./StudiosContent";

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F7F1E8] px-4 py-10 transition-colors duration-300 dark:bg-[#211629] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
            {/* Heading skeleton */}
            <div className="mb-8 h-10 w-80 max-w-full rounded-lg bg-[#D6B98C]/30 dark:bg-[#39243F]" />

            {/* Filter / search skeleton */}
            <div className="mb-8 h-28 rounded-2xl border border-[#D6B98C]/20 bg-white/70 dark:border-[#A78BBA]/15 dark:bg-[#39243F]/70" />

            {/* Studio cards skeleton */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-[#D6B98C]/25 bg-white/80 dark:border-[#A78BBA]/20 dark:bg-[#39243F]/70"
                >
                  {/* Image placeholder */}
                  <div className="h-56 bg-[#E9DFD1] dark:bg-[#211629]" />

                  {/* Card content placeholders */}
                  <div className="space-y-4 p-5">
                    <div className="h-5 w-3/4 rounded-md bg-[#D6B98C]/30 dark:bg-[#59465F]" />

                    <div className="h-4 w-1/2 rounded-md bg-[#E9DFD1] dark:bg-[#59465F]" />

                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-[#E9DFD1] dark:bg-[#59465F]" />
                      <div className="h-3 w-4/5 rounded bg-[#E9DFD1] dark:bg-[#59465F]" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="h-6 w-20 rounded-md bg-[#D6B98C]/30 dark:bg-[#59465F]" />
                      <div className="h-9 w-28 rounded-lg bg-[#39243F]/20 dark:bg-[#D6B98C]/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      }
    >
      <StudiosContent />
    </Suspense>
  );
}