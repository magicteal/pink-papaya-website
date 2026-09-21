---
name: project-current-focus
description: Active work and user preferences as of 2026-09-21
metadata:
  type: project
---

# Current Focus (as of 2026-09-21)

## Active Work
- **Homepage visual polish**: reducing excessive whitespace between sections. Sections that share `bg-[#FAF8F5]` background double their padding; `pb` + `pt` must both be small at section boundaries.
  - Sections already tightened: TestimonialsSection, FAQSection, InstagramFeed.
- **Hero section**: refactored to `clamp()`/`vh`/`vw` units for consistent desktop/laptop proportions. Navbar and hero must not appear "jointed" — explicit top padding on hero accounts for navbar height.
- **Stay cards**: Embla carousel with dot indicators (recently added, 2026-09-21 commit).

## User Preferences
- Tight layout — no large whitespace swaths between sections.
- Hero must be fully visible above fold on all desktop/laptop sizes.
- Navbar + Hero must have a clear white separator (no overlap).
- `npm run dev` must start on port 3000 (not 3001); `scripts/dev.js` enforces this.

## Recent Commits (as of 2026-09-21)
1. `73a386e` — carousel dot indicators on stay cards, Explore Stays grid alignment fix
2. `ad9b055` — landscape-width consistency on home/about heroes, footer blend, errorfree skill
3. `6bcc975` — Leisure Highlights sticky parallax, Rooms & Stay responsiveness, responsive skill
4. `59b95f0` — Rooms & Stay redesign, codebase structure organization, pushready skill

## What to Avoid
- Do not introduce large `py-28` or similar on sections that share background color.
- Do not change `scripts/dev.js` default port away from 3000.
- Domain `pinkpapayastays.com` must always serve `/coming-soon` (enforced by middleware).
- Never read or record actual secret values from `.env`.
