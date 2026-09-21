---
name: project-deployment-and-env
description: Hosting, VPS details, deployment workflow, Nginx, env vars, and domain/IP routing
metadata:
  type: project
---

# Deployment & Environment

## Hosting
- **VPS IP**: `187.127.187.184` (Brazil-based VPS)
- **Live URL**: `http://187.127.187.184/` — full site (accessible by IP)
- **Domain**: `https://pinkpapayastays.com/` — routes to `/coming-soon` via middleware
- **PM2**: manages the Next.js process on VPS
- **Nginx**: reverse proxy on VPS; serves `/media/` files directly from disk (bypasses Next.js)

## Deployment Workflow
1. `scripts/vps-deploy.js` — SSH into VPS, git pull, `npm ci`, `npm run build`, `pm2 restart`
2. Skill `/pinkpapayalive` — full build+lint+push+deploy verification pipeline

## Media Storage
- **Production**: `/srv/papaya-media` on VPS disk, served by Nginx at `/media/` (survives redeploys)
- **Dev**: `./public/uploads` (default, no `MEDIA_DIR` set)
- **`MEDIA_PROXY_ORIGIN`**: if set in dev `.env`, Next.js rewrites `/media/*` to pull from VPS directly (for CMS image previews locally)

## Required Env Vars
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `AUTH_SECRET` | 32-char secret for HMAC session cookie signing |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | Database name (`pink-papaya`) |
| `MEDIA_DIR` | (Production) Disk path for uploaded media |
| `NEXT_PUBLIC_CDN_BASE_URL` | (Optional) CDN prefix for public assets |
| `MEDIA_PROXY_ORIGIN` | (Dev only) Pull /media/* from VPS for local CMS preview |

## Image Optimization
- **Dev**: `unoptimized: true` to avoid flaky dev server recompilation
- **Prod**: AVIF + WebP formats, custom device sizes `[360, 414, 640, 750, 828, 1080, 1200]`
- Allowed remote image hosts: `*.amazonaws.com`, `*.cloudfront.net`, `images.unsplash.com`, `*.muscache.com` (Airbnb CDN), `*.cloudflare.net`

## Nginx
- Serves `/media/` directly from `/srv/papaya-media`
- Serves static assets (`/logo-files/`, `/images/`, `/font-files/`) with immutable cache headers
- Reverse proxies everything else to Next.js on port 3000

## Key Gotcha
- When deploying, do NOT run `npm install` manually — use `npm ci` to respect lockfile.
- PM2 must be restarted after build, not reloaded (app pulls env vars at startup).
