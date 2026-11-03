
"use client";

import { useMemo, useState, type FormEvent } from "react";
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

    // The booking must finish before midnight.
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
      setError("The API URL is not configured. Please check your .env.local file.");
      return;
    }

    setSubmitting(true);

    try {
      // Get the authentication token for the protected backend route.
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error(
          "Your authentication token was not found. Please sign in again."
        );
      }

      // Send only the booking inputs.
      // The backend determines the user, price, deposit, total, and status.
      const response = await fetch(`${apiUrl}/bookings`, {
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
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
          className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 text-white"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-2xl text-green-400">
            ✓
          </div>

          <h2 id="booking-success-title" className="text-2xl font-bold">
            Booking submitted!
          </h2>

          <p className="mt-3 text-neutral-400">
            Your booking for {studio.title} has been saved successfully.
            Its current status is Pending, awaiting host approval.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500"
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
        if (event.target === event.currentTarget && !submitting) {
          onClose();
        }
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
            <p className="text-sm text-violet-300">
              Reserve your workspace
            </p>

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
            disabled={submitting}
            aria-label="Close booking modal"
            className="rounded-lg px-3 py-2 text-neutral-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
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
            <label
              htmlFor="booking-date"
              className="mb-2 block text-sm text-neutral-300"
            >
              Booking date
            </label>

            <input
              id="booking-date"
              type="date"
              min={today}
              required
              value={date}
              disabled={submitting}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-violet-500 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-time"
                className="mb-2 block text-sm text-neutral-300"
              >
                Start time
              </label>

              <input
                id="booking-time"
                type="time"
                required
                value={startTime}
                disabled={submitting}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-violet-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="booking-hours"
                className="mb-2 block text-sm text-neutral-300"
              >
                Duration
              </label>

              <select
                id="booking-hours"
                value={hours}
                disabled={submitting}
                onChange={(event) => setHours(Number(event.target.value))}
                className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-violet-500 disabled:opacity-60"
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

            {endTime ? (
              <p className="mt-3 text-sm text-neutral-400">
                Booking ends at {endTime}
              </p>
            ) : (
              <p className="mt-3 text-sm text-amber-300">
                Choose an earlier start time or shorter duration.
              </p>
            )}
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              submitting ||
              !session?.user?.email ||
              !endTime ||
              !date ||
              date < today
            }
            className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting booking..." : "Confirm Booking"}
          </button>

          <p className="text-center text-xs text-neutral-500">
            Your booking will be submitted with Pending status for host approval.
          </p>
        </form>
      </div>
    </div>
  );
}
