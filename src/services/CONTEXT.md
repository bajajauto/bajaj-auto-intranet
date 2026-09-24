# services/ – Service Abstraction Layer

**Epic:** E1 (Task 1.3), E4 (Task 4.4), E9 (Task 9.2)
**Purpose:** Decouples components from data sources. Every service call goes through a named service module. `resolveAdapter` picks mock or api from `VITE_DATA_SOURCE`, so switching the whole app to the real API is one environment value, not twelve import changes.

## Pattern

```
Component
  └── custom hook (useNotifications)
        └── useServiceQuery  ← TanStack Query: caching, retry, loading/error
              └── notificationService.getAll()   ← async, always
                    └── resolveAdapter(mock, api)
                          ├── mock adapter  ← VITE_DATA_SOURCE=mock (default)
                          └── api adapter   ← VITE_DATA_SOURCE=api
```

## Files

| File | What it serves |
|---|---|
| `resolveAdapter.js` | Picks mock or api from `VITE_DATA_SOURCE` |
| `newsService.js` | Company news feed cards |
| `noticeService.js` | Notices panel and the header bell |
| `notificationService.js` | Notification panel entries |
| `calendarService.js` | Holidays, company events and personal meetings |
| `stockService.js` | Hero ticker — quote plus monthly sales stats |
| `vehicleService.js` | Hero turntable vehicles and their specs |
| `bajajBytesService.js` | Newsletter volumes |
| `podcastService.js` | Podcast episodes |
| `youtubeService.js` | Curated video list |
| `policyLibraryService.js` | Policy document library, by bucket |
| `csrService.js` | Programs, impact, stories, opportunities, user stats |
| `employeeLettersService.js` | Employee record, signatories, letter generation |
| `adapters/mock/` | Static data — the reference implementation of the contracts |
| `adapters/api/` | Real HTTP client. Routes are written; the server is step 3. |

## Rules

- Services export a plain object with named methods (`getAll`, `getById`, etc.)
- **Every method returns a Promise**, on both sides of the adapter split. The mock
  side gets this from `withSimulatedTransport`, not from `async` on each method.
- A service file contains nothing but the two imports and `resolveAdapter` — any
  logic in there belongs in an adapter
- When adding a data domain: contract first, then both adapters, then the service
- Never import mock data directly inside a component file
- Set `VITE_MOCK_LATENCY_MS=400` while developing loading states; at 0 the promise
  resolves in the same tick and no skeleton ever paints
