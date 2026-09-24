/*
 * Every environment value the app reads, resolved once with its default.
 *
 * Import from here rather than touching `import.meta.env` directly — it keeps
 * the defaults in one place and makes the full set of knobs greppable.
 */

const raw = import.meta.env ?? {}

/** `mock` (default) or `api`. Decides which adapter the services resolve to. */
export const DATA_SOURCE = raw.VITE_DATA_SOURCE === 'api' ? 'api' : 'mock'

export const API_BASE_URL = raw.VITE_API_BASE_URL ?? 'http://localhost:3000'

/*
 * Artificial latency on mock calls. Exists so loading states are developable —
 * at 0 the promise resolves in the same tick and no skeleton ever paints, which
 * is how loading states rot.
 */
export const MOCK_LATENCY_MS = Number(raw.VITE_MOCK_LATENCY_MS ?? 0) || 0

/* --- authentication ------------------------------------------------------ */

/*
 * `off` (default) or `msal`. The same seam as DATA_SOURCE: with auth off the
 * app runs against mocks with no Entra tenant, which is what keeps `npm run
 * dev` and both smoke scripts working on a laptop with no Azure access. Turning
 * it on is one environment value, not a code path.
 */
export const AUTH_MODE = raw.VITE_AUTH_MODE === 'msal' ? 'msal' : 'off'

export const AZURE_TENANT_ID = raw.VITE_AZURE_TENANT_ID ?? ''
export const AZURE_CLIENT_ID = raw.VITE_AZURE_CLIENT_ID ?? ''

/*
 * The scope for *our* API, not Graph — `api://<api-client-id>/access_as_user`.
 * The browser never calls Graph for letter data: those fields are resolved
 * server-side from the token, or an employee could edit their own designation
 * before it reaches the letterhead.
 */
export const AZURE_API_SCOPE = raw.VITE_AZURE_API_SCOPE ?? ''

/** Where Entra returns the browser after sign-in. Registered in the SPA app. */
export const AUTH_CALLBACK_PATH = '/auth/callback'

/** Where it lands after sign-out. */
export const SIGNED_OUT_PATH = '/signed-out'

/*
 * Fail at startup rather than at the first click. A missing client id in a
 * deployed environment otherwise surfaces as an opaque MSAL error the moment
 * someone tries to sign in, long after the bad config shipped.
 */
if (AUTH_MODE === 'msal' && !(AZURE_CLIENT_ID && AZURE_TENANT_ID)) {
  throw new Error(
    'VITE_AUTH_MODE=msal requires VITE_AZURE_CLIENT_ID and VITE_AZURE_TENANT_ID.',
  )
}
