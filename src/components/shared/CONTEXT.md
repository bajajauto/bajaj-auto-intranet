# components/shared/ - Shared UI Primitives

**Epic:** E1 (Task 1.4)
**Priority:** P0 Blocker - used by nearly every other component

These are the lowest-level reusable components. They contain no business logic and no data fetching.

## Components

| Component              | Used by                                  | Description                                                                              |
| ---------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Modal.jsx`            | FeedbackModal                            | Overlay modal with focus trap, Escape-to-close, ARIA roles                               |
| `Toast.jsx`            | FeedbackModal                            | Temporary success/error notification banner, auto-dismisses                              |
| `Accordion.jsx`        | (generic utility)                        | Generic headless accordion primitive; CompanyOverview uses its own inline implementation |
| `ImagePlaceholder.jsx` | BusinessUnitCard, NewsCard, LocationCard | Styled empty container for images not yet uploaded                                       |
| `ScrollReveal.jsx`     | MainContent                              | Reveals major content sections as they enter the viewport; respects reduced motion       |

## Rules

- No business logic - purely presentational
- All components must be accessible: keyboard focusable, ARIA-labeled, focus traps where appropriate
- `Modal` must trap focus within the dialog while open (use a ref + keydown listener)
- `Toast` auto-dismisses after 3 seconds; parent can also dismiss it
- `ImagePlaceholder` accepts `width`, `height`, and `label` props; shows a camera icon + label text
- `ScrollReveal` should wrap section-level content only; keep section IDs mounted for scroll navigation
