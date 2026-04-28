# hooks/ – Custom React Hooks

**Epic:** E2 (Tasks 2.5), E1 (Task 1.2)
**Purpose:** Reusable stateful logic extracted from components. No JSX in this folder.

## Files

| File | What it does |
|---|---|
| `useScrollSpy.js` | Tracks which section is currently in the viewport using IntersectionObserver. Returns the active `sectionId`. Updates the URL hash on change. |
| `useMediaQuery.js` | Returns a boolean indicating if a CSS media query currently matches. Used for conditional rendering at breakpoints. |

## Rules

- No JSX — these files export plain functions only
- Each hook must have a single, clearly named return value or object
- `useScrollSpy` accepts an array of section IDs and returns the currently active one
- `useMediaQuery` accepts a query string (e.g., `'(max-width: 767px)'`) and returns a boolean
