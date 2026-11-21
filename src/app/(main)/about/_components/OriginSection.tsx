import Container from "@/components/Container";
import Reveal from "@/components/ui/Reveal";

const ITEMS = [
  {
    label: "01 / Foundation",
    body: "Pink Papaya Stays began in Goa in 2021 with a simple idea: vacation homes deserved better management. We set out to bring professionalism, reliability, and attentive care to an industry where homeowners often had to compromise.",
  },
  {
    label: "02 / Our Approach",
    body: "We combine modern technology with experienced local teams to deliver thoughtful, hands-on property management. Every home is maintained to high standards, beautifully presented, and cared for with attention to detail.",
  },
  {
    label: "03 / Our Commitment",
    body: "For homeowners, our focus is on maximising rental income, protecting their investment, and making ownership effortless. For guests, it's about exceptional homes, seamless service, and stays worth returning to.",
  },
  {
    label: "04 / Our Vision",
    body: "What began in Goa is growing into a hospitality brand built on trust, quality, and a more considered approach to hospitality. Our ambition is to make every property we manage a better investment and every stay a memorable experience.",
  },
];

export default function OriginSection() {
  return (
    <section className="bg-white pt-6 pb-12 sm:pb-16 md:pb-20">
      <Container>
        <div className="h-px bg-neutral-200 mb-8 md:mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <Reveal>
            <h2 className="font-playfair italic font-normal text-[#16323C]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}>
              The Origin
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 sm:gap-x-12 sm:gap-y-12">
            {ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <p className="font-bricolage text-[11px] uppercase tracking-[0.14em] text-[#C07A5A] mb-4">{item.label}</p>
                <p className="font-bricolage text-[#16323C]/80 text-[15px] leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
