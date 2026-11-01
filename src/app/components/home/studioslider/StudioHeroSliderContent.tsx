
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
    eyebrow: "YOUR SPACE. YOUR CREATIVE JOURNEY.",
    title: "Find the perfect space to create.",
    description:
      "Discover inspiring studios for photography, filmmaking, podcasts, and everything your creativity imagines.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=90",
    alt: "Bright, modern creative workspace",
    accent: "Spaces that inspire.",
    highlight: "create",
  },
  {
    id: 2,
    eyebrow: "MAKE EVERY FRAME COUNT.",
    title: "Bring your creative vision to life.",
    description:
      "From professional photography studios to cinematic production spaces, find the right setting for your next big idea.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2400&q=90",
    alt: "Creative photography and video production setup",
    accent: "Create without limits.",
    highlight: "vision",
  },
  {
    id: 3,
    eyebrow: "TURN YOUR SPACE INTO OPPORTUNITY.",
    title: "Your studio deserves to be discovered.",
    description:
      "List your creative space, connect with passionate creators, and turn available hours into new opportunities.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=90",
    alt: "Contemporary creative workspace",
    accent: "Share your space.",
    highlight: "discovered",
  },
];

export default function StudioHeroSliderContent() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      aria-label="Discover creative studios"
      className="relative overflow-hidden bg-neutral-950"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
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
            <div className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[690px]">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Image overlays */}
              <div className="absolute inset-0 bg-neutral-950/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-neutral-950/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/10" />

              {/* Decorative glow */}
              <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-violet-600/20 blur-[120px]" />

              {/* Slide content */}
              <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-24 sm:min-h-[620px] sm:px-8 lg:min-h-[690px] lg:px-12">
                <div className="max-w-3xl">
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-violet-200 backdrop-blur-md sm:text-sm">
                    <Sparkles size={16} aria-hidden="true" />
                    <span>{slide.eyebrow}</span>
                  </div>

                  <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {slide.title.split(" ").map((word, index) => {
                      const normalizedWord = word
                        .toLowerCase()
                        .replace(/[.,!?]/g, "");

                      return (
                        <span
                          key={`${slide.id}-${index}`}
                          className={
                            normalizedWord === slide.highlight
                              ? "text-violet-400"
                              : undefined
                          }
                        >
                          {word}{" "}
                        </span>
                      );
                    })}
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-200 sm:text-lg">
                    {slide.description}
                  </p>

                  {/* CTA buttons */}
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/studios"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:text-base"
                    >
                      Explore Studios
                      <ArrowRight
                        size={19}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      href="/studios/new"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-base"
                    >
                      Host Your Space
                      <ArrowUpRight
                        size={19}
                        aria-hidden="true"
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>

                  <div className="mt-10 flex items-center gap-3 text-sm text-neutral-300">
                    <span className="h-px w-10 bg-violet-400" />
                    <span>{slide.accent}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20">
        <div className="mx-auto flex max-w-7xl justify-end gap-2 px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:border-violet-400 hover:bg-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:border-violet-400 hover:bg-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
