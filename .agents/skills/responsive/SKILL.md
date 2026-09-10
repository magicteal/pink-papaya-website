---
name: responsive
description: Audit and optimize web components and pages for 100% responsiveness across all screen sizes (mobile, tablet, laptop, desktop, ultra-wide), eliminating horizontal overflow, fixing touch targets, and refining fluid typography and layouts.
---

# Responsive Optimization Skill (`responsive`)

This skill is invoked when the user types `/responsive` or requests to make pages, components, or the entire application responsive across all screen sizes.

---

## Responsive Design Principles & Breakpoints

Standard viewport targets to evaluate and optimize:
- **Mobile Small/Medium (320px - 390px)**: iPhone SE, iPhone 12-15 mini/standard, Galaxy S.
- **Mobile Large (390px - 480px)**: iPhone Pro Max, Galaxy Plus/Ultra.
- **Tablet Portrait (600px - 768px)**: iPad Mini, iPad portrait (`md:` breakpoint).
- **Tablet Landscape / Small Laptop (768px - 1024px)**: iPad landscape, small laptops (`lg:` breakpoint).
- **Desktop / Standard Laptop (1024px - 1440px)**: MacBook Air/Pro, 1080p desktop (`xl:` breakpoint).
- **Large Desktop / Ultra-wide (1440px - 1920px+)**: 2K/4K monitors (`2xl:` breakpoint).

---

## Optimization Workflow

### 1. Identify Target Scope
- Determine target files (active component, page, or full route).
- Check navigation headers, hero banners, content grids, cards, modals/drawers, and footers.

### 2. Systematic Code Audit & Refactor

#### A. Prevent Horizontal Overflow & Viewport Escapes
- Ensure no fixed pixel widths exceed mobile bounds (`w-[500px]` without `max-w-full`).
- Container constraints: Use `w-full max-w-[...] mx-auto px-4 sm:px-6 md:px-8 lg:px-12`.
- Check absolute positioned elements to ensure they don't cause page-level horizontal scroll (`overflow-x-hidden` on root wrapper where necessary).
- Verify tables, code blocks, and pre-formatted text have `overflow-x-auto`.

#### B. Fluid Typography & Spacing
- Replace fixed giant font sizes with responsive steps:
  - Example: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`.
- Avoid overflowing single words: Use `break-words` or `hyphens-auto` for long titles.
- Line heights: Ensure tight leading on large mobile headings (`leading-tight` or `leading-snug`).
- Vertical spacing: Scale padding down gracefully on mobile (`py-10 sm:py-16 md:py-24`).

#### C. Grid & Flex Reflow
- Mobile-first stacking:
  - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
  - Staggered or checkerboard cards: Ensure proper stacking order on single-column (`order-1`, `order-2`).
- 50/50 split layouts:
  - Collapse from side-by-side to stacked gracefully on mobile/tablet.
  - Symmetrical cards: Ensure image and text card heights adapt on small viewports without awkward whitespace or text truncation.

#### D. Full-Height & Sticky Sections
- Replace rigid `h-screen` or `100vh` on mobile with dynamic viewport units:
  - Use `h-[100dvh]` or `min-h-[100dvh]` to account for mobile browser address bars.
- Stacking / parallax sections:
  - Ensure sticky containers have sufficient scroll distance and don't trap the user on mobile touch devices.
  - On mobile screens, provide adequate internal scrollability if content height exceeds the screen.

#### E. Touch Target & Interactive Accessibility
- Ensure all clickable items, buttons, filters, and icon links meet minimum 44x44px touch targets on mobile (`min-h-[44px] min-w-[44px]`).
- Hover-only states: Ensure hover effects have active/tap equivalents or don't hide crucial controls on touch screens.

---

## 3. Verification & Testing

1. **Type & Lint Check**:
   - Run `npx tsc --noEmit` to guarantee 0 TypeScript errors.
   - Run `npx eslint <target_file>` to guarantee 0 lint errors/warnings.

2. **Multi-Viewport Browser Inspection**:
   - Test at Mobile (375x667, 390x844).
   - Test at Tablet (768x1024).
   - Test at Laptop/Desktop (1280x800, 1536x730).
   - Verify `document.documentElement.scrollWidth <= window.innerWidth` (zero horizontal overflow).

3. **User Summary**:
   - Report changes made per breakpoint.
   - Confirm verification across mobile, tablet, and desktop viewports.
