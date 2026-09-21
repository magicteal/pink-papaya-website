---
name: project-custom-skills-and-scripts
description: Workspace skills, their triggers, and what each does
metadata:
  type: project
---

# Custom Skills & Scripts

## Workspace Skills (`.agents/skills/`)

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `codebaselook` | `/codebaselook` | Full codebase sweep + write durable memory files |
| `errorfree` | `/errorfree` | Run `npm run build ; npm run lint`, fix all errors/warnings to 0, nothing else |
| `pushready` | `/pushready` | Build + lint clean, then commit + push to GitHub |
| `pinkpapayalive` | `/pinkpapayalive` | Build, lint, push to GitHub, SSH deploy to VPS, verify live site |
| `responsive` | `/responsive` | Full responsiveness audit across all screen sizes |

## Global Skills (available in all projects)
- `agy-customizations` — Antigravity customization system guide
- `antigravity-guide` — Antigravity CLI/IDE guide
- `feature-memory` — Auto-document new features as memory

## Key Scripts
- `scripts/dev.js` — `npm run dev` runs this; picks port 3000 (or next free)
- `scripts/vps-deploy.js` — SSH deploy shortcut
- `scripts/seeds/` — DB seeding (run once to populate fresh DB)
- `scripts/scrapers/` — Airbnb data extraction (used historically to populate 42 stays)
