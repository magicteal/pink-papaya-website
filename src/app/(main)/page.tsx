import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import ExploreStaysGrid from "@/components/home/ExploreStaysGrid";
import TrendingDestinations from "@/components/home/TrendingDestinations";
import RoomsAndStay from "@/components/home/RoomsAndStay";
import LeisureHighlights from "@/components/home/LeisureHighlights";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import { getCmsPublicContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cms = await getCmsPublicContent("home");
    const seo = cms?.seo ?? {};
    return {
      title: seo.title || undefined,
      description: seo.description || undefined,
      keywords: seo.keywords?.length ? seo.keywords : undefined,
      openGraph: seo.ogImageUrl ? { images: [seo.ogImageUrl] } : undefined,
    };
  } catch {
    return {};
  }
}

export default async function Home() {
  let cms: any = null;
  try {
    cms = await getCmsPublicContent("home");
  } catch {
    cms = null;
  }

  const hero = cms?.sections?.hero ?? null;

  return (
    <>
      <HomeHero
        content={{
          title: hero?.title,
          description: hero?.description,
          ctaLabel: hero?.ctaLabel,
          backgroundUrl: hero?.backgroundUrl,
        }}
      />
      <ExploreStaysGrid content={cms?.sections?.explore_stays} />

      <TrendingDestinations />

      {/* Rooms & stay Section */}
      <RoomsAndStay content={cms?.sections?.rooms_and_stay} />

      {/* Leisure Section */}
      <LeisureHighlights content={cms?.sections?.leisure_highlights} />

      <TestimonialsSection content={cms?.sections?.testimonials} />
      
      {/* FAQ Section */}
      <FAQSection content={cms?.sections?.faq} />

      {/* Instagram Feed Section */}
      <InstagramFeed />
    </>
  );
}
