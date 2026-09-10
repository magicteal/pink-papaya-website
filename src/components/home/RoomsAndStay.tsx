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
    bg: "/images/luxury-villas.jpg?v=6",
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
        {/* Balanced cinematic gradient matching reference design */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(12, 14, 16, 0.86) 0%, rgba(12, 14, 16, 0.68) 38%, rgba(12, 14, 16, 0.26) 72%, rgba(12, 14, 16, 0.30) 100%)",
          }}
        />
        {/* Subtle vertical vignette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, transparent 28%, transparent 72%, rgba(0, 0, 0, 0.45) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1552px] mx-auto px-[5%] sm:px-8 md:px-14 lg:px-20 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-16 w-full">
          {/* Left Column: Heading + Category Accordion */}
          <div className="w-full max-w-[560px] lg:max-w-[620px]">
            {/* Top section: Label + Heading */}
            <div className="mb-9 sm:mb-11">
              {/* "ROOMS & STAY" label */}
              <div className="mb-4 sm:mb-5">
                <span className="text-white/80 text-[10.5px] sm:text-[11.5px] font-bricolage font-semibold uppercase tracking-[0.25em]">
                  {content?.label || "Rooms & Stay"}
                </span>
              </div>

              {/* Main heading: Upright Roman serif (not italic) with period */}
              <h2 className="font-playfair font-normal text-white text-[38px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-tight">
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

            {/* Category Accordion List with Horizontal Dividers */}
            <div className="w-full">
              <div className="space-y-0">
                {categories.map((c, idx) => {
                  const selected = idx === activeIndex;
                  const num = String(idx + 1).padStart(2, "0");

                  return (
                    <div key={c.id}>
                      {/* Divider line before item (items 02, 03, 04) */}
                      {idx > 0 && <div className="h-px bg-white/18 w-full" />}

                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelect(idx)}
                        onKeyDown={(e) =>
                          (e.key === "Enter" || e.key === " ") &&
                          handleSelect(idx)
                        }
                        className={
                          "w-full text-left py-4 sm:py-4.5 transition-all duration-300 relative " +
                          (selected ? "cursor-default" : "cursor-pointer group")
                        }
                      >
                        {selected ? (
                          <div className="relative pl-6 sm:pl-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Left orange accent bar: strictly on active item, full height */}
                            <div className="absolute left-0 top-0.5 bottom-0.5 w-[2.5px] bg-[#D4763A] rounded-full" />

                            {/* Number + Title */}
                            <div className="flex items-baseline gap-3.5">
                              <span className="text-[#D4763A] text-xs sm:text-[13px] font-bricolage font-medium tabular-nums">
                                {num}
                              </span>
                              <span className="font-playfair text-[#D4763A] text-2xl sm:text-[26px] md:text-[28px] font-normal tracking-normal leading-none">
                                {c.name}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-white/75 text-[13px] sm:text-[13.5px] font-bricolage font-light leading-relaxed mt-3 mb-4 max-w-[440px]">
                              {c.description}
                            </p>

                            {/* Underlined Explore Collection CTA */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/stays?category=${c.id}`);
                              }}
                              className="inline-flex items-center gap-2 group/cta cursor-pointer"
                            >
                              <span className="text-white text-[11px] sm:text-xs font-bricolage font-semibold uppercase tracking-[0.2em] border-b border-white pb-0.5 group-hover/cta:border-white/70 transition-colors">
                                EXPLORE COLLECTION
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-white group-hover/cta:translate-x-1 transition-transform duration-200" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-3.5 pl-6 sm:pl-7 group">
                            <span className="text-white/45 text-xs sm:text-[13px] font-bricolage font-medium tabular-nums group-hover:text-white/70 transition-colors">
                              {num}
                            </span>
                            <span className="font-playfair text-white/75 group-hover:text-white text-xl sm:text-[22px] md:text-[24px] font-normal tracking-tight transition-colors duration-200">
                              {c.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Floating Tagline Pill (bottom-right) */}
          <button
            type="button"
            onClick={() =>
              router.push(`/stays?category=${categories[activeIndex].id}`)
            }
            className="hidden md:flex items-center gap-4 bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 rounded-full px-7 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 cursor-pointer group shadow-[0_8px_32px_rgba(0,0,0,0.5)] self-end lg:mb-2 shrink-0"
          >
            <span className="font-playfair text-white text-2xl sm:text-[28px] md:text-[32px] font-normal tracking-wide">
              {activeTagline}
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 group-hover:border-white/60 flex items-center justify-center transition-colors">
              <ExternalLink className="w-4 h-4 text-white/90 group-hover:text-white" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
