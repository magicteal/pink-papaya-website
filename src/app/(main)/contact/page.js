import Container from "@/components/Container";
import { Phone, Mail, MessageSquare } from "lucide-react";
import ContactForm from "./_components/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 font-bricolage">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair italic font-normal text-[#16323C] tracking-tight">
            Get In Touch
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pb-8">
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <h2 className="text-2xl md:text-3xl font-playfair italic font-normal text-[#16323C] mb-8">
              Pink Papaya Stays
            </h2>

            <div className="space-y-10">
              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F2EA] text-[#C07A5A]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#16323C] font-bricolage">Phone</h3>
                  <a href="tel:+3105552140" className="text-[#16323C]/75 hover:text-[#C07A5A] transition-colors font-bricolage text-sm">
                    (310) 555-2140
                  </a>
                  <p className="text-[11px] text-[#C07A5A] mt-1 uppercase tracking-[0.14em] font-semibold font-bricolage">
                    Mon-Fri, 9am - 6pm PST
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F2EA] text-[#C07A5A]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#16323C] font-bricolage">Email</h3>
                  <a href="mailto:hello@pinkpapaya.com" className="text-[#16323C]/75 hover:text-[#C07A5A] transition-colors font-bricolage text-sm">
                    hello@pinkpapaya.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F2EA] text-[#C07A5A]">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#16323C] font-bricolage">WhatsApp</h3>
                  <p className="text-[#16323C]/75 font-bricolage text-sm">Start a chat for quick support.</p>
                  <a href="#" className="inline-flex items-center gap-1 text-[#C07A5A] text-sm font-semibold uppercase tracking-[0.14em] mt-2 hover:underline font-bricolage">
                    Message us now <span className="text-lg leading-none">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
