# components/self-service/ – Employee Self-Service Grid

**Epic:** E3 (Tasks 3.1–3.4)
**Priority:** P0 Critical — highest-visibility section on the page

## Components

| Component | Epic Task | Description |
|---|---|---|
| `ServiceTile.jsx` | E3-T3.1 | Single tile: Lucide icon + label, hover lift effect, click → configurable redirectUrl |
| `ServiceGrid.jsx` | E3-T3.2 | Responsive grid container: renders all enabled tiles from `services.config.js` |

## Grid Layout

| Breakpoint | Columns |
|---|---|
| Mobile `< 768px` | 2 |
| Tablet `768–1023px` | 3 |
| Desktop `1024–1279px` | 4 |
| Desktop Large `≥ 1280px` | 5 |

Tailwind: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`

## Tile Spec

- Size: ~120×100px desktop, proportional scale on smaller screens
- Icon: Lucide, 28px, `text-brand-primary`
- Label: `text-xs`, centered below icon
- Hover: `shadow-modal -translate-y-0.5 transition-all`
- Click: `window.location.href = tile.redirectUrl` (placeholder `#` in Phase 1)
- Touch target: minimum 44×44px (mobile)

## Data Flow

`ServiceGrid` reads `services` array from `@/config/services.config.js` — filters `enabled: true` — renders `<ServiceTile>` for each.

## Branch

`feat/E3-service-tile`, `feat/E3-service-grid`, `feat/E3-service-config`, `feat/E3-grid-responsive`
