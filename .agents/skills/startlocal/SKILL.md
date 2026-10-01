---
name: startlocal
description: Start the Pink Papaya website local Next.js dev server on port 3000 and verify service health.
---

# 🚀 StartLocal Skill — Pink Papaya Website Local Dev Server

When invoked (or when the user types `/startlocal`), launch the Next.js Turbopack development server on port 3000 via `npm run dev` and verify that the local site is serving HTTP 200.

---

## 🛠️ Execution Workflow

### Step 1: Verify Port Availability
Check if port 3000 is already active:
```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

### Step 2: Start the Development Server
If not active, start the server as a background daemon process (`IsDaemon: true`):
```powershell
npm run dev
```
*(This triggers `node ./scripts/dev.js`, which ensures port 3000 is allocated with Next.js Turbopack).*

### Step 3: Verify Health
Send a request to ensure the server and MongoDB connections are healthy:
```powershell
(Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing).StatusCode
```

### Step 4: Report to User
Provide the user with:
- Local Web URL: [http://localhost:3000](http://localhost:3000)
- Admin Portal: [http://localhost:3000/admin](http://localhost:3000/admin)
- CMS Portal: [http://localhost:3000/cms](http://localhost:3000/cms)
