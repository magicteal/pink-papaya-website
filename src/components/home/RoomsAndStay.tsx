"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { stays as staysData, stayCategories } from "@/data/stays";

// Category-specific background images and taglines
const CATEGORY_META: Record<
  string,
  { bg: string; tagline: string; link?: string }
> = {
  "luxury-villas": {
    bg: "/media/curated/sempre.jpg",
    tagline: "Sempre",
    link: "https://www.airbnb.co.in/rooms/1584060007789227621?photo_id=2454055921&source_impression_id=p3_1767265086_P3SvFS47jqQMMU8s",
  },
  "walk-to-beach": {
    bg: "/media/curated/casa-sukriti.jpg",
    tagline: "Casa Sukriti",
    link: "https://www.airbnb.co.in/rooms/783630926435060967?locale=en&_set_bev_on_new_domain=1763482134_EAMGYyMTVhZmY0MG&set_everest_cookie_on_new_domain=1763482134.EAZTAwNzU1MmUzNmVkNz.uLnlvwD24MTUWL06jpQW_yqFT9cx7lzLN_nPA-m5UT8&source_impression_id=p3_1767269332_P3pajUtRCigbyD-M",
  },
  "expansive-views": {
    bg: "/media/curated/the-fieldhouse.jpg",
    tagline: "The Fieldhouse",
    link: "https://www.airbnb.co.in/rooms/1553441010980352073?source_impression_id=p3_1766430801_P3qvUxE2VYL6sjv3",
  },
  "romantic-jacuzzi-escapes": {
    bg: "/media/curated/la-amore.jpg",
    tagline: "La Amore",
    link: "https://www.airbnb.co.in/rooms/1254938866510280695?viralityEntryPoint=1&unique_share_id=617B080B-A902-4CDE-BAC0-8EB6D0AEE324&slcid=343df8497fde4101909c8020309d12ff&s=76&feature=share&set_everest_cookie_on_new_domain=1763482134.EAZTAwNzU1MmUzNmVkNz.uLnlvwD24MTUWL06jpQW_yqFT9cx7lzLN_nPA-m5UT8&adults=1&channel=native&slug=eOL7J3zY&source_impression_id=p3_1767272983_P3x56lAyS7x-_e8v",
  },
};

// Override category names for the mockup design
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "luxury-villas": "Luxury Homes",
  "walk-to-beach": "Walk to the Beach",
  "expansive-views": "Expansive Views",
  "romantic-jacuzzi-escapes": "Romantic Jacuzzi Escapes",
};

// Override descriptions for richer copy
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "luxury-villas":
    "Spacious, design-led homes made for slow mornings and sunset evenings",
  "walk-to-beach":
    "Just a stroll to the sand where comfort meets the ocean air",
  "expansive-views":
    "Wake up to sweeping views and endless horizons",
  "romantic-jacuzzi-escapes":
    "Cozy hideaways with private jacuzzis perfect for two",
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
      !customImage.includes("photo-1520250497591") &&
      !customImage.includes("photo-1578683010236") &&
      !customImage.includes("photo-1551882547") &&
      customImage !== "/images/luxury-villas.jpg" &&
      customImage !== "/images/mediterranean-villa.jpg" &&
      customImage !== "/media/curated/luxury-villas.jpg" &&
      customImage !== "/media/curated/mediterranean-villa.jpg"
    ) {
      return customImage;
    }

    const meta = CATEGORY_META[catId];
    if (meta) return meta.bg;

    const s = staysData.find((s) => s.category === catId);
    return s?.imageUrl || "";
  }

  const activeBg = getBgImage(activeIndex);
  const activeMeta = CATEGORY_META[categories[activeIndex].id];
  const activeTagline = activeMeta?.tagline || "Sempre";
  const activeLink =
    activeMeta?.link || `/stays?category=${categories[activeIndex].id}`;
  const isExternalLink = activeLink.startsWith("http");

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
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] xl:min-h-[640px]">
        {/* Left Column: Clean White Content */}
        <div className="flex flex-col justify-center px-5 sm:px-10 md:px-14 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16 max-w-2xl mx-auto lg:mx-0 w-full">
          {/* Main Heading: "Curated collections" */}
          <h2 className="font-playfair italic font-normal text-[#16323C] text-[30px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-tight tracking-tight mb-2 sm:mb-3">
            {content?.heading &&
            content.heading !== "Experience the comfort." &&
            content.heading !== "Experience the\ncomfort."
              ? content.heading
              : "Curated collections"}
          </h2>
          <p className="text-[#16323C]/70 text-[14px] sm:text-[16px] font-bricolage font-normal leading-relaxed mb-6 sm:mb-8 lg:mb-9">
            {content?.description && content.description.trim() !== ""
              ? content.description
              : "Thoughtfully chosen stays, for every kind of getaway"}
          </p>

          {/* Categories Accordion */}
          <div className="space-y-5 sm:space-y-6">
            {categories.map((c, idx) => {
              const selected = idx === activeIndex;

              return (
                <div key={c.id}>
                  {selected ? (
                    <div className="animate-in fade-in duration-300">
                      {/* Active Title without Dash Line */}
                      <div className="mb-2.5">
                        <span className="font-playfair italic text-[#C07A5A] text-2xl sm:text-[26px] md:text-[28px] font-normal tracking-normal leading-none">
                          {c.name}
                        </span>
                      </div>

                      {/* Description aligned flush */}
                      <div>
                        <p className="text-[#16323C]/75 text-[14px] sm:text-[15px] font-bricolage font-normal leading-relaxed max-w-[380px] sm:max-w-[420px]">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Inactive Title aligned flush */
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelect(idx)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") && handleSelect(idx)
                      }
                      className="py-1.5 sm:py-2 group cursor-pointer transition-colors"
                    >
                      <span className="font-playfair text-[#16323C]/60 group-hover:text-[#16323C] text-xl sm:text-[22px] md:text-[24px] font-normal tracking-normal transition-colors duration-200">
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
        <div className="relative w-full h-[440px] sm:h-[500px] lg:h-auto min-h-full overflow-hidden bg-neutral-900">
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
                "linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 45%)",
            }}
          />

          {/* Floating Glass Card (bottom-right/center) */}
          <a
            href={activeLink}
            target={isExternalLink ? "_blank" : undefined}
            rel={isExternalLink ? "noopener noreferrer" : undefined}
            className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 md:right-10 left-4 sm:left-auto min-w-0 sm:min-w-[300px] max-w-[400px] bg-black/30 hover:bg-black/45 backdrop-blur-md border border-white/25 rounded-2xl p-4 sm:p-6 text-left transition-all duration-300 cursor-pointer group shadow-[0_12px_36px_rgba(0,0,0,0.3)] block"
          >
            <p className="text-white/80 text-[10px] sm:text-[11px] font-bricolage font-semibold uppercase tracking-[0.18em] mb-1.5 sm:mb-2">
              FEATURED PROPERTY
            </p>
            <h3 className="font-playfair italic font-normal text-white text-xl sm:text-[24px] md:text-[28px] tracking-wide group-hover:text-white/95 transition-colors">
              {activeTagline}
            </h3>
          </a>
        </div>
      </div>
    </section>
  );
}
