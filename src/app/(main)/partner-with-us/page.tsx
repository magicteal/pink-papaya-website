"use client";

import { useState, FormEvent } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import HostTestimonialsCarousel from "@/components/partner/HostTestimonialsCarousel";
import { motion, AnimatePresence } from "framer-motion";

export default function BecomeHostPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
  });
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Auto-download the brochure PDF once the form is submitted successfully.
  const triggerBrochureDownload = () => {
    const a = document.createElement("a");
    a.href = "/test.pdf";
    a.download = "test.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "partner", website, data: formData }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ name: "", location: "", email: "" });
      triggerBrochureDownload();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: "calc(100vh - var(--navbar-h))" }}>
        {/* Full-bleed background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/host-hero-new.png"
            alt="Luxury coastal room"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
          {/* Extra left-side gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          {/* Ultra-smooth progressive fog & seamless white blend */}
          <div
            className="absolute inset-x-0 bottom-0 h-80 sm:h-96 md:h-[500px] pointer-events-none z-[1]"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.85) 75%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.85) 75%, black 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-80 sm:h-96 md:h-[500px] pointer-events-none z-[2]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.015) 12%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.16) 40%, rgba(255,255,255,0.32) 55%, rgba(255,255,255,0.54) 70%, rgba(255,255,255,0.78) 84%, rgba(255,255,255,0.93) 94%, #FFFFFF 100%)",
            }}
          />
        </div>

        {/* Content grid */}
        <div className="relative z-10 min-h-screen">
        <Container className="h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-screen items-center">
          {/* Left: text, vertically centered */}
          <div className="lg:col-span-7 flex flex-col justify-center pb-10 pt-32 lg:pt-20">
            <Reveal>
              <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[92px] font-medium text-white leading-[1.08] tracking-tight">
                Partner with
              </h1>
              <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[92px] font-medium italic text-[#C07A5A] leading-[1.08] tracking-tight mt-1">
                Pink Papaya
              </h1>
              <p className="mt-6 text-white/90 font-bricolage text-base md:text-lg max-w-lg leading-relaxed">
                Transform your property into a high-yield sanctuary. We blend data-driven management with the soul of luxury hospitality.
              </p>
            </Reveal>
          </div>

          {/* Right: frosted glass form card, shifted toward left */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end lg:pr-10 xl:pr-20 pb-16 lg:py-20 relative">
            <Reveal delay={0.2} className="w-full flex justify-center lg:justify-end">
              <div
                className="w-full max-w-[420px] rounded-2xl p-6 sm:p-8"
                style={{
                  background: "rgba(255, 255, 255, 0.65)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.75)",
                  boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.16)",
                }}
              >
                <h2 className="font-playfair italic text-2xl sm:text-[26px] text-[#16323C] mb-1 leading-snug">
                  Get Started Today
                </h2>
                <p className="font-bricolage text-xs text-[#16323C]/70 mb-5">
                  Tell us about your home and our team will get back to you.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block font-bricolage text-[10px] uppercase tracking-[0.12em] text-[#16323C]/70 mb-1.5 font-semibold">
                      Full Name
                    </label>
                    <Input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Elias Thorne"
                      className="h-11 border border-white/60 bg-white/80 focus:bg-white placeholder:text-neutral-400 text-[#16323C] text-sm rounded-xl px-4 transition-all shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bricolage text-[10px] uppercase tracking-[0.12em] text-[#16323C]/70 mb-1.5 font-semibold">
                      Property Location
                    </label>
                    <Input
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Tuscany, Italy"
                      className="h-11 border border-white/60 bg-white/80 focus:bg-white placeholder:text-neutral-400 text-[#16323C] text-sm rounded-xl px-4 transition-all shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bricolage text-[10px] uppercase tracking-[0.12em] text-[#16323C]/70 mb-1.5 font-semibold">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="elias@estate.com"
                      className="h-11 border border-white/60 bg-white/80 focus:bg-white placeholder:text-neutral-400 text-[#16323C] text-sm rounded-xl px-4 transition-all shadow-xs"
                    />
                  </div>
                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full mt-2 h-11 rounded-xl font-bricolage text-sm font-medium text-white transition-all duration-300 hover:bg-[#1f4350] hover:shadow-[0_8px_20px_rgba(22,50,60,0.22)] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                    style={{ background: "#16323C" }}
                  >
                    {status === "submitting"
                      ? "Submitting..."
                      : status === "success"
                      ? "Submitted!"
                      : "Submit Interest"}
                  </button>
                  <div className="h-6 relative">
                    <AnimatePresence mode="wait">
                      {status === "success" ? (
                        <motion.p
                          key="success-msg"
                          initial={{ opacity: 0, y: -5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                          className="absolute inset-x-0 pt-1 text-center text-[11px] font-bricolage font-medium text-[#16323C]"
                        >
                          Thank you! We&apos;ll be in touch soon.
                        </motion.p>
                      ) : status === "error" ? (
                        <motion.p
                          key="error-msg"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-x-0 pt-1 text-center text-[10px] font-bricolage text-red-600"
                        >
                          Something went wrong. Please try again.
                        </motion.p>
                      ) : (
                        <motion.p
                          key="default-msg"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-x-0 pt-1 text-center text-[10px] font-bricolage text-[#16323C]/50"
                        >
                          We&apos;ll reach out within 24 hours.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
        </Container>
        </div>
      </section>
      {/* Stats Strip */}
      <section className="bg-white py-[5%]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-300">
            {[
              { value: "10k+", label: "HAPPY GUESTS" },
              { value: "4.8", label: "STAR RATINGS" },
              { value: "1 in 10", label: "HOMES SELECTED" },
              { value: "24/7", label: "SUPPORT" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center py-4 px-6 gap-2">
                <span className="font-playfair text-4xl md:text-5xl text-[#16323C] tracking-tight">
                  {stat.value}
                </span>
                <span className="font-bricolage text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Host With Us Section */}
      <section className="py-[5%] bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Title + benefits list */}
            <div>
              <Reveal>
                <h2 className="font-playfair text-4xl md:text-5xl font-medium text-[#16323C] mb-4 leading-tight">
                  Why Host With Us
                </h2>
                <p className="text-neutral-500 font-bricolage leading-relaxed mb-12 max-w-sm">
                  We don&apos;t just manage properties; we curate experiences that honor the architectural spirit of your home.
                </p>
              </Reveal>

              <div className="space-y-8">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    ),
                    title: "Flexible Hosting",
                    description: "Host on your terms. We adapt to your personal schedule and property goals.",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ),
                    title: "100% Transparency",
                    description: "Real-time dashboards showing every booking, review, and expense instantly.",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    ),
                    title: "Maximize Earnings",
                    description: "Dynamic pricing algorithms optimized for premium seasonal demand.",
                  },
                ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#16323C] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-playfair text-xl font-medium text-[#16323C] italic mb-1">
                          {item.title}
                        </h3>
                        <p className="text-neutral-500 font-bricolage text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right: Photo + floating card */}
            <Reveal>
              <div className="relative">
                <div className="relative aspect-[4/3.2] rounded-[28px] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/host-pool.png"
                    alt="Luxury infinity pool at sunset"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating glassmorphism card */}
                <div className="absolute bottom-[-24px] left-[-16px] w-[280px] rounded-[20px] p-5 shadow-xl"
                  style={{
                    background: "rgba(50, 50, 60, 0.55)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full mb-3"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="font-playfair text-white text-lg font-medium italic mb-2">
                    Trusted Guests
                  </h4>
                  <p className="text-white/75 font-bricolage text-xs leading-relaxed">
                    Rigorous multi-step vetting ensures your estate is only in the most respectful hands.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What Our Hosts Say */}
      <HostTestimonialsCarousel />

      {/* Bottom CTA */}
      <section className="py-[5%] bg-white text-center">
        <Container>
          <Reveal>
            <h2 className="font-playfair text-4xl md:text-6xl font-medium text-[#16323C] mb-8 leading-tight">
              Ready to Transform Your Property?
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 font-bricolage mb-12 max-w-2xl mx-auto">
              Join our exclusive network of hosts and start earning from your property today.
            </p>
            <Button
              size="lg"
              className="px-16"
            >
              Contact Us
            </Button>
          </Reveal>
        </Container>
      </section>

    </div>
  );
}
