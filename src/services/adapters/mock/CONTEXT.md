# services/adapters/mock/ – Phase 1 Mock Adapters

Each file here implements the same interface as its `api/` counterpart but returns hardcoded static data. This is the only place mock data arrays should live.

Methods here are written **synchronously**; `_transport.js` wraps the whole
adapter to return Promises and to apply `VITE_MOCK_LATENCY_MS`. That keeps these
files as readable data, and means a method calling a sibling internally
(`podcastMock.getByVolume` uses `this.getAll()`) still resolves it directly.

These mocks are the reference implementation of `src/contracts/` — the API owes
the client exactly what they return. `npm run verify:contracts` enforces it.

**Switching to the API:** set `VITE_DATA_SOURCE=api`. No file changes.
