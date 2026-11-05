
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ReceiptText,
  X,
  RefreshCw,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Booking = {
  _id: string;
  email: string;
  studioId: string;
  studioTitle: string;
  category?: string;
  imageUrl?: string;
  location?: string;
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const statusStyles: Record<BookingStatus, string> = {
  Pending:
    "border-[#D6B98C]/60 bg-[#D6B98C]/15 text-[#80602F] dark:border-[#D6B98C]/30 dark:bg-[#D6B98C]/10 dark:text-[#D6B98C]",
  Confirmed:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300",
  Completed:
    "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300",
  Cancelled:
    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300",
};

function formatDate(date: string) {
  if (!date) return "Date not available";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(time: string) {
  if (!time) return "—";

  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return time;
  }

  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
}

function normalizeStatus(status: unknown): BookingStatus {
  if (
    status === "Pending" ||
    status === "Confirmed" ||
    status === "Completed" ||
    status === "Cancelled"
  ) {
    return status;
  }

  // Compatibility with records created by an older frontend.
  if (status === "Pending Host Approval") {
    return "Pending";
  }

  return "Pending";
}

export default function MyBookingsPage() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [notice, setNotice] = useState("");

  const email = session?.user?.email;

  const loadBookings = useCallback(async () => {
    if (!email) {
      setBookings([]);
      setLoading(false);
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured. Check your .env.local file.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error(
          "Your authentication token was not found. Please sign in again."
        );
      }

      const response = await fetch(`${API_URL}/my-bookings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Could not load your bookings."
        );
      }

      if (!Array.isArray(result)) {
        throw new Error("The server returned an unexpected bookings response.");
      }

      const normalizedBookings: Booking[] = result.map((item) => ({
        _id: String(item._id ?? ""),
        email: item.email ?? "",
        studioId: String(item.studioId ?? ""),
        studioTitle: item.studioTitle ?? item.studioName ?? "Studio",
        category: item.category ?? "",
        imageUrl: item.imageUrl ?? item.image ?? "",
        location: item.location ?? "",
        date: item.date ?? "",
        startTime: item.startTime ?? "",
        endTime: item.endTime ?? "",
        hours: Number(item.hours ?? 0),
        hourlyRate: Number(item.hourlyRate ?? 0),
        deposit: Number(item.deposit ?? 0),
        total: Number(item.total ?? 0),
        status: normalizeStatus(item.status),
        createdAt: item.createdAt ?? "",
      }));

      setBookings(normalizedBookings);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (sessionLoading) return;

    let cancelled = false;

    const timer = setTimeout(() => {
      if (!cancelled) {
        void loadBookings();
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [sessionLoading, loadBookings]);

  async function handleCancelBooking() {
    if (!selectedBooking || cancelling) return;

    if (selectedBooking.status !== "Pending") {
      setError("Only pending bookings can be cancelled.");
      setSelectedBooking(null);
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    setCancelling(true);
    setError("");
    setNotice("");

    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Please sign in again before cancelling.");
      }

      const response = await fetch(
        `${API_URL}/bookings/${encodeURIComponent(
          selectedBooking._id
        )}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Could not cancel this booking.");
      }

      setBookings((current) =>
        current.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      setNotice("Your booking has been cancelled successfully.");
      setSelectedBooking(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Cancellation failed."
      );
    } finally {
      setCancelling(false);
    }
  }

  // Loading state
  if (sessionLoading || loading) {
    return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-20 text-[#211629] dark:bg-[#211629] dark:text-[#F7F1E8]">
  {/* Background Glow Effects */}
  <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />

  <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

  <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 py-24">
    <RefreshCw className="h-8 w-8 animate-spin text-[#A78BBA] dark:text-[#D6B98C]" />
    <p className="text-sm text-[#766B7D] dark:text-[#C6B8CB]">
      Loading your bookings...
    </p>
  </div>
</main>
    );
  }

  if (!email) {
    return (
   <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-20 text-[#211629] dark:bg-[#211629] dark:text-[#F7F1E8]">
  {/* Background Glow Effects */}
  <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />

  <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

  <div className="relative mx-auto max-w-lg rounded-3xl border border-[#E8DCCB] bg-white p-8 text-center shadow-sm dark:border-[#59465F] dark:bg-[#39243F]">
    {/* Keep your existing sign-in content here */}
  </div>
        <div className="mx-auto max-w-lg rounded-3xl border border-[#E8DCCB] bg-white p-8 text-center shadow-sm dark:border-[#59465F] dark:bg-[#39243F]">
          <CalendarCheck className="mx-auto mb-4 h-12 w-12 text-[#A78BBA] dark:text-[#D6B98C]" />
          <h1 className="text-2xl font-semibold">
            Sign in to view bookings
          </h1>
          <p className="mt-3 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
            Your reservations will appear here after you sign in.
          </p>
          <Link
            href="/signin"
            className="mt-6 inline-flex rounded-full bg-[#39243F] px-5 py-3 font-semibold text-[#F7F1E8] transition hover:bg-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E3CBA5]"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
  <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-10 text-[#211629] dark:bg-[#211629] dark:text-[#F7F1E8] sm:px-6 lg:px-8">

  {/* Background Glow Effects */}
  <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />

  <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

  {/* Main Content */}
  <div className="relative mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold tracking-[0.16em] text-[#A78BBA] dark:text-[#D6B98C]">
              YOUR ACCOUNT
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Bookings
            </h1>
            <p className="mt-3 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
              Manage your studio reservations and booking status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadBookings()}
            className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[#D6B98C]/60 bg-white px-5 py-2.5 text-sm font-semibold text-[#39243F] transition hover:border-[#A78BBA] hover:bg-[#A78BBA]/10 dark:border-[#A78BBA]/40 dark:bg-[#39243F] dark:text-[#F7F1E8] dark:hover:border-[#D6B98C] dark:hover:text-[#D6B98C] sm:self-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Success notification */}
        {notice && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-300">
            <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{notice}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
              className="ml-auto hover:text-emerald-900 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Error notification */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-700 dark:border-rose-400/20 dark:text-rose-300">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="ml-auto hover:text-rose-900 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D6B98C] bg-white px-6 py-16 text-center shadow-sm dark:border-[#59465F] dark:bg-[#39243F]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D6B98C]/20 dark:bg-[#D6B98C]/10">
              <CalendarDays className="h-8 w-8 text-[#A78BBA] dark:text-[#D6B98C]" />
            </div>
            <h2 className="text-xl font-semibold">No bookings yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#766B7D] dark:text-[#C6B8CB]">
              When you reserve a studio, your booking details and status will
              appear here.
            </p>
            <Link
              href="/studios"
              className="mt-6 inline-flex rounded-full bg-[#39243F] px-5 py-3 font-semibold text-[#F7F1E8] transition hover:bg-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E3CBA5]"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          <>
            {/* Booking summary */}
            <div className="mb-5 flex flex-wrap gap-3 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
              <span className="rounded-xl border border-[#E8DCCB] bg-white px-4 py-3 dark:border-[#59465F] dark:bg-[#39243F]">
                Total bookings:{" "}
                <strong className="text-[#211629] dark:text-[#F7F1E8]">
                  {bookings.length}
                </strong>
              </span>
              <span className="rounded-xl border border-[#E8DCCB] bg-white px-4 py-3 dark:border-[#59465F] dark:bg-[#39243F]">
                Pending:{" "}
                <strong className="text-[#80602F] dark:text-[#D6B98C]">
                  {bookings.filter((b) => b.status === "Pending").length}
                </strong>
              </span>
              <span className="rounded-xl border border-[#E8DCCB] bg-white px-4 py-3 dark:border-[#59465F] dark:bg-[#39243F]">
                Confirmed:{" "}
                <strong className="text-emerald-700 dark:text-emerald-300">
                  {bookings.filter((b) => b.status === "Confirmed").length}
                </strong>
              </span>
            </div>

            {/* Booking cards */}
            <div className="space-y-5">
              {bookings.map((booking) => (
                <article
                  key={booking._id}
                  className="overflow-hidden rounded-3xl border border-[#E8DCCB] bg-white shadow-[0_5px_25px_rgba(33,22,41,0.04)] transition hover:border-[#D6B98C] hover:shadow-[0_12px_35px_rgba(33,22,41,0.08)] dark:border-[#59465F] dark:bg-[#39243F] dark:shadow-black/10 dark:hover:border-[#A78BBA]"
                >
                  <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
                    {/* Studio image */}
                    <div className="relative min-h-52 bg-[#E8DCCB] dark:bg-[#211629] md:min-h-full">
                      {booking.imageUrl ? (
                        <Image
                          src={booking.imageUrl}
                          alt={booking.studioTitle}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 220px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex min-h-52 items-center justify-center text-sm text-[#A092A7] dark:text-[#C6B8CB]">
                          No studio image
                        </div>
                      )}
                    </div>

                    {/* Booking information */}
                    <div className="min-w-0 p-5 sm:p-6">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          {booking.category && (
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#A78BBA] dark:text-[#D6B98C]">
                              {booking.category.replaceAll("-", " ")}
                            </p>
                          )}
                          <h2 className="text-xl font-semibold text-[#211629] dark:text-[#F7F1E8]">
                            {booking.studioTitle}
                          </h2>
                          {booking.location && (
                            <p className="mt-2 flex items-center gap-2 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                              <MapPin className="h-4 w-4 shrink-0 text-[#A78BBA] dark:text-[#D6B98C]" />
                              {booking.location}
                            </p>
                          )}
                        </div>

                        <span
                          className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {/* Booking details */}
                      <div className="my-5 grid gap-4 border-y border-[#E8DCCB] py-5 dark:border-[#59465F] sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-start gap-3">
                          <CalendarDays className="mt-0.5 h-5 w-5 text-[#A78BBA] dark:text-[#D6B98C]" />
                          <div>
                            <p className="text-xs text-[#A092A7] dark:text-[#B6A5BC]">
                              Date
                            </p>
                            <p className="mt-1 text-sm font-medium text-[#211629] dark:text-[#F7F1E8]">
                              {formatDate(booking.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock3 className="mt-0.5 h-5 w-5 text-[#A78BBA] dark:text-[#D6B98C]" />
                          <div>
                            <p className="text-xs text-[#A092A7] dark:text-[#B6A5BC]">
                              Time
                            </p>
                            <p className="mt-1 text-sm font-medium text-[#211629] dark:text-[#F7F1E8]">
                              {formatTime(booking.startTime)} –{" "}
                              {formatTime(booking.endTime)}
                            </p>
                            <p className="mt-1 text-xs text-[#A092A7] dark:text-[#B6A5BC]">
                              {booking.hours} hour(s)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <ReceiptText className="mt-0.5 h-5 w-5 text-[#A78BBA] dark:text-[#D6B98C]" />
                          <div>
                            <p className="text-xs text-[#A092A7] dark:text-[#B6A5BC]">
                              Total amount
                            </p>
                            <p className="mt-1 text-lg font-bold text-[#80602F] dark:text-[#D6B98C]">
                              {formatMoney(booking.total)}
                            </p>
                            <p className="mt-1 text-xs text-[#A092A7] dark:text-[#B6A5BC]">
                              Includes {formatMoney(booking.deposit)} deposit
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Booking actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs text-[#A092A7] dark:text-[#B6A5BC]">
                          Booking ID:{" "}
                          <span className="font-mono text-[#766B7D] dark:text-[#C6B8CB]">
                            {booking._id.slice(-8)}
                          </span>
                        </p>

                        {booking.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => setSelectedBooking(booking)}
                            className="rounded-full border border-rose-300 px-5 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 dark:border-rose-400/30 dark:text-rose-300 dark:hover:bg-rose-400/10"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Cancel booking confirmation modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#211629]/70 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!cancelling) setSelectedBooking(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-booking-title"
            className="w-full max-w-md rounded-3xl border border-[#E8DCCB] bg-[#F7F1E8] p-6 shadow-2xl dark:border-[#59465F] dark:bg-[#39243F]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-400/10">
              <AlertCircle className="h-6 w-6 text-rose-600 dark:text-rose-300" />
            </div>

            <h2
              id="cancel-booking-title"
              className="text-xl font-semibold text-[#211629] dark:text-[#F7F1E8]"
            >
              Cancel this booking?
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#766B7D] dark:text-[#C6B8CB]">
              Are you sure you want to cancel your reservation for{" "}
              <strong className="text-[#39243F] dark:text-[#D6B98C]">
                {selectedBooking.studioTitle}
              </strong>{" "}
              on {formatDate(selectedBooking.date)}? This action will update
              the booking status in the database.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={cancelling}
                onClick={() => setSelectedBooking(null)}
                className="rounded-full border border-[#D6B98C]/60 px-5 py-3 text-sm font-semibold text-[#39243F] transition hover:bg-[#E8DCCB] disabled:opacity-50 dark:border-[#A78BBA]/40 dark:text-[#F7F1E8] dark:hover:bg-[#211629]"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={cancelling}
                onClick={() => void handleCancelBooking()}
                className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
