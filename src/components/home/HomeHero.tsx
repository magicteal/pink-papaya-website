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

  return (
    <section className={`pt-24 sm:pt-28 md:pt-32 px-0 bg-white ${className || ""}`}>
      {/* Hero Rounded Container */}
      <div className="relative w-[90%] mx-auto rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden min-h-[440px] sm:min-h-[500px] md:min-h-[560px] flex flex-col justify-center items-center text-center px-6 sm:px-12 py-16 shadow-lg bg-neutral-900">
        {/* Background Image */}
        <Image
          src={bgUrl}
          alt="Luxury Villa Background"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
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
        <div className="relative z-20 max-w-3xl flex flex-col items-center">
          <h1 className="font-playfair italic font-normal text-white text-3xl sm:text-5xl md:text-6xl leading-[1.18] tracking-tight drop-shadow-md">
            {title}
          </h1>

          <p className="font-bricolage font-light text-white/95 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-xl leading-relaxed drop-shadow-sm">
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
