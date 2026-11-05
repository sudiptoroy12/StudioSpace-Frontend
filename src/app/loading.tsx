import { Sparkles } from "lucide-react";
import {
  FeaturedStudiosLoading,
  Skeleton,
} from "./components/ui/StudioSkeleton";

export default function Loading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] text-[#211629] transition-colors duration-300 dark:bg-[#211629] dark:text-[#F7F1E8]">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/50 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#80613D] shadow-sm dark:border-[#D6B98C]/20 dark:bg-[#39243F] dark:text-[#D6B98C]">
            <Sparkles size={14} />
            StudioSpace
          </div>

          <Skeleton className="h-12 w-3/4 max-w-xl bg-[#E8DCCB] dark:bg-[#39243F] sm:h-16" />

          <Skeleton className="mt-5 h-5 w-full max-w-md bg-[#E8DCCB] dark:bg-[#39243F]" />

          <Skeleton className="mt-2 h-5 w-2/3 max-w-sm bg-[#E8DCCB] dark:bg-[#39243F]" />
        </div>

        {/* Section heading */}
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-40 bg-[#E8DCCB] dark:bg-[#39243F]" />

          <Skeleton className="h-10 w-32 rounded-full bg-[#E8DCCB] dark:bg-[#39243F]" />
        </div>

        {/* Featured studios skeleton */}
        <FeaturedStudiosLoading />
      </div>
    </main>
  );
}