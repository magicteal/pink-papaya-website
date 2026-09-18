"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/utils";
import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, Mail, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/stays", label: "EXPLORE STAYS" },
  { href: "/partner-with-us", label: "PARTNER WITH US" },
  { href: "/about", label: "ABOUT US" },
];

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setContactOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (
        contactOpen &&
        contactRef.current &&
        contactBtnRef.current &&
        !contactRef.current.contains(t) &&
        !contactBtnRef.current.contains(t)
      ) {
        setContactOpen(false);
      }
      if (
        menuOpen &&
        mobileMenuRef.current &&
        menuBtnRef.current &&
        !mobileMenuRef.current.contains(t) &&
        !menuBtnRef.current.contains(t)
      ) {
        setMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setContactOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [contactOpen, menuOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  }

  return (
    <header
      className={cn(
        // Gutter matches HomeHero's fixed px inset so the pill and the hero card
        // share one left/right edge at every landscape width.
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 pt-3 sm:pt-4 px-4 sm:px-5 lg:px-7 pointer-events-none",
        className
      )}
    >
      <div
        className={cn(
          "w-full mx-auto bg-white/95 backdrop-blur-md border border-neutral-200/70 transition-all duration-300 pointer-events-auto px-5 sm:px-6 md:px-8 2xl:px-12 py-2.5 sm:py-3.5 2xl:py-5",
          menuOpen ? "rounded-3xl" : "rounded-full",
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-neutral-200" : "shadow-sm"
        )}
      >
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="shrink-0 z-10 flex items-center">
            <Image
              src="/logo-files/logo-black.svg"
              alt="Pink Papaya"
              width={140}
              height={40}
              priority
              className="h-auto w-[115px] sm:w-[135px] md:w-[145px] 2xl:w-[185px] transition-opacity duration-300"
            />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-10 2xl:gap-14 font-bricolage">
            {NAV_ITEMS.map((it) => {
              const active = isActive(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "text-[12px] lg:text-[13px] 2xl:text-[15px] font-semibold tracking-[0.05em] uppercase transition-colors group relative py-1",
                    active
                      ? "text-[#B84A17]"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {it.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] bg-[#B84A17] transition-[width] duration-300 ease-out rounded-full",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Contact dropdown (Desktop only) */}
            <div className="relative hidden md:block">
              <button
                ref={contactBtnRef}
                type="button"
                className="bg-[#9E3B09] hover:bg-[#802F07] active:scale-95 text-white rounded-full px-5 sm:px-6 2xl:px-8 py-2 sm:py-2.5 2xl:py-3.5 text-[11px] sm:text-[12px] 2xl:text-[14px] font-semibold tracking-widest uppercase shadow-sm transition-all duration-200 cursor-pointer"
                onClick={() => setContactOpen((v) => !v)}
                aria-expanded={contactOpen}
                aria-haspopup="true"
              >
                GET IN TOUCH
              </button>

              {contactOpen && (
                <div
                  ref={contactRef}
                  className="absolute right-0 top-full mt-3 w-[310px] rounded-2xl bg-white border border-neutral-100 shadow-[0_12px_36px_rgba(0,0,0,0.12)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <a
                    href="tel:+919226591522"
                    className="flex items-center gap-3 px-5 py-4 text-[13px] text-[#16323C] hover:bg-[#F7F2EA] transition-all duration-200 font-bricolage"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F2EA]">
                      <Phone size={13} className="text-[#9E3B09]" />
                    </span>
                    <span className="font-semibold text-neutral-800">+91 9226591522</span>
                  </a>
                  <div className="h-px bg-neutral-100 mx-5" />
                  <a
                    href="mailto:reservations@pinkpapayastays.com"
                    className="flex items-center gap-3 px-5 py-4 hover:bg-[#F7F2EA] transition-all duration-200 font-bricolage min-w-0 overflow-hidden"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F2EA]">
                      <Mail size={13} className="text-[#9E3B09]" />
                    </span>
                    <span className="text-[12px] text-neutral-800 font-medium truncate min-w-0">reservations@pinkpapayastays.com</span>
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              ref={menuBtnRef}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-neutral-800 hover:text-black hover:bg-neutral-100/60 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuOpen ? "max-h-[400px] opacity-100 pt-4 mt-3 border-t border-neutral-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col font-bricolage divide-y divide-neutral-100">
            {NAV_ITEMS.map((it) => {
              const active = isActive(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "py-3 text-[13px] tracking-wider uppercase font-semibold transition-colors",
                    active
                      ? "text-[#B84A17]"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 pb-2 flex flex-col gap-3">
            <button
              type="button"
              className="w-full justify-center bg-[#9E3B09] text-white rounded-full py-3 text-xs font-semibold tracking-wider uppercase shadow-sm"
              onClick={() => setContactOpen(!contactOpen)}
            >
              GET IN TOUCH
            </button>
            {contactOpen && (
              <div className="flex flex-col gap-2 pt-2 text-xs text-neutral-600 font-bricolage px-1">
                <a href="tel:+919226591522" className="flex items-center gap-2 hover:text-[#9E3B09]">
                  <Phone size={13} className="text-[#9E3B09]" /> +91 9226591522
                </a>
                <a href="mailto:reservations@pinkpapayastays.com" className="flex items-center gap-2 hover:text-[#9E3B09]">
                  <Mail size={13} className="text-[#9E3B09]" /> reservations@pinkpapayastays.com
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

