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
