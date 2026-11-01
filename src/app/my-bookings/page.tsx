
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Printer,
  CircleX,
  CheckCircle2,
  Hourglass,
  X,
} from "lucide-react";

type BookingStatus = "Cancelled" | "Pending Host Approval" | "Confirmed";

type Booking = {
  id: string;
  studioName: string;
  category: string;
  image: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  total: number;
  status: BookingStatus;
};

const initialBookings: Booking[] = [
  {
    id: "a582c2",
    studioName: "Neon Vault 4K Cinema Soundstage & Cyclorama",
    category: "Music Suite",
    image: "/images/studio-2.jpg",
    location: "Arts District, Downtown Los Angeles, CA",
    date: "2026-10-29",
    startTime: "10:00",
    endTime: "14:00",
    hours: 4,
    total: 690,
    status: "Cancelled",
  },
  {
    id: "4d6157",
    studioName: "Neon Vault 4K Cinema Soundstage & Cyclorama",
    category: "Music Suite",
    image: "/images/studio-2.jpg",
    location: "Arts District, Downtown Los Angeles, CA",
    date: "2026-10-29",
    startTime: "10:00",
    endTime: "14:00",
    hours: 4,
    total: 690,
    status: "Cancelled",
  },
  {
    id: "2563de",
    studioName: "The Prism Cyc & Cinema Soundstage",
    category: "Film Stage",
    image: "/images/studio-2.jpg",
    location: "Brooklyn Navy Yard, Brooklyn, NY",
    date: "2026-11-15",
    startTime: "10:00",
    endTime: "15:00",
    hours: 5,
    total: 775,
    status: "Pending Host Approval",
  },
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [receiptTarget, setReceiptTarget] = useState<Booking | null>(null);

  function confirmCancellation() {
    if (!cancelTarget) return;

    // Demo behavior: updates the booking status locally.
    // Connect this action to your authenticated backend API.
    setBookings((current) =>
      current.map((booking) =>
        booking.id === cancelTarget.id
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );

    setCancelTarget(null);
  }

  function printReceipt(booking: Booking) {
    setReceiptTarget(booking);

    // Opens the browser's print dialog.
    // For a production app, generate a receipt with real payment details.
    window.setTimeout(() => {
      window.print();
    }, 100);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        {/* Heading */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-600">
              <CalendarDays size={14} />
              Production Schedule
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Studio Bookings
            </h1>

            <p className="mt-2 text-sm text-neutral-500 sm:text-base">
              Track reservation statuses, cancellation requests, and shoot
              times
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 shadow-sm transition hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200"
          >
            Explore More Studios
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Booking cards */}
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  {/* Studio image */}
                  <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-32 sm:w-32">
                    <Image
                      src={booking.image}
                      alt={booking.studioName}
                      fill
                      sizes="(max-width: 640px) 100vw, 128px"
                      className="object-cover"
                    />
                  </div>

                  {/* Booking details */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <StatusBadge status={booking.status} />
                      <span className="text-xs text-neutral-400">
                        ID: #{booking.id}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold leading-snug text-neutral-900">
                      {booking.studioName}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-500 sm:text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays
                          size={15}
                          className="text-amber-500"
                        />
                        <span className="font-semibold">{booking.date}</span>
                      </span>

                      <span className="hidden text-neutral-300 sm:inline">
                        •
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={15} className="text-amber-500" />
                        {booking.startTime} - {booking.endTime} (
                        {booking.hours} hrs)
                      </span>
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400 sm:text-sm">
                      <MapPin size={14} className="shrink-0" />
                      {booking.location}
                    </p>
                  </div>

                  {/* Price and actions */}
                  <div className="flex items-center justify-between gap-4 border-t border-neutral-100 pt-4 lg:min-w-[220px] lg:flex-col lg:items-end lg:justify-center lg:border-t-0 lg:pt-0">
                    <div className="lg:text-right">
                      <p className="text-xs text-neutral-400">
                        Total Charged / Due
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-amber-500">
                        ${booking.total}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => printReceipt(booking)}
                        className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50"
                      >
                        <Printer size={15} />
                        Receipt
                      </button>

                      {booking.status !== "Cancelled" && (
                        <button
                          type="button"
                          onClick={() => setCancelTarget(booking)}
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          <CircleX size={15} />
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hidden until printing */}
                {receiptTarget?.id === booking.id && (
                  <div className="mt-4 hidden print:block">
                    <h3 className="text-lg font-bold">StudioSpace Receipt</h3>
                    <p>Booking ID: #{booking.id}</p>
                    <p>Studio: {booking.studioName}</p>
                    <p>Date: {booking.date}</p>
                    <p>
                      Time: {booking.startTime} - {booking.endTime}
                    </p>
                    <p>Total: ${booking.total}</p>
                    <p>Status: {booking.status}</p>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center shadow-sm">
              <CalendarDays
                size={36}
                className="mx-auto text-amber-500"
              />
              <h2 className="mt-4 text-xl font-bold">No bookings yet</h2>
              <p className="mt-2 text-sm text-neutral-500">
                Find a creative space for your next production.
              </p>
              <Link
                href="/studios"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 hover:bg-amber-500"
              >
                Explore Studios <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Cancel confirmation */}
      {cancelTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-sm"
          onClick={() => setCancelTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <CircleX size={22} />
              </div>

              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100"
              >
                <X size={19} />
              </button>
            </div>

            <h2 id="cancel-title" className="text-xl font-bold">
              Cancel this booking?
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Are you sure you want to cancel your booking for{" "}
              <span className="font-semibold text-neutral-800">
                {cancelTarget.studioName}
              </span>
              ? This demo updates the status locally. Your real cancellation
              policy should be enforced by the server.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={confirmCancellation}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white hover:bg-rose-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print-only styling */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          article:has(.print\\:block) .print\\:block,
          article:has(.print\\:block) .print\\:block * {
            visibility: visible;
          }

          article:has(.print\\:block) .print\\:block {
            display: block !important;
            position: absolute;
            inset: 20px;
          }
        }
      `}</style>
    </main>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    Cancelled: "border-rose-200 bg-rose-50 text-rose-600",
    "Pending Host Approval": "border-amber-200 bg-amber-50 text-amber-600",
    Confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  const icons = {
    Cancelled: <CircleX size={13} />,
    "Pending Host Approval": <Hourglass size={13} />,
    Confirmed: <CheckCircle2 size={13} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}
