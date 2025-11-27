import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { stays } from "@/data/stays";
import { posts } from "@/data/blog";

export default function Footer() {
  const popular = stays.slice(0, 3);
  const recent = posts.slice(0, 2);

  return (
    <footer className="footer border-t border-neutral-400/80 bg-white text-neutral-800">
      <Container>
        <div className="py-8 md:py-12">
          <div className="flex items-center justify-center">
            <Image
              src="/logo-files/logo-black.svg"
              alt="Pink Papaya"
              width={160}
              height={32}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
            {/* Brand & Contact */}
            <div className="md:col-span-4">
              <p className="mb-4 text-sm text-neutral-600">
                A calm coastal stay with thoughtful interiors, small-batch
                breakfasts, and quiet gardens. Book stays, explore our
                interior projects, or read stories on the blog.
              </p>

              <div className="text-sm text-neutral-700 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500">
                    Location
                  </div>
                  <address className="not-italic">21400 Pacific Sunset Blvd, Malibu, CA 90265</address>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500">Phone</div>
                  <div>
                    <a className="hover:underline" href="tel:+13105552140">(310) 555-2140</a>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500">Email</div>
                  <div>
                    <a className="hover:underline" href="mailto:hello@pinkpapaya.com">hello@pinkpapaya.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-600 font-playfair">Explore</h5>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:underline" href="/">Home</Link></li>
                <li><Link className="hover:underline" href="/stays">Stays</Link></li>
                <li><Link className="hover:underline" href="/interior">Interior</Link></li>
                <li><Link className="hover:underline" href="/about">About</Link></li>
                <li><Link className="hover:underline" href="/contact">Contact</Link></li>
                <li><Link className="hover:underline" href="/terms-and-conditions">Terms & Conditions</Link></li>
                <li><Link className="hover:underline" href="/cancellation-and-refund-policy">Cancellation Policy</Link></li>
                <li><Link className="hover:underline" href="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Popular stays (dynamic) */}
            <div className="md:col-span-3">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-600 font-playfair">Popular Stays</h5>
              <ul className="space-y-2 text-sm">
                {popular.map((s) => (
                  <li key={s.id}>
                    <Link className="hover:underline" href={`/stays/${s.id}`}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent posts + newsletter */}
            <div className="md:col-span-3">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-600 font-playfair">From the Journal</h5>
              <ul className="space-y-2 text-sm mb-4">
                {recent.map((p) => (
                  <li key={p.id}>
                    <Link className="hover:underline" href={`/blog/${p.id}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>

              <form action="#" method="post" className="flex items-center gap-2">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input id="footer-email" name="email" type="email" placeholder="you@example.com" required className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-800" />
                <Button type="submit" variant="black" size="sm">Subscribe</Button>
              </form>

              <div className="mt-4 flex items-center gap-3">
                <Button asChild variant="outlineBlack" size="icon" aria-label="Instagram">
                  <Link href="https://instagram.com" target="_blank"><Instagram className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outlineBlack" size="icon" aria-label="Facebook">
                  <Link href="https://facebook.com" target="_blank"><Facebook className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outlineBlack" size="icon" aria-label="X">
                  <Link href="https://x.com" target="_blank"><Twitter className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-neutral-200" />

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-neutral-500 md:flex-row">
          <div>© {new Date().getFullYear()} Pink Papaya Stays. All rights reserved</div>
          <div className="flex items-center gap-4">
            <Link className="hover:underline" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:underline" href="/terms-and-conditions">Terms and Conditions</Link>
            <span className="text-neutral-400">·</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
