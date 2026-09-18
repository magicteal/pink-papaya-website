import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    // Fixed px padding, not py-[5%]: percentage padding resolves against WIDTH, so the
    // block grew from 305px tall at 1280 to 453px at 2560 purely from screen width.
    // Background matches the footer's #F9F7F4 so the two read as one surface, the way
    // the white Instagram section runs into the footer on the home page. The old
    // #F7F2EA was a warmer cream and left a visible seam right above the footer.
    <section className="bg-[#F9F7F4] flex flex-col items-center justify-center text-center py-8 md:py-12 lg:py-14">
      <Reveal>
        <h2 className="font-playfair italic font-normal text-[#16323C] mb-4 md:mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", lineHeight: 1.05 }}>
          Inquire for your stay.
        </h2>
        <Button asChild variant="accent" size="lg" className="font-bricolage uppercase tracking-[0.15em] rounded-full px-12">
          <Link href="/stays">Connect With Us</Link>
        </Button>
      </Reveal>
    </section>
  );
}
