---
name: project-routes-and-apis
description: All App Router routes, surfaces, auth gating, and API endpoints
metadata:
  type: project
---

# Routes & APIs

## Public Pages (`(main)` group — has Navbar + Footer + page-transition animation)
| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `page.tsx` | Full homepage with 8 sections |
| `/stays` | `StaysGridWithFilters` | Filterable stays listing |
| `/stays/[id]` | dynamic | Individual stay detail |
| `/blog` | Blog index | |
| `/blog/[id]` | Blog post | |
| `/interior` | Interior portfolio | |
| `/interior/[id]` | Interior detail | |
| `/partner-with-us` | Host onboarding | |
| `/about` | About page | |
| `/coming-soon` | Minimal coming soon | Served to ALL domain visitors via middleware |
| `/cancellation-and-refund-policy` | Legal | |
| `/privacy-policy` | Legal | |
| `/terms-and-conditions` | Legal | |

## Admin Portal (`/admin` — RBAC protected)
Stays CRUD, blog, collections, host testimonials, interior, interior testimonials, locations, property types, admin user management.

## CMS Portal (`/cms` — RBAC protected)
Page/section content editor, roles, users, media library.

## Auth
- `/login` — shared login page for admin + CMS
- Auth: custom HMAC-SHA256 signed cookie (`auth` cookie, 7-day TTL). No NextAuth.
- Protected by `src/lib/rbac.ts` checks in server components/API routes.

## API Routes (`/api/`)

### Auth
- `POST /api/login` — bcrypt verify + set auth cookie
- `POST /api/logout` — clear auth cookie

### Stays
- `GET /api/stays` — list all stays
- `GET/PUT/DELETE /api/stays/[id]`

### Blog
- `GET/POST /api/blog`
- `GET/PUT/DELETE /api/blog/[id]`

### Instagram
- `GET /api/instagram` — Instagram Graph API feed (falls back to static posts)
- `GET /api/instagram-image` — proxy for Instagram CDN images

### Media
- `GET /api/media/[...key]` — serve uploaded files from disk
- `POST /api/upload` — upload + Sharp WebP conversion
- `GET/POST /api/cms/media` — CMS media library CRUD
- `DELETE /api/cms/media/[id]`
- `POST /api/cms/media/upload`

### CMS
- `GET /api/cms/pages` — list CMS pages
- `GET/PATCH /api/cms/pages/[slug]` — page metadata
- `GET/PATCH /api/cms/pages/[slug]/content` — section content
- `GET/PATCH /api/cms/pages/[slug]/seo` — SEO fields
- `GET/POST/PUT/DELETE /api/cms/roles`, `/api/cms/permissions`, `/api/cms/users`
- `GET /api/cms/me` — current logged-in user

### Other
- `POST /api/contact` — contact form email (Nodemailer)
- `GET /api/health` — health check
- `GET/POST/PUT/DELETE` — locations, property-types, collections, host-testimonials, interior, interior-feedback, admin/admins

## Middleware Routing Rule
- Domain access (e.g. `pinkpapayastays.com`) -> rewrite to `/coming-soon`
- IP access (`187.127.187.184`) or localhost -> full site
- Static assets (`/_next`, `/api`, `/media`, `/images`, `/logo-files`, `/favicon.ico`) bypass all gating
