import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";
// avatar image removed from testimonial card

export type Feedback = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
};

function StarIcon({ filled = true, className }: { filled?: boolean; className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14 18.18 21.02 12 17.77 5.82 21.02 7 14 2 9.27 8.91 8.26 12 2"
        className={filled ? "fill-current" : "fill-none"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function FeedbackCard({ feedback, className }: { feedback: Feedback; className?: string }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < (feedback.rating ?? 0));

  return (
    <Card
      className={cn(
        "h-full rounded-none border-1 border-white/5 bg-white min-h-[260px] md:min-h-[280px]",
        // Slightly darker, deeper shadow for more emphasis
        "shadow-[0_18px_36px_rgba(0,0,0,0.14),0_6px_16px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-center justify-center gap-1 text-yellow-500">
          {stars.map((filled, i) => (
            <StarIcon key={i} filled={filled} className={filled ? "text-yellow-500" : "text-neutral-300"} />
          ))}
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">{feedback.text}</p>

        <div className="mt-6">
          <div className="text-sm font-semibold text-neutral-900">{feedback.name}</div>
          <div className="text-xs text-neutral-500">{feedback.role}</div>
        </div>
      </CardContent>
    </Card>
  );
}
