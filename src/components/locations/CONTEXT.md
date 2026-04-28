# components/locations/ – Bajaj Auto Locations

**Epic:** E7 (Tasks 7.1–7.2)
**Priority:** P2 Medium

## Components

| Component | Epic Task | Description |
|---|---|---|
| `LocationCard.jsx` | E7-T7.1 | Card: image placeholder, location name, "View More" link; expanded view shows sub-locations |
| `LocationsSection.jsx` | E7-T7.2 | Horizontal scroll row on desktop, vertical stack on mobile; 6 location cards |

## Locations (static data)

| Location | Sub-locations |
|---|---|
| Akurdi | R&D, DDC, Chetak Plant, Utsah, Library, Old Corp, Transport |
| Chakan | Plant 1, Plant 2, Chakan R&D |
| Waluj | Waluj Plant, Admin Block |
| Pantnagar | Plant, Township |
| Bangalore | Bangalore Office |
| Regional Offices | Multiple ROs |

## Layout

- Desktop: `flex overflow-x-auto gap-4 snap-x` — horizontal scroll
- Mobile: `flex flex-col gap-3` (media query switch)
- Card width: `w-56` (desktop), `w-full` (mobile)

## Branch

`feat/E7-location-card`, `feat/E7-locations-section`
