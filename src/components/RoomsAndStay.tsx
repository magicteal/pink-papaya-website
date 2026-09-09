"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { stays as staysData, stayCategories } from "@/data/stays";
import { isPreOptimizedMedia } from "@/lib/media-url";
import { ArrowRight, ExternalLink } from "lucide-react";

// Category-specific background images and taglines
const CATEGORY_META: Record<
  string,
  { bg: string; tagline: string }
> = {
  "luxury-villas": {
    bg: "/images/luxury-villas.jpg?v=5",
    tagline: "Tropical Escape",
  },
  "walk-to-beach": {
    bg: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    tagline: "Beachfront Living",
  },
  "expansive-views": {
    bg: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    tagline: "Scenic Retreat",
  },
  "romantic-jacuzzi-escapes": {
    bg: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    tagline: "Romantic Hideaway",
  },
};

// Override category names for the mockup design
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "luxury-villas": "Luxury Villas",
  "walk-to-beach": "Bed & Breakfast",
  "expansive-views": "Boutique Stays",
  "romantic-jacuzzi-escapes": "Romantic Secret Escapes",
};

// Override descriptions for richer copy
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "luxury-villas":
    "Expansive private sanctuaries featuring dedicated staff, infinity pools, and curated architectural details for the ultimate secluded escape.",
  "walk-to-beach":
    "Wake up to the sound of waves. Our beachfront stays put you steps from the shore with sunrise views and seaside charm.",
  "expansive-views":
    "Thoughtfully designed intimate spaces that blend local character with contemporary comfort for the discerning traveller.",
  "romantic-jacuzzi-escapes":
    "Hidden havens designed for two — private jacuzzis, candlelit terraces, and an atmosphere made for romance.",
};

export default function RoomsAndStay({ content }: { content?: any }) {
  const router = useRouter();
  const categories = stayCategories.slice(0, 4).map((c, idx) => ({
    ...c,
    name: content?.[`title${idx + 1}`] || CATEGORY_DISPLAY_NAMES[c.id] || c.name,
    description:
      content?.[`desc${idx + 1}`] || CATEGORY_DESCRIPTIONS[c.id] || c.description,
  }));

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [prevBgUrl, setPrevBgUrl] = React.useState<string | null>(null);
  const [showNew, setShowNew] = React.useState(true);

  function getBgImage(idx: number) {
    const catId = categories[idx].id;
    const customImage = content?.[`image${idx + 1}`];
    if (
      customImage &&
      !customImage.includes("photo-1613977257363") &&
      customImage !== "/images/luxury-villas.jpg"
    ) {
      return customImage;
    }

    const meta = CATEGORY_META[catId];
    if (meta) return meta.bg;

    // Fallback: first stay in category
    const s = staysData.find((s) => s.category === catId);
    return s?.imageUrl || "";
  }

  const activeBg = getBgImage(activeIndex);
  const activeTagline =
    CATEGORY_META[categories[activeIndex].id]?.tagline || "Curated Stay";

  function handleSelect(idx: number) {
    if (idx === activeIndex) return;
    setPrevBgUrl(getBgImage(activeIndex));
    setShowNew(false);
    setActiveIndex(idx);
    requestAnimationFrame(() => {
      setTimeout(() => setShowNew(true), 10);
    });
    setTimeout(() => setPrevBgUrl(null), 600);
  }

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950">
      {/* Background images with crossfade */}
      <div className="absolute inset-0 z-0">
        {/* Previous image (fading out) */}
        {prevBgUrl && (
          <Image
            src={prevBgUrl}
            alt=""
            fill
            sizes="100vw"
            quality={95}
            unoptimized={true}
            className={
              "object-cover object-center transition-opacity duration-600 " +
              (showNew ? "opacity-0" : "opacity-100")
            }
            priority
          />
        )}
        {/* Active image */}
        <Image
          src={activeBg}
          alt=""
          fill
          sizes="100vw"
          quality={95}
          unoptimized={true}
          className={
            "object-cover object-center transition-opacity duration-600 " +
            (showNew ? "opacity-100" : "opacity-0")
          }
          priority
        />
        {/* Balanced cinematic gradient: dark on left for text legibility, clear and vibrant on right */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,12,14,0.72) 0%, rgba(10,12,14,0.45) 42%, rgba(10,12,14,0.18) 75%, rgba(10,12,14,0.22) 100%)",
          }}
        />
        {/* Subtle vertical vignette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.30) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1552px] mx-auto px-[5%] sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-28 min-h-[520px] md:min-h-[640px] flex flex-col justify-between">
        {/* Top section: Label + Heading */}
        <div className="mb-10 md:mb-14">
          {/* "ROOMS & STAY" label with horizontal line */}
          <div className="flex items-center gap-4 mb-5 md:mb-6">
            <div className="w-8 md:w-12 h-px bg-white/50" />
            <span className="text-white/70 text-[11px] sm:text-xs font-bricolage font-medium uppercase tracking-[0.25em]">
              {content?.label || "Rooms & Stay"}
            </span>
          </div>

          {/* Main heading */}
          <h2 className="font-playfair italic font-normal text-white text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-tight max-w-lg">
            {!content?.heading ||
            content.heading === "Rooms & Stay" ||
            content.heading === "Experience the comfort." ? (
              <>
                Experience the
                <br />
                comfort.
              </>
            ) : (
              content.heading.split("\n").map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))
            )}
          </h2>
        </div>

        {/* Bottom section: Category accordion + Floating tag */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          {/* Category List */}
          <div className="w-full md:max-w-lg">
            <ul className="space-y-0">
              {categories.map((c, idx) => {
                const selected = idx === activeIndex;
                const num = String(idx + 1).padStart(2, "0");

                return (
                  <li
                    key={c.id}
                    className={
                      "border-l-2 transition-all duration-400 " +
                      (selected
                        ? "border-[#D4763A]"
                        : "border-white/15 hover:border-white/30")
                    }
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelect(idx)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        handleSelect(idx)
                      }
                      className={
                        "w-full text-left pl-5 md:pl-6 py-3.5 md:py-4 transition-all duration-300 " +
                        (selected ? "cursor-default" : "cursor-pointer group")
                      }
                    >
                      {selected ? (
                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          {/* Number + Name */}
                          <div className="flex items-baseline gap-3">
                            <span className="text-[#D4763A] text-[11px] font-bricolage font-medium tabular-nums">
                              {num}
                            </span>
                            <span className="font-playfair text-[#D4763A] text-xl sm:text-2xl md:text-[28px] font-semibold leading-tight">
                              {c.name}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-white/65 text-[13px] sm:text-sm font-bricolage leading-relaxed max-w-sm pl-0 md:pl-7">
                            {c.description}
                          </p>

                          {/* CTA Link */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/stays?category=${c.id}`);
                            }}
                            className="flex items-center gap-2 pl-0 md:pl-7 group/cta cursor-pointer"
                          >
                            <span className="text-white text-[11px] sm:text-xs font-bricolage font-semibold uppercase tracking-[0.2em] border-b border-white/30 pb-0.5 group-hover/cta:border-white/60 transition-colors">
                              Explore Collection
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover/cta:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-3 py-1">
                          <span className="text-white/35 text-[11px] font-bricolage font-medium tabular-nums">
                            {num}
                          </span>
                          <span className="font-bricolage text-white/50 text-[15px] sm:text-base md:text-lg font-medium group-hover:text-white/80 transition-colors duration-200">
                            {c.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Floating Tagline Pill (bottom-right) */}
          <button
            type="button"
            onClick={() =>
              router.push(`/stays?category=${categories[activeIndex].id}`)
            }
            className="hidden md:flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full px-6 py-3 mb-2 transition-all duration-300 cursor-pointer group"
          >
            <span className="font-playfair text-white text-lg sm:text-xl font-medium italic">
              {activeTagline}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors">
              <ExternalLink className="w-3.5 h-3.5 text-white/80 group-hover:text-white" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
