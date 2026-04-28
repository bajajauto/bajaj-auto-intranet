# components/layout/ – Page Shell Components

**Epic:** E2 (Tasks 2.1–2.6)
**Priority:** P0 Blocker — E3–E7 cannot start until E2 is merged to `develop`

These four components form the fixed structural skeleton. Every content component renders inside `MainContent`.

## Component Map

| Component | Epic Task | What it renders |
|---|---|---|
| `TopBanner.jsx` | E2-T2.1 | Fixed 36px strip at the very top: Integrity Matters, POSH, Vision & Mission links |
| `Header.jsx` | E2-T2.2 | Fixed bar below banner: Bajaj logo, hamburger, search bar, notification bell + badge, user profile dropdown |
| `Sidebar.jsx` | E2-T2.3 | Collapsible left nav: icon+label when expanded, icon-only with tooltip when collapsed; overlay drawer on mobile |
| `MainContent.jsx` | E2-T2.4 | Scrollable content wrapper; assigns section `id` anchors; hosts IntersectionObserver scroll spy |

## Layout Stacking (z-index)

- TopBanner: `z-50`, `fixed top-0`
- Header: `z-40`, `fixed top-[36px]`
- Sidebar: `z-30` (expanded), `z-50` mobile overlay
- MainContent: no z-index, scrolls naturally

## Key Interactions

- Hamburger in Header calls `toggleSidebar()` from `SidebarContext`
- Sidebar `isExpanded` drives `w-64` (expanded) vs `w-16` (collapsed)
- Mobile: sidebar is a drawer overlay, closes on nav item click or outside tap — use `isMobileOpen` / `setMobileOpen`
- Scroll spy lives in `MainContent` via `useScrollSpy` hook; passes active ID back to Sidebar for highlight

## Branch

`feat/E2-top-banner`, `feat/E2-header`, `feat/E2-sidebar`, `feat/E2-main-content`, `feat/E2-responsive-layout`
