import { API_BASE_URL } from '@/lib/env'
import { getApiToken } from '@/lib/msal'

/*
 * The one place the app talks to the intranet API.
 *
 * Deliberately thin: no retries (TanStack Query owns that), no caching (the
 * server and the query client both do it already). Its whole job is to turn a
 * non-2xx into a thrown Error carrying enough detail to show and to log.
 */

export class ApiError extends Error {
  constructor(message, { status, path, body } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.path = path
    this.body = body
  }
}

async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`

  /*
   * Bearer, not a cookie. The SPA and the API sit on different origins, and a
   * cookie session across those two means SameSite=None plus a CSRF token on
   * every mutation. A token the browser has to attach deliberately carries
   * none of that: a cross-site form post simply arrives without one.
   *
   * Null whenever there is nothing to attach — auth off, or a public route
   * loading before anyone has signed in — and the request goes out bare.
   */
  const token = await getApiToken()

  let response
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : null),
        ...(token ? { Authorization: `Bearer ${token}` } : null),
        ...options.headers,
      },
    })
  } catch (cause) {
    // fetch only rejects on a transport failure — offline, DNS, CORS preflight.
    throw new ApiError('Could not reach the intranet service.', { path })
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new ApiError(`Request failed with ${response.status}.`, {
      status: response.status,
      path,
      body,
    })
  }

  if (response.status === 204) return null
  return response.json()
}

export const api = {
  get: (path) => request(path),

  /*
   * For lookups the contracts declare `.nullable()`. A 404 is the server
   * saying "no such id", which is data, not a failure — it must not surface as
   * an error state. Any other non-2xx still throws.
   */
  async getOrNull(path) {
    try {
      return await request(path)
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null
      throw err
    }
  },

  post: (path, payload) => request(path, { method: 'POST', body: JSON.stringify(payload) }),

  /*
   * Same 404-is-data rule as getOrNull, for the POST endpoints whose contract
   * is nullable. Asking to generate a letter type that has no template is a
   * "no such thing" answer, not a failure the user should see an error for.
   */
  async postOrNull(path, payload) {
    try {
      return await request(path, { method: 'POST', body: JSON.stringify(payload) })
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null
      throw err
    }
  },
}

/** Encodes a path segment so ids with slashes or spaces cannot break the URL. */
export const seg = (value) => encodeURIComponent(String(value))
