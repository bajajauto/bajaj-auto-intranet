# Bajaj Auto Intranet Hub

Single-page React app — unified digital front door for all Bajaj Auto employees. HR self-service, company news, IT support, org info in one interface.

**Phase 1:** Static front-end only. All data is hardcoded mock. No auth, no APIs.

## Layout
```
┌── TOP BANNER (fixed) ── Integrity / POSH / Vision ──┐
├── HEADER (fixed) ── Logo | Search | Bell | Profile ──┤
│ SIDEBAR │  Self-Service Grid                          │
│(collapse│  Notifications + Calendar                  │
│  -ible) │  Company Overview (BU Accordions)           │
│         │  Company News Feed                          │
│         │  IT Resources                               │
│         │  Emergency Contacts                         │
│         │  Locations                                  │
│         │  Feedback / Raise Request                   │
└─────────┴─────────────────────────────────────────── ┘
```

## 8 Epics (~19 dev-days)
E1 Setup → E2 Layout Shell → E3+E4 (parallel) → E5+E6 (parallel) → E7 → E8 QA

## Key decisions
- Scroll navigation only — no routing
- All data flows through service layer (`services/` → `components/`, never direct)
- Config-driven: tile URLs + sidebar nav live in `src/config/`, edit there to change anything
- Tailwind brand tokens defined in `tailwind.config.js`

## Locations: Akurdi · Chakan · Waluj · Pantnagar · Bangalore · Regional Offices
## BUs: Motorcycle · Commercial Vehicle · Electric Vehicle
## Service tiles (13): Team Directory · Policies · Benefits · Travel · Leave/Attendance · Compensation · Recognition–GEM · BOLT · Health & Wellness · Holiday Calendar · Documents · Idea Hub · Actions Pending
