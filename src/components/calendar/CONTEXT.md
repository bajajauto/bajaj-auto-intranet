# components/calendar/ – Calendar Widget

**Epic:** E4 (Task 4.3–4.4)
**Priority:** P1 High

## Component

| Component | Epic Task | Description |
|---|---|---|
| `CalendarWidget.jsx` | E4-T4.3 | Mini month-view calendar with prev/next navigation, highlighted event dates, date click tooltip |

## Features

- Displays a full month grid (Sun–Sat)
- Prev/Next month navigation arrows
- Highlighted dots under dates that have events or holidays
  - `holiday` → red dot
  - `event` → blue dot
- Clicking a date shows a small tooltip/popup listing events for that day
- Compact week-only view on mobile (optional enhancement)

## Data Flow

`CalendarWidget` → `calendarService.getEvents()` from `@/services/calendarService` → mock adapter → static array of `{ date, label, type }`

## Branch

`feat/E4-calendar-widget`
