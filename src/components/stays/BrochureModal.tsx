"use client";

import { useState } from "react";
import { X, FileText, Download, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  stayId: string;
  title: string;
  location?: string;
  brochureUrl?: string;
}

export default function BrochureModal({
  isOpen,
  onClose,
  stayId,
  title,
  location,
  brochureUrl,
}: BrochureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resolvedDownloadUrl = brochureUrl && brochureUrl.trim() !== ""
    ? brochureUrl
    : `/api/stays/${stayId}/brochure`;

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = resolvedDownloadUrl;
    link.download = `${title.replace(/[^a-zA-Z0-9\s-]/g, "")}-Brochure.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "brochure",
          website,
          data: {
            name,
            email,
            phone,
            stayId,
            stayTitle: title,
            location: location || "",
            brochureUrl: brochureUrl || "",
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to process request. Please try again.");
      }

      setSubmitted(true);
      // Automatically initiate download
      triggerDownload();
    } catch (err: any) {
      setError(err?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100002] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop overlay click */}
      <div className="fixed inset-0" onClick={handleResetAndClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-neutral-100 p-6 sm:p-8 md:p-10 z-10 animate-in zoom-in-95 duration-200 font-bricolage">
        {/* Close button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#F7F2EA] text-[#C07A5A] flex items-center justify-center mx-auto border border-[#C07A5A]/20">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C07A5A] font-semibold mb-1">
                Download Started
              </p>
              <h3 className="font-playfair italic font-normal text-2xl sm:text-3xl text-[#16323C] mb-2">
                Thank you, {name}!
              </h3>
              <p className="text-sm text-[#16323C]/70 max-w-sm mx-auto leading-relaxed">
                Your brochure for <strong className="text-[#16323C]">{title}</strong> is downloading now. Our concierge team has also received your request.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="button"
                onClick={triggerDownload}
                variant="outline"
                className="font-bricolage text-xs uppercase tracking-[0.14em] font-semibold rounded-xl"
              >
                <Download className="w-4 h-4 mr-2 text-[#C07A5A]" />
                Download Again
              </Button>
              <Button
                type="button"
                onClick={handleResetAndClose}
                className="bg-[#16323C] hover:bg-[#16323C]/90 text-white font-bricolage text-xs uppercase tracking-[0.14em] font-semibold rounded-xl"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#F7F2EA] text-[#C07A5A]">
                <FileText className="w-4 h-4" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C07A5A] font-semibold">
                Property Brochure
              </p>
            </div>

            <h2 className="font-playfair italic font-normal text-2xl sm:text-3xl text-[#16323C] leading-snug mb-2">
              Download Brochure
            </h2>
            <p className="text-xs sm:text-sm text-[#16323C]/70 mb-6 leading-relaxed">
              Please enter your details to receive the curated digital brochure and floor plans for <strong className="text-[#16323C]">{title}</strong>.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#16323C]/80 mb-1.5">
                  Full Name <span className="text-[#C07A5A]">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Maya Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-xl border-neutral-200 text-sm focus:border-[#C07A5A]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#16323C]/80 mb-1.5">
                  Email Address <span className="text-[#C07A5A]">*</span>
                </label>
                <Input
                  type="email"
                  required
                  placeholder="e.g. maya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border-neutral-200 text-sm focus:border-[#C07A5A]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#16323C]/80 mb-1.5">
                  Phone / WhatsApp <span className="text-[#C07A5A]">*</span>
                </label>
                <Input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 rounded-xl border-neutral-200 text-sm focus:border-[#C07A5A]"
                />
              </div>

              {/* Honeypot field (hidden from humans) */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-[#16323C] hover:bg-[#16323C]/90 text-white font-bricolage text-xs uppercase tracking-[0.16em] font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C07A5A]" />
                      <span>Preparing Download...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#C07A5A]" />
                      <span>Download Brochure</span>
                    </>
                  )}
                </Button>
              </div>

              <p className="text-[10px] text-center text-neutral-400">
                We respect your privacy. No unsolicited emails or spam.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
