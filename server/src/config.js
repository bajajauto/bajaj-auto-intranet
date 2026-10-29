/*
 * Every environment value the server reads, resolved once with its default.
 * Mirrors the front end's `src/lib/env.js` — same rule, one place per side.
 */
const raw = process.env

export const PORT = Number(raw.PORT ?? 3000)
export const HOST = raw.HOST ?? '0.0.0.0'
export const IS_PRODUCTION = raw.NODE_ENV === 'production'
export const LOG_LEVEL = raw.LOG_LEVEL ?? (IS_PRODUCTION ? 'error' : 'info')

/*
 * Matches the client's TanStack Query staleTime. A shorter server TTL would
 * just refetch content the client is still serving from its own cache.
 */
export const CACHE_TTL_MS = Number(raw.CACHE_TTL_SECONDS ?? 300) * 1000

export const CORS_ORIGINS = (
  raw.CORS_ORIGINS ?? 'http://localhost:5173,http://localhost:5174,http://localhost:5175'
)
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

/** Unset means the purge endpoint is disabled rather than open. */
export const ADMIN_PURGE_TOKEN = raw.ADMIN_PURGE_TOKEN ?? ''

/* --- authentication ------------------------------------------------------ */

/*
 * `entra` or `off`. Off in development so the server runs on a laptop with no
 * tenant, the same seam as the front end's VITE_AUTH_MODE. Production defaults
 * to `entra`, so forgetting the variable fails closed rather than open.
 */
export const AUTH_MODE =
  (raw.AUTH_MODE ?? (IS_PRODUCTION ? 'entra' : 'off')) === 'entra' ? 'entra' : 'off'

export const AZURE_TENANT_ID = raw.AZURE_TENANT_ID ?? ''

/*
 * Who the token must be issued *to*: the `bajaj-intranet-api` registration.
 * Entra puts the bare client id in `aud` for v2 tokens and the App ID URI
 * (`api://...`) for v1, so both forms are accepted — comma-separated.
 */
export const AZURE_API_AUDIENCES = (raw.AZURE_API_AUDIENCE ?? '')
  .split(',')
  .map((a) => a.trim())
  .filter(Boolean)

/** The delegated scope the SPA asks for. The `scp` claim must include it. */
export const AZURE_API_SCOPE = raw.AZURE_API_SCOPE ?? 'access_as_user'

/*
 * Where the signed-in person's HR record comes from: `fixture` (the generated
 * employee, served only to the account whose email it carries) or
 * `successfactors` (step E).
 */
export const EMPLOYEE_SOURCE = raw.EMPLOYEE_SOURCE ?? 'fixture'
