import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import Container from "@/components/Container";
import { readStays } from "@/lib/staysStore";
import { readLocations } from "@/lib/locationsStore";
import { readCollections } from "@/lib/collectionsStore";
import { readPropertyTypes } from "@/lib/propertyTypesStore";
import StaysGridWithFilters from "@/components/StaysGridWithFilters";
import { DEFAULT_PLACEHOLDER } from "@/utils/image";
import { getCmsPublicContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cms = await getCmsPublicContent("stays");
    const seo = cms?.seo ?? {};
    return {
      title: seo.title || "Our Stays | Pink Papaya",
      description:
        seo.description ||
        "Experience comfort across our curated collection of Pink Papaya stays—crafted for relaxation and style.",
    };
  } catch {
    return {
      title: "Our Stays | Pink Papaya",
      description:
        "Experience comfort across our curated collection of Pink Papaya stays—crafted for relaxation and style.",
    };
  }
}

export default async function StaysPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await props.searchParams;
  const [stays, locations, collections, propertyTypes] = await Promise.all([
    readStays(),
    readLocations(),
    readCollections(),
    readPropertyTypes(),
  ]);

  let cms: any = null;
  try {
    cms = await getCmsPublicContent("stays");
  } catch {
    cms = null;
  }

  const hero = cms?.sections?.hero ?? null;

  return (
    <>
      <HomeHero
        content={{
          title: hero?.title || "Our Stays",
          description:
            hero?.description ||
            "Curated spaces across Goa — crafted for comfort, style, and unforgettable moments.",
          backgroundUrl: hero?.backgroundUrl || DEFAULT_PLACEHOLDER,
        }}
      />
      <section className="py-4 sm:py-6 md:py-8">
        <Container>
          <StaysGridWithFilters
            stays={stays}
            locations={locations}
            collections={collections}
            propertyTypes={propertyTypes}
          />
        </Container>
      </section>
    </>
  );
}
