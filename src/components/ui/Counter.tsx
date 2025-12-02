"use client";

import React, { useEffect, useRef, useState } from "react";

type CounterProps = {
  end: number;
  duration?: number; // ms
  decimals?: number;
  suffix?: string;
  className?: string;
};

function formatNumber(value: number, decimals = 0) {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }
  return Math.round(value).toLocaleString();
}

export default function Counter({ end, duration = 1500, decimals = 0, suffix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState<string>(formatNumber(0, decimals));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const from = 0;
            const to = end;

            function tick(now: number) {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / duration);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - t, 3);
              const current = from + (to - from) * eased;
              setDisplay(formatNumber(current, decimals));
              if (t < 1) {
                requestAnimationFrame(tick);
              }
            }

            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, decimals]);

  return (
    <div ref={ref} className={className} aria-live="polite">
      {display}
      {suffix}
    </div>
  );
}
