
"use client";

import { useCallback, useEffect, useState } from "react";
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
import { authClient } from "@/lib/auth-client";

type BookingStatus = "Cancelled" | "Pending Host Approval" | "Confirmed";

type Booking = {
  _id: string;
  email: string;
  studioId: string;
  studioTitle: string;
  category: string;
  imageUrl: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  hourlyRate: number;
  deposit: number;
  total: number;
  status: BookingStatus;
  createdAt?: string;
};

function normalizeBooking(data: Record<string, unknown>): Booking {
  return {
    _id: String(data._id ?? data.id ?? ""),
    email: String(data.email ?? ""),
    studioId: String(data.studioId ?? ""),
    studioTitle: String(data.studioTitle ?? data.studioName ?? "Studio"),
    category: String(data.category ?? "Workspace"),
    imageUrl: String(data.imageUrl ?? data.image ?? "/images/studio-2.jpg"),
    location: String(data.location ?? "Location unavailable"),
    date: String(data.date ?? ""),
    startTime: String(data.startTime ?? ""),
    endTime: String(data.endTime ?? ""),
    hours: Number(data.hours ?? 0),
    hourlyRate: Number(data.hourlyRate ?? 0),
    deposit: Number(data.deposit ?? 0),
    total: Number(data.total ?? 0),
    status:
      data.status === "Cancelled" ||
      data.status === "Confirmed" ||
      data.status === "Pending Host Approval"
        ? data.status
        : "Pending Host Approval",
    createdAt: data.createdAt ? String(data.createdAt) : undefined,
  };
}

function formatDate(date: string) {
  if (!date) return "Date unavailable";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time: string) {
  if (!time) return "--";

  const [hours, minutes] = time.split(":").map(Number);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return time;
  }

  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatMoney(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export default function MyBookingsPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const email = session?.user?.email;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [receiptTarget, setReceiptTarget] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!email) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError("API URL is not configured. Check your .env.local file.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${apiUrl}/my-bookings/${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to load your bookings.");
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The server returned an unexpected response.");
      }

      setBookings(
        data.map((item) => normalizeBooking(item as Record<string, unknown>))
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading bookings."
      );
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (sessionPending) return;

    if (!email) {
      setBookings([]);
      setError("");
      setLoading(false);
      return;
    }

    void fetchBookings();
  }, [sessionPending, email, fetchBookings]);

  function printReceipt(booking: Booking) {
    setReceiptTarget(booking);

    window.setTimeout(() => {
      window.print();
    }, 100);
  }

  // This only updates the UI. A real cancellation needs a backend endpoint.
  function confirmCancellation() {
    if (!cancelTarget) return;

    setBookings((current) =>
      current.map((booking) =>
        booking._id === cancelTarget._id
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );

    setCancelTarget(null);
  }

  if (sessionPending || loading) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-5 py-20 text-neutral-900">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
          <p className="mt-4 text-sm text-neutral-500">
            Loading your studio bookings...
          </p>
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-5 py-20 text-neutral-900">
        <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <CalendarDays size={38} className="mx-auto text-amber-500" />
          <h1 className="mt-4 text-2xl font-bold">Sign in to view bookings</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Your studio reservations will appear here after you sign in.
          </p>
          <Link
            href="/signin"
            className="mt-6 inline-flex rounded-xl bg-amber-400 px-5 py-3 font-bold text-neutral-950 hover:bg-amber-500"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
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
              Track your reservations, booking statuses, and studio times.
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

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => void fetchBookings()}
              className="shrink-0 rounded-lg border border-rose-200 bg-white px-4 py-2 font-semibold hover:bg-rose-100"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <article
                key={booking._id}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-32 sm:w-32">
                    <Image
                      src={booking.imageUrl}
                      alt={booking.studioTitle}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 128px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <StatusBadge status={booking.status} />
                      <span className="text-xs text-neutral-400">
                        ID: #{booking._id.slice(-8)}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold leading-snug text-neutral-900">
                      {booking.studioTitle}
                    </h2>

                    <p className="mt-1 text-xs text-neutral-500">
                      {booking.category.replaceAll("-", " ")}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-500 sm:text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={15} className="text-amber-500" />
                        <span className="font-semibold">
                          {formatDate(booking.date)}
                        </span>
                      </span>

                      <span className="hidden text-neutral-300 sm:inline">
                        •
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={15} className="text-amber-500" />
                        {formatTime(booking.startTime)} -{" "}
                        {formatTime(booking.endTime)} ({booking.hours}{" "}
                        {booking.hours === 1 ? "hour" : "hours"})
                      </span>
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400 sm:text-sm">
                      <MapPin size={14} className="shrink-0" />
                      {booking.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-neutral-100 pt-4 lg:min-w-[220px] lg:flex-col lg:items-end lg:justify-center lg:border-t-0 lg:pt-0">
                    <div className="lg:text-right">
                      <p className="text-xs text-neutral-400">
                        Total / Due
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-amber-500">
                        {formatMoney(booking.total)}
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

                {receiptTarget?._id === booking._id && (
                  <div className="mt-4 hidden print:block">
                    <h3 className="text-xl font-bold">StudioSpace Receipt</h3>
                    <p>Booking ID: #{booking._id}</p>
                    <p>Studio: {booking.studioTitle}</p>
                    <p>Location: {booking.location}</p>
                    <p>Date: {formatDate(booking.date)}</p>
                    <p>
                      Time: {formatTime(booking.startTime)} -{" "}
                      {formatTime(booking.endTime)}
                    </p>
                    <p>Hours: {booking.hours}</p>
                    <p>Deposit: {formatMoney(booking.deposit)}</p>
                    <p>Total: {formatMoney(booking.total)}</p>
                    <p>Status: {booking.status}</p>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center shadow-sm">
              <CalendarDays size={36} className="mx-auto text-amber-500" />
              <h2 className="mt-4 text-xl font-bold">No bookings yet</h2>
              <p className="mt-2 text-sm text-neutral-500">
                Your bookings will appear here after you reserve a workspace.
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
              You are about to cancel your booking for{" "}
              <span className="font-semibold text-neutral-800">
                {cancelTarget.studioTitle}
              </span>
              . Cancellation is currently a local UI demo and will not update
              MongoDB.
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

      <style jsx global>{`
        @media print {
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
            background: white;
            color: black;
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
