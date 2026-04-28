# components/notifications/ – Notifications Panel

**Epic:** E4 (Tasks 4.1–4.2)
**Priority:** P1 High

## Components

| Component | Epic Task | Description |
|---|---|---|
| `NotificationCard.jsx` | E4-T4.1 | Single notification: icon, title, timestamp, priority badge (New / Urgent) |
| `NotificationsPanel.jsx` | E4-T4.2 | Panel container: 4–6 cards, scroll-in animation, "View All" link at bottom |

## Data Flow

`NotificationsPanel` → `notificationService.getAll()` from `@/services/notificationService` → mock adapter → static array

## Priority Badge Colors

- `Urgent` → `bg-red-100 text-red-700`
- `New` → `bg-brand-light text-brand-primary`

## Branch

`feat/E4-notification-card`, `feat/E4-notifications-panel`
