
"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./StudioHeroSlider.css";

const slides = [
  {
    id: 1,
    eyebrow: "A SPACE FOR EVERY CREATIVE",
    title: "Where your next big idea takes shape.",
    description:
      "Discover inspiring spaces built for photography, filmmaking, podcasts, and everything in between.",
    image:
      "/StudioSpace Interior.png",
    alt: "Luxury cinematic studio interior with elegant furniture and warm lighting",
    highlight: "big idea",
    number: "01",
  },
  {
    id: 2,
    eyebrow: "CREATE SOMETHING REMARKABLE",
    title: "Your vision deserves the perfect space.",
    description:
      "From professional photography studios to cinematic production spaces, find a place that brings your vision to life.",
    image:
      "https://areliaspace.com/images/Home%20Page/hero-specialties/hero-landing.webp",
    alt: "Premium interior with a dramatic staircase and refined architectural lighting",
    highlight: "perfect space",
    number: "02",
  },
  {
    id: 3,
    eyebrow: "GIVE YOUR SPACE A PURPOSE",
    title: "Turn your creative space into opportunity.",
    description:
      "Share your studio with passionate creators, grow your reach, and make every available hour count.",
    image:
      "https://www.nesab.net/images/phases/phase4/phase-main.png",
    alt: "Elegant contemporary interior with warm natural light and luxury furnishings",
    highlight: "opportunity",
    number: "03",
  },
];

export default function StudioHeroSliderContent() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      aria-label="Discover creative studios"
      className="relative isolate overflow-hidden bg-[#160F1D]"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1000}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="studio-hero-swiper"
      >
        {slides.map((slide, slideIndex) => (
          <SwiperSlide key={slide.id}>
            <div className="relative min-h-[650px] sm:min-h-[690px] lg:min-h-[760px]">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                quality={95}
                className="object-cover object-center"
              />

              {/* Soft cinematic plum gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#160F1D]/85 via-[#211629]/55 to-[#211629]/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160F1D]/65 via-transparent to-[#160F1D]/10" />

              {/* Subtle ambient lighting */}
              <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#A78BBA]/10 blur-[130px]" />
              <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#D6B98C]/10 blur-[120px]" />

              {/* Main content */}
              <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center  pb-28 pt-24 sm:min-h-[690px]  lg:min-h-[760px] px-4 sm:px-6 lg:px-8 ">
                <div className="w-full max-w-4xl">
                  {/* Top badge */}
                  <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#D6B98C]/35 bg-[#211629]/35 px-4 py-2.5 backdrop-blur-md">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D6B98C]/15">
                      <Sparkles
                        size={15}
                        className="text-[#D6B98C]"
                      />
                    </span>

                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#E8D4B2] sm:text-xs">
                      {slide.eyebrow}
                    </span>
                  </div>

                  {/* Main heading */}
                  <h1 className="max-w-4xl text-[clamp(2.7rem,7vw,5.8rem)] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#F7F1E8]">
                    {slide.title.split(" ").map((word, index, words) => {
                      const normalized = word
                        .toLowerCase()
                        .replace(/[.,!?]/g, "");

                      const highlightedWords =
                        slide.highlight.split(" ");

                      const isHighlighted =
                        highlightedWords.includes(normalized);

                      return (
                        <span
                          key={`${slide.id}-${index}`}
                          className={
                            isHighlighted
                              ? "text-[#D6B98C]"
                              : undefined
                          }
                        >
                          {word}
                          {index !== words.length - 1 ? " " : ""}
                        </span>
                      );
                    })}
                  </h1>

                  {/* Description */}
                  <p className="mt-7 max-w-2xl text-sm leading-7 text-[#F7F1E8]/90 sm:text-base sm:leading-8 lg:text-lg">
                    {slide.description}
                  </p>

                  {/* Action buttons */}
                  <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link
                      href="/studios"
                      className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#D6B98C] px-7 py-4 text-sm font-bold text-[#211629] shadow-[0_12px_40px_rgba(214,185,140,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8D4B2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B98C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211629] sm:text-base"
                    >
                      Explore Studios
                      <ArrowRight
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      href="/add-studios"
                      className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#F7F1E8]/40 bg-[#F7F1E8]/10 px-7 py-4 text-sm font-semibold text-[#F7F1E8] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D6B98C]/70 hover:bg-[#39243F]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B98C] sm:text-base"
                    >
                      List Your Studio
                      <ArrowUpRight
                        size={19}
                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  {/* Bottom tagline */}
                  <div className="mt-12 flex items-center gap-4">
                    <div className="h-px w-12 bg-[#D6B98C]" />
                    <span className="text-xs font-medium tracking-widest text-[#E8D4B2] sm:text-sm">
                      {slide.number} / 03
                    </span>
                    <span className="text-xs text-[#F7F1E8]/70 sm:text-sm">
                      {slideIndex === 0
                        ? "Spaces that inspire."
                        : slideIndex === 1
                          ? "Create without limits."
                          : "Share your space."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider navigation */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-5 sm:px-8 lg:px-12">
          <div className="ml-auto flex gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D6B98C]/35 bg-[#211629]/55 text-[#F7F1E8] backdrop-blur-xl transition-all duration-300 hover:border-[#D6B98C] hover:bg-[#39243F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B98C]"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D6B98C]/35 bg-[#211629]/55 text-[#F7F1E8] backdrop-blur-xl transition-all duration-300 hover:border-[#D6B98C] hover:bg-[#39243F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B98C]"
            >
              <ChevronRight size={21} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
