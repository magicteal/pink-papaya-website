"use client";

import * as React from "react";
import gsap from "gsap";
import FeedbackCard from "./FeedbackCard";
import { feedback as feedbackData } from "@/data/feedback";

export type TestimonialsCarouselHandle = {
  prev: () => void;
  next: () => void;
};

const TestimonialsCarousel = React.forwardRef<
  TestimonialsCarouselHandle,
  { className?: string }
>(function TestimonialsCarousel({ className }, ref) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const tweenRef = React.useRef<gsap.core.Tween | null>(null);
  const isInteractingRef = React.useRef(false);
  const resumeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // 4 sets of feedback data ensures infinite continuous marquee on any viewport
  const items = React.useMemo(
    () => [
      ...feedbackData,
      ...feedbackData,
      ...feedbackData,
      ...feedbackData,
    ],
    []
  );

  const getStepDistance = () => {
    if (!marqueeRef.current) return 440;
    const firstChild = marqueeRef.current.firstElementChild as HTMLElement | null;
    if (!firstChild) return 440;
    // card width + 32px gap
    return firstChild.offsetWidth + 32;
  };

  const scheduleResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      tweenRef.current?.play();
    }, 2800);
  };

  React.useImperativeHandle(ref, () => ({
    prev: () => {
      if (!marqueeRef.current) return;
      tweenRef.current?.pause();
      isInteractingRef.current = true;
      const step = getStepDistance();
      gsap.to(marqueeRef.current, {
        x: `+=${step}`,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          scheduleResume();
        },
      });
    },
    next: () => {
      if (!marqueeRef.current) return;
      tweenRef.current?.pause();
      isInteractingRef.current = true;
      const step = getStepDistance();
      gsap.to(marqueeRef.current, {
        x: `-=${step}`,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          scheduleResume();
        },
      });
    },
  }));

  React.useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    // 1 loop period is half of the 4-repeated dataset
    const halfWidth = marquee.scrollWidth / 2;

    tweenRef.current = gsap.to(marquee, {
      x: -halfWidth,
      duration: 45,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(marquee, { x: 0 });
      },
    });

    const handleMouseEnter = () => {
      if (!isInteractingRef.current) {
        tweenRef.current?.pause();
      }
    };
    const handleMouseLeave = () => {
      if (!isInteractingRef.current) {
        tweenRef.current?.play();
      }
    };

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      tweenRef.current?.kill();
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={className}>
      <div ref={containerRef} className="relative overflow-hidden py-2">
        {/* Soft edge gradients matching the #FAF8F5 warm background */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-20 pointer-events-none" />

        <div
          ref={marqueeRef}
          className="flex gap-6 md:gap-8 will-change-transform"
        >
          {items.map((fb, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px]"
            >
              <FeedbackCard feedback={fb} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default TestimonialsCarousel;

