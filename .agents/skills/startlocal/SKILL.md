---
name: startlocal
description: Detect active Pink Papaya dev server or find the first available free port (starting from 3000), start the local Next.js dev server on that port, and verify service health.
---

# 🚀 StartLocal Skill — Pink Papaya Website Local Dev Server

When invoked (or when the user types `/startlocal`), dynamically locate an available port (or an already running instance starting from port 3000), launch the Next.js Turbopack development server on that port if not already running, and verify that the local site is serving HTTP 200.

---

## 🛠️ Execution Workflow

### Step 1: Detect Active Server or First Available Port
Run the project's port detection helper to check if a dev server is already running, or find the next available port:

```powershell
$portInfo = (node scripts/find-port.js --json | ConvertFrom-Json)
$port = $portInfo.port
$status = $portInfo.status
```

- **If `$status` is `"running"`**: A Pink Papaya dev server is already active and healthy on port `$port`. Skip directly to **Step 3** (Health Check) and **Step 4** (Report).
- **If `$status` is `"available"`**: Port `$port` is confirmed free and available. Proceed to **Step 2**.

---

### Step 2: Start the Development Server on Available Port
Start the server as a background daemon process (`IsDaemon: true`) bound to the available `$port`:

```powershell
npm run dev -- --port $port
```
*(This triggers `scripts/dev.js`, which launches `npx next dev --turbopack --port <port>` on the resolved free port).*

---

### Step 3: Verify Health
Send an HTTP request to ensure the server and page rendering are healthy on `$port`:

```powershell
(Invoke-WebRequest -Uri "http://localhost:$port" -UseBasicParsing).StatusCode
```

If starting a new server, allow 2-5 seconds for Next.js Turbopack initialization before checking.

---

### Step 4: Report to User
Provide the user with clear status feedback and clickable links with the resolved port:
- **Status**: Whether an existing server was detected or a new server was launched on port `$port`
- **Local Web URL**: `http://localhost:<PORT>`
- **Admin Portal**: `http://localhost:<PORT>/admin`
- **CMS Portal**: `http://localhost:<PORT>/cms`
