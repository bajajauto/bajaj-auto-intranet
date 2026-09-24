# contracts/ – The API Contract

**Epic:** E9 (Task 9.1) · **Purpose:** One written definition of every piece of
data the site consumes, so the mock adapter and the real API cannot drift apart
silently.

## Why this exists

`services/CONTEXT.md` promised that Phase 2 would be "swap adapter only, zero
component changes". That only holds if both adapters return the *same shape*.
Nothing enforced that. These schemas do.

## Pattern

```
contracts/news.contract.js     ← the definition
  ├── mock/newsMock.js         ← implementation 1 (today)
  └── api/newsApi.js           ← implementation 2 (step 5)
```

Each file exports its schemas plus a `<name>Contract` object:

```js
export const newsContract = {
  getAll: { returns: z.array(newsArticleSchema) },
  getById: { args: z.tuple([slug]), returns: newsArticleSchema.nullable() },
}
```

`args` is present only where the method takes parameters — those become the
route parameters when the endpoint is built.

## Rules

- A contract describes what components **consume**, not what the source stores.
  SharePoint's column names never appear here; mapping happens in the adapter.
- Shared formats live in `_shared.js`. Don't redefine a date regex locally.
- Enumerate a field when the UI switches on it (`priority` drives badge colour),
  leave it a free string when it is only a label (`category`).
- Encode invariants as `.refine()` where one exists — `slotsTaken <= slotsTotal`
  is part of the contract, not a component's problem.
- Changing a schema is an API change. It needs the same review as changing a
  component that reads it.

## Verifying

```
npm run verify:contracts
```

Loads every mock through Vite (so `@/` aliases and asset imports resolve the
way they do in the app) and validates every method's return value against its
contract. Exits non-zero on drift — safe to put in CI.
