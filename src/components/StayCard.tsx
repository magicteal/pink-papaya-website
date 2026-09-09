"use client";

import * as React from "react";
import { cn } from "@/utils/utils";
import { formatPriceString } from "@/utils/formatCurrency";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Users, BedDouble, Bath, Heart, PawPrint } from "lucide-react";
import { isPreOptimizedMedia } from "@/lib/media-url";
import { DEFAULT_PLACEHOLDER } from "@/utils/image";

type StayCardProps = {
  title: string;
  imageUrl: string;
  images?: string[];
  area?: string;
  bed?: string;
  guests?: string;
  pricePerNight?: string;
  location?: string;
  className?: string;
  href?: string;
  badge?: string;
  amenities?: string[];
};

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
  badge,
}: StayCardProps) {
  const allCandidateImages = [imageUrl, ...(images ?? [])].filter(
    (s) => typeof s === "string" && s.trim() !== ""
  );
  const validImages = allCandidateImages.filter(
    (item, index) => allCandidateImages.indexOf(item) === index
  );
  const displayImages = validImages.length > 0 ? validImages : [DEFAULT_PLACEHOLDER];
  const showCarousel = displayImages.length > 1;

  const CardWrapper = href ? Link : "div";
  const cardWrapperProps = href ? { href } : {};

  // Determine badge text/icon automatically if not passed explicitly
  const defaultBadge =
    badge ||
    (title.toLowerCase().includes("villas") || title.toLowerCase().includes("tisya")
      ? "Guest Favorite"
      : title.toLowerCase().includes("lirio")
      ? "Pet Friendly"
      : null);

  // Format price value cleanly
  const rawPrice = pricePerNight ? formatPriceString(pricePerNight) : "₹8,200";

  return (
    <div
      className={cn(
        "group relative w-full rounded-[18px] sm:rounded-[20px] border border-neutral-200/90 bg-white overflow-hidden shadow-[0_3px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col justify-between max-w-md mx-auto md:max-w-none",
        className
      )}
    >
      <CardWrapper {...(cardWrapperProps as any)} className="block w-full h-full flex flex-col justify-between">
        <div>
          {/* Image & Carousel Header */}
          <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-t-[18px] sm:rounded-t-[20px]">
            {/* Badge Overlay */}
            {defaultBadge && (
              <div className="absolute top-3 left-3 z-20 bg-[#F7F2EA] text-[#A04415] px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm flex items-center gap-1.5 border border-[#EFE5D8]">
                {defaultBadge.includes("Favorite") ? (
                  <Heart className="w-3 h-3 text-[#A04415]" />
                ) : (
                  <PawPrint className="w-3 h-3 text-[#A04415]" />
                )}
                <span>{defaultBadge}</span>
              </div>
            )}

            {showCarousel ? (
              <Carousel className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent className="h-full !ml-0">
                  {displayImages.slice(0, 5).map((src, idx) => (
                    <CarouselItem
                      key={idx}
                      className="!pl-0 relative aspect-[16/11] sm:aspect-[4/3] w-full h-full overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={title?.trim() || "Pink Papaya Stay"}
                        fill
                        unoptimized={isPreOptimizedMedia(src)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 scale-[1.01] group-hover:scale-[1.03]"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 h-6.5 w-6.5 opacity-0 group-hover:opacity-100 transition-opacity border-none bg-white/90 text-neutral-900 hover:bg-white shadow-sm" />
                <CarouselNext className="right-2 h-6.5 w-6.5 opacity-0 group-hover:opacity-100 transition-opacity border-none bg-white/90 text-neutral-900 hover:bg-white shadow-sm" />
              </Carousel>
            ) : (
              <Image
                src={displayImages[0]}
                alt={title?.trim() || "Pink Papaya Stay"}
                fill
                unoptimized={isPreOptimizedMedia(displayImages[0])}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 scale-[1.01] group-hover:scale-[1.03]"
              />
            )}
          </div>

          {/* Card Body Content */}
          <div className="p-4 sm:p-5 space-y-3">
            <div>
              <h3 className="font-playfair font-bold text-xl sm:text-2xl text-[#A04415] leading-snug">
                {title}
              </h3>

              <p className="text-neutral-500 text-xs sm:text-sm font-bricolage font-normal mt-1">
                {location || "Assagao, Goa"}
              </p>
            </div>

            <div className="pt-0.5">
              <p className="text-neutral-900 font-bold text-base sm:text-lg font-bricolage">
                From {rawPrice} <span className="font-bold text-neutral-900">/ night</span>
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-bricolage font-normal mt-0.5">
                per night + taxes
              </p>
            </div>
          </div>
        </div>

        {/* Specs Pill Box Inside Card Padding */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="rounded-xl border border-neutral-200/90 bg-white py-2 px-1.5 grid grid-cols-3 divide-x divide-neutral-200/80 text-center font-bricolage shadow-none">
            <div className="flex items-center justify-center gap-1.5 px-1">
              <Users className="w-3.5 h-3.5 text-[#A04415] shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-[#A04415] truncate">
                {guests || "4 Guests"}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 px-1">
              <BedDouble className="w-3.5 h-3.5 text-[#A04415] shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-[#A04415] truncate">
                {bed || "2 Rooms"}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 px-1">
              <Bath className="w-3.5 h-3.5 text-[#A04415] shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-[#A04415] truncate">
                {area || "2 Bathrooms"}
              </span>
            </div>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}
