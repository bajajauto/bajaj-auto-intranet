# services/adapters/api/ – Real API Adapters

Each file mirrors its `mock/` counterpart method-for-method and returns the same
shape, as defined in `src/contracts/`. Active only when `VITE_DATA_SOURCE=api`.

## Status

The client and the route map are written; **the server does not exist yet**
(step 3). Flipping `VITE_DATA_SOURCE=api` today will fail every request at the
transport layer, which is the correct behaviour — the app renders its error
states rather than pretending.

## The route map

| Service | Method | Route |
|---|---|---|
| news | `getAll` | `GET /news` |
| notices | `getAll` | `GET /notices` |
| notifications | `getAll` | `GET /notifications` |
| calendar | `getEvents` | `GET /calendar/events` |
| stock | `getAll` | `GET /ticker` |
| vehicles | `getAll` / `getById` | `GET /vehicles` · `GET /vehicles/:id` |
| bajajBytes | `getAll` / `getById` | `GET /bytes/volumes` · `GET /bytes/volumes/:id` |
| podcast | `getAll` / `getByVolume` | `GET /podcast/episodes` · `GET /podcast/episodes?volumeId=` |
| youtube | `getAll` / `getByCategory` | `GET /videos` · `GET /videos?category=` |
| policyLibrary | `getByBucket` | `GET /policies/:bucketId` |
| csr | six methods | `GET /csr/*` |
| employeeLetters | `getEmployee` etc. | `GET /letters/*` · `POST /letters/generate` |

## Rules

- Adapters map transport to contract shape and nothing else. No business logic,
  no formatting, no component concerns.
- A "not found" is `null`, never a thrown error — the mocks behave that way and
  the contracts declare `.nullable()`.
- Anything else non-2xx throws `ApiError`, which the query layer surfaces as an
  error state.
