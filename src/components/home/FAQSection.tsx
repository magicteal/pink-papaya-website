"use client";

import Reveal from "@/components/ui/Reveal";
import FAQ from "@/components/FAQ";

export default function FAQSection() {
  return (
    <Reveal>
      <FAQ
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How do I book a stay?",
            answer:
              "Booking is simple. Connect with us via WhatsApp, phone, or Airbnb, and we’ll take care of the rest—so you can focus on the experience, not the logistics",
          },
          {
            question: "When can I check in and check out?",
            answer:
              "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are available on request, subject to availability.",
          },
          {
            question: "Is breakfast or food included?",
            answer:
              "Most of our stays are self-catered, with plenty of delivery options nearby. For a more bespoke experience, we can arrange local chefs to prepare something special just for you",
          },
          {
            question: "Can you manage my property or list it with you?",
            answer:
              "Yes. We offer property management and styling services for homeowners. Reach out through our Partner With Us form and let’s create something exceptional",
          },
        ]}
      />
    </Reveal>
  );
}
