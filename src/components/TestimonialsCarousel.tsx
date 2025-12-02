"use client";

import * as React from "react";
import { motion } from "motion/react";
import FeedbackCard from "./FeedbackCard";
import { feedback as feedbackData } from "@/data/feedback";

export default function TestimonialsCarousel({ className }: { className?: string }) {
  // Duplicate the list to create a seamless infinite scroll
  const items = React.useMemo(() => [...feedbackData, ...feedbackData], []);

  return (
    <div className={className}>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6 pb-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {items.map((fb, idx) => (
            <div key={idx} className="flex-shrink-0 w-[350px] p-0">
              <FeedbackCard feedback={fb} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
