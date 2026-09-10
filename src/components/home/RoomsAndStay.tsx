"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { stays as staysData, stayCategories } from "@/data/stays";

// Category-specific background images and taglines
const CATEGORY_META: Record<
  string,
  { bg: string; tagline: string }
> = {
  "luxury-villas": {
    bg: "/images/mediterranean-villa.jpg",
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

    const s = staysData.find((s) => s.category === catId);
    return s?.imageUrl || "";
  }

  const activeBg = getBgImage(activeIndex);
  const activeTagline =
    CATEGORY_META[categories[activeIndex].id]?.tagline || "Tropical Escape";

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
    <section className="w-full bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[620px] lg:min-h-[720px] xl:min-h-[760px]">
        {/* Left Column: Clean White Content */}
        <div className="flex flex-col justify-center px-5 sm:px-10 md:px-14 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-24 max-w-2xl mx-auto lg:mx-0 w-full">
          {/* Main Heading: "Rooms & Stay" */}
          <h2 className="font-playfair text-neutral-900 text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-normal leading-tight tracking-tight mb-8 sm:mb-12">
            {content?.heading &&
            content.heading !== "Experience the comfort." &&
            content.heading !== "Experience the\ncomfort."
              ? content.heading
              : "Rooms & Stay"}
          </h2>

          {/* Categories Accordion */}
          <div className="space-y-6 sm:space-y-7">
            {categories.map((c, idx) => {
              const selected = idx === activeIndex;

              return (
                <div key={c.id}>
                  {selected ? (
                    <div className="animate-in fade-in duration-300">
                      {/* Active Title with Horizontal Dash Line */}
                      <div className="flex items-center gap-3.5 sm:gap-4 mb-3">
                        <div className="w-8 sm:w-10 h-px bg-neutral-400 shrink-0" />
                        <span className="font-playfair text-[#B85D26] text-2xl sm:text-[26px] md:text-[28px] font-normal tracking-normal leading-none">
                          {c.name}
                        </span>
                      </div>

                      {/* Description indented to align with title */}
                      <div className="pl-[44px] sm:pl-[54px]">
                        <p className="text-neutral-600 text-[13.5px] sm:text-[14px] font-bricolage font-light leading-relaxed max-w-[380px] sm:max-w-[420px]">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Inactive Title indented to align with active title */
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelect(idx)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") && handleSelect(idx)
                      }
                      className="pl-[44px] sm:pl-[54px] group cursor-pointer transition-colors"
                    >
                      <span className="font-playfair text-[#6f7479] group-hover:text-neutral-900 text-xl sm:text-[22px] md:text-[24px] font-normal tracking-normal transition-colors duration-200">
                        {c.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full-Height Image + Floating Glass Card */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-auto min-h-full overflow-hidden bg-neutral-900">
          {/* Previous image (fading out) */}
          {prevBgUrl && (
            <Image
              src={prevBgUrl}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
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
            alt={categories[activeIndex].name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={95}
            unoptimized={true}
            className={
              "object-cover object-center transition-opacity duration-600 " +
              (showNew ? "opacity-100" : "opacity-0")
            }
            priority
          />

          {/* Subtle soft gradient at bottom for card readability */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, transparent 40%)",
            }}
          />

          {/* Floating Glass Card (bottom-right/center) */}
          <button
            type="button"
            onClick={() =>
              router.push(`/stays?category=${categories[activeIndex].id}`)
            }
            className="absolute bottom-6 sm:bottom-12 right-4 sm:right-10 left-4 sm:left-auto min-w-0 sm:min-w-[320px] max-w-[420px] bg-black/25 hover:bg-black/35 backdrop-blur-md border border-white/25 rounded-2xl p-5 sm:p-7 text-left transition-all duration-300 cursor-pointer group shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          >
            <p className="text-white/80 text-[10px] sm:text-[11px] font-bricolage font-semibold uppercase tracking-[0.22em] mb-1.5 sm:mb-2">
              FEATURED PROPERTY
            </p>
            <h3 className="font-playfair font-normal text-white text-xl sm:text-[26px] md:text-3xl tracking-wide group-hover:text-white/95 transition-colors">
              {activeTagline}
            </h3>
          </button>
        </div>
      </div>
    </section>
  );
}
