---
name: project-auth-and-admin
description: Authentication mechanism, admin panel access, RBAC, and CMS portal
metadata:
  type: project
---

# Auth & Admin

## Authentication
- **Custom HMAC-SHA256 signed cookie** — no NextAuth, no JWT library.
- Implementation: `src/lib/auth.ts`
- Cookie name: `auth`, TTL: 7 days, HttpOnly.
- Login flow: `POST /api/login` -> bcrypt password check -> `sign(payload)` -> set cookie.
- Session payload: `{ sub: userId, username: email, role: roleKey, exp }`.
- Verification: `verify(token)` in server components / API route guards via `src/lib/auth.ts`.

## RBAC
- Roles stored in `roles` collection, permissions in `permissions`, mapping in `role_permissions`.
- `src/lib/cms/rbac.ts` — `can(roleKey, permissionKey)` server-side check.
- `src/lib/cms/permissions.ts` — permission key registry.
- Default role: `'admin'` (full access).

## Admin Portal (`/admin`)
- Guarded server-side by checking auth cookie + `roleKey`.
- Pages: Stays CRUD (with full form), Blogs, Collections, Locations, Property Types, Host Testimonials, Interior Testimonials, Admin Users.
- Stay form: `admin/stays/new` for create, `admin/stays/[id]` for edit/update.

## CMS Portal (`/cms`)
- Separate from `/admin` — manages page content (text, images) and SEO per page/section.
- Pages: Home, About, etc. — editable via `PageContent` model.
- Media Library: upload + manage images (stored on disk, served via `/media/`).
- Roles & Users management: add new CMS users, assign roles and permissions.
- `/cms/unauthorized` — shown when user lacks required permission.

## Key Notes
- `AUTH_SECRET` env var is required; absence throws at runtime.
- The `createdBy` field on User stores the email of the admin who created the account.
