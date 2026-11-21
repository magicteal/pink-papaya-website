"use client";

import { useEffect, useRef } from "react";

type Props = {
  content?: {
    title?: string;
    description?: string;
    badge?: string;
    videoUrl?: string;
    posterUrl?: string;
  };
  className?: string;
};

const DEFAULT_VIDEO = "/media/videos/about-hero.mp4";
const FALLBACK_VIDEO = "https://assets.mixkit.co/videos/4196/4196-720.mp4";
const DEFAULT_POSTER = "/media/about/about-curated-home.jpg";

export default function HeroSection({ content, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video attempts to play smoothly on all browsers
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: poster remains visible
      });
    }
  }, []);

  const badge = content?.badge || "Our Story & Essence";
  const title = content?.title || "About Pink Papaya Stays";
  const description =
    content?.description ||
    "Architectural sanctuaries designed for the modern wanderer. We blend the warmth of home with the precision of a gallery.";

  const videoSrc = content?.videoUrl || DEFAULT_VIDEO;
  const posterSrc = content?.posterUrl || DEFAULT_POSTER;

  return (
    <section
      className={`pt-20 sm:pt-22 md:pt-[92px] lg:pt-[92px] px-4 sm:px-5 lg:px-7 bg-white lg:h-[100dvh] lg:flex lg:flex-col pb-4 sm:pb-6 lg:pb-8 ${className || ""}`}
    >
      {/* Hero Rounded Container — Identical layout and framing to HomePage Hero */}
      <div className="relative w-full mx-auto rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[420px] lg:flex-1 flex flex-col justify-center items-center text-center px-6 sm:px-12 py-16 shadow-lg bg-neutral-900">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center z-0"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={FALLBACK_VIDEO} type="video/mp4" />
        </video>

        {/* Gradient Overlay for Text Readability — Matches HomePage Hero */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,15,0.45) 0%, rgba(15,15,15,0.30) 50%, rgba(15,15,15,0.60) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-20 max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col items-center">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0A88F] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 font-bricolage">
                {badge}
              </span>
            </div>
          )}

          <h1 className="font-playfair italic font-normal text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[68px] leading-[1.16] tracking-tight drop-shadow-md">
            {title}
          </h1>

          <p className="font-bricolage font-light text-white/95 text-xs sm:text-sm md:text-base lg:text-lg mt-3 sm:mt-5 max-w-lg lg:max-w-xl leading-relaxed drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
