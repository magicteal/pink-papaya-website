import Hero from "@/components/Hero";
import Container from "@/components/Container";
import StayCard from "@/components/StayCard";
import HeaderContent from "@/components/headerContent";
import { stays } from "@/data/stays";
import FAQ from "@/components/FAQ";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FeedbackCard from "@/components/FeedbackCard";
import { feedback as feedbackData } from "@/data/feedback";
import RoomsAndStay from "@/components/RoomsAndStay";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Home() {
  return (
    <>
      <Hero
        backgroundUrl="/images/hotel.svg"
        title="Stay where every moment feels like a mood"
        description="Handpicked homes made for unforgettable getaways"
        titleSize="sm"
        align="center"
        buttonPlacement="below"
        ctaLabel="Explore"
        ctaVariant="white"
        tone="dark"
      />
      <section id="explore" className="py-30 md:py-50">
        <Container>
          <div className="mb-6 md:mb-8">
            <HeaderContent
              align="center"
              showCta={false}
              description="Curated spaces. Effortless comfort. Goa, reimagined, for you"
              descriptionClass="text-sm sm:text-base md:text-lg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 justify-items-center">
            {/* Our villas black tile */}
            <Link
              href="/stays"
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
              aria-label="Explore all villas"
            >
              <div className="mx-auto w-[220px] sm:w-[260px] md:w-[600px]">
                <Card className="group relative w-full overflow-hidden bg-black !rounded-none !border-0 !shadow-none">
                  <div className="relative w-full" style={{ paddingTop: "100%" }}>
                    <div className="absolute inset-0 bg-black" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h3 className="font-playfair text-white leading-tight text-[28px] sm:text-[30px] md:text-[32px]">
                        Signature stays
                      </h3>
                    </div>
                  </div>
                </Card>
              </div>
            </Link>

            {stays.slice(0, 3).map((s) => (
              <StayCard
                key={s.id}
                title={s.title}
                imageUrl={s.imageUrl}
                area={s.area}
                bed={s.bed}
                guests={s.guests}
                pricePerNight={s.pricePerNight}
                href={`/stays/${s.id}`}
                className="mx-auto w-[220px] sm:w-[260px] md:w-[600px]"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Rooms & stay Section */}
      <RoomsAndStay />

      {/* Leisure Section */}
      <section className="py-30 md:py-50">
        <Container>
          <HeaderContent
            align="center"
            showCta={false}
            title="Experience more than a stay a story you’ll want to relive"
            titleSize="sm"
          />
            {(() => {
            // Use dedicated leisure images instead of re-using the stays images
            const leisureItems = [
              {
                img: "/images/serviceOne.svg",
                title: "Always there, never in the way",
                desc: "Attentive yet effortless our on-ground team handles every detail, so your stay feels seamless from arrival to departure",
              },
              {
                img: "/images/serviceTwo.svg",
                title: "Wheels for every mood",
                desc: "Glide through Goa in style with curated transport from chic scooters to chauffeured rides.",
              },
              {
                img: "/images/serviceThree.svg",
                title: "Goa, beyond the guidebooks",
                desc: "Hidden beaches, private tables, sunset rituals discover a side of Goa reserved for those in the kn",
              },
            ];
            return (
              <div className="mt-12 sm:mt-16 md:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-start">
                {leisureItems.map((item, i) => (
                  <div
                    key={i}
                    className={
                      i === 1
                        ? "sm:-mt-12 md:-mt-16 lg:-mt-24"
                        : "sm:mt-4 md:mt-6"
                    }
                  >
                    <Card className="!rounded-none !border-0 overflow-hidden bg-neutral-200">
                      <div
                        className={`relative w-full ${
                            i === 1 ? "pt-[100%]" : "pt-[100%]"
                          }`}>
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.img})` }}
                        />
                      </div>
                    </Card>
                    <div className="mt-4">
                      <h4 className="font-playfair text-base md:text-lg font-medium text-neutral-900">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-xs md:text-sm text-neutral-700 font-bricolage">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </Container>
      </section>

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

 <section className="py-12 md:py-16">
        <Container>
          <HeaderContent
            title="From Our Guests"
            align="center"
            showCta={false}
            titleSize="sm"
            description={"Notes from those who’ve stayed and returned for more"}
            descriptionClass="text-sm sm:text-base md:text-lg"
          />
          <div className="mt-8">
            {/* Use client-side auto-playing carousel without arrows */}
            <TestimonialsCarousel className="w-full" />
          </div>
        </Container>
      </section>
      {/* FAQ Section */}
      <FAQ
        title="Frequently Asked Questions"
        description="Quick answers to common questions about staying at Pink Papaya."
        faqs={[
          {
            question: "How do I book a stay?",
            answer:
              "Booking is simple. Connect with us via WhatsApp, phone, or Airbnb, and we’ll take care of the rest—so you can focus on the experience, not the logistics",
          },
          {
            question: "When can I check in and check out?",
            answer:
              "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are available on request, subject to availability.",
          },
          {
            question: "Is breakfast or food included?",
            answer:
              "Most of our stays are self-catered, with plenty of delivery options nearby. For a more bespoke experience, we can arrange local chefs to prepare something special just for you",
          },
          {
            question: "Can you manage my property or list it with you?",
            answer:
              "Yes. We offer property management and styling services for homeowners. Reach out through our Partner With Us form and let’s create something exceptional",
          }
        ]}
      />

      {/* What They Say - Feedback */}
     
    </>
  );
}
