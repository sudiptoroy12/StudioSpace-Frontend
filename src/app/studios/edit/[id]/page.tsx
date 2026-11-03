
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
  "h-[50px] w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100/70";

const labelClass = "mb-2 block text-[13px] font-semibold text-neutral-700";

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
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf9f7]">
        <LoaderCircle className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!studio) return null;

  const userName = studio.host?.name ?? session?.user?.name ?? "";
  const userEmail = studio.host?.email ?? session?.user?.email ?? "";

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/my-listings"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Listings
        </Link>

        <section className="overflow-hidden rounded-[26px] border border-neutral-200/80 bg-white shadow-sm sm:rounded-[30px]">
          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="border-b border-neutral-100 pb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                <Monitor className="h-3.5 w-3.5" />
                Host Dashboard (Private Route)
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
                Update Your Creative Workspace
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
                Update your studio details, production equipment, pricing,
                and availability information.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="pt-8">
              <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="studio-title" className={labelClass}>
                    Studio Title / Space Name *
                  </label>

                  <div className="relative">
                    <Monitor className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

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

                <div>
                  <label htmlFor="capacity" className={labelClass}>
                    Max Creator Capacity *
                  </label>

                  <div className="relative">
                    <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

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

                <div>
                  <label htmlFor="hourly-rate" className={labelClass}>
                    Hourly Rate ($ USD) *
                  </label>

                  <div className="relative">
                    <Wallet className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="hourly-rate"
                      type="number"
                      min="0.01"
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

                <div>
                  <label htmlFor="deposit" className={labelClass}>
                    Refundable Security Deposit ($ USD)
                  </label>

                  <div className="relative">
                    <Wallet className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

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

                <div className="sm:col-span-2">
                  <label htmlFor="location" className={labelClass}>
                    Location / Full Address *
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

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

                <div className="sm:col-span-2">
                  <label htmlFor="image-url" className={labelClass}>
                    Studio Image URL{" "}
                    <span className="font-normal text-neutral-400">
                      (Direct link from ImgBB, Unsplash, or CDN)
                    </span>
                  </label>

                  <div className="relative">
                    <ImageIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

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
                    <div className="mt-4 max-w-md overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                      {!imageFailed ? (
                        <img
                          src={form.imageUrl}
                          alt="Studio image preview"
                          onError={() => setImageFailed(true)}
                          className="h-52 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-40 flex-col items-center justify-center gap-2 text-sm text-neutral-500">
                          <ImageIcon className="h-6 w-6" />
                          Image preview unavailable. Check the image URL.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Included Amenities & Production Gear
                  </label>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:grid-cols-2 sm:p-5">
                    {amenities.map((amenity) => {
                      const checked = selectedAmenities.includes(amenity);

                      return (
                        <label
                          key={amenity}
                          className="flex cursor-pointer items-start gap-3 text-[13px] leading-5 text-neutral-600 transition hover:text-neutral-950"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAmenity(amenity)}
                            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-amber-500"
                          />
                          <span>{amenity}</span>
                        </label>
                      );
                    })}
                  </div>

                  <p className="mt-2 text-xs text-neutral-400">
                    Selected {selectedAmenities.length} amenities
                  </p>
                </div>

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
                    className="w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100/70"
                  />

                  <p className="mt-2 text-right text-xs text-neutral-400">
                    {form.description.length}/5000 characters
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 sm:p-5">
                <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                  Read-Only Host Identification
                </p>

                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="host-name"
                      className="mb-2 flex items-center gap-2 font-medium text-neutral-600"
                    >
                      <UserRound className="h-4 w-4 text-neutral-400" />
                      Host Name
                    </label>

                    <input
                      id="host-name"
                      value={userName}
                      readOnly
                      className={`${inputClass} cursor-not-allowed bg-neutral-100`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="host-email"
                      className="mb-2 block font-medium text-neutral-600"
                    >
                      Host Email
                    </label>

                    <input
                      id="host-email"
                      type="email"
                      value={userEmail}
                      readOnly
                      className={`${inputClass} cursor-not-allowed bg-neutral-100`}
                    />
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  Host information cannot be changed from this form.
                </p>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                <Link
                  href="/my-listings"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-5 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50 sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 text-sm font-extrabold text-neutral-950 shadow-lg shadow-amber-500/15 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
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

              <p className="mt-3 text-center text-xs leading-5 text-neutral-400">
                Your changes will be saved to your studio listing.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}