"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import FeedbackCard from "./FeedbackCard";
import { feedback as feedbackData } from "@/data/feedback";

export default function TestimonialsCarousel({ className }: { className?: string }) {
  const [api, setApi] = React.useState<any>(null);

  React.useEffect(() => {
    if (!api) return;

    const id = setInterval(() => {
      try {
        api?.scrollNext();
      } catch (e) {
        // ignore
      }
    }, 5000);

    return () => clearInterval(id);
  }, [api]);

  return (
    <Carousel className={className} setApi={(a) => setApi(a)} opts={{ loop: true }}>
      <CarouselContent className="-ml-5 md:-ml-6 py-2 md:py-3">
        {feedbackData.map((fb) => (
          <CarouselItem key={fb.id} className="pl-5 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
            <FeedbackCard feedback={fb} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Intentionally no next/prev buttons for this carousel */}
    </Carousel>
  );
}
