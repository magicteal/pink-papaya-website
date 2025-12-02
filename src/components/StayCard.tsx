"use client";
import * as React from "react";
import { cn } from "@/utils/utils";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AreaIcon from "./icons/area";
import BedIcon from "./icons/bed";
import UsersIcon from "./icons/users";
import ShowerIcon from "./icons/shower";
import BreakfastIcon from "./icons/breakfast";
import PatioIcon from "./icons/patio";
import TvIcon from "./icons/tv";
import YogaIcon from "./icons/yoga";
import TeaIcon from "./icons/tea";
import Link from "next/link";
import { Button } from "./ui/button";

type StayCardProps = {
  title: string;
  imageUrl: string;
  images?: string[]; // Multiple images for carousel
  area: string; // e.g., "550 sq. ft."
  bed: string; // e.g., "1 King Bed"
  guests: string; // e.g., "2 Guests"
  pricePerNight?: string;
  location?: string;
  amenities?: string[];
  className?: string;
  href?: string;
};

const amenityIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Rain Shower": ShowerIcon,
  "Breakfast": BreakfastIcon,
  "Garden Patio": PatioIcon,
  "Smart TV": TvIcon,
  "Yoga Mat": YogaIcon,
  "Tea Set": TeaIcon,
};

function normalizePriceLabel(p?: string): string | null {
  if (!p) return null;
  const s = p.trim();
  if (!s) return null;
  const hasNight = /night/i.test(s);
  return hasNight ? `From ${s} + taxes` : `From ${s} / night + taxes`;
}

export default function StayCard({
  title,
  imageUrl,
  images,
  area,
  bed,
  guests,
  className,
  href,
  pricePerNight,
  location,
  amenities,
}: StayCardProps) {
  const priceLabel = normalizePriceLabel(pricePerNight ?? undefined);
  
  // Use images array if available, otherwise fall back to single imageUrl
  const displayImages = images && images.length > 0 ? images : [imageUrl];
  const showCarousel = displayImages.length > 1;

  // Autoplay disabled: removed autoplay plugin to turn off automatic scrolling

  const content = (
    <Card className={cn("group w-full overflow-hidden rounded-[14px] border border-neutral-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200", className)}>
      {showCarousel ? (
        <div className="relative w-full bg-neutral-200" onClick={(e) => e.stopPropagation()}>
          <Carousel 
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {displayImages.slice(0, 3).map((src, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative w-full" style={{ paddingTop: "66%" }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      data-bg={`url(${src})`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="left-2 z-20 bg-white hover:bg-white/90 border-0 shadow-md opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto h-10 w-10 rounded-full flex items-center justify-center"
            >
              <span className="text-neutral-800 font-bold text-xl leading-none">&lt;</span>
            </CarouselPrevious>
            <CarouselNext
              className="right-2 z-20 bg-white hover:bg-white/90 border-0 shadow-md opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto h-10 w-10 rounded-full flex items-center justify-center"
            >
              <span className="text-neutral-800 font-bold text-xl leading-none">&gt;</span>
            </CarouselNext>
          </Carousel>
        </div>
      ) : (
        <div className="relative w-full bg-neutral-200" style={{ paddingTop: "66%" }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            data-bg={`url(${imageUrl})`}
          />
        </div>
      )}

      <div className="border-t border-neutral-200 p-4">
        <h3 className="font-playfair text-[26px] leading-tight text-neutral-900">{title}</h3>
        <div className="mt-1 text-[#3C8A84] font-semibold">{location || "Goa"}</div>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-700">
          <div className="flex items-center gap-2">
            <AreaIcon className="h-4 w-4" />
            <span>{area}</span>
          </div>
          <div className="flex items-center gap-2">
            <BedIcon className="h-4 w-4" />
            <span>{bed}</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            <span>{guests}</span>
          </div>
        </div>

        {/* amenities row (show up to 3 with label) */}
        {(amenities && amenities.length) ? (
          <div className="mt-4 grid grid-cols-3 gap-x-3">
            {amenities.slice(0, 3).map((a) => {
              const Icon = amenityIcon[a] ?? ShowerIcon;
              return (
                <div key={a} className="flex flex-col items-center gap-1">
                  <Icon className="h-7 w-7 text-neutral-800" />
                  <div className="text-[11px] text-neutral-600 text-center leading-none">{a}</div>
                </div>
              );
            })}
          </div>
        ) : null}

        {priceLabel ? (
          <div className="mt-4 border-t pt-3 border-neutral-200 text-neutral-900 font-semibold">
            {priceLabel}
          </div>
        ) : null}

        <div className="mt-4">
          {href ? (
            <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
              <Button variant="outlineBlack" className="w-full">View Stay</Button>
            </Link>
          ) : (
            <Button variant="outlineBlack" className="w-full">View Stay</Button>
          )}
        </div>
      </div>
    </Card>
  );

  return content;
}
