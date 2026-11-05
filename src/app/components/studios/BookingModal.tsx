"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  X,
  CheckCircle2,
  LoaderCircle,
  Wallet,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  hourlyRate: number;
  deposit: number;
}

interface BookingModalProps {
  studio: Studio;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingModal({
  studio,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const { data: session, isPending } = authClient.useSession();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const total = useMemo(
    () => studio.hourlyRate * hours + studio.deposit,
    [studio.hourlyRate, studio.deposit, hours]
  );

  const endTime = useMemo(() => {
    if (!startTime) return "";

    const [hour, minute] = startTime.split(":").map(Number);

    if (
      !Number.isInteger(hour) ||
      !Number.isInteger(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      return "";
    }

    const end = hour * 60 + minute + hours * 60;

    if (end >= 24 * 60) return "";

    return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(
      end % 60
    ).padStart(2, "0")}`;
  }, [startTime, hours]);

  async function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setError("");

    if (isPending) {
      setError("Please wait while we check your session.");
      return;
    }

    if (!session?.user?.email) {
      setError("Please sign in before booking a workspace.");
      return;
    }

    if (!date || date < today) {
      setError("Please select today or a future date.");
      return;
    }

    if (!endTime) {
      setError("Your booking must end before midnight.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError(
        "The API URL is not configured. Please check your .env.local file."
      );
      return;
    }

    setSubmitting(true);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error(
          "Your authentication token was not found. Please sign in again."
        );
      }

      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studioId: studio._id,
          date,
          startTime,
          hours: Number(hours),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to create your booking. Please try again."
        );
      }

      setSuccess(true);
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Loading state
  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211629]/80 p-4 backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-2xl border border-[#D6B98C]/20 bg-[#F7F1E8] p-8 text-center shadow-2xl dark:bg-[#211629]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#A78BBA]/15 blur-2xl" />

          <LoaderCircle
            size={30}
            className="relative mx-auto animate-spin text-[#A78BBA] dark:text-[#D6B98C]"
          />

          <p className="relative mt-4 text-sm font-medium text-[#39243F] dark:text-[#F7F1E8]">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211629]/80 p-4 backdrop-blur-sm">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E8DCCB] bg-[#F7F1E8] p-6 text-[#211629] shadow-2xl dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8] sm:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#A78BBA]/15 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6B98C]/25 text-[#39243F] dark:bg-[#D6B98C]/15 dark:text-[#D6B98C]">
              <CheckCircle2 size={30} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A78BBA] dark:text-[#D6B98C]">
              Booking request
            </p>

            <h2
              id="booking-success-title"
              className="mt-2 text-2xl font-bold"
            >
              Booking submitted!
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#766B7D] dark:text-[#C6B8CB]">
              Your booking for{" "}
              <span className="font-semibold text-[#39243F] dark:text-[#F7F1E8]">
                {studio.title}
              </span>{" "}
              has been saved successfully. Its current status is Pending,
              awaiting host approval.
            </p>

            <div className="mt-5 rounded-xl border border-[#D6B98C]/30 bg-[#D6B98C]/10 p-4">
              <p className="text-sm font-semibold text-[#39243F] dark:text-[#E8DCCB]">
                Booking status
              </p>
              <span className="mt-2 inline-flex rounded-full bg-[#D6B98C]/25 px-3 py-1 text-xs font-bold text-[#39243F] dark:text-[#D6B98C]">
                Pending Approval
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] px-5 py-3.5 text-sm font-bold text-[#F7F1E8] shadow-lg shadow-[#39243F]/15 transition hover:brightness-110 active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#211629]/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-[#E8DCCB] bg-[#F7F1E8] text-[#211629] shadow-2xl dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8]"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#D6B98C]/20" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#A78BBA]/10 blur-3xl" />

        <div className="relative p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/40 bg-[#D6B98C]/15 px-3 py-1.5">
                <CalendarDays
                  size={13}
                  className="text-[#80603E] dark:text-[#D6B98C]"
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#80603E] dark:text-[#D6B98C]">
                  Reserve your workspace
                </span>
              </div>

              <h2
                id="booking-title"
                className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Book {studio.title}
              </h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                <MapPin size={15} className="shrink-0 text-[#A78BBA]" />
                {studio.location}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              aria-label="Close booking modal"
              className="shrink-0 rounded-xl border border-[#E8DCCB] bg-white/70 p-2.5 text-[#766B7D] transition hover:border-[#A78BBA] hover:bg-[#A78BBA]/10 hover:text-[#39243F] disabled:opacity-50 dark:border-[#59465F] dark:bg-[#39243F]/60 dark:text-[#C6B8CB] dark:hover:text-[#D6B98C]"
            >
              <X size={19} />
            </button>
          </div>

          {!session?.user?.email && (
            <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
              Please sign in before submitting a booking.
            </div>
          )}

          <form onSubmit={handleBooking} className="mt-7 space-y-5">
            {/* Date */}
            <div>
              <label
                htmlFor="booking-date"
                className="mb-2 block text-[13px] font-semibold text-[#39243F] dark:text-[#E8DCCB]"
              >
                Booking date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A78BBA]"
                />

                <input
                  id="booking-date"
                  type="date"
                  min={today}
                  required
                  value={date}
                  disabled={submitting}
                  onChange={(event) => setDate(event.target.value)}
                  className="h-[50px] w-full rounded-xl border border-[#E8DCCB] bg-white pl-11 pr-4 text-sm text-[#211629] outline-none transition focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/15 disabled:opacity-60 dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8] dark:focus:border-[#D6B98C] dark:focus:ring-[#D6B98C]/10"
                />
              </div>
            </div>

            {/* Time and duration */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-time"
                  className="mb-2 block text-[13px] font-semibold text-[#39243F] dark:text-[#E8DCCB]"
                >
                  Start time
                </label>

                <div className="relative">
                  <Clock3
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A78BBA]"
                  />

                  <input
                    id="booking-time"
                    type="time"
                    required
                    value={startTime}
                    disabled={submitting}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="h-[50px] w-full rounded-xl border border-[#E8DCCB] bg-white pl-11 pr-4 text-sm text-[#211629] outline-none transition focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/15 disabled:opacity-60 dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8] dark:focus:border-[#D6B98C] dark:focus:ring-[#D6B98C]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-hours"
                  className="mb-2 block text-[13px] font-semibold text-[#39243F] dark:text-[#E8DCCB]"
                >
                  Duration
                </label>

                <select
                  id="booking-hours"
                  value={hours}
                  disabled={submitting}
                  onChange={(event) => setHours(Number(event.target.value))}
                  className="h-[50px] w-full rounded-xl border border-[#E8DCCB] bg-white px-4 text-sm text-[#211629] outline-none transition focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/15 disabled:opacity-60 dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8] dark:focus:border-[#D6B98C] dark:focus:ring-[#D6B98C]/10"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} {hour === 1 ? "hour" : "hours"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price summary */}
            <div className="rounded-2xl border border-[#D6B98C]/30 bg-[#D6B98C]/10 p-4 sm:p-5 dark:bg-[#39243F]/40">
              <div className="mb-4 flex items-center gap-2">
                <Wallet
                  size={17}
                  className="text-[#80603E] dark:text-[#D6B98C]"
                />
                <h3 className="text-sm font-bold text-[#39243F] dark:text-[#E8DCCB]">
                  Booking summary
                </h3>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-[#766B7D] dark:text-[#C6B8CB]">
                  Hourly rate × {hours}
                </span>
                <span className="font-semibold">
                  ৳{studio.hourlyRate * hours}
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-3 text-sm">
                <span className="text-[#766B7D] dark:text-[#C6B8CB]">
                  Deposit
                </span>
                <span className="font-semibold">৳{studio.deposit}</span>
              </div>

              <div className="mt-4 flex justify-between gap-3 border-t border-[#D6B98C]/30 pt-4">
                <span className="font-bold">Total</span>
                <span className="text-xl font-extrabold text-[#80603E] dark:text-[#D6B98C]">
                  ৳{total}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#766B7D] dark:text-[#C6B8CB]">
                The total includes the listed deposit. Confirm deposit refund
                terms with the host.
              </p>

              {endTime ? (
                <p className="mt-3 rounded-lg bg-[#A78BBA]/10 px-3 py-2 text-xs font-medium text-[#39243F] dark:text-[#E8DCCB]">
                  <Clock3 size={13} className="mr-1.5 inline" />
                  Booking ends at {endTime}
                </p>
              ) : (
                <p className="mt-3 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-700 dark:text-amber-300">
                  Choose an earlier start time or shorter duration.
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                submitting ||
                !session?.user?.email ||
                !endTime ||
                !date ||
                date < today
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] px-5 py-3.5 text-sm font-bold text-[#F7F1E8] shadow-lg shadow-[#39243F]/15 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Submitting booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>

            <p className="text-center text-xs leading-5 text-[#766B7D] dark:text-[#C6B8CB]">
              Your booking will be submitted with Pending status for host
              approval.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}