"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import StayCard from "@/components/StayCard";
import { ArrowRight } from "lucide-react";

type Stay = {
  id: string;
  title: string;
  imageUrl: string;
  area: string;
  bed: string;
  guests: string;
  pricePerNight?: string;
  location?: string;
  images?: string[];
  featuredOnHome?: boolean;
};

export default function ExploreStaysGrid({
  content,
}: {
  content?: { heading?: string; description?: string };
}) {
  const router = useRouter();
  const [stays, setStays] = useState<Stay[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stays")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Stay[]) => {
        const featured = data.filter((s) => s.featuredOnHome !== false);
        setStays(featured.length > 0 ? featured : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Display 3 cards initially, expand to 6 when showAll is true
  const visibleStays = showAll ? stays.slice(0, 6) : stays.slice(0, 3);

  return (
    <section id="explore" className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="w-[90%] mx-auto">
        <Reveal>
          {/* Header Row: Title on Left, VIEW ALL -> on Right */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h2 className="font-playfair italic font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight">
              {content?.heading || "Explore Stays"}
            </h2>

            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="text-[#8F350A] hover:text-[#6E2806] font-semibold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>{showAll ? "SHOW LESS" : "VIEW ALL"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Cards Grid — spans the same left/right edges as the header row above it
              (both live in the same w-[90%] container, no separate inner max-width),
              so the first card starts flush under the "E" of the heading instead of
              being centered narrower with its own margin. */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-neutral-100 animate-pulse aspect-[4/3]"
                />
              ))}
            </div>
          ) : visibleStays.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {visibleStays.map((s) => (
                <StayCard
                  key={s.id}
                  title={s.title}
                  imageUrl={s.imageUrl}
                  images={s.images}
                  area={s.area}
                  bed={s.bed}
                  guests={s.guests}
                  pricePerNight={s.pricePerNight}
                  location={s.location}
                  href={`/stays/${s.id}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-500 py-10">No stays available right now.</p>
          )}

          {/* Bottom "EXPLORE MORE STAYS" Button (Appears when expanded) */}
          {showAll && (
            <div className="mt-10 sm:mt-14 flex justify-center animate-in fade-in duration-300">
              <Link href="/stays">
                <button
                  type="button"
                  className="bg-[#9E3B09] hover:bg-[#802F07] active:scale-95 text-white font-semibold text-xs sm:text-sm uppercase tracking-widest px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
                >
                  <span>Explore More Stays</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
