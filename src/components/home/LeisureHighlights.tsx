"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { isPreOptimizedMedia } from "@/lib/media-url";

const DEFAULT_ITEMS = [
  {
    img: "/images/leisure/sunsets-down.jpg?v=2",
    title: "Sunsets down, served by the sea",
  },
  {
    img: "/images/leisure/a-look-into-every-sunset.jpg?v=2",
    title: "A look into every sunset",
  },
  {
    img: "/images/leisure/care-guidebooks.jpg?v=2",
    title: "Care, beyond the guidebooks",
  },
];

export default function LeisureHighlights({ content }: { content?: any }) {
  const items = [
    {
      img: content?.image1 || DEFAULT_ITEMS[0].img,
      title:
        content?.title1 && content.title1 !== "Always there, never in the way"
          ? content.title1
          : DEFAULT_ITEMS[0].title,
    },
    {
      img: content?.image2 || DEFAULT_ITEMS[1].img,
      title:
        content?.title2 && content.title2 !== "Wheels for every mood"
          ? content.title2
          : DEFAULT_ITEMS[1].title,
    },
    {
      img: content?.image3 || DEFAULT_ITEMS[2].img,
      title:
        content?.title3 && content.title3 !== "Goa, beyond the guidebooks"
          ? content.title3
          : DEFAULT_ITEMS[2].title,
    },
  ];

  const tagline = content?.tagline || "UNWIND WITH US";
  const heading = content?.heading || "Leisure Highlights";
  const description =
    content?.description &&
    content.description !== "Unwind and relax." &&
    content.description !== ""
      ? content.description
      : "Curated experiences designed to slow time. Discover our collection of quiet moments, architectural elegance, and unparalleled serenity.";

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#FAF8F5]">
      <div className="w-[90%] mx-auto max-w-[1552px]">
        <Reveal>
          {/* Header Row: Left title + Right description, separated by bottom border */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 md:pb-8 border-b border-neutral-200">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-neutral-800 uppercase font-bricolage mb-2 sm:mb-3">
                {tagline}
              </p>
              <h2 className="font-playfair italic font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-neutral-900 tracking-tight leading-[1.1]">
                {heading}
              </h2>
            </div>
            <p className="max-w-md text-neutral-600 text-xs sm:text-[13px] md:text-sm leading-relaxed font-bricolage md:text-left">
              {description}
            </p>
          </div>
        </Reveal>

        {/* 3 Columns Grid — Center Card Offset (Staggered Editorial Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-10 sm:pt-14 items-start">
          {items.map((item, idx) => {
            const isMiddle = idx === 1;

            return (
              <Reveal key={idx}>
                <div
                  className={`w-full group ${
                    isMiddle ? "md:mt-10 lg:mt-14" : ""
                  }`}
                >
                  {/* Image Container — Sharp clean editorial corners */}
                  <div
                    className={`relative w-full overflow-hidden bg-neutral-100 ${
                      isMiddle
                        ? "aspect-[3/4] md:aspect-[4/5.5]"
                        : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={isPreOptimizedMedia(item.img)}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Title Below Image */}
                  <h3 className="font-playfair text-xl sm:text-2xl text-neutral-900 font-normal leading-snug mt-5 tracking-normal">
                    {item.title}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
