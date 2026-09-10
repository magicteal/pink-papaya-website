---
name: pushready
description: Run "npm run build ; npm run lint", inspect all compilation errors and ESLint warnings, and systematically resolve every error and warning until the codebase passes with 0 errors and 0 warnings.
---

# Push Ready Skill (`pushready`)

This skill automates running quality checks (`npm run build ; npm run lint`), identifying all compilation errors, type issues, and ESLint warnings, and systematically fixing them all until the project is 100% clean and ready to commit/push.

## Workflow Instructions

### 1. Run Quality Checks
Execute the build and lint commands:
```powershell
npm run build ; npm run lint
```
Inspect the output logs thoroughly:
- **Next.js Build / TypeScript errors**: Route typing mismatches, component props errors, syntax errors, missing exports/imports.
- **ESLint Errors and Warnings**:
  - Missing dependencies in React hooks (`react-hooks/exhaustive-deps`).
  - Unused variables or imports (`@typescript-eslint/no-unused-vars`).
  - Unescaped entities in JSX (`react/no-unescaped-entities`).
  - Missing `key` props in iterators.
  - Image optimization suggestions (`@next/next/no-img-element`).
  - Any deprecated or incorrect imports.

### 2. Systematically Resolve All Issues
Fix each issue at its root in the code:
- **TypeScript errors**: Provide proper types or type assertions without breaking runtime behavior.
- **ESLint warnings**:
  - Remove or prefix unused variables if required.
  - Fix missing hook dependencies or wrap in appropriate `useCallback`/`useMemo`/ref where appropriate.
  - Escape entities (`&apos;`, `&quot;`, `&amp;`) or use template literals.
  - Replace unoptimized `<img>` with Next.js `<Image />` or provide appropriate width/height/alt.
  - Avoid suppressing with `// eslint-disable-next-line` unless an external third-party library or edge case strictly requires it.

### 3. Iterative Verification
Re-run the checks to ensure no regressions were introduced:
```powershell
npm run build ; npm run lint
```
Continue iterating until both commands complete with **exit code 0**, **0 errors**, and **0 warnings**.

### 4. Summary & Hand-off
Provide a concise breakdown to the user:
- List each file modified and the specific error/warning resolved.
- State the final status of `npm run build` and `npm run lint` (0 errors, 0 warnings).
- Confirm that the codebase is now clean and push-ready.
