# CLAUDE.md – Bajaj Auto Intranet Hub

**Front end:** React 18 + Vite + Tailwind CSS + Lucide React + TanStack Query.
**API:** Fastify on Node 20 in `server/` — see `server/CONTEXT.md`.

Data flows through an async service layer; the source is chosen by `VITE_DATA_SOURCE`
(`mock` by default, `api` to use the server). No auth yet.

```
npm run dev        # front end
npm run api        # API on :3000  — needs VITE_DATA_SOURCE=api in .env
npm run fixtures   # regenerate server fixtures after changing a mock
npm run icons      # regenerate PWA icons from productMark in brand.config
```

The build is an installable PWA (vite-plugin-pwa), shipped to the Android work
profile via Intune — see `docs/mobile-app.md`. The service worker exists only in
build output, never in `npm run dev`.

## Stack rules
- Functional components only, one per file, default export
- Tailwind classes only — no inline styles, no CSS modules
- Icons: `import { IconName } from 'lucide-react'`, 20–24px
- State: React Context + useState — no Redux
- Navigation: scroll-based only — no React Router
- Path alias: `@/` → `src/`

## Brand tokens (use these, never hardcode hex)
- `brand-primary` #1A56A8, `brand-light` #EBF2FA, `brand-dark` #133E82
- `text-primary` #1F2937, `text-secondary` #6B7280
- `bg-main` #FFFFFF, `bg-alt` #F9FAFB

## Folder rules
```
src/config/        ← static data & URLs only, no React
src/context/       ← SidebarContext, UserContext
src/hooks/         ← custom hooks, no JSX
src/services/      ← service layer (mock adapters Phase 1, api/ stubs Phase 2)
src/components/
  layout/          ← TopBanner, Header, Sidebar, MainContent
  self-service/    ← ServiceGrid, ServiceTile
  notifications/   ← NotificationsPanel, NotificationCard
  calendar/        ← CalendarWidget
  company/         ← CompanyOverview, BusinessUnitCard
  news/            ← NewsFeed, NewsCard
  it-resources/    ← ITResources
  emergency/       ← EmergencyContacts
  locations/       ← LocationsSection, LocationCard
  feedback/        ← FeedbackSection, FeedbackModal
  shared/          ← Modal, Toast, Accordion, ImagePlaceholder
```

## Service pattern (never import mock data directly in a component)
```
Component → useXxx() hook → useServiceQuery → XxxService.getAll() → mock | api adapter
```
- Every service method is **async**. Every hook returns `{ data, isPending, isError, refetch }`.
- Response shapes are defined in `src/contracts/`, shared by the app and the server.
  `npm run verify:contracts` checks the mocks; `npm run verify:api` checks the server.
- `src/contracts/` and `src/services/letters/` are imported by plain Node, so they
  must stay alias-free, asset-free and use explicit `.js` extensions on imports.
- Components must handle loading and error — use `QueryBoundary`, or the three
  branches by hand. Never render an empty state while a query is still pending;
  "nothing here" is an answer, and it is a false one until the data lands.
- Anything behind a click needs its own smoke test. A page-level check passed
  while the Documents & Forms modal crashed on open, because nothing opened it.
- Adding a domain: contract → mock adapter → api adapter → service → hook → component.

## Responsive grid
| Breakpoint | Cols | Sidebar |
|---|---|---|
| `< 768px` | 2 | Drawer |
| `768–1023px` | 3 | Icon-only |
| `1024–1279px` | 4 | Expanded |
| `≥ 1280px` | 5 | Expanded |

## Git
- Branch from `develop`, PR back to `develop`
- `feat/E{n}-{task}` · `fix/{desc}` · `hotfix/{desc}`
- Commits: `feat(scope): desc` · `fix(scope): desc` · `style:` · `refactor:` · `chore:`
- Team: 2 people — lead + 1 dev. No self-merging, peer review required.

## Epic map
| Epic | Title | Priority |
|---|---|---|
| E1 | Project Setup & Infrastructure | P0 Blocker |
| E2 | Layout Shell | P0 Blocker → blocks E3–E7 |
| E3 | Self-Service Grid | P0 Critical |
| E4 | Dashboard Widgets | P1 |
| E5 | Company Overview | P1 |
| E6 | News, IT, Emergency | P1 |
| E7 | Locations & Feedback | P2 |
| E8 | QA & Polish | P0 Critical |

## Verifying
| Command | Checks |
|---|---|
| `npm run lint` | ESLint, zero warnings tolerated |
| `npm run verify:contracts` | Every mock satisfies its contract |
| `npm run verify:api` | Every API response satisfies its contract, through the real adapters |
| `npm run smoke` | The running app renders with no console errors |
| `npm run smoke:letters` | Documents & Forms opens and generates a letter and Form 60 |

## Don'ts
- Auth is off by default (`VITE_AUTH_MODE=off`) and must stay runnable that
  way — both smoke scripts drive the app with no Entra tenant behind them
- Never construct a `PublicClientApplication` outside `src/lib/msal.js`, and
  never read MSAL state outside `AuthContext` — components use `useAuth()`
- Nothing a letter certifies may come from a browser-held claim. Those
  fields are resolved server-side from the access token (steps D–E)
- Never hand-edit `server/fixtures/` — edit the mock and run `npm run fixtures`
- React Router is in, but only far enough to land sign-in: `/`,
  `/auth/callback`, `/signed-out`. Deep links into articles and letters are
  still their own piece of work — do not turn sections into routes in passing
- No direct service calls inside components — always go through a hook
- No mock data imported directly into components
- No `console.log` in committed code
- No merge to `main` directly
