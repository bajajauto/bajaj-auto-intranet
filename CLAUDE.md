# CLAUDE.md – Bajaj Auto Intranet Hub

React 18 + Vite + Tailwind CSS + Lucide React. Phase 1 = static front-end, no APIs or auth.

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
Component → useXxx() hook → XxxService.getAll() → mock adapter (Phase 1)
```
Phase 2: swap adapter only, zero component changes.

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

## Don'ts
- No API calls or auth in Phase 1
- No React Router
- No mock data imported directly into components
- No `console.log` in committed code
- No merge to `main` directly
