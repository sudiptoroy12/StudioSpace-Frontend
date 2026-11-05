import { Suspense } from "react";
import StudioBookingCard from "@/app/components/studios/StudioBookingCard";
import { notFound } from "next/navigation";
import {
  MapPin,
  Users,
  Wallet,
  CheckCircle2,
  Star,
  UserRound,
  Monitor,
} from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  capacity: number;
  hourlyRate: number;
  deposit: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  description: string;
  host: {
    userId: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

async function getStudio(id: string): Promise<Studio | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${apiUrl}/studios/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch studio details.");
  }

  return response.json();
}

export default function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<StudioDetailsLoading />}>
      <StudioDetails params={params} />
    </Suspense>
  );
}

async function StudioDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate MongoDB ObjectId.
  if (!/^[a-f\d]{24}$/i.test(id)) {
    notFound();
  }

  const studio = await getStudio(id);

  if (!studio) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-10 text-[#211629] transition-colors duration-300 dark:bg-[#211629] dark:text-[#F7F1E8] sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Studio header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#D6B98C]/40 bg-[#D6B98C]/15 px-3 py-1.5 text-sm font-semibold capitalize text-[#80613D] dark:text-[#D6B98C]">
              {studio.category.replaceAll("-", " ")}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#211629] dark:text-[#F7F1E8] sm:text-4xl">
              {studio.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-[#766B7D] dark:text-[#C6B8CB] sm:text-base">
              <MapPin className="h-4 w-4 shrink-0 text-[#A78BBA]" />
              {studio.location}
            </p>
          </div>

          <div className="rounded-2xl border border-[#D6B98C]/40 bg-white px-5 py-3 shadow-sm dark:border-[#59465F] dark:bg-[#39243F]">
            <p className="text-2xl font-extrabold text-[#39243F] dark:text-[#D6B98C]">
              ৳{studio.hourlyRate}
              <span className="ml-1 text-sm font-medium text-[#766B7D] dark:text-[#C6B8CB]">
                / hour
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="min-w-0 space-y-10">
            {/* Studio image */}
            <div className="overflow-hidden rounded-2xl border border-[#E8DCCB] bg-white shadow-lg shadow-[#211629]/5 dark:border-[#59465F] dark:bg-[#39243F]">
              {studio.imageUrl ? (
                <img
                  src={studio.imageUrl}
                  alt={studio.title}
                  className="h-[280px] w-full object-cover sm:h-[460px]"
                />
              ) : (
                <div className="flex h-[280px] items-center justify-center bg-[#E8DCCB]/50 text-[#766B7D] dark:bg-[#39243F] dark:text-[#C6B8CB] sm:h-[460px]">
                  <div className="text-center">
                    <Monitor className="mx-auto mb-3 h-10 w-10 text-[#A78BBA]" />
                    <p>No studio image available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6B98C]/20 text-[#80613D] dark:text-[#D6B98C]">
                  <Monitor className="h-5 w-5" />
                </div>

                <h2 className="text-xl font-bold text-[#211629] dark:text-[#F7F1E8]">
                  About this workspace
                </h2>
              </div>

              <p className="text-sm leading-8 text-[#766B7D] dark:text-[#C6B8CB] sm:text-base">
                {studio.description}
              </p>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-xl font-bold text-[#211629] dark:text-[#F7F1E8]">
                Workspace specifications
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#E8DCCB] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#211629]/5 dark:border-[#59465F] dark:bg-[#39243F]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A78BBA]/15 text-[#80618F] dark:text-[#D6B98C]">
                    <Users className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                    Capacity
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#211629] dark:text-[#F7F1E8]">
                    {studio.capacity} people
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E8DCCB] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#211629]/5 dark:border-[#59465F] dark:bg-[#39243F]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6B98C]/20 text-[#80613D] dark:text-[#D6B98C]">
                    <Wallet className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                    Hourly rate
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#211629] dark:text-[#F7F1E8]">
                    ৳{studio.hourlyRate}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E8DCCB] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#211629]/5 dark:border-[#59465F] dark:bg-[#39243F]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A78BBA]/15 text-[#80618F] dark:text-[#D6B98C]">
                    <Wallet className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                    Security deposit
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#211629] dark:text-[#F7F1E8]">
                    ৳{studio.deposit}
                  </p>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-bold text-[#211629] dark:text-[#F7F1E8]">
                Amenities & equipment
              </h2>

              {studio.amenities?.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {studio.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-[#E8DCCB] bg-white px-4 py-3 text-sm text-[#766B7D] transition hover:border-[#D6B98C] dark:border-[#59465F] dark:bg-[#39243F] dark:text-[#C6B8CB]"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A78BBA]" />
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                  No amenities listed yet.
                </p>
              )}
            </section>

            {/* Host details */}
            <section>
              <h2 className="text-xl font-bold text-[#211629] dark:text-[#F7F1E8]">
                Your host
              </h2>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#E8DCCB] bg-white p-5 dark:border-[#59465F] dark:bg-[#39243F]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#39243F] to-[#A78BBA] text-xl font-bold text-[#F7F1E8] shadow-md">
                  {studio.host?.name?.charAt(0).toUpperCase() ?? "H"}
                </div>

                <div>
                  <p className="font-bold text-[#211629] dark:text-[#F7F1E8]">
                    {studio.host?.name ?? "Studio host"}
                  </p>

                  <p className="mt-1 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                    Workspace host
                  </p>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-[#D6B98C]" />

                <h2 className="text-xl font-bold text-[#211629] dark:text-[#F7F1E8]">
                  Reviews
                </h2>
              </div>

              <p className="mt-3 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                No reviews available yet.
              </p>
            </section>
          </div>

          {/* Booking card */}
          <aside className="h-fit rounded-2xl border border-[#E8DCCB] bg-white p-6 shadow-xl shadow-[#211629]/5 dark:border-[#59465F] dark:bg-[#39243F] lg:sticky lg:top-24">
            <StudioBookingCard studio={studio} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function StudioDetailsLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-10 dark:bg-[#211629] sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

      <div className="relative mx-auto max-w-7xl animate-pulse">
        {/* Header skeleton */}
        <div className="h-7 w-36 rounded-full bg-[#E8DCCB] dark:bg-[#39243F]" />

        <div className="mt-5 h-10 w-72 max-w-full rounded-xl bg-[#E8DCCB] dark:bg-[#39243F]" />

        <div className="mt-4 h-5 w-48 rounded-lg bg-[#E8DCCB] dark:bg-[#39243F]" />

        {/* Content skeleton */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="h-[280px] rounded-2xl bg-[#E8DCCB] dark:bg-[#39243F] sm:h-[460px]" />

            <div className="mt-8 h-24 rounded-xl bg-[#E8DCCB] dark:bg-[#39243F]" />

            <div className="mt-8 h-32 rounded-xl bg-[#E8DCCB] dark:bg-[#39243F]" />
          </div>

          <div className="h-72 rounded-2xl bg-[#E8DCCB] dark:bg-[#39243F]" />
        </div>
      </div>
    </main>
  );
}