import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/ui/Reveal";

// Tied to whichever axis is tighter, so the headline stays in proportion to the
// collage on both a short-wide laptop and a tall 2560 monitor. The old
// `clamp(1.8rem, 9.5vw, 9rem)` hit its 9rem cap at 1600 and then stopped growing
// while the cards kept getting taller.
const HEADLINE_SIZE = "clamp(1.8rem, min(6.8vw, 13dvh), 12rem)";

export default function HeroSection() {
  return (
    // From lg up the hero is exactly one viewport tall and the collage is sized from
    // viewport HEIGHT (lg:h-[..dvh] + aspect-ratio drives the width) rather than from
    // width. Sizing by width made the cards balloon on wide screens — they overflowed
    // the section by 79px at 1920 and 131px at 2560 — and shrink on short ones, so the
    // composition changed with every screen. Height-based keeps it identical.
    <section
      className="relative bg-white overflow-hidden min-h-[calc(50vh_-_var(--navbar-h))] md:min-h-[calc(80vh_-_var(--navbar-h))] lg:min-h-0 lg:h-[100dvh] mt-6 md:mt-[5%] lg:mt-0"
      style={{
        isolation: "isolate",
        // One scale drives the whole collage. Height is the primary axis (so the pair
        // fills the screen) but capped by 36vw, otherwise a 16:10 screen — where dvh is
        // large relative to vw — makes the cards wide enough to sit on the headline.
        ["--card-b-h" as string]: "min(70dvh, 36vw)",
        ["--card-a-h" as string]: "calc(var(--card-b-h) * 0.925)",
        // Card B hugs the right edge; card A is offset by exactly card B's own width
        // (height × 3/4) less a 1vw overlap, so the two keep their relationship at any
        // aspect ratio. A fixed left-% could not — card B was clipped at 1366.
        ["--card-b-right" as string]: "max(6vw, calc((100vw - 2200px) / 2))",
        ["--card-a-right" as string]: "calc(var(--card-b-right) + var(--card-b-h) * 0.75 - 2vw)",
        // Centred vertically, then nudged down so the bottoms sit near the fold.
        ["--card-b-top" as string]: "calc((100dvh - var(--card-b-h)) / 2 + 5dvh)",
        ["--card-a-top" as string]: "calc((100dvh - var(--card-a-h)) / 2 + 6dvh)",
      }}
    >
      <div
        className="absolute overflow-hidden shadow-2xl w-[28%] md:w-[25%] lg:w-auto lg:h-[var(--card-a-h)] left-[45%] md:left-[40%] lg:left-auto top-[calc(var(--navbar-h)_+_16px)] lg:top-[var(--card-a-top)] lg:right-[var(--card-a-right)]"
        style={{
          aspectRatio: "3 / 4.2",
          transform: "rotate(-6deg)", borderRadius: "22px", zIndex: 1,
        }}
      >
        <Image src="/images/stay-view.png" alt="Pink Papaya interiors" fill sizes="(max-width: 1024px) 30vw, 35vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div
        className="absolute overflow-hidden shadow-2xl w-[32%] md:w-[29%] lg:w-auto lg:h-[var(--card-b-h)] left-[67%] md:left-[64%] lg:left-auto top-[calc(var(--navbar-h)_-_20px)] lg:top-[var(--card-b-top)] lg:right-[var(--card-b-right)]"
        style={{
          aspectRatio: "3 / 4",
          transform: "rotate(4deg)", borderRadius: "22px", zIndex: 1,
        }}
      >
        <Image src="/images/host-pool.png" alt="Pink Papaya stay details" fill sizes="(max-width: 1024px) 34vw, 40vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="lg:h-full lg:max-w-none lg:px-[12vw]">
        <div
          className="relative lg:h-full lg:flex lg:flex-col lg:justify-center"
          style={{ zIndex: 2, paddingTop: "var(--navbar-h)" }}
        >
          <Reveal>
            <div className="max-w-[42%] md:max-w-[58%] lg:max-w-[46%] pb-8 md:pb-24 lg:pb-0">
              <h1 className="font-playfair font-medium text-[#16323C]" style={{ fontSize: HEADLINE_SIZE, lineHeight: 0.92 }}>
                About
              </h1>
              <h1 className="font-playfair font-medium italic text-[#C07A5A]" style={{ fontSize: HEADLINE_SIZE, lineHeight: 0.92 }}>
                Pink
              </h1>
              <h1 className="font-playfair font-medium text-[#16323C]" style={{ fontSize: HEADLINE_SIZE, lineHeight: 0.92 }}>
                Papaya
              </h1>
              <h1 className="font-playfair font-medium text-[#16323C]" style={{ fontSize: HEADLINE_SIZE, lineHeight: 0.92 }}>
                Stays
              </h1>
              <p className="font-bricolage text-neutral-400 text-base xl:text-lg 2xl:text-xl leading-relaxed mt-7 2xl:mt-9 max-w-[280px] xl:max-w-[340px] 2xl:max-w-[420px]">
                Architectural sanctuaries designed for the modern wanderer. We blend the warmth of home with the precision of a gallery.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
