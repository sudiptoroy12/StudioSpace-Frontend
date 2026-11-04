
type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`studio-skeleton rounded-xl ${className}`}
    />
  );
}

export function FeaturedStudioSkeleton() {
  return (
    <article className="overflow-hidden rounded-[26px] border border-neutral-200/80 bg-white shadow-sm">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />

      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        <Skeleton className="h-7 w-4/5" />
        <Skeleton className="h-4 w-2/5" />

        <div className="flex items-center justify-between border-t border-neutral-100 pt-5">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-24" />
          </div>
          <Skeleton className="h-11 w-32 rounded-full" />
        </div>
      </div>
    </article>
  );
}

export function FeaturedStudiosLoading() {
  return (
    <div
      className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Loading featured studios"
      role="status"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <FeaturedStudioSkeleton key={index} />
      ))}
      <span className="sr-only">Loading featured studios...</span>
    </div>
  );
}

export function StudioCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-4 p-5">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </article>
  );
}
