import { CACHE_TTL_MS } from '../config.js'

/*
 * In-process TTL cache.
 *
 * Right now every source is a JSON fixture already held in memory, so this
 * earns nothing — it is here because step 5 replaces those sources with
 * SharePoint calls, and the cache has to already sit in the request path for
 * that to be a one-line change per route rather than a rewrite.
 *
 * Deliberately not Redis. That only matters when several instances must agree,
 * and for five-minute content they do not need to.
 */
const entries = new Map()

export async function cached(key, produce) {
  const hit = entries.get(key)
  if (hit && hit.expires > Date.now()) return hit.value

  const value = await produce()
  entries.set(key, { value, expires: Date.now() + CACHE_TTL_MS })
  return value
}

/** Returns how many entries were dropped, so the purge endpoint can report it. */
export function purge(prefix) {
  if (!prefix) {
    const size = entries.size
    entries.clear()
    return size
  }
  let dropped = 0
  for (const key of entries.keys()) {
    if (key.startsWith(prefix)) {
      entries.delete(key)
      dropped += 1
    }
  }
  return dropped
}

export const cacheSize = () => entries.size
