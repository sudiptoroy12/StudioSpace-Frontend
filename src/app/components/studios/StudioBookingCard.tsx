"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  Wallet,
  ArrowRight,
} from "lucide-react";
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
      <aside className="relative h-fit overflow-hidden rounded-3xl border border-[#E8DCCB] bg-[#F7F1E8] p-5 shadow-xl shadow-[#39243F]/5 dark:border-[#59465F] dark:bg-[#211629] dark:shadow-black/20 sm:p-6 lg:sticky lg:top-24">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#D6B98C]/20" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#A78BBA]/10 blur-3xl" />

        <div className="relative">
          {/* Heading */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/40 bg-[#D6B98C]/15 px-3 py-1.5">
              <CalendarDays
                size={13}
                className="text-[#80603E] dark:text-[#D6B98C]"
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#80603E] dark:text-[#D6B98C]">
                Booking details
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#211629] dark:text-[#F7F1E8]">
              Reserve this workspace
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#766B7D] dark:text-[#C6B8CB]">
              Check the pricing and capacity before booking.
            </p>
          </div>

          {/* Price */}
          <div className="rounded-2xl border border-[#D6B98C]/30 bg-[#D6B98C]/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#80603E] dark:text-[#D6B98C]">
              Hourly rate
            </p>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-[#211629] dark:text-[#F7F1E8]">
                ৳{studio.hourlyRate}
              </span>

              <span className="text-sm font-medium text-[#766B7D] dark:text-[#C6B8CB]">
                / hour
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A78BBA]/15 text-[#80603E] dark:text-[#D6B98C]">
                  <Users size={18} />
                </div>

                <span className="text-sm font-medium text-[#766B7D] dark:text-[#C6B8CB]">
                  Capacity
                </span>
              </div>

              <span className="text-sm font-bold text-[#39243F] dark:text-[#F7F1E8]">
                {studio.capacity} people
              </span>
            </div>

            <div className="h-px bg-[#E8DCCB] dark:bg-[#59465F]" />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A78BBA]/15 text-[#80603E] dark:text-[#D6B98C]">
                  <Wallet size={18} />
                </div>

                <span className="text-sm font-medium text-[#766B7D] dark:text-[#C6B8CB]">
                  Deposit
                </span>
              </div>

              <span className="text-sm font-bold text-[#39243F] dark:text-[#F7F1E8]">
                ৳{studio.deposit}
              </span>
            </div>
          </div>

          {/* Booking button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] px-5 py-3.5 text-sm font-bold text-[#F7F1E8] shadow-lg shadow-[#39243F]/15 transition hover:brightness-110 active:scale-[0.98]"
          >
            Book Workspace Now

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          {/* Footer note */}
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-[#766B7D] dark:text-[#C6B8CB]">
            <Clock3 size={13} className="shrink-0 text-[#A78BBA]" />
            Choose your date and time to continue.
          </p>

          <p className="mt-3 text-center text-[11px] leading-5 text-[#A99EAC] dark:text-[#A99BAF]">
            Deposit refund terms are subject to host confirmation.
          </p>
        </div>
      </aside>

      {isModalOpen && (
        <BookingModal
          studio={studio}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            // Keep the success modal visible.
          }}
        />
      )}
    </>
  );
}