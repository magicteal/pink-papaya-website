"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { isPreOptimizedMedia } from "@/lib/media-url";
import { DEFAULT_PLACEHOLDER } from "@/utils/image";

type Stay = {
  id: string;
  title: string;
  imageUrl: string;
  images?: string[];
  location?: string;
};

type Destination = {
  name: string;
  image: string;
  stayCount: number;
  slug: string;
};

// Hand-curated destination data with beautiful Goa images
const DESTINATION_IMAGES: Record<string, string> = {
  "Assagao": "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=800&q=80",
  "Candolim": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
  "Siolim": "https://images.unsplash.com/photo-1587922546307-776227941871?w=800&q=80",
  "Vagator": "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=800&q=80",
  "Calangute": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "Aldona": "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
  "Anjuna": "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80",
  "Morjim": "https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800&q=80",
  "Panjim": "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80",
  "Reis Magos": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
  "Marra": "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80",
  "Saipem": "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
  "Baga": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "Parra": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
};

// Map variations of location names to canonical destination names
const LOCATION_ALIASES: Record<string, string> = {
  "saipem, candolim": "Candolim",
  "saipem": "Candolim",
  "reis magos": "Reis Magos",
  "parra": "Assagao",
  "marra": "Candolim",
  "central north": "Candolim",
  "central": "Candolim",
  "corjuem, aldona": "Aldona",
  "corjuem": "Aldona",
};

function normalizeLocation(loc: string): string {
  // Strip "Near ", "Central ", area suffixes like ", North Goa"
  let name = loc
    .replace(/^near\s+/i, "")
    .replace(/,?\s*north\s+goa$/i, "")
    .replace(/,?\s*south\s+goa$/i, "")
    .replace(/,?\s*goa$/i, "")
    .replace(/,\s*$/, "") // Strip trailing comma
    .trim();
  name = name || loc;

  // Check aliases (case-insensitive)
  const alias = LOCATION_ALIASES[name.toLowerCase()];
  if (alias) return alias;

  return name;
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function TrendingDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    fetch("/api/stays")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Stay[]) => {
        // Group stays by normalized location
        const locationMap = new Map<
          string,
          { count: number; image: string }
        >();

        data.forEach((stay) => {
          const rawLoc = stay.location || "Goa";
          const normalized = normalizeLocation(rawLoc);
          const existing = locationMap.get(normalized);

          if (existing) {
            existing.count += 1;
          } else {
            // Use the stay's own image as fallback, or our curated image
            const fallbackImage =
              stay.images?.[0] || stay.imageUrl || DEFAULT_PLACEHOLDER;
            const curatedImage = DESTINATION_IMAGES[normalized];
            locationMap.set(normalized, {
              count: 1,
              image: curatedImage || fallbackImage,
            });
          }
        });

        // Convert to array and sort by stay count (most stays first)
        const dests: Destination[] = Array.from(locationMap.entries())
          .map(([name, { count, image }]) => ({
            name,
            image,
            stayCount: count,
            slug: slugify(name),
          }))
          .sort((a, b) => b.stayCount - a.stayCount)
          .slice(0, 8); // Limit to 8 destinations

        setDestinations(dests);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      // Initial check after render
      setTimeout(updateScrollButtons, 100);
      return () => el.removeEventListener("scroll", updateScrollButtons);
    }
  }, [destinations]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!loading && destinations.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-[#F9F7F4]">
      <div className="w-[90%] mx-auto">
        <Reveal>
          {/* Header Row */}
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <p className="text-[#A04415] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] font-bricolage mb-2 sm:mb-3">
                Explore
              </p>
              <h2 className="font-playfair italic font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight">
                Trending Destinations
              </h2>
            </div>

            {/* Scroll Arrows — Desktop Only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? "border-[#A04415]/30 text-[#A04415] hover:bg-[#A04415] hover:text-white hover:border-[#A04415]"
                    : "border-neutral-200 text-neutral-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? "border-[#A04415]/30 text-[#A04415] hover:bg-[#A04415] hover:text-white hover:border-[#A04415]"
                    : "border-neutral-200 text-neutral-300 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Destination Cards — Horizontal Scroll */}
          {loading ? (
            <div className="flex gap-5 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[260px] sm:w-[280px] md:w-[300px] rounded-2xl bg-neutral-200/60 animate-pulse aspect-[3/4]"
                />
              ))}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mb-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {destinations.map((dest, idx) => (
                <Link
                  key={dest.slug}
                  href={`/stays?location=${encodeURIComponent(dest.name)}`}
                  className="group shrink-0 snap-start"
                >
                  <div
                    className="relative w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] rounded-[22px] overflow-hidden bg-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500"
                    style={{
                      animationDelay: `${idx * 80}ms`,
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={dest.image}
                        alt={`${dest.name} - Goa destination`}
                        fill
                        unoptimized={isPreOptimizedMedia(dest.image)}
                        sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 300px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        {/* Location pin */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-white/80" />
                          <span className="text-white/80 text-[11px] sm:text-xs font-bricolage font-medium uppercase tracking-wider">
                            North Goa
                          </span>
                        </div>

                        {/* Destination Name */}
                        <h3 className="font-playfair text-white text-xl sm:text-2xl font-semibold leading-tight mb-2 drop-shadow-sm">
                          {dest.name}
                        </h3>

                        {/* Stay Count Pill */}
                        <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                          <span className="text-white/90 text-[11px] sm:text-xs font-bricolage font-medium">
                            {dest.stayCount}{" "}
                            {dest.stayCount === 1 ? "Stay" : "Stays"}
                          </span>
                          <ArrowRight className="w-3 h-3 text-white/70 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Reveal>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
