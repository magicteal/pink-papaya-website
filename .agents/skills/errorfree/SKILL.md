---
name: errorfree
description: Run "npm run build ; npm run lint" only, and systematically resolve every compilation error and ESLint warning until both exit clean with 0 errors and 0 warnings. Does nothing else — no git, no deploy.
---

# Error Free Skill (`errorfree`)

Invoked when the user types `/errorfree` or asks to make the build and lint 100% clean.

Scope is strictly build + lint. This skill never touches git (no add/commit/push), never deploys, and never runs any other script — only `npm run build` and `npm run lint`, and the code edits needed to make both pass clean. If the user wants those extra steps, that's a separate skill (`pushready`, `pinkpapayalive`), not this one.

## Workflow

### 1. Run the checks
```powershell
npm run build ; npm run lint
```

### 2. Inspect the output
- **`npm run build`** (Next.js/TypeScript): compile errors, type errors, route typing mismatches, missing exports/imports, prerender failures.
- **`npm run lint`** (ESLint): every reported error and warning — unused vars, missing hook deps (`react-hooks/exhaustive-deps`), unescaped JSX entities, missing iterator `key`s, `@next/next/no-img-element`, etc.

### 3. Fix every issue at its root
- Type errors: fix the actual type, don't just cast it away.
- Lint warnings: fix the underlying pattern (add the hook dep, remove the unused var, escape the entity, add the key). Only use `// eslint-disable-next-line` when a third-party type or an unavoidable edge case leaves no real fix — and say so when reporting.

### 4. Re-run until clean
Repeat step 1 after each round of fixes. Done only when both commands exit 0 with no errors and no warnings printed.

### 5. Report
Tell the user, concisely:
- Whether anything needed fixing, and if so, which files and what was wrong.
- The final state: `npm run build` — 0 errors; `npm run lint` — 0 warnings, 0 errors.
- Nothing else was run or changed (no commits, no pushes, no deploys).
