import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function CuratedHomesSection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] lg:min-h-[540px]">
        <Reveal>
          <div className="flex flex-col justify-center h-full px-4 sm:px-8 md:px-14 lg:px-18 xl:px-24 py-10 md:py-14 lg:py-18">
            <h2 className="font-playfair italic font-normal text-[#16323C] mb-3 md:mb-5 leading-tight" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
              Curated Homes
            </h2>
            <p className="font-bricolage text-[#16323C]/75 text-[15px] leading-relaxed max-w-[480px]">
              At Pink Papaya Stays, we handpick homes defined by distinctive design, premium finishes, and exceptional comfort. Every property undergoes a comprehensive 200+ point inspection covering safety, hygiene, functionality, and presentation. Our standards ensure exceptional stays for guests while helping homeowners protect their property, maximise rental potential, and enjoy the confidence of professional management.
            </p>
          </div>
        </Reveal>
        <div className="relative min-h-[420px] lg:min-h-0">
          <Image src="/media/about/about-curated-home.jpg" alt="Curated interior" fill unoptimized={true} className="object-cover" />
        </div>
      </div>
    </section>
  );
}
