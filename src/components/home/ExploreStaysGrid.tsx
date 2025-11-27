"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/Container";
import HeaderContent from "@/components/headerContent";
import StayCard from "@/components/StayCard";
import { Button } from "@/components/ui/button";
import { stays } from "@/data/stays";

export default function ExploreStaysGrid() {
  return (
    <section id="explore" className="py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="mb-2 md:mb-4 pb-6 md:pb-12">
            <HeaderContent
              title="Curated spaces, Effortless comfort, Goa reimagined for you"
              titleSize="sm"
              align="center"
              showCta={false}
              descriptionClass="text-sm sm:text-base md:text-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {stays.slice(0, 4).map((s) => (
              <StayCard
                key={s.id}
                title={s.title}
                imageUrl={s.imageUrl}
                images={(s as any).images}
                area={s.area}
                bed={s.bed}
                guests={s.guests}
                pricePerNight={s.pricePerNight}
                location={(s as any).location}
                amenities={s.amenities}
                href={`/stays/${s.id}`}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/stays">
              <Button variant="outlineBlack">View Stays</Button>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
