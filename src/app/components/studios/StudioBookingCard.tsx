
"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  capacity: number;
  hourlyRate: number;
  deposit: number;
}

export default function StudioBookingCard({
  studio,
}: {
  studio: Studio;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-24">
        <p className="text-2xl font-bold">
          ৳{studio.hourlyRate}
          <span className="text-sm font-normal text-neutral-400">
            {" "}/ hour
          </span>
        </p>

        <div className="mt-5 flex justify-between border-b border-white/10 pb-4 text-sm">
          <span className="text-neutral-400">Capacity</span>
          <span>{studio.capacity} people</span>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <span className="text-neutral-400">Deposit</span>
          <span>৳{studio.deposit}</span>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500"
        >
          Book Workspace Now
        </button>

        <p className="mt-3 text-center text-xs text-neutral-500">
          Choose your date and time to continue.
        </p>
      </aside>

      {isModalOpen && (
        <BookingModal
          studio={studio}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            // The booking has been saved. Keep the success modal visible.
          }}
        />
      )}
    </>
  );
}
