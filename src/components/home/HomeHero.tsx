"use client";

import Image from "next/image";
import HeroSearchBar from "@/components/home/HeroSearchBar";

type Props = {
  content?: {
    title?: string;
    description?: string;
    ctaLabel?: string;
    backgroundUrl?: string;
  };
  showSearchBar?: boolean;
  className?: string;
};

const DEFAULT_HERO_BG =
  "https://a0.muscache.com/im/pictures/miso/Hosting-1419275858453353813/original/8640d142-0953-47f0-848b-a37f413adce1.jpeg";

export default function HomeHero({
  content,
  showSearchBar = true,
  className,
}: Props) {
  const bgUrl = content?.backgroundUrl || DEFAULT_HERO_BG;
  const title = content?.title || "Stay where every moment feels like a mood";
  const description =
    content?.description || "Curated vacation homes made for unforgettable getaways.";

  // The side gutter is a fixed px value rather than a %, so the inset is identical
  // on every landscape width (1280 → 2560) instead of growing with the viewport.
  // Navbar uses the same px-4/sm:px-5/lg:px-7 scale so both share one edge.
  //
  // From lg up the whole block is exactly one viewport tall and the hero card takes
  // the leftover space (lg:flex-1), so navbar + hero + search bar always land on the
  // first screen whatever the height. lg:min-h-[420px] keeps the copy from being
  // squeezed on very short landscape screens — below that the page scrolls a little
  // rather than clipping the headline.
  return (
    <section
      className={`pt-24 sm:pt-28 md:pt-32 px-4 sm:px-5 lg:px-7 bg-white lg:h-[100dvh] lg:flex lg:flex-col ${className || ""}`}
    >
      {/* Hero Rounded Container */}
      <div className="relative w-full mx-auto rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[420px] lg:flex-1 flex flex-col justify-center items-center text-center px-6 sm:px-12 py-16 shadow-lg bg-neutral-900">
        {/* Background Image */}
        <Image
          src={bgUrl}
          alt="Luxury Villa Background"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="pointer-events-none absolute inset-0 object-cover object-center z-0"
        />

        {/* Gradient Overlay for Text Readability */}
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,15,0.40) 0%, rgba(15,15,15,0.25) 50%, rgba(15,15,15,0.55) 100%)",
          }}
        />

        {/* Content */}
        {/* Type and measure scale with the viewport so the headline keeps the same
            proportion to the hero on a 1280 laptop and a 2560 monitor alike. */}
        <div className="relative z-20 max-w-3xl xl:max-w-4xl 2xl:max-w-5xl flex flex-col items-center">
          <h1 className="font-playfair italic font-normal text-white text-3xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.18] tracking-tight drop-shadow-md">
            {title}
          </h1>

          <p className="font-bricolage font-light text-white/95 text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl mt-3 sm:mt-4 xl:mt-6 max-w-xl xl:max-w-2xl leading-relaxed drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>

      {/* Floating Notched Booking Search Bar */}
      {showSearchBar ? (
        <HeroSearchBar />
      ) : (
        <div className="mb-8 sm:mb-12" />
      )}
    </section>
  );
}
