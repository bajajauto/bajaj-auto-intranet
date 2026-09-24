# components/auth/ – Sign-in screens

**Epic:** E10 (Steps A–B: routing + MSAL in the SPA)
**Purpose:** Everything the user sees *before* the app shell exists. No header,
no sidebar, no data — these render above `RequireAuth`, so they carry their own
layout.

## Components

| Component | Description |
|---|---|
| `AuthScreen.jsx` | Shared centred card the other three sit in |
| `SignInScreen.jsx` | One button → `loginRedirect`. No credential fields, ever |
| `AuthPending.jsx` | Spinner shown while MSAL decides whether this load is a redirect response |
| `AuthCallback.jsx` | Route at `/auth/callback`; waits for startup, then restores the pre-login path |
| `RequireAuth.jsx` | The gate. Pass-through when `VITE_AUTH_MODE=off` |

## Rules

- **No MSAL calls in these components.** They go through `useAuth()`; the
  instance lives in `src/lib/msal.js` and nothing else constructs one.
- `AuthCallback` must not call `handleRedirectPromise` — `MsalProvider` already
  did, and a second call delivers the response to a listener nobody reads.
- `RequireAuth` gates the first data fetch as well as the UI. Queries below it
  need a token, and MSAL cannot mint one until startup finishes.
- Never render a sign-in button while `isReady` is false: authenticated users
  would see it flash on every page load.

## Routes

| Path | Element | Registered in Entra as |
|---|---|---|
| `/auth/callback` | `AuthCallback` | Redirect URI |
| `/signed-out` | `SignedOut` | Post-logout redirect URI |
| `/` | `RequireAuth` → the app | — |

Both URIs must be registered for **every** origin the app is served from —
`http://localhost:5173` for dev and the real hostname for each deployment.
