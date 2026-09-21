---
name: project-directory-structure
description: Source directory layout and what each folder/subdirectory is responsible for
metadata:
  type: project
---

# Directory Structure

```
src/
  app/                    Next.js App Router
    (main)/               Public-facing website (Navbar + Footer layout)
      page.tsx            Home page (HomeHero, ExploreStaysGrid, TrendingDestinations,
                          RoomsAndStay, LeisureHighlights, TestimonialsSection, FAQSection, InstagramFeed)
      stays/              Stays listing + detail pages
      blog/               Blog index
      interior/           Interior design portfolio
      partner-with-us/    Host onboarding page
      about/              About page
      coming-soon/        Domain-gated coming soon (served to pinkpapayastays.com visitors)
      [legal pages]/      cancellation, privacy, terms
    admin/                Staff portal (stays CRUD, blogs, testimonials, locations, etc.)
    cms/                  CMS portal (pages/sections editor, roles/users, media library)
    api/                  REST API routes
    login/                Login page (shared by admin + cms)
    layout.tsx            Root layout (fonts, metadata)
  components/
    home/                 All homepage section components (9 files)
    admin/                Admin UI components
    cms/                  CMS UI components
    stays/                Stays page components
    partner/              Partner-with-us page components
    blog/                 Blog components
    ui/                   Reusable primitives (Reveal, Counter, button, carousel, input, etc.)
    [root level]          Navbar, Footer, StayCard, TestimonialsCarousel, WhatsAppButton,
                          FilterBar, StaysGridWithFilters, Hero, Container, etc.
  lib/
    models/               Mongoose models (Stay, User, Cms (Page/PageSection/PageContent/PageSeo/Role/Permission/RolePermission), MediaLibrary, AuditLog)
    cms/                  CMS logic: store.ts, rbac.ts, permissions.ts, sanitize.ts, config/
    auth.ts               Custom HMAC-SHA256 session cookie auth (no NextAuth)
    authStore.ts          User/session management
    mongodb.ts            Singleton MongoDB connection
    instagram.ts          Instagram Graph API feed + fallback posts
    mailer.ts             Nodemailer email sender
    media-storage.ts      File upload + Sharp WebP conversion
    media-url.ts          Media URL resolver (local vs VPS vs CDN)
    staysStore.ts         Stay CRUD helpers
    [other *Store.ts]     CRUD helpers per entity (blog, collections, locations, etc.)
    env.ts                Type-safe env var access
    logger.ts             Server-side structured logger
  data/                   Static data files
  utils/                  Utility helpers (cn/classnames, etc.)
  middleware.ts           Domain routing (domain -> /coming-soon, IP/localhost -> full site)
scripts/
  dev.js                  Dev server launcher (auto-port from 3000)
  vps-deploy.js           SSH VPS deploy script
  scrapers/               One-off Airbnb data scrapers
  seeds/                  DB seed scripts
  deploy/                 Deploy helpers
  archive/                Archived scripts
vps/
  nginx/                  Nginx config templates
  scripts/                VPS-side setup/maintenance scripts
public/
  images/                 Static imagery (leisure section, etc.)
  logo-files/             SVG logo variants
.agents/
  skills/                 Workspace-local skills: codebaselook, errorfree, pinkpapayalive, pushready, responsive
  memory/                 Durable project memory files (this file)
```
