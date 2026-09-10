"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { isPreOptimizedMedia } from "@/lib/media-url";

export default function LeisureHighlights({ content }: { content?: any }) {
  const heading = content?.heading || "Leisure Highlights";
  const bannerDescription =
    content?.description &&
    content.description !== "Unwind and relax." &&
    content.description !==
      "Curated experiences designed to slow time. Discover our collection of quiet moments, architectural elegance, and unparalleled serenity." &&
    content.description !== ""
      ? content.description
      : "Our concierges are local curators, ready to craft bespoke itineraries that bypass the typical tourist trails and immerse you in authentic culture.";

  const title1 =
    content?.title1 && content.title1 !== "Always there, never in the way"
      ? content.title1
      : "Sunsets down, served by the sea";

  const desc1 =
    content?.desc1 ||
    "Experience culinary artistry as the sun dips below the horizon. Our curated evening dining brings the finest local ingredients to your table, accompanied by the gentle sound of waves.";

  const image1 = content?.image1 || "/images/leisure/sunsets-down.jpg?v=2";

  const title2 =
    content?.title2 && content.title2 !== "Wheels for every mood"
      ? content.title2
      : "A look into every sunset";

  const desc2 =
    content?.desc2 ||
    "Each property is architecturally aligned to capture the golden hour. Unwind in spacious, minimalist comfort while nature puts on its daily masterpiece just outside your window.";

  const image2 =
    content?.image2 || "/images/leisure/a-look-into-every-sunset.jpg?v=2";

  const bannerImage =
    content?.bannerImage ||
    content?.image3 ||
    "/images/leisure/care-guidebooks.jpg?v=2";

  return (
    <section className="relative w-full bg-[#1C1B1A]">
      {/* 
        PARALLAX STACKING CARDS EFFECT
        Layer 1: Hero Banner (sticky top-0, z-10) -> Locks in place when it enters viewport
        Layer 2: Row 1 (sticky top-0, z-20) -> Scrolls up on top of Layer 1 with drop shadow
        Layer 3: Row 2 (sticky top-0, z-30) -> Scrolls up on top of Layer 2 with drop shadow
      */}

      {/* Layer 1: Top Hero Banner (Locks at top-0, z-10) */}
      <div className="sticky top-0 z-10 h-[100dvh] min-h-[540px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-10 bg-neutral-950">
        {/* Photographic Backdrop */}
        <Image
          src={bannerImage}
          alt={heading}
          fill
          sizes="100vw"
          unoptimized={isPreOptimizedMedia(bannerImage)}
          className="object-cover object-center"
          priority
        />
        {/* Dark Vignette Overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-neutral-950/75 backdrop-blur-[1px]"
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <Reveal y={20}>
            <h2 className="font-playfair italic font-normal text-white text-3xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] tracking-tight leading-tight px-2">
              {heading}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.12}>
            <p className="mt-3.5 sm:mt-5 md:mt-6 text-neutral-200/90 text-xs sm:text-sm md:text-base lg:text-lg font-bricolage font-light leading-relaxed max-w-xl px-4 sm:px-0">
              {bannerDescription}
            </p>
          </Reveal>

          {/* Subtle scroll cue */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex items-center gap-2 text-white/50 text-[10px] sm:text-[11px] font-bricolage tracking-[0.22em] uppercase">
            <span>Scroll to explore</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* Layer 2: Row 1 - Sunsets Down (Sticky top-0, z-20, slides up on top of Layer 1) */}
      <div className="sticky top-0 z-20 h-[100dvh] min-h-[540px] w-full overflow-hidden shadow-[0_-30px_70px_rgba(0,0,0,0.9)] border-t border-white/10 bg-[#1C1B1A]">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 h-full w-full">
          {/* Left Column: Dark Text Card */}
          <div className="bg-[#232220] text-white flex flex-col justify-center items-center text-center p-5 sm:p-8 md:p-12 lg:p-18 xl:p-24 h-full border-b md:border-b-0 md:border-r border-white/5">
            <Reveal y={20}>
              <h3 className="font-playfair italic font-normal text-xl sm:text-2xl md:text-[36px] lg:text-[44px] xl:text-[48px] text-white leading-snug max-w-lg mx-auto px-2">
                {title1}
              </h3>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-2.5 sm:mt-4 md:mt-6 text-neutral-300 text-xs sm:text-sm md:text-[15px] font-bricolage font-light leading-relaxed max-w-[440px] mx-auto px-2">
                {desc1}
              </p>
            </Reveal>
          </div>

          {/* Right Column: Full-Bleed Image Card */}
          <div className="relative w-full h-full overflow-hidden bg-neutral-900 group">
            <Image
              src={image1}
              alt={title1}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={isPreOptimizedMedia(image1)}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"
            />
          </div>
        </div>
      </div>

      {/* Layer 3: Row 2 - Every Sunset (Sticky top-0, z-30, slides up on top of Layer 2) */}
      <div className="sticky top-0 z-30 h-[100dvh] min-h-[540px] w-full overflow-hidden shadow-[0_-30px_70px_rgba(0,0,0,0.9)] border-t border-white/10 bg-[#1C1B1A]">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 h-full w-full">
          {/* Left Column: Full-Bleed Image Card (desktop left, mobile bottom) */}
          <div className="order-2 md:order-1 relative w-full h-full overflow-hidden bg-neutral-900 group">
            <Image
              src={image2}
              alt={title2}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={isPreOptimizedMedia(image2)}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"
            />
          </div>

          {/* Right Column: Dark Text Card (desktop right, mobile top) */}
          <div className="order-1 md:order-2 bg-[#232220] text-white flex flex-col justify-center items-center text-center p-5 sm:p-8 md:p-12 lg:p-18 xl:p-24 h-full border-b md:border-b-0 md:border-l border-white/5">
            <Reveal y={20}>
              <h3 className="font-playfair italic font-normal text-xl sm:text-2xl md:text-[36px] lg:text-[44px] xl:text-[48px] text-white leading-snug max-w-lg mx-auto px-2">
                {title2}
              </h3>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-2.5 sm:mt-4 md:mt-6 text-neutral-300 text-xs sm:text-sm md:text-[15px] font-bricolage font-light leading-relaxed max-w-[440px] mx-auto px-2">
                {desc2}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
