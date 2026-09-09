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
        "h-full w-full bg-[#F5F2EC] border border-[#E7E2D6] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 min-h-[360px] md:min-h-[390px] select-none",
        className
      )}
    >
      {/* Rating Stars - Left aligned */}
      <div className="flex items-center gap-1.5 mb-6">
        {stars.map((filled, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4 sm:h-[18px] sm:w-[18px]",
              filled
                ? "fill-[#E06437] text-[#E06437]"
                : "text-neutral-300"
            )}
          />
        ))}
      </div>

      {/* Testimonial Quote - Large Serif Left Aligned */}
      <div className="flex-1 mb-8">
        <p className="font-playfair text-xl sm:text-[22px] md:text-2xl text-neutral-800 leading-[1.5] font-normal">
          {quoteText}
        </p>
      </div>

      {/* Author Details - Left Aligned */}
      <div className="flex items-center gap-3 pt-2">
        <div className="w-10 h-10 rounded-full bg-neutral-300/60 flex items-center justify-center text-neutral-600 shrink-0">
          <User className="w-4 h-4 text-neutral-600 stroke-[1.8]" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-bricolage">
            {feedback.name}
          </span>
          <span className="text-[11px] sm:text-xs text-neutral-500 font-bricolage font-normal">
            {feedback.role}
          </span>
        </div>
      </div>
    </div>
  );
}

