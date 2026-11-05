"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CirclePlus,
  Image as ImageIcon,
  LoaderCircle,
  MapPin,
  Monitor,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  { label: "Photo Studio", value: "photo-studios" },
  { label: "Film Stage", value: "sound-stages" },
  { label: "Podcast Room", value: "podcast-rooms" },
  { label: "Music Suite", value: "music-suites" },
  { label: "Art Workshop", value: "art-workshops" },
];

const amenities = [
  "Cyclorama Wall",
  "4K DMX Lighting Grid",
  "Soundproof Vocal Booth",
  "Acoustic Treatment Slat Walls",
  "Neve / SSL Preamps",
  "Shure SM7B Multi-Mic Setup",
  "Drive-In Loading Bay",
  "Hair & Makeup Vanity Station",
  "Client Lounge with Espresso Bar",
  "High-Speed Gigabit WiFi",
  "Green Screen / Blue Screen Drops",
  "Heavy Rigging Trusses (2-Ton)",
  "Electric Ceramic Kiln & Wheels",
  "Industrial Screen Printing Press",
];

type StudioForm = {
  title: string;
  category: string;
  capacity: string;
  hourlyRate: string;
  deposit: string;
  location: string;
  imageUrl: string;
  description: string;
};

const initialForm: StudioForm = {
  title: "",
  category: "photo-studios",
  capacity: "10",
  hourlyRate: "",
  deposit: "100",
  location: "",
  imageUrl: "",
  description: "",
};

export default function NewStudioPage() {
  const [form, setForm] = useState<StudioForm>(initialForm);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [published, setPublished] = useState(false);

  const router = useRouter();

  const { data: session } = authClient.useSession();

  const userName = session?.user?.name ?? "";
  const userEmail = session?.user?.email ?? "";

  function updateField(field: keyof StudioForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
    setPublished(false);

    if (field === "imageUrl") {
      setImageFailed(false);
    }
  }

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setPublished(false);

    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.description.trim()
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (
      !Number.isFinite(Number(form.capacity)) ||
      Number(form.capacity) < 1 ||
      !Number.isFinite(Number(form.hourlyRate)) ||
      Number(form.hourlyRate) <= 0 ||
      !Number.isFinite(Number(form.deposit)) ||
      Number(form.deposit) < 0
    ) {
      setMessage("Please enter valid capacity and pricing values.");
      return;
    }

    if (form.imageUrl.trim()) {
      try {
        const imageUrl = new URL(form.imageUrl);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          setMessage("Please provide a valid HTTP or HTTPS image URL.");
          return;
        }
      } catch {
        setMessage("Please provide a valid studio image URL.");
        return;
      }
    }

    setIsPublishing(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      const token = await getTokenFromClient();

      console.log("Token retrieved from client:", token);

      if (!token) {
        throw new Error("Please sign in before publishing your studio.");
      }

      const response = await fetch(`${API_URL}/api/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category,
          capacity: Number(form.capacity),
          hourlyRate: Number(form.hourlyRate),
          deposit: Number(form.deposit),
          location: form.location.trim(),
          imageUrl: form.imageUrl.trim(),
          amenities: selectedAmenities,
          description: form.description.trim(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to publish your studio listing.",
        );
      }

      toast.success(
        result?.message || "Studio listing published successfully!",
      );

      router.push("/my-listings");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsPublishing(false);
    }
  }

  const inputClass =
    "h-[50px] w-full rounded-xl border border-[#E8DCCB] bg-[#F7F1E8]/70 px-4 text-sm text-[#211629] outline-none transition placeholder:text-[#A69AA8] focus:border-[#A78BBA] focus:bg-white focus:ring-4 focus:ring-[#A78BBA]/15 dark:border-[#59465F] dark:bg-[#211629]/60 dark:text-[#F7F1E8] dark:placeholder:text-[#9F91A4] dark:focus:border-[#D6B98C] dark:focus:bg-[#211629] dark:focus:ring-[#D6B98C]/10";

  const labelClass =
    "mb-2 block text-[13px] font-semibold text-[#39243F] dark:text-[#E8DCEC]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-12 text-[#211629] transition-colors duration-300 dark:bg-[#211629] dark:text-[#F7F1E8] sm:px-6 lg:px-8">

      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

      {/* Main Content */}
      <div className="relative mx-auto max-w-5xl">

        <Link
          href="/studios"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#766B7D] transition hover:text-[#39243F] dark:text-[#C6B8CB] dark:hover:text-[#D6B98C]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to studios
        </Link>

        <section className="overflow-hidden rounded-[26px] border border-[#E8DCCB] bg-white shadow-[0_12px_45px_rgba(33,22,41,0.06)] transition-colors duration-300 dark:border-[#59465F] dark:bg-[#39243F] sm:rounded-[30px]">

          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">

            {/* Heading */}
            <div className="border-b border-[#E8DCCB] pb-8 dark:border-[#59465F]">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/40 bg-[#D6B98C]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#80643E] dark:text-[#E6CC9F]">
                <CirclePlus className="h-3.5 w-3.5" />
                Host Dashboard (Private Route)
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#211629] dark:text-[#F7F1E8] sm:text-4xl">
                List Your Creative Workspace
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#766B7D] dark:text-[#C6B8CB] sm:text-base">
                Share your photography cyc wall, recording room, podcast setup,
                or film stage with creators.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="pt-8">

              <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2">

                {/* Studio Title */}
                <div className="sm:col-span-2">
                  <label htmlFor="studio-title" className={labelClass}>
                    Studio Title / Space Name *
                  </label>

                  <div className="relative">
                    <Monitor className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                    <input
                      id="studio-title"
                      required
                      maxLength={120}
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="e.g. Apex 4K Multi-Cam Podcast Studio & Cinema Stage"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className={labelClass}>
                    Studio Discipline / Category *
                  </label>

                  <select
                    id="category"
                    required
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className={inputClass}
                  >
                    {categories.map((category) => (
                      <option
                        key={category.value}
                        value={category.value}
                        className="bg-white text-[#211629] dark:bg-[#39243F] dark:text-[#F7F1E8]"
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Capacity */}
                <div>
                  <label htmlFor="capacity" className={labelClass}>
                    Max Creator Capacity *
                  </label>

                  <div className="relative">
                    <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                    <input
                      id="capacity"
                      type="number"
                      min="1"
                      max="1000"
                      required
                      value={form.capacity}
                      onChange={(e) => updateField("capacity", e.target.value)}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Hourly Rate */}
                <div>
                  <label htmlFor="hourly-rate" className={labelClass}>
                    Hourly Rate ($ USD) *
                  </label>

                  <div className="relative">
                    <Wallet className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                    <input
                      id="hourly-rate"
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      value={form.hourlyRate}
                      onChange={(e) =>
                        updateField("hourlyRate", e.target.value)
                      }
                      placeholder="95"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Deposit */}
                <div>
                  <label htmlFor="deposit" className={labelClass}>
                    Refundable Security Deposit ($ USD)
                  </label>

                  <div className="relative">
                    <Wallet className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                    <input
                      id="deposit"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.deposit}
                      onChange={(e) => updateField("deposit", e.target.value)}
                      placeholder="100"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label htmlFor="location" className={labelClass}>
                    Location / Full Address *
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                    <input
                      id="location"
                      required
                      maxLength={250}
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="e.g. 520 W 28th St, Chelsea Arts District, New York, NY"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label htmlFor="image-url" className={labelClass}>
                    Studio Image URL{" "}
                    <span className="font-normal text-[#A69AA8] dark:text-[#B6A6BC]">
                      (Direct link from ImgBB, Unsplash, or CDN)
                    </span>
                  </label>

                  <div className="relative">
                    <ImageIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                    <input
                      id="image-url"
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => updateField("imageUrl", e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className={`${inputClass} pl-11`}
                    />
                  </div>

                  {form.imageUrl.trim() && (
                    <div className="mt-4 max-w-md overflow-hidden rounded-xl border border-[#E8DCCB] bg-[#F7F1E8] dark:border-[#59465F] dark:bg-[#211629]">
                      {!imageFailed ? (
                        <img
                          src={form.imageUrl}
                          alt="Studio image preview"
                          onError={() => setImageFailed(true)}
                          className="h-52 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-40 flex-col items-center justify-center gap-2 text-sm text-[#766B7D] dark:text-[#C6B8CB]">
                          <ImageIcon className="h-6 w-6 text-[#A78BBA]" />
                          Image preview unavailable. Check the image URL.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Included Amenities & Production Gear
                  </label>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-2xl border border-[#E8DCCB] bg-[#F7F1E8]/70 p-4 dark:border-[#59465F] dark:bg-[#211629]/40 sm:grid-cols-2 sm:p-5">
                    {amenities.map((amenity) => {
                      const checked = selectedAmenities.includes(amenity);

                      return (
                        <label
                          key={amenity}
                          className="flex cursor-pointer items-start gap-3 text-[13px] leading-5 text-[#766B7D] transition hover:text-[#39243F] dark:text-[#C6B8CB] dark:hover:text-[#F7F1E8]"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAmenity(amenity)}
                            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#A78BBA]"
                          />

                          <span>{amenity}</span>
                        </label>
                      );
                    })}
                  </div>

                  <p className="mt-2 text-xs text-[#A69AA8] dark:text-[#B6A6BC]">
                    Selected {selectedAmenities.length} amenities
                  </p>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label htmlFor="description" className={labelClass}>
                    Detailed Studio Overview & Equipment Specifications *
                  </label>

                  <textarea
                    id="description"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                    placeholder="Describe your workspace, equipment, lighting, acoustics, facilities, access instructions, and what makes it special..."
                    className="w-full resize-y rounded-xl border border-[#E8DCCB] bg-[#F7F1E8]/70 px-4 py-3 text-sm leading-6 text-[#211629] outline-none transition placeholder:text-[#A69AA8] focus:border-[#A78BBA] focus:bg-white focus:ring-4 focus:ring-[#A78BBA]/15 dark:border-[#59465F] dark:bg-[#211629]/60 dark:text-[#F7F1E8] dark:placeholder:text-[#9F91A4] dark:focus:border-[#D6B98C] dark:focus:bg-[#211629] dark:focus:ring-[#D6B98C]/10"
                  />

                  <p className="mt-2 text-right text-xs text-[#A69AA8] dark:text-[#B6A6BC]">
                    {form.description.length}/5000 characters
                  </p>
                </div>
              </div>

              {/* Host Identification */}
              <div className="mt-8 rounded-2xl border border-[#D6B98C]/40 bg-[#D6B98C]/10 p-4 dark:border-[#D6B98C]/30 dark:bg-[#211629]/40 sm:p-5">
                <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#80643E] dark:text-[#E6CC9F]">
                  Read-Only Host Identification
                </p>

                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-[#766B7D] dark:text-[#C6B8CB]">
                    <UserRound className="h-4 w-4 shrink-0 text-[#A78BBA]" />

                    <span>
                      Host Name:{" "}
                      <input
                        value={userName}
                        readOnly
                        className="min-w-0 max-w-full bg-transparent font-semibold text-[#39243F] outline-none dark:text-[#F7F1E8]"
                      />
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#766B7D] dark:text-[#C6B8CB]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-4 w-4 shrink-0 text-[#A78BBA]"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>

                    <span>
                      Host Email:{" "}
                      <input
                        value={userEmail}
                        readOnly
                        className="min-w-0 max-w-full bg-transparent font-semibold text-[#39243F] outline-none dark:text-[#F7F1E8]"
                      />
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-[#766B7D] dark:text-[#C6B8CB]">
                  Host information should be populated from your authenticated
                  user session and verified by the server when publishing.
                </p>
              </div>

              {/* Status Message */}
              {message && (
                <div
                  role="status"
                  className={`mt-5 flex items-start gap-2 rounded-xl border p-4 text-sm ${
                    published
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                      : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300"
                  }`}
                >
                  {published ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  ) : (
                    <CirclePlus className="mt-0.5 h-5 w-5 shrink-0" />
                  )}

                  <span>{message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPublishing}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#39243F] px-5 text-sm font-extrabold text-[#F7F1E8] shadow-lg shadow-[#211629]/15 transition hover:bg-[#211629] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D6B98C] dark:text-[#211629] dark:shadow-[#D6B98C]/10 dark:hover:bg-[#E3CBA5] sm:h-12"
              >
                {isPublishing ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Publishing Listing...
                  </>
                ) : published ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Listing Published
                  </>
                ) : (
                  <>
                    Publish Studio Listing
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-[#A69AA8] dark:text-[#B6A6BC]">
                By publishing, you confirm that your workspace details and
                equipment information are accurate.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}