"use client";

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Plus } from "lucide-react";
import { cn } from "@/utils/utils";

const DEFAULT_FAQS = [
  {
    question: "How do I book a stay?",
    answer:
      "Booking is seamlessly handled through our secure online portal. Select your desired destination, choose your dates, and follow the curated checkout process to confirm your reservation. Our concierge team is also available for bespoke booking arrangements.",
  },
  {
    question: "What are check-in and check-out times?",
    answer:
      "Check-in begins from 2:00 PM onwards, and check-out is by 11:00 AM. Early arrivals and late departures are accommodated upon request, subject to villa availability.",
  },
  {
    question: "Is breakfast or food included?",
    answer:
      "Most stays feature private chefs or curated gourmet breakfast options upon request. Complimentary artisanal teas, organic coffee, and bespoke dining menus can be arranged prior to arrival.",
  },
  {
    question: "Can you manage my property or host with you?",
    answer:
      "Yes, we partner with discerning homeowners to manage, curate, and market extraordinary boutique residences. Explore our Partner With Us page or contact our acquisition team to learn more.",
  },
];

export default function FAQSection({ content }: { content?: any }) {
  // First item open by default matching mockup
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const subtitle =
    content?.subtitle ||
    content?.description ||
    "Everything you need to know about preparing for your serene getaway with Pink Papaya Stays.";
  const ctaLabel = content?.ctaLabel || "CONTACT CONCIERGE";
  const ctaHref = content?.ctaHref || "/contact";

  const faqs = content?.faqs?.length ? content.faqs : DEFAULT_FAQS;

  return (
    <section className="py-8 sm:py-12 md:py-14 bg-white border-t border-neutral-100/80">
      <div className="w-[90%] mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <h2 className="font-playfair font-normal text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-neutral-900 leading-[1.08] tracking-tight">
                Frequently Asked
                <br />
                Questions
              </h2>
              <p className="mt-3.5 text-xs sm:text-[13px] md:text-sm font-bricolage text-neutral-500 font-normal leading-relaxed max-w-xs">
                Quick answers to common questions about staying at Pink Papaya.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal>
              <div className="border-t border-neutral-100 divide-y divide-neutral-100">
                {faqs.map((faq: any, idx: number) => {
                  const isOpen = openIdx === idx;
                  return (
                    <div key={idx} className="py-4 sm:py-5 font-bricolage">
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer"
                      >
                        <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-bold text-neutral-900 leading-snug transition-colors duration-200 group-hover:text-neutral-700">
                          {faq.question}
                        </h3>
                        <span
                          className={cn(
                            "shrink-0 flex h-6.5 w-6.5 items-center justify-center rounded-full border border-neutral-200/90 text-neutral-400 bg-white transition-all duration-200 group-hover:border-neutral-400 group-hover:text-neutral-700",
                            isOpen && "bg-neutral-900 border-neutral-900 text-white group-hover:bg-neutral-800 group-hover:text-white"
                          )}
                        >
                          <Plus
                            className={cn(
                              "w-3.5 h-3.5 transition-transform duration-300 ease-out stroke-[1.5]",
                              isOpen ? "rotate-45" : "rotate-0"
                            )}
                          />
                        </span>
                      </button>

                      {/* Animated Accordion Content */}
                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 mt-3"
                            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="font-bricolage text-[13px] sm:text-[13.5px] md:text-sm text-neutral-500 leading-[1.75] pr-6 sm:pr-12">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
