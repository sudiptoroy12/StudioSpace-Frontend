
"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  Heart,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  Users,
} from "lucide-react";

type Studio = {
  id: string;
  title: string;
  category: string;
  hourlyRate: number;
  imageUrl: string;
  categorySlug: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  capacity: number;
  deposit: number;
  image: string;
  createdAt: number;
};

const categories = [
  { label: "Photo Studio", value: "photo-studios" },
  { label: "Film Stage", value: "sound-stages" },
  { label: "Podcast Room", value: "podcast-rooms" },
  { label: "Music Suite", value: "music-suites" },
  { label: "Art Workshop", value: "art-workshops" },
];



const sortOptions = [
  { label: "Newest Listings", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

export default function StudiosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
const [studios, setStudios] = useState<Studio[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState("");
  const [appliedMax, setAppliedMax] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

// Keep the selected category synchronized with the URL. This makes category
  // links from the homepage work even when this page is already mounted.
  useEffect(() => {
    const requestedCategory = searchParams.get("category") ?? "all";
    const validCategories = categories.map((item) => item.value);

    setCategory(
      requestedCategory === "all" || validCategories.includes(requestedCategory)
        ? requestedCategory
        : "all",
    );
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();

  async function fetchStudios() {
    try {
      setIsLoading(true);
      setFetchError("");

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${API_URL}/studios`, { signal: controller.signal });

      if (!response.ok) {
        throw new Error("Failed to fetch studios.");
      }

     
const responseData = await response.json();

// Support both an array response and { data: [...] } / { studios: [...] }.
const data = Array.isArray(responseData)
  ? responseData
  : Array.isArray(responseData.data)
    ? responseData.data
    : Array.isArray(responseData.studios)
      ? responseData.studios
      : [];

const categoryConfig: Record<string, { slug: string; label: string }> = {
  "photo studio": { slug: "photo-studios", label: "Photo Studio" },
  "photo studios": { slug: "photo-studios", label: "Photo Studio" },
  "photo-studios": { slug: "photo-studios", label: "Photo Studio" },

  "film stage": { slug: "sound-stages", label: "Film Stage" },
  "film stages": { slug: "sound-stages", label: "Film Stage" },
  "sound stage": { slug: "sound-stages", label: "Film Stage" },
  "sound stages": { slug: "sound-stages", label: "Film Stage" },
  "sound-stages": { slug: "sound-stages", label: "Film Stage" },

  "podcast room": { slug: "podcast-rooms", label: "Podcast Room" },
  "podcast rooms": { slug: "podcast-rooms", label: "Podcast Room" },
  "podcast-rooms": { slug: "podcast-rooms", label: "Podcast Room" },

  "music suite": { slug: "music-suites", label: "Music Suite" },
  "music suites": { slug: "music-suites", label: "Music Suite" },
  "music-suites": { slug: "music-suites", label: "Music Suite" },

  "art workshop": { slug: "art-workshops", label: "Art Workshop" },
  "art workshops": { slug: "art-workshops", label: "Art Workshop" },
  "art-workshops": { slug: "art-workshops", label: "Art Workshop" },
};

const mappedStudios: Studio[] = data.map(
  (studio: {
    _id?: string;
    id?: string;
    title?: string;
    category?: string;
    location?: string;
    description?: string;
    hourlyRate?: number | string;
    capacity?: number | string;
    deposit?: number | string;
    imageUrl?: string;
    createdAt?: string | number;
    rating?: number | string;
  }) => {
    const rawCategory = String(studio.category ?? "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");

    const normalizedCategory = categoryConfig[rawCategory] ?? {
      slug: rawCategory,
      label: studio.category ?? "Other",
    };

    return {
      id: String(studio._id ?? studio.id ?? ""),
      title: studio.title ?? "Untitled Studio",
      category: normalizedCategory.label,
      categorySlug: normalizedCategory.slug,
      location: studio.location ?? "Location unavailable",
      description: studio.description ?? "",
      price: Number(studio.hourlyRate ?? 0),
      rating: Number(studio.rating ?? 0),
      capacity: Number(studio.capacity ?? 0),
      deposit: Number(studio.deposit ?? 0),
      image: studio.imageUrl || "/images/studio-placeholder.png",
      createdAt: studio.createdAt
        ? new Date(studio.createdAt).getTime()
        : 0,
    };
  },
);

setStudios(mappedStudios);

    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setFetchError(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading studios.",
      );
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }

  void fetchStudios();

  return () => controller.abort();
}, []);


  const filteredStudios = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = studios.filter((studio) => {
      const matchesSearch =
        !query ||
        [
          studio.title,
          studio.category,
          studio.location,
          studio.description,
        ].some((field) => field.toLowerCase().includes(query));

      const matchesCategory =
        category === "all" || studio.categorySlug === category;

      const matchesMin =
        appliedMin === "" || studio.price >= Number(appliedMin);

      const matchesMax =
        appliedMax === "" || studio.price <= Number(appliedMax);

      const matchesFavorites =
        !showFavorites || favorites.includes(studio.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMin &&
        matchesMax &&
        matchesFavorites
      );
    });

    return results.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.createdAt - a.createdAt;
      }
    });
  }, [
    search,
    category,
    sort,
    appliedMin,
    appliedMax,
    showFavorites,
    favorites,
  ]);

  function selectCategory(value: string) {
    setCategory(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function resetFilters() {
    setSearch("");
    selectCategory("all");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
    setAppliedMin("");
    setAppliedMax("");
    setShowFavorites(false);
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favorite) => favorite !== id)
        : [...current, id],
    );
  }

  function applyPriceFilter() {
    const min = minPrice.trim();
    const max = maxPrice.trim();

    if (
      (min && (!Number.isFinite(Number(min)) || Number(min) < 0)) ||
      (max && (!Number.isFinite(Number(max)) || Number(max) < 0)) ||
      (min && max && Number(min) > Number(max))
    ) {
      return;
    }

    setAppliedMin(min);
    setAppliedMax(max);
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 pb-16 pt-8 text-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explore Creative Studios
            </h1>

            <p className="mt-2 text-sm text-neutral-500 sm:text-base">
              Discover sound stages, photography cycloramas, podcast hubs, and
              mixing rooms
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            Showing{" "}
            <span className="font-semibold text-neutral-900">
              {filteredStudios.length}
            </span>{" "}
            creative spaces
          </p>
        </div>

        {/* Search and filters */}
        <section className="mb-8 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col gap-3 lg:flex-row"
          >
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search studios by title, equipment, city..."
                aria-label="Search studios"
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-bold text-neutral-950 transition hover:bg-amber-400"
            >
              Search
            </button>

            <div className="relative">
              <ArrowDownUp className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort studios"
                className="h-11 w-full appearance-none rounded-xl border border-neutral-200 bg-white py-2 pl-9 pr-8 text-sm outline-none focus:border-amber-400 sm:min-w-[205px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className="my-4 border-t border-neutral-100" />

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Category:
              </span>

              <button
                onClick={() => selectCategory("all")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  category === "all"
                    ? "bg-amber-500 text-neutral-950 shadow-sm"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                All
              </button>

              {categories.map((item) => (
                <button
                  key={item.value}
                  onClick={() => selectCategory(item.value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    category === item.value
                      ? "bg-amber-500 text-neutral-950 shadow-sm"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Price filter */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                applyPriceFilter();
              }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="mr-1 text-xs font-medium text-neutral-500">
                Rate:
              </span>

              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="Min $"
                aria-label="Minimum hourly price"
                className="h-9 w-20 rounded-lg border border-neutral-200 px-2 text-xs outline-none focus:border-amber-400"
              />

              <span className="text-neutral-400">–</span>

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Max $"
                aria-label="Maximum hourly price"
                className="h-9 w-20 rounded-lg border border-neutral-200 px-2 text-xs outline-none focus:border-amber-400"
              />

              <button
                type="submit"
                className="h-9 rounded-lg bg-neutral-900 px-4 text-xs font-semibold text-white transition hover:bg-neutral-700"
              >
                Apply
              </button>

              <button
                type="button"
                onClick={resetFilters}
                aria-label="Reset all filters"
                title="Reset filters"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
            <button
              onClick={() => setShowFavorites((current) => !current)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                showFavorites
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-neutral-200 text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              <Heart
                className={`h-3.5 w-3.5 ${showFavorites ? "fill-current" : ""}`}
              />
              Favorites ({favorites.length})
            </button>
          </div>
        </section>

      
        {/* Studio cards */}
{isLoading ? (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="h-96 animate-pulse rounded-2xl bg-neutral-200"
      />
    ))}
  </div>
) : fetchError ? (
  <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center">
    <h2 className="text-lg font-bold text-red-600">
      Unable to load studios
    </h2>

    <p className="mt-2 text-sm text-neutral-500">
      {fetchError}
    </p>

    <button
      type="button"
      onClick={() => window.location.reload()}
      className="mt-4 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-bold text-white"
    >
      Try again
    </button>
  </div>
) : filteredStudios.length > 0 ? (
 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStudios.map((studio) => {
              const isFavorite = favorites.includes(studio.id);

              return (
                <article
                  key={studio.id}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/5"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-neutral-200 sm:h-60">
                    <img
                      src={studio.image}
                      alt={studio.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-violet-400/80 px-3 py-1.5 text-xs font-bold text-violet-950 shadow-sm backdrop-blur-md">
                      {studio.category}
                    </span>

                    <button
                      onClick={() => toggleFavorite(studio.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${studio.title} from favorites`
                          : `Add ${studio.title} to favorites`
                      }
                      aria-pressed={isFavorite}
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 backdrop-blur-md transition ${
                        isFavorite
                          ? "bg-rose-500 text-white"
                          : "bg-black/40 text-white hover:bg-rose-500"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 rounded-lg bg-black/80 px-3 py-2 text-white">
                      <span className="text-base font-extrabold text-amber-400">
                        ${studio.price}
                      </span>
                      <span className="ml-1 text-xs text-neutral-200">
                        / hr
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/80 px-2.5 py-1.5 text-sm font-bold text-white">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {studio.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col p-5">
                    <div className="mb-2 flex items-start gap-2 text-xs text-neutral-500">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span className="line-clamp-1">{studio.location}</span>
                    </div>

                    <h2
                      title={studio.title}
                      className="mb-2 line-clamp-1 text-lg font-extrabold tracking-tight text-neutral-900 transition-colors group-hover:text-amber-700"
                    >
                      {studio.title}
                    </h2>

                    <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-6 text-neutral-500">
                      {studio.description}
                    </p>

                    <div className="mb-4 flex items-center justify-between gap-2 border-t border-neutral-100 pt-4 text-xs text-neutral-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-neutral-400" />
                        Up to {studio.capacity} creators
                      </span>

                      <span className="whitespace-nowrap text-neutral-400">
                        Deposit: ${studio.deposit}
                      </span>
                    </div>

                    <Link
                      href={`/studios/${studio.id}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 text-sm font-bold text-white transition hover:bg-amber-500 hover:text-neutral-950"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
              <Search className="h-6 w-6 text-neutral-400" />
            </div>

            <h2 className="text-xl font-bold">No studios found</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
              Try another search term, choose a different category, or adjust
              your hourly price range.
            </p>

            <button
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-amber-400"
            >
              <RotateCcw className="h-4 w-4" />
              Reset filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
