---
name: project-data-models
description: MongoDB Mongoose models, their fields, and collections
metadata:
  type: project
---

# Data Models (MongoDB / Mongoose)

## Stay (`stays` collection)
Core property listing. Fields:
- `id` (unique string slug), `title`, `imageUrl`, `area`, `bed`, `guests`
- `category`, `categories[]`, `propertyType`, `description`, `pricePerNight` (supports numeric strings or "Price on Request" fallback)
- `images[]`, `amenities[]` (strings mapped to icons via `src/lib/amenityIcons.tsx`), `location`, `aboutContent`, `locationMapUrl`
- `nearbyPlaces[]: {name, distance}`, `faqs[]: {question, answer}`
- `featuredOnHome` (boolean — controls homepage display)
- Timestamps: `createdAt`, `updatedAt`

## User (`users` collection)
Admin/CMS users.
- `email` (unique), `passwordHash` (bcrypt), `roleKey` (default `'admin'`), `createdBy`

## Role/Permission (RBAC — `roles`, `permissions`, `role_permissions` collections)
- `Role`: `key` (unique), `name`
- `Permission`: `key` (unique), `label`, `description`
- `RolePermission`: `roleKey + permissionKey` (unique compound index)

## CMS Content (`pages`, `page_sections`, `page_content`, `page_seo` collections)
- `Page`: `slug` (unique), `label`, `publicPath`
- `PageSection`: `pageId`, `key`, `label`, `sortOrder`
- `PageContent`: `pageId`, `sectionKey`, `fieldKey`, `value` (Mixed) — stores per-field CMS edits
- `PageSeo`: `pageId`, `title`, `description`, `keywords[]`, `ogImageUrl`

## MediaLibrary (`media_library` collection)
Uploaded media metadata (filename, path, mimeType, size, etc.)

## AuditLog (`audit_logs` collection)
Tracks admin/CMS actions.

## Secondary JSON-Backed Stores (`src/lib/*Store.ts`)
The following entities currently use in-memory stores initialized from static `src/data/*.json` files:
- `locations` (`locations.json`), `collections` (`collections.json`), `propertyTypes` (`propertyTypes.json`)
- `blog` (`blog.json`), `interior` (`interior.json`), `interiorFeedback` (`interiorFeedback.json`), `hostTestimonials` (`hostTestimonials.json`)

## Key Notes
- The `Stay.id` field is a custom string slug (NOT `_id`). Use this for lookups and URLs.
- All stores (e.g. `src/lib/staysStore.ts`) abstract DB access. Call store functions, don't query Mongoose directly in route handlers.
- CMS content is fetched via `getCmsPublicContent(pageSlug)` from `src/lib/cms/store.ts` in page.tsx server components.

