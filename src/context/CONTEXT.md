# context/ – React Context Providers

**Epic:** E1 (Task 1.5)
**Purpose:** Application-wide state shared across the component tree.

## Files

| File | State it holds |
|---|---|
| `SidebarContext.jsx` | `isExpanded` (bool), `toggleSidebar()`, `isMobileOpen` (bool), `setMobileOpen()` |
| `UserContext.jsx` | The signed-in employee as the *chrome* needs them: name, email, designation, department, avatar, role |
| `AuthContext.jsx` | `enabled`, `isReady`, `isAuthenticated`, `account`, `claims`, `signIn()`, `signOut()` |

## Rules

- `AuthProvider` wraps the router's `Routes` in `App.jsx`; `UserProvider` and
  `SidebarProvider` sit inside the authenticated route, in that order
- Consume with the `useSidebar()`, `useUser()` and `useAuth()` named hooks
- `AuthContext` is the only file allowed to touch `@azure/msal-react`. With
  `VITE_AUTH_MODE=off` it serves a frozen "signed in, no account" value so no
  consumer has to branch on the environment
- `UserContext` derives from ID-token claims; it does no fetching. `designation`
  and `department` are **not** standard claims and are empty until IT adds them
  as optional claims or the API returns them — treat both as optional
- This is *not* the record letters are built from. That one comes from the API,
  resolved server-side from the access token (SuccessFactors, step E)
