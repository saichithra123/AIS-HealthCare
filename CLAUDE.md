# Healthcare Frontend

## Project Overview
React frontend for a healthcare claim processing system. Provides role-based interfaces for customers (pre-claim submission), assessors, managers, and finance officers to process insurance claims. Includes an AI chatbot for guided claim intake.

## Tech Stack
- **React 19.2.0** with **Vite 7.2.4**
- **Material-UI (MUI) 7.3.7** + **MUI Icons**
- **Emotion** for CSS-in-JS (`@emotion/react`, `@emotion/styled`)
- **React Router DOM 7.13.0** for routing
- **ESLint 9.39.1** for linting
- Axios is installed but **not used** — all API calls use native `fetch`

## Project Structure
```
├── .dockerignore                   # Excludes node_modules, .git, dist from Docker context
├── nginx.conf                      # Custom nginx config (SPA routing, gzip, security headers)
├── Dockerfile                      # Multi-stage build with non-root user
├── src/
│   ├── main.jsx                    # Entry point (BrowserRouter basename="/ais")
│   ├── App.jsx                     # Routes + RoleProtectedRoute component
│   ├── themeprovider.jsx           # MUI theme (teal palette)
│   ├── components/
│   │   ├── Login.jsx               # Keycloak OAuth2 login
│   │   ├── Registration.jsx        # Customer pre-claim form (+ Registration.css)
│   │   ├── WebPortal.jsx           # Public landing page (always accessible)
│   │   ├── UploadDocuments.jsx     # Document upload (3 PDFs)
│   │   ├── workpool.jsx            # Claims dashboard + table (assessor/manager/finance)
│   │   ├── ClaimReview.jsx         # Assessor: AI findings review
│   │   ├── ClaimChecklist.jsx      # Assessor: verification checklist
│   │   ├── ClaimSummary.jsx        # Manager: approve/reject with details
│   │   ├── FinanceReview.jsx       # Finance: financial review + decision
│   │   └── Chatbot.jsx             # AI chatbot (multi-stage conversation)
│   ├── utils/
│   │   └── authFetch.js            # Auth wrapper with token refresh + env var validation
│   ├── assets/                     # SVG images and logos
│   ├── App.css
│   └── index.css
```

## Build & Run
```bash
npm install
npm run dev        # Dev server
npm run build      # Production build (output: dist/)
npm run lint       # ESLint
npm run preview    # Preview production build
```

## Environment Variables (.env)
```
VITE_API_BASE_URL=http://10.13.1.180:8990
VITE_KEYCLOAK_BASE_URL=http://10.13.1.180:8180
VITE_KEYCLOAK_REALM=Healthcare-QA
VITE_KEYCLOAK_CLIENT_ID=Healthcare-QA
```

**Important:** Vite bakes these at **build time**. The Dockerfile accepts them as `ARG`s so they're injected via `--build-arg` during Docker builds, ensuring they're available even if `.env` is missing from the build context.

## Routing & Roles

4 user roles: **CUSTOMER**, **ASSESSOR**, **MANAGER**, **FINANCE**

| Route | Component | Roles |
|-------|-----------|-------|
| `/` | WebPortal | All (always accessible, landing page) |
| `/login` | Login | All (always accessible) |
| `/chatbot` | Chatbot | All |
| `/registration` | Registration | CUSTOMER |
| `/upload-documents` | UploadDocuments | CUSTOMER |
| `/workpool` | Workpool | ASSESSOR, MANAGER, FINANCE |
| `/claim-review/:claimId` | ClaimReview | ASSESSOR |
| `/claim-checklist/:claimId` | ClaimChecklist | ASSESSOR |
| `/claim-summary/:claimId` | ClaimSummary | MANAGER |
| `/finance-review/:claimId` | FinanceReview | FINANCE |
| `*` (catch-all) | Redirects to `/` | All |

**Key routing decisions:**
- `/` always shows WebPortal landing page regardless of auth state
- `/login` always shows Login page (no redirect if token exists — Login component handles post-login navigation)
- Unknown routes redirect to `/` (landing page)
- Protected routes use `RoleProtectedRoute` which checks `access_token` + `userRole` in localStorage

## Authentication Flow
1. Login.jsx posts credentials to Keycloak token endpoint
2. JWT decoded to extract roles from `resource_access[clientId].roles`
3. Role mapped: assessor→ASSESSOR, approver/manager→MANAGER, finance→FINANCE, customer→CUSTOMER
4. `access_token`, `refresh_token`, `userRole`, `username` stored in **localStorage**
5. `authFetch()` wrapper in `utils/authFetch.js` adds Bearer token to requests
6. On 401: auto-refreshes token via Keycloak refresh_token grant
7. On refresh failure: clears storage, redirects to `/ais/login`
8. `authFetch.js` logs `console.error` if `VITE_API_BASE_URL` or `VITE_KEYCLOAK_BASE_URL` are missing

## Deployment

### Dockerfile (Multi-stage)
- **Build stage:** `node:20-alpine` — accepts `VITE_*` env vars as `ARG`s, uses `npm ci` for deterministic builds
- **Serve stage:** `nginx:alpine` — runs as non-root `appuser`, copies custom `nginx.conf`
- **Health check:** `wget --spider` against `/ais/` every 30s

### nginx.conf
- **SPA routing:** `try_files $uri $uri/ /ais/index.html` for all `/ais/*` routes
- **Gzip compression** for JS, CSS, HTML, SVG
- **Security headers:** X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy
- **Static asset caching:** 1 year for hashed assets (js, css, images)
- **Hidden files denied** (`location ~ /\.`)
- Root redirect: `/` → `/ais/`

### CI/CD (GitHub Actions)
- **Deploy.yaml** — Triggers on push to `feature/Healthcare`, builds with `--build-arg` for all `VITE_*` vars (with fallback defaults), cleans dangling images, verifies deployment health
- **pr-validation.yaml** — PR validation: Node 20, `npm ci`, lint + build

### .dockerignore
Excludes `node_modules/`, `.git/`, `dist/`, `.vite/`, local env overrides from build context.

## Conventions
- All authenticated API calls should use `authFetch()` from `utils/authFetch.js`
- Base URL accessed via `import.meta.env.VITE_API_BASE_URL`
- App deployed at `/ais/` subpath (configured in vite.config.js base and BrowserRouter basename)
- Components use inline `sx` props for MUI styling (not separate CSS files)
- No global state management — all state is local via `useState`/`useEffect`
- No test files exist currently

## Theme
- Primary: `rgba(139, 179, 181, 1)` (teal)
- Secondary: `rgba(53, 94, 96, 1)` (dark teal)
- CssBaseline applied globally

## Key Component Behaviors
- **WebPortal:** Landing page, always accessible. "Admin Login" nav link goes to `/login`. Chatbot launcher.
- **Registration:** Back button navigates to `/` (landing page). SSN auto-fetches policy at 11 chars.
- **UploadDocuments:** Requires 3 PDFs (diagnostic report, insurance card, medical form). Validates filenames contain expected keywords.
- **Workpool:** Fetches role-specific dashboard metrics and claim lists. Row click navigates to role-appropriate detail page.
- **Chatbot:** Multi-stage conversation (~1000 lines). Supports document upload within chat, claim status lookup, and conversational AI flow.
- **ClaimChecklist:** At least one checkbox must be checked before submit. Auto-navigates to workpool after 1.5s on success.
- **ClaimSummary/FinanceReview:** Approve/reject radio + comments. Auto-navigates to workpool on success.
