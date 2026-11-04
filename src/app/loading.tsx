
import { Sparkles } from "lucide-react";
import { FeaturedStudiosLoading, Skeleton } from "./components/ui/StudioSkeleton";


export default function Loading() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Sparkles size={14} />
            StudioSpace
          </div>

          <Skeleton className="h-12 w-3/4 max-w-xl sm:h-16" />
          <Skeleton className="mt-5 h-5 w-full max-w-md" />
          <Skeleton className="mt-2 h-5 w-2/3 max-w-sm" />
        </div>

        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        <FeaturedStudiosLoading />
      </div>
    </main>
  );
}
