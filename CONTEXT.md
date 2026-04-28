# Bajaj Auto Intranet Hub – Project Context

## What This Is

A single-page React application that is the unified digital front door for all Bajaj Auto employees. It consolidates HR self-service, company communications, IT support, organizational information, and workplace resources into one modern, responsive interface.

## Current Phase

**Phase 1 – Front-End Build** (static, no API integration)
- All data is hardcoded mock/static
- Service tiles redirect to placeholder URLs
- No authentication layer
- Goal: pixel-perfect, fully responsive, accessible UI ready to plug APIs into Phase 2

## Key Architectural Decisions

**Scroll-based navigation, not routing.** There is only one HTML page. The sidebar links scroll to anchored sections. URL hash updates on scroll for shareability. No React Router.

**Service abstraction layer.** Every component reads data through a service hook (`useNotifications`, `useCalendar`, etc.) which calls a service adapter. In Phase 1, the adapter returns static arrays. In Phase 2, it hits a real API. Components never know the difference.

**Config-driven.** Service tile URLs, sidebar navigation, and emergency contacts all live in `src/config/`. Changing a URL or adding a tile means editing the config, not a component.

**Tailwind only.** No CSS modules, no styled-components. Brand tokens defined in `tailwind.config.js` — use them.

## Page Layout

```
┌─────────────────────────────────────────────┐
│  TOP BANNER (fixed) – Integrity / POSH / Vision │
├──────────────────────────────────────────────┤
│  HEADER (fixed) – Logo | Search | Bell | Profile │
├────────────┬─────────────────────────────────┤
│            │  Self-Service Grid + Widgets     │
│  SIDEBAR   │  Notifications Panel             │
│ (collapsib)│  Calendar Widget                 │
│            │  Company Overview (BU Accordions)│
│            │  Company News Feed               │
│            │  IT Resources                    │
│            │  Emergency Contacts              │
│            │  Locations (horizontal scroll)   │
│            │  Feedback / Raise Request        │
└────────────┴─────────────────────────────────┘
```

## Section Render Order (MainContent)

1. Employee Self-Service Grid (+ right-column Notifications + Calendar)
2. Company Overview (BU Accordions)
3. Company News Feed
4. IT Resources
5. Emergency Contacts
6. Bajaj Auto Locations
7. Feedback / Raise Request

## Epics (8 total, ~19 dev-days)

| Epic | Title | Days | Priority |
|------|-------|------|----------|
| E1 | Project Setup & Infrastructure | 2 | P0 Blocker |
| E2 | Layout Shell (Header, Sidebar, Banner) | 3 | P0 Blocker |
| E3 | Employee Self-Service Grid | 2 | P0 Critical |
| E4 | Dashboard Widgets | 2.5 | P1 High |
| E5 | Company Overview & BU Section | 2 | P1 High |
| E6 | News, IT Resources & Emergency Contacts | 2 | P1 High |
| E7 | Locations & Feedback Section | 2.5 | P2 Medium |
| E8 | Integration, Responsive QA & Polish | 3 | P0 Critical |

## Service Tiles (13 total)

Team Directory, Policies, Benefits, Travel, Leave/Attendance, Compensation, Recognition–GEM, BOLT–Start Learning, Health & Wellness, Holiday Calendar, Documents, Idea Hub, Actions Pending

## Business Units (Company Overview)

- Motorcycle Business Unit
- Commercial Vehicle Business Unit
- Electric Vehicle Business Unit

## Locations (7 cities)

Akurdi, Chakan, Waluj, Pantnagar, Bangalore, Regional Offices

## Non-Functional Targets

- LCP < 2.5s, TTI < 3.5s, Bundle < 300KB gzipped
- Lighthouse Accessibility ≥ 90
- WCAG 2.1 AA
- Chrome 90+, Edge 90+, Firefox 88+, Safari 14+
