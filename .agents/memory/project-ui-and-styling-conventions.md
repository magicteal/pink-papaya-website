---
name: project-ui-and-styling-conventions
description: Styling approach, design tokens, component conventions, animation libraries, and responsive patterns
metadata:
  type: project
---

# UI & Styling Conventions

## Styling
- **Tailwind CSS v4** (PostCSS plugin `@tailwindcss/postcss`). No `tailwind.config.js`. All theme customization in CSS (globals.css).
- Custom utility classes should be added to `src/app/globals.css`, not inline `style` props unless using viewport-relative values.
- Prefer `clamp()`, `vh`, `vw` for viewport-responsive sizing (especially hero sections) over fixed px.
- Brand palette: warm pinks, creams, charcoals. `bg-[#FAF8F5]` is the standard section background.

## Fonts
- Primary: **Cormorant Garamond** (serif, loaded via `next/font`) — headings
- Secondary: likely **Inter** or system sans for body/UI

## Component Placement Rules
- One-off page components go in `src/components/home/`, `src/components/stays/`, etc. — grouped by page.
- Reusable primitives (Button, Input, Carousel, etc.) go in `src/components/ui/`.
- Shared layout-level components (Navbar, Footer, StayCard, FilterBar) go in `src/components/` (root level).

## Animation
- **`motion`** (Framer Motion v12): used for page transitions via `AnimatePresence` in `(main)/layout.tsx`, and scroll-reveal animations.
- **`gsap`**: used for advanced effects (carousels, marquees, parallax). GSAP is optional-flagged.
- `src/components/ui/Reveal.tsx`: a convenience wrapper for scroll-reveal animations — use this instead of re-implementing.

## Responsive
- Desktop-first for the hero; fluid `clamp()` units used on hero and search bar.
- Skill `/responsive` exists for a full audit.
- Hero: uses `clamp()`/`vh`/`vw` throughout — do not add fixed px heights.
- Navbar: sticky, clear white separator required; hero `padding-top` must account for navbar height.

## Homepage Section Order
1. `HomeHero` + `HeroSearchBar`
2. `ExploreStaysGrid`
3. `TrendingDestinations`
4. `RoomsAndStay`
5. `LeisureHighlights`
6. `TestimonialsSection`
7. `FAQSection`
8. `InstagramFeed`
9. `Footer`

## Key Gotchas
- Sections that share `bg-[#FAF8F5]` background will **double their padding** at boundaries — keep `pb` on one section and `pt` on the next minimal to avoid large whitespace gaps.
- `WhatsAppButton` is a floating CTA — don't let section z-index overlap it.
- Stay card images are Embla carousels with dot indicators (recently added).
- `StayCard` uses `featuredOnHome` flag from DB to show on homepage grid.
