"use client";

import { useState } from "react";
import { AmenityIcon, parseAmenity } from "@/lib/amenityIcons";

const INITIAL_SHOW = 24;

export default function AmenitiesSection({
  amenities = [],
}: {
  amenities?: (string | { name?: string; icon?: string })[];
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? amenities : amenities.slice(0, INITIAL_SHOW);
  const hasMore = amenities.length > INITIAL_SHOW;

  return (
    <section className="py-6 md:py-[5%]">
      <p className="font-bricolage text-[11px] uppercase tracking-[0.14em] text-[#C07A5A] mb-3">
        What&apos;s included
      </p>
      <h2 className="font-playfair text-3xl md:text-4xl text-[#16323C] mb-10">
        Amenities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">
        {visible.map((item, idx) => {
          const parsed = parseAmenity(item);
          return (
            <div key={idx} className="flex items-center gap-3.5 group">
              <div className="w-9 h-9 rounded-[10px] bg-[#F7F2EA] flex items-center justify-center text-[#C07A5A] group-hover:bg-[#16323C] group-hover:text-white transition-all duration-200 shrink-0">
                <AmenityIcon icon={parsed.icon} fallback="Check" className="h-4 w-4" />
              </div>
              <span className="font-bricolage text-[13.5px] text-neutral-700">{parsed.name}</span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-8 inline-block cursor-pointer font-bricolage text-[13.5px] font-medium text-[#16323C] border-b border-[#16323C]/30 pb-px hover:border-[#16323C] hover:text-[#C07A5A] transition-colors"
        >
          {showAll ? "Show less" : `View all ${amenities.length} amenities`}
        </button>
      )}
    </section>
  );
}
