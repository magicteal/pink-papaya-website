"use client";

import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/Hero";

export default function HomeHero() {
  return (
    <Reveal>
      <Hero
        backgroundUrl="/images/hotel.svg"
        title="Stay where every moment feels like a mood"
        description="Handpicked homes made for unforgettable getaways"
        titleSize="sm"
        align="center"
        buttonPlacement="below"
        ctaLabel="Explore"
        ctaVariant="white"
        tone="dark"
      />
    </Reveal>
  );
}
