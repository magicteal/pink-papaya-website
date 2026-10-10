# Pink Papaya Live Infrastructure & Routing Reference

## VPS Specifications & Layout
- **Host IP**: `187.127.187.184`
- **SSH Port**: `22`
- **Application User**: `papaya` (`/home/papaya`)
- **Web Root**: `/var/www/pink-papaya`
- **Media Storage**: `/srv/papaya-media` (Pre-optimized WebP assets, persistent across Git redeploys)
- **Node Runtime**: Node.js v20+ with PM2 process manager
- **PM2 App Name**: `pink-papaya` (Running on port 3000)

## Nginx Configuration Summary
- Port 80 reverse-proxy to Next.js on `localhost:3000`.
- Statically intercepts `/media/` requests and serves directly from `/srv/papaya-media`.
- Caches `/logo-files/`, `/images/`, `/font-files/` with long-lived immutable cache headers.

## Middleware Routing Rule
Located at `src/middleware.ts`:
- **Domain Traffic**: Any request host header that is NOT an IP address or localhost is rewritten to `/coming-soon`.
- **IP Traffic**: Direct requests to `http://187.127.187.184` pass through to the full site (`/`, `/stays`, `/admin`, `/cms`).
- **Exemptions**: Static assets, API routes (`/api/*`), media files (`/media/*`), images (`/images/*`), logos, and favicons bypass the rewrite.
