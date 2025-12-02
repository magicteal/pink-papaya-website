import * as React from "react";

export default function PremiumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2l2.39 4.847L19.6 8.2l-3.3 3.217.78 4.547L12 14.9 6.92 15.964l.78-4.547L4.4 8.2l5.21-.353L12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}
