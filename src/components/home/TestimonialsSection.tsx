"use client";

import Reveal from "@/components/ui/Reveal";
import Container from "@/components/Container";
import HeaderContent from "@/components/headerContent";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Reveal>
          <HeaderContent
            title="From Our Guests"
            align="center"
            showCta={false}
            titleSize="sm"
            description={"Notes from those who’ve stayed and returned for more"}
            descriptionClass="text-sm sm:text-base md:text-lg"
          />
        </Reveal>
        <div className="mt-8">
          <Reveal>
            <TestimonialsCarousel className="w-[90%]" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
