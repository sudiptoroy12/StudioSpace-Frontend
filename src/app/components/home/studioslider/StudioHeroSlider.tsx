
"use client";

import dynamic from "next/dynamic";

const StudioHeroSliderContent = dynamic(
  () => import("./StudioHeroSliderContent"),
  {
    ssr: false,
    loading: () => (
      <section
        aria-label="Loading studio highlights"
        className="min-h-[560px] animate-pulse bg-neutral-900 sm:min-h-[620px] lg:min-h-[690px]"
      />
    ),
  },
);

export default function StudioHeroSlider() {
  return <StudioHeroSliderContent />;
}
