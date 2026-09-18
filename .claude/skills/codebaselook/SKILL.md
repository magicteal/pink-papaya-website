---
name: codebaselook
description: Perform a full sweep of the entire codebase (structure, stack, routes, data models, conventions, scripts, integrations) and persist the findings as durable project memories so future sessions start with full context.
---

# Codebase Look Skill (`codebaselook`)

Invoked when the user types `/codebaselook` or asks you to "look at the whole codebase and remember it".

Goal: build an accurate mental model of the project **and write it to persistent memory**, so later sessions do not need to re-explore.

---

## 1. Survey the Codebase

Work outside-in. Prefer fast shell reads (`cat`, `sed -n`, `find`) and `Grep`/`Glob` over opening every file. Do not read `node_modules`, `.next`, `.git`, build output, lockfiles, or binary/media assets.

### A. Project identity & stack
- `package.json` — name, scripts (`dev`, `build`, `lint`, custom scripts), dependency set and what each major dep implies (framework, ORM/ODM, animation, UI kit, email, image processing).
- Config files: `next.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json`, `middleware.ts`.
- `.env.example` — required environment variables and external services (never read or record secret values from `.env`).
- Existing docs: `README.md`, `DOCS.md`, `CLAUDE.md`, and any `*.md` at root.

### B. Directory map
- Enumerate top-level dirs and the tree under `src/` (2–3 levels): `app/`, `components/`, `lib/`, `data/`, `utils/`, plus `scripts/`, `public/`, `vps/`, `.agents/skills/`.
- Note what each directory is responsible for in one line.

### C. Routes & surfaces
- Map App Router routes: every `page.tsx`, `layout.tsx`, `route.ts` under `src/app`.
- Separate public pages, admin/protected pages, and API endpoints (method + purpose).
- Note auth/middleware gating and how it is enforced.

### D. Data layer
- Database/ODM models and their schemas/fields/relations.
- Static data files under `src/data`.
- Data access helpers in `src/lib` and `src/utils`.

### E. Components & UI conventions
- Component groupings (e.g. `components/home`, `components/ui`) and the notable components in each.
- Styling approach (Tailwind version, design tokens, brand colors, fonts), animation libraries and how they are used, responsive breakpoint conventions.
- Reusable primitives that new code should use instead of re-implementing.

### F. Tooling, scripts & ops
- Custom scripts in `scripts/` and what they do.
- Deployment/hosting setup (`vps/`, Vercel config, CDN/caching).
- Existing project skills in `.agents/skills/` and existing commands in `.claude/commands/`.

### G. Conventions & history
- `git log --oneline -20` for recent direction of work.
- Naming, file layout, import alias (`@/`), client vs server component patterns, error/loading conventions.

---

## 2. Decide What Is Worth Remembering

Memory is for what a future session **cannot cheaply re-derive** or would get wrong by default. Record:
- Architecture and conventions that must be followed (import aliases, component placement rules, styling tokens, branding).
- Non-obvious wiring: how auth works, where admin lives, which env vars gate which feature, which script must be run after a data change.
- Gotchas: things that look wrong but are intentional, known-fragile areas, platform quirks.
- Ongoing work, goals, and constraints stated by the user or implied by recent commits (convert relative dates to absolute).

Do **not** record: an exhaustive file listing, restatements of git history, anything already written in `CLAUDE.md`/`DOCS.md`, or transient details of the current task.

---

## 3. Write the Memories

Write into the session's memory directory (the path given in the system prompt, e.g.
`C:\Users\marsh\.claude\projects\<project-slug>\memory\`). Write files directly — the directory already exists.

**One fact per file.** Use short kebab-case slugs. Frontmatter:

```markdown
---
name: <short-kebab-case-slug>
description: <one-line summary used to decide relevance during recall>
metadata:
  type: user | feedback | project | reference
---

<the fact. Link related memories with [[their-name]].>
```

- `project` — architecture, stack, conventions, ongoing work, constraints.
- `reference` — URLs, dashboards, admin panels, deployment targets, tickets.
- `user` — who the user is, their role and preferences.
- `feedback` — how the user wants you to work; include `**Why:**` and `**How to apply:**` lines.

Suggested set for a full sweep (merge/skip as the project warrants):
- `project-stack-and-scripts`
- `project-directory-structure`
- `project-routes-and-apis`
- `project-data-models`
- `project-ui-and-styling-conventions`
- `project-auth-and-admin`
- `project-deployment-and-env`
- `project-custom-skills-and-scripts`
- `project-current-focus` (absolute-dated)

**Before writing each file, check whether a memory already covers it** (`ls` the memory dir and read candidates). Update the existing file instead of creating a near-duplicate; delete memories the sweep proves wrong.

---

## 4. Update the Index

Append one line per memory to `MEMORY.md` in the same directory:

```
- [Title](file.md) — short hook
```

`MEMORY.md` is an index only: one line per memory, no frontmatter, never memory content. Do not duplicate lines that already exist.

---

## 5. Report Back

Summarize for the user in the chat:
1. What the project is, in two or three sentences.
2. The architecture map (routes, data, components, ops) — compact, no file dumps.
3. Anything surprising, inconsistent, or risky found during the sweep.
4. The list of memory files written or updated.

Keep the report tight; the detail lives in the memory files, not in the transcript.
