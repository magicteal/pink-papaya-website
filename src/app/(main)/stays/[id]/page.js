import Container from "@/components/Container";
import { getStayById, readStays } from "@/lib/staysStore";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// New Redesign Components
import StayGallery from "@/components/stays/StayGallery";
import BookingWidget from "@/components/stays/BookingWidget";
import AmenitiesSection from "@/components/stays/AmenitiesSection";
import MapSection from "@/components/stays/MapSection";
import RecommendedStaysCarousel from "@/components/stays/RecommendedStaysCarousel";

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const stay = await getStayById(resolvedParams.id);

    if (!stay) {
        return { title: 'Stay Not Found' };
    }

    return {
        title: stay.title,
        description: stay.description || `Book your stay at ${stay.title} with Pink Papaya.`,
        openGraph: {
            title: stay.title,
            description: stay.description || `Book your stay at ${stay.title} with Pink Papaya.`,
            images: stay.imageUrl ? [{ url: stay.imageUrl }] : [],
        },
    };
}

export default async function StayDetailPage({ params }) {
    const resolvedParams = await params;
    const stay = await getStayById(resolvedParams.id);

    if (!stay) {
        return (
            <Container>
                <div className="py-20 text-center">
                    <h1 className="text-3xl font-playfair italic font-normal text-[#16323C]">Stay not found</h1>
                </div>
            </Container>
        );
    }

    const allStays = await readStays();
    const otherStays = allStays.filter(s => s.id !== stay.id);

    return (
        <div className="bg-white">
            {/* Header & Gallery Section */}
            <StayGallery
                stayId={stay.id}
                title={stay.title}
                description={stay.description}
                location={stay.location}
                area={stay.area}
                bed={stay.bed}
                guests={stay.guests}
                brochureUrl={stay.brochureUrl}
                images={[stay.imageUrl, ...(stay.images || [])].filter((img, idx, self) => img && self.indexOf(img) === idx)}
            />

            <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-8 lg:py-16">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8">
                        {/* About Section */}
                        <section className="mb-8 lg:mb-16">
                            <p className="font-bricolage text-[11px] uppercase tracking-[0.14em] text-[#C07A5A] mb-3">Overview</p>
                            <h2 className="font-playfair italic font-normal text-3xl md:text-4xl text-[#16323C] mb-8">About this stay</h2>
                            <div className="space-y-4">
                                {stay.aboutContent ? (
                                    stay.aboutContent.split('\n').filter(Boolean).map((paragraph, i) => (
                                        <p key={i} className="font-bricolage text-[15px] text-[#16323C]/80 leading-relaxed">{paragraph}</p>
                                    ))
                                ) : (
                                    <p className="font-bricolage text-[15px] text-[#16323C]/80 leading-relaxed">{stay.description}</p>
                                )}
                            </div>
                        </section>

                        <hr className="border-neutral-100" />

                        {/* Amenities Section */}
                        <AmenitiesSection amenities={stay.amenities} />

                        <hr className="border-neutral-100" />

                        {/* Location Section */}
                        <MapSection
                            mapUrl={stay.locationMapUrl}
                            nearbyPlaces={stay.nearbyPlaces}
                            location={stay.location}
                        />
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 order-first lg:order-last">
                        <BookingWidget pricePerNight={stay.pricePerNight} />
                    </div>
                </div>

                <hr className="border-neutral-100" />
            </Container>

            {/* FAQ Section */}
            <FAQ
                badgeText="Helpful"
                title="Frequently Asked Questions"
                description="Quick answers to common questions about staying at Pink Papaya."
                faqs={stay.faqs || [
                    {
                        question: "What time is check-in and check-out?",
                        answer: "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are available on request, subject to availability.",
                    },
                    {
                        question: "Is breakfast included?",
                        answer: "Yes. A complimentary breakfast is included with every stay, with vegetarian options available.",
                    },
                    {
                        question: "Do you have Wi‑Fi?",
                        answer: "High-speed Wi‑Fi is available throughout the property at no extra cost.",
                    }
                ]}
            />

            {/* Recommendations Section */}
            <Container>
                <hr className="border-neutral-100" />

                <section className="py-8 md:py-12 lg:py-14">
                    <div className="flex items-start justify-between mb-6 md:mb-10">
                        <div>
                            <p className="font-bricolage text-[11px] uppercase tracking-[0.14em] text-[#C07A5A] mb-3">More escapes</p>
                            <h2 className="font-playfair italic font-normal text-3xl md:text-4xl text-[#16323C]">You might also love</h2>
                        </div>
                        <Button variant="outline" className="font-bricolage text-xs uppercase tracking-[0.14em] font-semibold text-[#16323C] shrink-0 mt-2 hover:bg-[#F7F2EA]" asChild>
                            <Link href="/stays">View all stays</Link>
                        </Button>
                    </div>

                    <RecommendedStaysCarousel stays={otherStays} />
                </section>
            </Container>
        </div>
    );
}
