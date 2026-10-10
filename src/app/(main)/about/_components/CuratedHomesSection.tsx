import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function CuratedHomesSection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] lg:min-h-[540px]">
        <Reveal>
          <div className="flex flex-col justify-center h-full px-4 sm:px-8 md:px-14 lg:px-18 xl:px-24 py-10 md:py-14 lg:py-18">
            <p className="font-bricolage text-[11px] uppercase tracking-[0.18em] text-[#C07A5A] mb-2 sm:mb-3">Our Curation</p>
            <h2 className="font-playfair italic font-normal text-[#16323C] mb-3 md:mb-5 leading-tight" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
              Curated Homes
            </h2>
            <p className="font-bricolage text-[#16323C]/70 text-[15px] leading-relaxed max-w-[440px]">
              At Pink Papaya Stays we only take on homes that feel special—charming design, high-quality finishes, and comfy vibes. We&apos;ve got high standards so guests have great stays and owners can relax. Before we list anything, each place goes through a detailed 200+ point check for safety, cleanliness, working systems, and polished presentation—so stays feel effortless and well cared for.
            </p>
          </div>
        </Reveal>
        <div className="relative min-h-[420px] lg:min-h-0">
          <Image src="/images/host-why.png" alt="Curated interior" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
