
import { Suspense } from "react";
import StudioBookingCard from "@/app/components/studios/StudioBookingCard";
import { notFound } from "next/navigation";

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
  // Read dynamic route params inside Suspense.
  const { id } = await params;

  // Validate the MongoDB ObjectId.
  if (!/^[a-f\d]{24}$/i.test(id)) {
    notFound();
  }

  // Fetch studio details inside Suspense.
  const studio = await getStudio(id);

  if (!studio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="rounded-full bg-violet-500/15 px-3 py-1 text-sm text-violet-300">
              {studio.category.replaceAll("-", " ")}
            </span>

            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              {studio.title}
            </h1>

            <p className="mt-3 text-neutral-400">
              {studio.location}
            </p>
          </div>

          <p className="text-xl font-bold">
            ৳{studio.hourlyRate}
            <span className="text-sm font-normal text-neutral-400">
              {" "}/ hour
            </span>
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            {/* Studio image */}
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src={studio.imageUrl}
                alt={studio.title}
                className="h-[280px] w-full object-cover sm:h-[460px]"
              />
            </div>

            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold">
                About this workspace
              </h2>

              <p className="mt-4 leading-7 text-neutral-400">
                {studio.description}
              </p>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-xl font-semibold">
                Workspace specifications
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-neutral-400">
                    Capacity
                  </p>
                  <p className="mt-2 font-semibold">
                    {studio.capacity} people
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-neutral-400">
                    Hourly rate
                  </p>
                  <p className="mt-2 font-semibold">
                    ৳{studio.hourlyRate}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-neutral-400">
                    Deposit
                  </p>
                  <p className="mt-2 font-semibold">
                    ৳{studio.deposit}
                  </p>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-semibold">
                Amenities
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {studio.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="rounded-xl border border-white/10 px-4 py-3 text-neutral-300"
                  >
                    <span className="mr-2 text-violet-400">
                      ✓
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </section>

            {/* Host details */}
            <section>
              <h2 className="text-xl font-semibold">
                Your host
              </h2>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/10 p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20 text-xl font-bold text-violet-300">
                  {studio.host?.name?.charAt(0).toUpperCase() ?? "H"}
                </div>

                <div>
                  <p className="font-semibold">
                    {studio.host?.name ?? "Studio host"}
                  </p>

                  <p className="mt-1 text-sm text-neutral-400">
                    Workspace host
                  </p>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-semibold">
                Reviews
              </h2>

              <p className="mt-3 text-neutral-400">
                No reviews available yet.
              </p>
            </section>
          </div>

          {/* Booking card */}
          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-24">
            <StudioBookingCard studio={studio} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function StudioDetailsLoading() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-5 w-36 rounded bg-neutral-800" />

        <div className="mt-5 h-10 w-72 max-w-full rounded bg-neutral-800" />

        <div className="mt-4 h-5 w-48 rounded bg-neutral-800" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="h-[280px] rounded-2xl bg-neutral-800 sm:h-[460px]" />

            <div className="mt-8 h-24 rounded-xl bg-neutral-800" />

            <div className="mt-8 h-32 rounded-xl bg-neutral-800" />
          </div>

          <div className="h-72 rounded-2xl bg-neutral-800" />
        </div>
      </div>
    </main>
  );
}
