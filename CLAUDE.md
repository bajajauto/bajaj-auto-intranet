# CLAUDE.md – Bajaj Auto Intranet Hub

## Project Overview

Single-Page React application serving as the unified digital front door for all Bajaj Auto employees. Built with React 18 + Tailwind CSS + Lucide React + Vite.

Phase 1 scope: fully functional, responsive front-end with static/mock data only. No API calls, no auth, no backend wiring.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18, functional components + hooks only |
| Styling | Tailwind CSS (utility-first, no CSS modules, no styled-components) |
| Icons | Lucide React — always `import { IconName } from 'lucide-react'` |
| State | React Context + useState — no Redux, no Zustand |
| Routing | Scroll-based only — no React Router, no URL routing |
| Build | Vite |
| Path alias | `@/` maps to `src/` |

## Brand Tokens (Tailwind)

Use these custom tokens from `tailwind.config.js` — never hardcode hex values in JSX:

```
brand-primary   → #1A56A8  (Bajaj blue)
brand-light     → #EBF2FA  (light blue accents)
brand-dark      → #133E82
text-primary    → #1F2937
text-secondary  → #6B7280
bg-main         → #FFFFFF
bg-alt          → #F9FAFB
shadow-card     → 0 1px 3px rgba(0,0,0,0.1)
shadow-modal    → 0 4px 12px rgba(0,0,0,0.1)
rounded-card    → 8px
rounded-btn     → 6px
rounded-modal   → 12px
```

## Folder Structure Rules

```
src/
  App.jsx               ← section orchestrator only, no logic
  index.jsx             ← entry point, ReactDOM.render only
  index.css             ← Tailwind directives + global resets
  config/               ← all static data and URL config objects
  context/              ← React Context providers only
  hooks/                ← custom hooks only (no JSX)
  services/             ← service layer (adapters pattern)
    adapters/mock/      ← Phase 1: returns static data
    adapters/api/       ← Phase 2: real API calls (stub only now)
  components/
    layout/             ← TopBanner, Header, Sidebar, MainContent
    self-service/       ← ServiceGrid, ServiceTile
    notifications/      ← NotificationsPanel, NotificationCard
    calendar/           ← CalendarWidget
    company/            ← CompanyOverview, BusinessUnitCard
    news/               ← NewsFeed, NewsCard
    it-resources/       ← ITResources
    emergency/          ← EmergencyContacts
    locations/          ← LocationsSection, LocationCard
    feedback/           ← FeedbackSection, FeedbackModal
    shared/             ← Modal, Toast, Accordion, ImagePlaceholder
```

Each folder has a `CONTEXT.md` — read it before touching files in that folder.

## Component Rules

- Functional components only — no class components
- One component per file, default export
- File name = PascalCase, matches the component name exactly
- Props are read directly — no PropTypes (ESLint rule disabled)
- No inline styles — Tailwind classes only
- Icons: 20–24px, outlined style, consistent sizing within a section

## Service Abstraction Pattern

Every data-fetching component uses this pattern — never import mock data directly into a component:

```
Component → custom hook (useXxx) → XxxService.getAll() → mock adapter (Phase 1)
```

Example:
```js
// hooks/useNotifications.js
import { notificationService } from '@/services/notificationService'
export function useNotifications() {
  return notificationService.getAll()
}
```

When Phase 2 comes, only the adapter (`services/adapters/api/`) changes — zero component edits.

## Responsive Breakpoints

| Name | Width | Grid cols | Sidebar |
|---|---|---|---|
| Mobile | < 768px | 2 | Hidden (drawer) |
| Tablet | 768–1023px | 3 | Collapsed (icons) |
| Desktop | 1024–1279px | 4 | Expanded |
| Desktop Large | ≥ 1280px | 5 | Expanded |

Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:` in that order.

## Scroll Navigation

- Every major section has a unique `id` attribute (e.g., `id="company-overview"`)
- Sidebar links use `onClick` → `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`
- Active section tracked by `useScrollSpy` hook via IntersectionObserver
- URL hash updates on scroll: `window.history.replaceState(null, '', '#' + id)`

## Accessibility Requirements (WCAG 2.1 AA)

- All interactive elements: keyboard focusable, visible focus ring
- ARIA labels on icon-only buttons and interactive elements
- Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- Modals: trap focus, close on Escape, return focus on close
- Touch targets minimum 44×44px

## Git Workflow

### Branch naming
```
feat/E{n}-{short-description}    ← feature work (one branch per task)
fix/{short-description}          ← bug fixes
hotfix/{short-description}       ← critical prod fixes
```

### Commit format (Conventional Commits)
```
feat(scope): description
fix(scope): description
style(scope): description
refactor(scope): description
docs: description
chore: description
```

### Flow
```
main (protected) ← develop (protected) ← feat/* branches
```
Always branch from `develop`, always PR back to `develop`.

## Epic Map

| Epic | Scope | Priority | Blocks |
|---|---|---|---|
| E1 | Project Setup & Infrastructure | P0 Blocker | All |
| E2 | Layout Shell (Header, Sidebar, Banner) | P0 Blocker | E3–E7 |
| E3 | Employee Self-Service Grid | P0 Critical | — |
| E4 | Dashboard Widgets (Notifications + Calendar) | P1 High | — |
| E5 | Company Overview & BU Section | P1 High | — |
| E6 | News, IT Resources & Emergency Contacts | P1 High | — |
| E7 | Locations & Feedback Section | P2 Medium | — |
| E8 | Integration, Responsive QA & Polish | P0 Critical | Needs E2–E7 |

Critical path: **E1 → E2 → E3/E4 (parallel) → E5/E6 (parallel) → E7 → E8**

## What NOT to Do

- Do not add backend API calls or authentication in Phase 1
- Do not use React Router — navigation is scroll-based only
- Do not import mock data directly into components — always go through the service layer
- Do not hardcode colors or spacing — use Tailwind tokens only
- Do not add `console.log` statements to committed code
- Do not merge into `main` directly — always go through `develop`
- Do not create new components outside the folder structure above
- Do not write PropTypes — the ESLint rule is disabled intentionally

## Phase 2 Prep (Don't implement, just be aware)

- SuccessFactors API for employee data
- Azure AD / SSO for authentication
- Real-time notification service
- Outlook calendar sync
- CCB communications feed for news
- Unified search indexing
