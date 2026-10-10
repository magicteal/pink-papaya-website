---
name: project-current-focus
description: Active work, user preferences, and state of play as of 2026-10-08
metadata:
  type: project
---

# Current Focus (as of 2026-10-08)

## Active Work & Recent Direction
- **Official Branding & SVG Logos**: Replaced text placeholder headers with official vector assets (`/logo-files/logo-black.svg` on light themes, `logo-white.svg` on dark themes) across Navbar, Login, Admin, and CMS headers.
- **Custom Amenity Icons & Selector**: Added `src/lib/amenityIcons.tsx` mapping 40+ Lucide icons categorized into 6 sections (Essentials, Climate, Dining, Outdoors, Wellness, Safety) with fuzzy keyword tag lookup. Implemented interactive modal picker `AmenityIconPicker.tsx` in `StayForm`.
- **Flexible Pricing ("Price on Request")**: Enhanced `formatPriceString` in `src/utils/formatCurrency.ts` and updated `StayForm.tsx`, `StayCard.tsx`, and `BookingWidget.tsx` to handle properties with "Price on Request" without validation failures.
- **Automated Viewport Verification**: Introduced `scripts/headless-check.js` capturing headless screenshots across 6 viewports (13" laptop up to 32" 4K) to verify layout integrity.
- **Dev Workflow & Skills**: Added `/startlocal` skill to streamline starting the local Next.js dev server on port 3000 and verifying HTTP status.
- **Site-wide Layout Consistency**: Standardized home page sections (`ExploreStaysGrid`, `TrendingDestinations`, `TestimonialsSection`, etc.) to `w-[90%] max-w-[1552px] mx-auto` to ensure consistent horizontal alignment across all displays up to 27-inch (2560px) monitors.
- **Stay Card Proportions**: Locked `StayCard.tsx` image ratio to `aspect-[16/10]` with a 4-column responsive grid on xl+ screens and a 3-column inner spec pills grid (`bed`, `guests`, `area`). User explicitly requested this ratio across all landscape displays.
- **Testimonial Section**: Editorial luxury card design in `FeedbackCard.tsx` on warm parchment (`#FDFAF6`), `#16323C` monogram initials, Playfair Display quotes, and infinite GSAP marquee with hover-pause.

## User Preferences & Critical Constraints
- **Card sizing and ratio**: Keep `aspect-[16/10]` for stay cards; cards should feel balanced and not overly tall.
- **Container widths**: All major home sections must match `w-[90%] max-w-[1552px] mx-auto` to prevent ragged edges or width mismatch on 27" screens.
- **Tight whitespace**: Keep padding between home sections tight; avoid large vertical gaps.
- **Coming Soon routing**: Public domain `pinkpapayastays.com` must route to `/coming-soon`; full site is accessed directly via VPS IP `187.127.187.184` or localhost (enforced in `middleware.ts`).
- **Dev Server**: `npm run dev` executes `scripts/dev.js`, auto-allocating port 3000.

## Pre-Launch Open Items
1. **Root SSH Password**: Hardcoded in `scripts/vps-deploy.js` — must be moved to environment variable before production public release.
2. **Auth Cookie**: Currently `secure: false` in `src/lib/auth.ts` for local/IP testing — needs `secure: true` on HTTPS domain launch.
3. **Public Domain Launch**: Flipping domain from `/coming-soon` to the full site requires updating the hostname check in `src/middleware.ts`.

