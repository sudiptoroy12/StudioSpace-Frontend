import { Skeleton, StudioCardSkeleton } from "../components/ui/StudioSkeleton";

export default function StudiosLoading() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="mb-10">
          <Skeleton className="h-12 w-72 max-w-full" />
          <Skeleton className="mt-4 h-5 w-full max-w-lg" />
        </div>

        {/* Search and filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row">
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl sm:w-40" />
          <Skeleton className="h-12 w-full rounded-xl sm:w-40" />
        </div>

        {/* Category filters */}
        <div className="mb-8 flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-10 w-32 shrink-0 rounded-full"
            />
          ))}
        </div>

        {/* Studio cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <StudioCardSkeleton  key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
