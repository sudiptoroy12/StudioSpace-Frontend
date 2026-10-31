
import { ChevronDown } from "lucide-react";

const UserInfoSkeleton = () => {
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1.5 pr-2 sm:gap-2.5 sm:pr-3"
      aria-label="Loading user information"
      role="status"
    >
      {/* Avatar skeleton */}
      <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-violet-100">
        <div className="h-full w-full rounded-full bg-neutral-200" />
      </div>

      {/* Name skeleton */}
      <div className="hidden space-y-2 sm:block">
        <div className="h-3.5 w-24 animate-pulse rounded-md bg-neutral-200" />
      </div>

      {/* Dropdown arrow skeleton */}
      <ChevronDown
        size={16}
        className="text-neutral-300"
        aria-hidden="true"
      />
    </div>
  );
};

export default UserInfoSkeleton;
