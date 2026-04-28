# services/ – Service Abstraction Layer

**Epic:** E1 (Task 1.3), E4 (Task 4.4)
**Purpose:** Decouples components from data sources. Every service call goes through a named service module. Adapters swap between mock (Phase 1) and real API (Phase 2) without touching component code.

## Pattern

```
Component
  └── custom hook (e.g. useNotifications)
        └── notificationService.getAll()
              └── mock adapter  ← Phase 1: returns static array
              └── api adapter   ← Phase 2: fetches from real endpoint
```

## Files

| File | What it serves |
|---|---|
| `notificationService.js` | Notification panel entries |
| `calendarService.js` | Calendar events and holidays |
| `newsService.js` | Company news feed cards |
| `adapters/mock/` | Phase 1 static data implementations |
| `adapters/api/` | Phase 2 real API implementations (stubs only now) |

## Rules

- Services export a plain object with named methods (`getAll`, `getById`, etc.)
- In Phase 1, every service method calls its mock adapter
- Mock adapters return data synchronously (plain arrays/objects) — no fake async
- When adding a new data domain, add the service file AND both adapter stubs before wiring to a component
- Never import mock data directly inside a component file
