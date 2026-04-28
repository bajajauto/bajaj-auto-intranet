# components/company/ – Company Overview & BU Section

**Epic:** E5 (Tasks 5.1–5.4)
**Priority:** P1 High

## Components

| Component | Epic Task | Description |
|---|---|---|
| `BusinessUnitCard.jsx` | E5-T5.1 | Accordion panel: BU leader photo placeholder, description, teams list, products list |
| `CompanyOverview.jsx` | E5-T5.2 | Container: renders 3 BU accordions, first expanded by default |

## Business Units (static data, defined inline)

1. Motorcycle Business Unit
2. Commercial Vehicle Business Unit
3. Electric Vehicle Business Unit

Each BU has: `name`, `leader`, `description`, `teams[]`, `products[]`

## Accordion Behavior

- Only one BU can be expanded at a time (controlled state in `CompanyOverview`)
- First BU defaults to expanded on mount
- Expand/collapse uses smooth 200ms ease animation (`transition-all duration-accordion`)
- Leader photo renders as `<ImagePlaceholder>` (from `shared/`)

## Branch

`feat/E5-bu-card`, `feat/E5-company-overview`, `feat/E5-bu-data`, `feat/E5-accordion-polish`
