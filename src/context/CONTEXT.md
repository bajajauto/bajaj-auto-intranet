# context/ – React Context Providers

**Epic:** E1 (Task 1.5)
**Purpose:** Application-wide state shared across the component tree. Only two contexts exist in Phase 1.

## Files

| File | State it holds |
|---|---|
| `SidebarContext.jsx` | `isExpanded` (bool), `toggleSidebar()`, `isMobileOpen` (bool), `setMobileOpen()` |
| `UserContext.jsx` | Mock employee profile: name, email, designation, department, avatar, role |

## Rules

- Wrap both providers in `App.jsx` — `UserProvider` outermost, `SidebarProvider` inside
- Consume with `useSidebar()` and `useUser()` named hooks exported from each file
- No async data fetching here — UserContext holds a static mock object in Phase 1
- Phase 2: `UserContext` will fetch from SuccessFactors / Azure AD on mount
