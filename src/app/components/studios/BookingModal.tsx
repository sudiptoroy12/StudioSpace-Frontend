
"use client";

import { useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";

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
    const end = hour * 60 + minute + hours * 60;

    if (end >= 24 * 60) return "";

    return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(
      end % 60
    ).padStart(2, "0")}`;
  }, [startTime, hours]);

  async function handleBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

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
      setError("The API URL is not configured.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          studioId: studio._id,
          studioTitle: studio.title,
          category: studio.category,
          imageUrl: studio.imageUrl,
          location: studio.location,
          date,
          startTime,
          endTime,
          hours,
          hourlyRate: studio.hourlyRate,
          deposit: studio.deposit,
          total,
          status: "Pending Host Approval",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create your booking.");
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

  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6 text-white">
          Checking your session...
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 text-white">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-2xl text-green-400">
            ✓
          </div>

          <h2 className="text-2xl font-bold">Booking submitted!</h2>

          <p className="mt-3 text-neutral-400">
            Your booking for {studio.title} has been saved and is pending host
            approval.
          </p>

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900 p-5 text-white shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-violet-300">Reserve your workspace</p>
            <h2 id="booking-title" className="mt-1 text-2xl font-bold">
              Book {studio.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              {studio.location}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="rounded-lg px-3 py-2 text-neutral-400 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {!session?.user?.email && (
          <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
            Please sign in before submitting a booking.
          </div>
        )}

        <form onSubmit={handleBooking} className="mt-6 space-y-5">
          <div>
            <label htmlFor="booking-date" className="mb-2 block text-sm text-neutral-300">
              Booking date
            </label>
            <input
              id="booking-date"
              type="date"
              min={today}
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-time" className="mb-2 block text-sm text-neutral-300">
                Start time
              </label>
              <input
                id="booking-time"
                type="time"
                required
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label htmlFor="booking-hours" className="mb-2 block text-sm text-neutral-300">
                Duration
              </label>
              <select
                id="booking-hours"
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-violet-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} {hour === 1 ? "hour" : "hours"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-neutral-400">
                Hourly rate × {hours}
              </span>
              <span>৳{studio.hourlyRate * hours}</span>
            </div>

            <div className="mt-3 flex justify-between gap-3 text-sm">
              <span className="text-neutral-400">Deposit</span>
              <span>৳{studio.deposit}</span>
            </div>

            <div className="mt-4 flex justify-between gap-3 border-t border-white/10 pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-violet-300">
                ৳{total}
              </span>
            </div>

            <p className="mt-2 text-xs text-neutral-500">
              The total includes the listed deposit. Confirm deposit refund
              terms with the host.
            </p>

            {endTime && (
              <p className="mt-3 text-sm text-neutral-400">
                Booking ends at {endTime}
              </p>
            )}

            {!endTime && (
              <p className="mt-3 text-sm text-amber-300">
                Choose an earlier start time or shorter duration.
              </p>
            )}
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !session?.user?.email || !endTime}
            className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting booking..." : "Confirm Booking"}
          </button>

          <p className="text-center text-xs text-neutral-500">
            Your booking will be submitted for host approval.
          </p>
        </form>
      </div>
    </div>
  );
}
