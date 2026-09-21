---
name: project-stack-and-scripts
description: Core tech stack, scripts, and key dependency notes for Pink Papaya Website
metadata:
  type: project
---

# Stack & Scripts

**Framework**: Next.js 15 (App Router, Turbopack in dev, React 19)
**Language**: TypeScript with strict config, path alias `@/` -> `src/`
**Styling**: Tailwind CSS v4 (PostCSS plugin, no `tailwind.config.js`, all config in CSS)
**Database**: MongoDB via Mongoose (v9); connection in `src/lib/mongodb.ts`
**Animation**: `motion` (Framer Motion v12) for page transitions + `gsap` (v3) for carousel/marquee
**Carousel**: Embla Carousel for stay card image carousels
**Email**: Nodemailer (`src/lib/mailer.ts`)
**Image processing**: Sharp (server-side WebP pre-optimization on upload)
**Icons**: lucide-react + react-icons
**UI primitives**: Radix UI slot, class-variance-authority, custom `src/components/ui/`
**Validation**: Zod

**Scripts**:
- `npm run dev` -> `node ./scripts/dev.js` (auto-finds free port starting at 3000)
- `npm run build` -> `next build`
- `npm run lint` -> `eslint`
- `scripts/vps-deploy.js` -> SSH deploy to VPS (git pull, npm ci, npm build, pm2 restart)
- `scripts/scrapers/` -> one-off Airbnb data scraping utilities
- `scripts/seeds/` -> DB seeding scripts
- `scripts/deploy/` -> additional deployment helpers

**Node requirement**: `>=20.0.0`
