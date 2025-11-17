"use client";

import Link from "next/link";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Navbar({ className }: { className?: string }) {
  const items = [
    { href: "/", label: "Home" },
    { href: "/stays", label: "Explore" },
    { href: "/interior", label: "Interior" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact us" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isContactPage = pathname?.startsWith("/contact");
  const isAboutPage = pathname?.startsWith("/about");
  const isInteriorPage = pathname?.startsWith("/interior");
  const isAdminPage = pathname?.startsWith("/admin");
  const isBlogPage = pathname?.startsWith("/blog");

  const isLightPage =
    isContactPage || isAboutPage || isInteriorPage || isAdminPage || isBlogPage;

  const linkColor = isLightPage
    ? "text-neutral-900 hover:text-black"
    : "text-white/90 hover:text-white";
  const iconColor = isLightPage ? "text-neutral-900" : "text-white";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // hamburger line refs and gsap timeline
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<any>(null);
  const navbarWARef = useRef<HTMLAnchorElement | null>(null);
  const floatWARef = useRef<HTMLAnchorElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelTlRef = useRef<any>(null);

  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    if (!l1 || !l2 || !l3) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(l1, { y: 6, rotation: 45, transformOrigin: "50% 50%", duration: 0.18 }, 0);
    tl.to(l2, { opacity: 0, duration: 0.12 }, 0);
    tl.to(l3, { y: -6, rotation: -45, transformOrigin: "50% 50%", duration: 0.18 }, 0);
    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (menuOpen) tlRef.current.play();
    else tlRef.current.reverse();
  }, [menuOpen]);

  // animate WhatsApp float from navbar icon to bottom-right
  useEffect(() => {
    // pick the visible navbar WA element (mobile or desktop)
    const elInline = document.querySelector('.nav-inline-wa') as HTMLElement | null;
    const elMobile = document.querySelector('.nav-mobile-wa') as HTMLElement | null;
    const navEl = (elInline && elInline.offsetParent !== null) ? elInline : (elMobile && elMobile.offsetParent !== null) ? elMobile : null;
    const floatEl = floatWARef.current as HTMLElement | null;
    if (!navEl || !floatEl) return;

    // compute centers
    const navRect = navEl.getBoundingClientRect();
    const floatRect = floatEl.getBoundingClientRect();
    const navCenterX = navRect.left + navRect.width / 2;
    const navCenterY = navRect.top + navRect.height / 2;
    const floatCenterX = floatRect.left + floatRect.width / 2;
    const floatCenterY = floatRect.top + floatRect.height / 2;
    const dx = navCenterX - floatCenterX;
    const dy = navCenterY - floatCenterY;

    // kill previous tweens
    gsap.killTweensOf(floatEl);
    gsap.killTweensOf(navEl);

    if (scrolled) {
      // position float at navbar icon and animate to bottom-right
      gsap.set(floatEl, { x: dx, y: dy, opacity: 0, scale: 0.8 });
      gsap.to(floatEl, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "power2.out",
        onStart: () => (floatEl.style.pointerEvents = "auto"),
      });
      gsap.to(navEl, { opacity: 0, duration: 0.25, ease: "power1.out" });
    } else {
      // animate float back to navbar position then hide
      gsap.to(floatEl, {
        x: dx,
        y: dy,
        opacity: 0,
        scale: 0.8,
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => (floatEl.style.pointerEvents = "none"),
      });
      gsap.to(navEl, { opacity: 1, duration: 0.25, ease: "power1.out" });
    }
  }, [scrolled]);

  // panel (mobile right menu) animation setup
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    // ensure starting state
    gsap.set(panel, { x: '100%' });
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' });

    const tl = gsap.timeline({ paused: true });
    tl.to(overlay, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }, 0);
    tl.to(panel, { x: '0%', duration: 0.45, ease: 'power3.out' }, 0);
    panelTlRef.current = tl;

    return () => {
      tl.kill();
      panelTlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!panelTlRef.current) return;
    if (menuOpen) panelTlRef.current.play();
    else panelTlRef.current.reverse();
  }, [menuOpen]);

  return (
    <Container
      className={cn(
        "absolute inset-x-0 top-0 z-50 transition-colors bg-transparent",
        className
      )}
    >
      <Container className="flex h-16 items-center pt-3 w-full">
        {/* Left: hamburger */}
        <div className="flex items-center">
          <button
            className={cn(
              "flex items-center justify-center focus:outline-none",
              isLightPage ? "text-neutral-900" : "text-white"
            )}
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="flex flex-col gap-1 w-7 h-6 items-center justify-center">
              <span ref={line1Ref} className={cn("hamb-line w-6 h-[2px] rounded-sm bg-current block")} />
              <span ref={line2Ref} className={cn("hamb-line w-6 h-[2px] rounded-sm bg-current block")} />
              <span ref={line3Ref} className={cn("hamb-line w-6 h-[2px] rounded-sm bg-current block")} />
            </div>
          </button>

          {/* Desktop dropdown: show on md+ when hamburger clicked */}
          <div
            className={cn(
              "absolute left-0 top-full mt-2 w-64 rounded-lg shadow-lg border p-4 bg-white text-neutral-900 hidden",
              menuOpen && "md:block"
            )}
          >
            <nav className="flex flex-col gap-3 text-sm">
              <a href="/about" onClick={() => setMenuOpen(false)} className="hover:underline">About Us</a>
              <a href="/faq" onClick={() => setMenuOpen(false)} className="hover:underline">Frequently Asked Questions</a>
              <a href="/cancellation-and-refund-policy" onClick={() => setMenuOpen(false)} className="hover:underline">Cancellation and Refund Policy</a>
              <a href="/contact" onClick={() => setMenuOpen(false)} className="hover:underline">Contact Us</a>
            </nav>
            <hr className="my-3 border-t" />
            <div className="text-sm">
              <div className="font-medium mb-2">Get in Touch</div>
              <div className="flex flex-col gap-1 text-sm">
                <a href="tel:+918799915100" onClick={() => setMenuOpen(false)} className="hover:underline">+91 87999 15100</a>
                <a href="tel:+918799914701" onClick={() => setMenuOpen(false)} className="hover:underline">+91 87999 14701</a>
                <a href="mailto:reservations@tisyastays.com" onClick={() => setMenuOpen(false)} className="hover:underline">reservations@tisyastays.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Center: placeholder for spacing; nav items shown on md+ centered */}
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex justify-center items-center gap-6 text-sm font-bricolage">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={cn(linkColor, "transition-colors group inline-flex flex-col items-center")}
              >
                <span className="relative z-10">{it.label}</span>
                <span className="block h-[2px] bg-current w-0 transition-[width] duration-200 ease-out origin-right group-hover:w-full mt-1" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: WhatsApp icon + CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="https://wa.me/0000000000"
            aria-label="Chat on WhatsApp"
            className={cn("nav-inline-wa text-white/90 hover:text-white", linkColor, scrolled && "hidden")}
            target="_blank"
            rel="noopener noreferrer"
            ref={navbarWARef}
          >
            <WhatsAppIcon className={cn("h-6 w-6", iconColor)} />
          </Link>
          <Button className="hidden md:inline-flex" size="sm" variant={isLightPage ? "outlineBlack" : "outlineWhite"}>
            Get in touch
          </Button>
        </div>
      </Container>
      {/* Floating WhatsApp button when user scrolls */}
      <a
        href="https://wa.me/0000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        ref={floatWARef}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full shadow-lg p-3 transform bg-black",
          "pointer-events-none"
        )}
      >
        <WhatsAppIcon className="h-6 w-6 text-white" />
      </a>
      {/* Mobile right-side panel + overlay (animated via GSAP) */}
      <div ref={overlayRef} className="md:hidden fixed inset-0 z-40 bg-black/40 pointer-events-none" onClick={() => setMenuOpen(false)} />
      <div ref={panelRef} className="md:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">Menu</div>
            <button aria-label="Close menu" className="p-2" onClick={() => setMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-4">
            {items.concat([{ href: "/about", label: "About Us" }]).map((it) => (
              <Link
                key={it.href + it.label}
                href={it.href}
                onClick={() => setMenuOpen(false)}
                className="text-black group inline-flex flex-col items-start"
              >
                <span className="relative z-10">{it.label}</span>
                <span className="block h-[2px] bg-black w-0 transition-[width] duration-200 ease-out origin-right group-hover:w-full mt-1" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </Container>
  );
}
