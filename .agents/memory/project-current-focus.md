---
name: project-current-focus
description: Active work, user preferences, and state of play as of 2026-09-30
metadata:
  type: project
---

# Current Focus (as of 2026-09-30)

## Active Work & Recent Direction
- **Site-wide Layout Consistency**: Standardized home page sections (`ExploreStaysGrid`, `TrendingDestinations`, `TestimonialsSection`, etc.) to `w-[90%] max-w-[1552px] mx-auto` to ensure consistent horizontal alignment across all displays up to 27-inch (2560px) monitors.
- **Stay Card Proportions**: Locked `StayCard.tsx` image ratio to `aspect-[16/10]` with a 4-column responsive grid on xl+ screens and a 3-column inner spec pills grid (`bed`, `guests`, `area`). User explicitly requested this ratio across all landscape displays.
- **Testimonial Section Redesign**: Replaced generic feedback cards with an editorial luxury card design in `FeedbackCard.tsx`:
  - Large decorative serif quotation mark in `#16323C`/15
  - Italicized Playfair Display quote typography
  - Monogram avatar circle with guest initials in `#16323C`
  - Subtle top accent line gradient (`#16323C` to `#9A6648`)
  - Warm parchment background (`#FDFAF6`) with border (`#E8E2D6`) and rounded-2xl corners
  - 5-star rating in `#C07A5A` warm terracotta
  - Infinite smooth GSAP marquee in `TestimonialsCarousel.tsx` with hover-pause and manual prev/next arrow controls.
- **Leisure Highlights & Rooms & Stay**: Refined parallax sticky stacking effect and responsive proportions.

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
