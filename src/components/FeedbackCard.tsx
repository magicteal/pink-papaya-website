import * as React from "react";
import { Star, User } from "lucide-react";
import { cn } from "@/utils/utils";

export type Feedback = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  text: string;
};

export default function FeedbackCard({
  feedback,
  className,
}: {
  feedback: Feedback;
  className?: string;
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i < (feedback.rating ?? 5));

  // Ensure clean quote wrapping
  const trimmed = feedback.text.trim();
  const quoteText =
    trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed
      : `"${trimmed}"`;

  return (
    <div
      className={cn(
        "h-full w-full bg-[#F5F3EE] border border-[#E9E3D2] p-4.5 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-300 min-h-[210px] sm:min-h-[230px] md:min-h-[240px] select-none",
        className
      )}
    >
      {/* Rating Stars - Left aligned */}
      <div className="flex items-center gap-1 mb-3">
        {stars.map((filled, i) => (
          <Star
            key={i}
            className={cn(
              "h-3 w-3 sm:h-3.5 sm:w-3.5",
              filled
                ? "fill-[#FF8243] text-[#FF8243]"
                : "text-neutral-300"
            )}
          />
        ))}
      </div>

      {/* Testimonial Quote - Large Serif Left Aligned */}
      <div className="flex-1 mb-4">
        <p className="font-playfair text-sm sm:text-base md:text-[17px] text-neutral-800 leading-[1.42] font-normal">
          {quoteText}
        </p>
      </div>

      {/* Author Details - Left Aligned */}
      <div className="flex items-center gap-2.5 pt-1">
        <div className="w-8 h-8 rounded-full bg-neutral-300/60 flex items-center justify-center text-neutral-600 shrink-0">
          <User className="w-3.5 h-3.5 text-neutral-600 stroke-[1.8]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 font-bricolage">
            {feedback.name}
          </span>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 font-bricolage font-normal">
            {feedback.role}
          </span>
        </div>
      </div>
    </div>
  );
}

