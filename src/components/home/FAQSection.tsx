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
    <section className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 bg-white">
      <div className="w-[90%] mx-auto max-w-[1552px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Heading, Description & Concierge Link */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <h2 className="font-playfair font-normal text-4xl sm:text-5xl md:text-[56px] text-neutral-900 leading-[1.06] tracking-tight">
                Frequently
                <br />
                Asked
                <br />
                Questions
              </h2>
              <p className="mt-6 text-neutral-600 text-xs sm:text-[13px] md:text-sm font-bricolage leading-relaxed max-w-sm">
                {subtitle}
              </p>
              <div className="mt-8">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.2em] font-bricolage uppercase text-[#9B4522] hover:text-neutral-900 transition-colors duration-200 group"
                >
                  <span>{ctaLabel}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal>
              <div className="border-t border-neutral-200/80 divide-y divide-neutral-200/80">
                {faqs.map((faq: any, idx: number) => {
                  const isOpen = openIdx === idx;
                  return (
                    <div key={idx} className="py-6 sm:py-7">
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer"
                      >
                        <h3
                          className={cn(
                            "font-playfair font-normal text-xl sm:text-2xl text-neutral-900 leading-snug transition-colors duration-200",
                            isOpen
                              ? "text-neutral-950"
                              : "text-neutral-800 group-hover:text-neutral-950"
                          )}
                        >
                          {faq.question}
                        </h3>
                        <span className="shrink-0 pt-1 text-neutral-400 group-hover:text-neutral-700 transition-transform duration-300 ease-out">
                          <Plus
                            className={cn(
                              "w-4 h-4 transition-transform duration-300 ease-out stroke-[1.75]",
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
                            ? "grid-rows-[1fr] opacity-100 mt-4"
                            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="font-bricolage text-neutral-600 text-xs sm:text-[13.5px] leading-relaxed max-w-xl pr-4 sm:pr-8">
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
