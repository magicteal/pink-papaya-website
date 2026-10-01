---
name: project-ui-and-styling-conventions
description: Fonts, brand tokens, layout tokens (1552px width), component conventions, animation, and responsive patterns
metadata:
  type: project
---

# UI & Styling Conventions

## Styling
- **Tailwind CSS v4** (PostCSS plugin `@tailwindcss/postcss`). No `tailwind.config.js` exists. All theme customization is in CSS (`src/app/globals.css`).
- Brand tokens configured in `:root`:
  - `--color-primary: #16323C` (deep ocean/teal ink)
  - `--color-accent: #9A6648` (earthy warm terracotta/brown)
  - `--color-warm: #C07A5A`
  - `--rounded-10: 10px` (with `.rounded-10` utility)
  - `--navbar-h: 80px`
- Custom utility classes live in `src/app/globals.css`.

## Fonts
- **Headings**: **Playfair Display** (serif display font, `.font-playfair`), loaded via `next/font/google` in `src/app/layout.tsx`. Title Case headings.
- **Body & UI**: **Bricolage Grotesque** (clean sans, `.font-bricolage`), applied to `body`.
- *Note*: Geist Sans and Geist Mono are imported in `layout.tsx` for CSS variables but the primary visual styling relies on Playfair Display and Bricolage Grotesque.

## Layout Tokens & Container Rules (CRITICAL)
- **Home section containers**: Standardized to `w-[90%] max-w-[1552px] mx-auto`. Applied directly in `ExploreStaysGrid`, `TrendingDestinations`, `TestimonialsSection`, etc., to keep all sections perfectly aligned with each other and the navbar across all viewports up to 27-inch (2560px) monitors.
- **`Container.tsx`**: Uses `max-w-[1552px] px-[5%] sm:px-6 md:px-14`. Used for interior/detail pages, not for home sections directly.
- **Navbar Gutter**: `px-4 sm:px-5 lg:px-7` in `src/components/Navbar.tsx` and `src/components/home/HomeHero.tsx` (hardcoded to maintain consistent edge alignment).

## Component Placement Rules
- Page-specific section components: `src/components/home/`, `src/components/stays/`, `src/components/blog/`, etc.
- Reusable primitives: `src/components/ui/` (`Reveal`, `Counter`, `carousel`, etc.).
- Shared layout components: `src/components/` root (`Navbar`, `Footer`, `StayCard`, `FeedbackCard`, `TestimonialsCarousel`, `Container`, `WhatsAppButton`, etc.).

## Stay Cards (`src/components/StayCard.tsx`)
- **Image Aspect Ratio**: Strict `aspect-[16/10]`. User requested: "now this should be the ratio in all landscape screens". Do NOT change this aspect ratio.
- **Grid Layout**: 4 columns on large viewports (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
- **Spec Pills**: 3-column inner grid inside the card for `bed`, `guests`, `area`.
- **Carousel**: Embla carousel with interactive dot indicators for browsing stay photos directly from the card.

## Testimonials (`FeedbackCard.tsx` & `TestimonialsCarousel.tsx`)
- **Card Design**: Editorial luxury aesthetic on `#FDFAF6` warm parchment with `#E8E2D6` border and `rounded-2xl`.
- **Accents**: Subtle top gradient line (`#16323C` to `#9A6648`), large decorative serif quote glyph (`“`) in `#16323C`/15.
- **Typography**: Italicized Playfair Display quote text with generous line height (`leading-[1.6]`).
- **Author Row**: Dark circular monogram badge in `#16323C` with uppercase guest initials, bold name, location/context in `#9A6648`, and 5-star rating in `#C07A5A` warm terracotta on the right.
- **Carousel**: GSAP infinite marquee animation with pause on mouse hover, resume timer on interaction, and manual prev/next navigation arrow buttons.

## Animation
- **`motion`** (Framer Motion v12): Route transitions in `(main)/layout.tsx` (`AnimatePresence` + `FrozenRoute`), scroll reveals.
- **`gsap`**: Infinite marquee in `TestimonialsCarousel`, parallax stacking in `LeisureHighlights`.
- **`src/components/ui/Reveal.tsx`**: Shared fade-up wrapper — use this instead of creating one-off animation wrappers.

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
- Sections that share background color double their vertical padding if both have large padding — keep `pb` and `pt` balanced and tight.
- `StayCard` uses `featuredOnHome` flag from MongoDB to determine homepage display.
- Import alias is `@/*` -> `src/*`. `cn()` is located in `@/utils/utils`.
