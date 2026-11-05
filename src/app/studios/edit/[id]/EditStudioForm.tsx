
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  LoaderCircle,
  MapPin,
  Monitor,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  { label: "Photo Studio", value: "photo-studios" },
  { label: "Film Stage", value: "film-stages" },
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

type Studio = {
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
};

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

const inputClass =
  "h-[50px] w-full rounded-xl border border-[#E8DCCB] bg-white px-4 text-sm text-[#211629] outline-none transition placeholder:text-[#A99EAC] focus:border-[#A78BBA] focus:bg-white focus:text-black focus:ring-4 focus:ring-[#A78BBA]/15 dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8] dark:placeholder:text-[#A99BAF] dark:focus:border-[#D6B98C] dark:focus:ring-[#D6B98C]/10";

const labelClass =
  "mb-2 block text-[13px] font-semibold text-[#39243F] dark:text-[#E8DCCB]";
export default function EditStudioPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const studioId = params.id;

  const [form, setForm] = useState<StudioForm>(initialForm);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [studio, setStudio] = useState<Studio | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const updateField = useCallback(
    (field: keyof StudioForm, value: string) => {
      setForm((current) => ({ ...current, [field]: value }));

      if (field === "imageUrl") {
        setImageFailed(false);
      }
    },
    [],
  );

  // Load the existing studio listing.
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/signin");
      return;
    }

    let cancelled = false;

    async function loadStudio() {
      try {
        setIsLoading(true);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        if (!API_URL) {
          throw new Error("API URL is not configured.");
        }

        const token = await getTokenFromClient();

        if (!token) {
          throw new Error("Please sign in to edit your studio.");
        }

        const response = await fetch(
          `${API_URL}/studios/edit/${encodeURIComponent(studioId)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          },
        );

        const result = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            result?.message || "Unable to load this studio listing.",
          );
        }

        if (cancelled) return;

        const existingStudio = result as Studio;

        setStudio(existingStudio);

        setForm({
          title: existingStudio.title ?? "",
          category: existingStudio.category ?? "photo-studios",
          capacity: String(existingStudio.capacity ?? 10),
          hourlyRate: String(existingStudio.hourlyRate ?? ""),
          deposit: String(existingStudio.deposit ?? 0),
          location: existingStudio.location ?? "",
          imageUrl: existingStudio.imageUrl ?? "",
          description: existingStudio.description ?? "",
        });

        setSelectedAmenities(existingStudio.amenities ?? []);
      } catch (error) {
        if (cancelled) return;

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load your studio.",
        );

        router.replace("/my-listings");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadStudio();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, router, studioId]);

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!studio) return;

    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.description.trim()
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (form.description.trim().length < 10) {
      toast.error("Description must contain at least 10 characters.");
      return;
    }

    if (
      !Number.isFinite(Number(form.capacity)) ||
      Number(form.capacity) < 1 ||
      Number(form.capacity) > 1000 ||
      !Number.isFinite(Number(form.hourlyRate)) ||
      Number(form.hourlyRate) <= 0 ||
      !Number.isFinite(Number(form.deposit)) ||
      Number(form.deposit) < 0
    ) {
      toast.error("Please enter valid capacity and pricing values.");
      return;
    }

    if (form.imageUrl.trim()) {
      try {
        const imageUrl = new URL(form.imageUrl);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          toast.error("Please provide a valid HTTP or HTTPS image URL.");
          return;
        }
      } catch {
        toast.error("Please provide a valid studio image URL.");
        return;
      }
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      toast.error("API URL is not configured.");
      return;
    }

    try {
      setIsSaving(true);

      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Please sign in before updating your studio.");
      }

      const response = await fetch(`${API_URL}/studios/${studio._id}`, {
        method: "PATCH",
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
          result?.message || "Unable to update your studio listing.",
        );
      }

      toast.success("Studio updated successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }
if (isPending || isLoading) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F1E8] dark:bg-[#211629]">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

      <div className="relative flex flex-col items-center gap-4">
        <LoaderCircle className="h-9 w-9 animate-spin text-[#A78BBA] dark:text-[#D6B98C]" />
        <p className="text-sm font-medium text-[#766B7D] dark:text-[#C6B8CB]">
          Loading your studio details...
        </p>
      </div>
    </main>
  );
}

  if (!studio) return null;

  const userName = studio.host?.name ?? session?.user?.name ?? "";
  const userEmail = studio.host?.email ?? session?.user?.email ?? "";

 return (
  <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-8 text-[#211629] transition-colors duration-300 dark:bg-[#211629] dark:text-[#F7F1E8] sm:px-6 lg:px-8">
    {/* Background glow */}
    <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />
    <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

    <div className="relative mx-auto max-w-5xl">
      <Link
        href="/my-listings"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#766B7D] transition hover:text-[#39243F] dark:text-[#C6B8CB] dark:hover:text-[#D6B98C]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Listings
      </Link>

      <section className="overflow-hidden rounded-[26px] border border-[#E8DCCB] bg-white shadow-[0_20px_60px_rgba(33,22,41,0.07)] dark:border-[#59465F] dark:bg-[#39243F] sm:rounded-[30px]">
        <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          {/* Page heading */}
          <div className="border-b border-[#E8DCCB] pb-8 dark:border-[#59465F]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6B98C]/40 bg-[#D6B98C]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#80613D] dark:text-[#D6B98C]">
              <Monitor className="h-3.5 w-3.5" />
              Host Dashboard (Private Route)
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#211629] dark:text-[#F7F1E8] sm:text-4xl">
              Update Your Creative Workspace
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#766B7D] dark:text-[#C6B8CB] sm:text-base">
              Update your studio details, production equipment, pricing, and
              availability information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="pt-8">
            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2">
              {/* Studio title */}
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
                  {!categories.some(
                    (category) => category.value === form.category,
                  ) && (
                    <option value={form.category}>{form.category}</option>
                  )}

                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
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

              {/* Hourly rate */}
              <div>
                <label htmlFor="hourly-rate" className={labelClass}>
                  Hourly Rate ($ USD) *
                </label>

                <div className="relative">
                  <Wallet className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A78BBA]" />

                  <input
                    id="hourly-rate"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    value={form.hourlyRate}
                    onChange={(e) => updateField("hourlyRate", e.target.value)}
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
                    required
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
                  <span className="font-normal text-[#A99EAC] dark:text-[#A99BAF]">
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

                <div className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-2xl border border-[#E8DCCB] bg-[#F7F1E8]/70 p-4 dark:border-[#59465F] dark:bg-[#211629]/50 sm:grid-cols-2 sm:p-5">
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

                <p className="mt-2 text-xs text-[#A99EAC] dark:text-[#A99BAF]">
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
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Describe your workspace, equipment, lighting, acoustics, facilities, access instructions, and what makes it special..."
                  className="w-full resize-y rounded-xl border border-[#E8DCCB] bg-white px-4 py-3 text-sm leading-6 text-[#211629] outline-none transition placeholder:text-[#A99EAC] focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/15 dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8] dark:placeholder:text-[#A99BAF] dark:focus:border-[#D6B98C] dark:focus:ring-[#D6B98C]/10"
                />

                <p className="mt-2 text-right text-xs text-[#A99EAC] dark:text-[#A99BAF]">
                  {form.description.length}/5000 characters
                </p>
              </div>
            </div>

            {/* Host information */}
            <div className="mt-8 rounded-2xl border border-[#D6B98C]/40 bg-[#D6B98C]/10 p-4 dark:border-[#D6B98C]/20 dark:bg-[#211629]/40 sm:p-5">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#80613D] dark:text-[#D6B98C]">
                Read-Only Host Identification
              </p>

              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="host-name"
                    className="mb-2 flex items-center gap-2 font-medium text-[#766B7D] dark:text-[#C6B8CB]"
                  >
                    <UserRound className="h-4 w-4 text-[#A78BBA]" />
                    Host Name
                  </label>

                  <input
                    id="host-name"
                    value={userName}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-[#E8DCCB]/40 dark:bg-[#39243F]`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="host-email"
                    className="mb-2 block font-medium text-[#766B7D] dark:text-[#C6B8CB]"
                  >
                    Host Email
                  </label>

                  <input
                    id="host-email"
                    type="email"
                    value={userEmail}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-[#E8DCCB]/40 dark:bg-[#39243F]`}
                  />
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#766B7D] dark:text-[#C6B8CB]">
                Host information cannot be changed from this form.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <Link
                href="/my-listings"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E8DCCB] px-5 text-sm font-bold text-[#766B7D] transition hover:border-[#A78BBA] hover:bg-[#F7F1E8] hover:text-[#39243F] dark:border-[#59465F] dark:text-[#C6B8CB] dark:hover:bg-[#211629] dark:hover:text-[#D6B98C] sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] px-5 text-sm font-extrabold text-[#F7F1E8] shadow-lg shadow-[#211629]/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#39243F]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Save Changes
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-center text-xs leading-5 text-[#A99EAC] dark:text-[#A99BAF]">
              Your changes will be saved to your studio listing.
            </p>
          </form>
        </div>
      </section>
    </div>
  </main>
);
}