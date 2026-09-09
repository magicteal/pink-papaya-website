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
    <section className="py-16 sm:py-20 md:py-28 bg-[#FAF8F5] overflow-hidden">
      {/* Centered Editorial Header */}
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-4">
          <h2 className="font-playfair italic font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-[13px] sm:text-sm text-neutral-500 font-bricolage leading-relaxed">
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
        <div className="w-[90%] mx-auto max-w-[1552px] flex justify-end items-center gap-3 pt-6 md:pt-8 pr-16 sm:pr-20">
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-neutral-300/80 bg-white/90 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 flex items-center justify-center text-neutral-700 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-neutral-300/80 bg-white/90 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 flex items-center justify-center text-neutral-700 shadow-sm cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

