"use client";

import React from "react";
import Reveal from "@/components/ui/Reveal";
import TestimonialsCarousel, {
  type TestimonialsCarouselHandle,
} from "@/components/TestimonialsCarousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialsSection({
  content,
}: {
  content?: any;
}) {
  const carouselRef = React.useRef<TestimonialsCarouselHandle>(null);

  const heading = content?.heading || "From Our Guests";
  const description =
    content?.description ||
    "Notes from those who've stayed and returned for more";

  return (
    <section className="pt-8 sm:pt-11 md:pt-12 pb-4 bg-white overflow-hidden">
      {/* Centered Editorial Header */}
      <Reveal>
        <div className="text-center max-w-xl mx-auto mb-6 md:mb-7 px-4">
          <h2 className="font-playfair italic font-normal text-2xl sm:text-3xl md:text-[34px] text-neutral-900 tracking-tight">
            {heading}
          </h2>
          <p className="mt-2.5 text-xs sm:text-[13px] text-neutral-500 font-bricolage leading-relaxed">
            {description}
          </p>
        </div>
      </Reveal>

      {/* Marquee Carousel with Infinite GSAP Animation */}
      <Reveal>
        <div className="w-full">
          <TestimonialsCarousel ref={carouselRef} className="w-full" />
        </div>
      </Reveal>

      {/* Bottom Right Navigation Arrows */}
      <Reveal>
        <div className="w-[90%] mx-auto max-w-[1400px] flex justify-end items-center gap-2.5 pt-4 md:pt-6 pr-12 sm:pr-16">
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300/80 bg-white/90 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 flex items-center justify-center text-neutral-700 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300/80 bg-white/90 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 flex items-center justify-center text-neutral-700 shadow-sm cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

