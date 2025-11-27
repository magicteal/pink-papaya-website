"use client";

import Reveal from "@/components/ui/Reveal";
import RoomsAndStay from "@/components/RoomsAndStay";
import HomeHero from "@/components/home/HomeHero";
import ExploreStaysGrid from "@/components/home/ExploreStaysGrid";
import LeisureHighlights from "@/components/home/LeisureHighlights";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ExploreStaysGrid />

      {/* Rooms & stay Section */}
      <Reveal>
        <RoomsAndStay />
      </Reveal>

      {/* Leisure Section */}
      <LeisureHighlights />

      {/* Parallax Interior Section */}
      {/* <section className="py-12 md:py-16">
        <Container>
          <HeaderContent
            align="center"
            showCta={false}
            title="Our Interior talks"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            descriptionClass="text-sm sm:text-base md:text-lg"
          />
        </Container>
      </section>
     
      <section className="relative h-[200vh] w-full">
       
        <div className="sticky top-0 h-screen w-full grid grid-cols-1 lg:grid-cols-12 z-10">
          <div
            className="lg:col-span-6 h-1/2 lg:h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${stays[3]?.imageUrl})` }}
          />
          <div className="lg:col-span-6 bg-[#ECF2F2] flex items-center justify-center p-6">
            <div className="max-w-md text-center">
              <h3 className="font-playfair text-2xl md:text-3xl text-neutral-900">
                Thoughtful details
              </h3>
              <Image
                src="/images/hotel.svg"
                alt=""
                width={40}
                height={40}
                className="mx-auto my-5 h-10 w-10 opacity-80"
              />
              <p className="text-neutral-700 text-sm md:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
       
        <div className="sticky top-0 h-screen w-full grid grid-cols-1 lg:grid-cols-12 z-20">
          <div className="lg:col-span-6 bg-[#ECF2F2] flex items-center justify-center p-6">
            <div className="max-w-md text-center">
              <h3 className="font-playfair text-2xl md:text-3xl text-neutral-900">
                Spaces that breathe
              </h3>
              <Image
                src="/images/hotel.svg"
                alt=""
                width={40}
                height={40}
                className="mx-auto my-5 h-10 w-10 opacity-80"
              />
              <p className="text-neutral-700 text-sm md:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s.
              </p>
            </div>
          </div>
          <div
            className="lg:col-span-6 h-1/2 lg:h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${stays[3]?.imageUrl})` }}
          />
        </div>
      </section> */}

      <TestimonialsSection />
      {/* FAQ Section */}
      <FAQSection />

      {/* What They Say - Feedback */}
     
    </>
  );
}
