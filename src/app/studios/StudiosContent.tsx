
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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

const studios: Studio[] = [
  {
    id: "neon-vault",
    title: "Neon Vault 4K Cinema Soundstage & Production Studio",
    category: "Film Stage",
    categorySlug: "sound-stages",
    location: "Arts District, Downtown Los Angeles, CA",
    description:
      "Massive 3,000 sq.ft creative soundstage with 22-foot ceilings, automated RGB lighting grid, heavy-duty production equipment, and flexible filming space.",
    price: 135,
    rating: 5.0,
    capacity: 30,
    deposit: 150,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85",
    createdAt: 9,
  },
  {
    id: "skyline-horizon",
    title: "Skyline Horizon Rooftop Production Studio",
    category: "Film Stage",
    categorySlug: "sound-stages",
    location: "South Loop Arts District, Chicago, IL",
    description:
      "An open-air architectural rooftop space with unobstructed views of the city skyline. Ideal for creative shoots and commercial productions.",
    price: 140,
    rating: 4.9,
    capacity: 30,
    deposit: 180,
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
    createdAt: 8,
  },
  {
    id: "velvet-echo",
    title: "Velvet Echo Analog Recording & Live Music Room",
    category: "Music Suite",
    categorySlug: "music-suites",
    location: "Music Row, Nashville, TN",
    description:
      "Warm, natural timber acoustics paired with vintage analog outboard gear. Perfect for live bands, recording sessions, and music production.",
    price: 110,
    rating: 5.0,
    capacity: 12,
    deposit: 120,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
    createdAt: 7,
  },
  {
    id: "daylight-loft",
    title: "The Daylight Loft Photography Studio",
    category: "Photo Studio",
    categorySlug: "photo-studios",
    location: "Brooklyn Arts District, New York, NY",
    description:
      "A bright photography loft with large industrial windows, natural daylight, backdrops, and plenty of room for product and portrait shoots.",
    price: 85,
    rating: 4.9,
    capacity: 10,
    deposit: 100,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    createdAt: 6,
  },
  {
    id: "podcast-lounge",
    title: "The Podcast Lounge — Professional Recording Room",
    category: "Podcast Room",
    categorySlug: "podcast-rooms",
    location: "East Austin, Austin, TX",
    description:
      "A comfortable recording room featuring a multi-camera setup, broadcast microphones, sound treatment, and a professional recording desk.",
    price: 65,
    rating: 4.8,
    capacity: 6,
    deposit: 75,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=85",
    createdAt: 5,
  },
  {
    id: "creative-canvas",
    title: "Creative Canvas Art & Maker Workshop",
    category: "Art Workshop",
    categorySlug: "art-workshops",
    location: "Mission District, San Francisco, CA",
    description:
      "A versatile maker space with generous worktables, natural light, creative supplies, and room for collaborative art workshops.",
    price: 55,
    rating: 4.7,
    capacity: 15,
    deposit: 80,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85",
    createdAt: 4,
  },
  {
    id: "frame-and-focus",
    title: "Frame & Focus Commercial Photo Studio",
    category: "Photo Studio",
    categorySlug: "photo-studios",
    location: "Downtown Seattle, Seattle, WA",
    description:
      "A flexible commercial photography space with studio lighting, seamless backdrops, and room for portraits, fashion, and product shoots.",
    price: 95,
    rating: 4.9,
    capacity: 12,
    deposit: 100,
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=85",
    createdAt: 3,
  },
  {
    id: "soundwave-room",
    title: "Soundwave Podcast & Voiceover Studio",
    category: "Podcast Room",
    categorySlug: "podcast-rooms",
    location: "Midtown, Atlanta, GA",
    description:
      "An acoustically treated studio for podcasts, voiceovers, interviews, and audio-first content with a comfortable recording setup.",
    price: 70,
    rating: 4.8,
    capacity: 5,
    deposit: 60,
    image:
      "https://images.unsplash.com/photo-1593078166031-9c9d7a4c6c86?auto=format&fit=crop&w=1200&q=85",
    createdAt: 2,
  },
  {
    id: "makers-corner",
    title: "Maker's Corner Creative Workshop",
    category: "Art Workshop",
    categorySlug: "art-workshops",
    location: "Pearl District, Portland, OR",
    description:
      "A welcoming creative workshop for hands-on projects, art classes, small group sessions, and collaborative maker events.",
    price: 45,
    rating: 4.7,
    capacity: 18,
    deposit: 50,
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=85",
    createdAt: 1,
  },
];

const sortOptions = [
  { label: "Newest Listings", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

export default function StudiosPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState("");
  const [appliedMax, setAppliedMax] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

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

  function resetFilters() {
    setSearch("");
    setCategory("all");
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
                onClick={() => setCategory("all")}
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
                  onClick={() => setCategory(item.value)}
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
        {filteredStudios.length > 0 ? (
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
