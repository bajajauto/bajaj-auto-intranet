import { MOCK_LATENCY_MS } from '@/lib/env'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/*
 * Wraps a mock adapter so its methods return Promises, matching the api
 * adapters' signature exactly.
 *
 * Why a wrapper rather than `async` on every method: the mock files are data
 * with accessors, and there is one fact being expressed here — "a real adapter
 * goes over a network". Stating it once keeps the 12 mock files readable and
 * means the simulated latency has a single home.
 *
 * The call is applied to the ORIGINAL adapter, not the wrapper, so a method
 * that calls a sibling internally (podcastMock.getByVolume uses this.getAll())
 * still resolves it synchronously and is unaffected.
 */
export function withSimulatedTransport(adapter) {
  const wrapped = {}

  for (const key of Object.keys(adapter)) {
    const value = adapter[key]
    if (typeof value !== 'function') {
      wrapped[key] = value
      continue
    }
    wrapped[key] = async (...args) => {
      if (MOCK_LATENCY_MS > 0) await wait(MOCK_LATENCY_MS)
      return value.apply(adapter, args)
    }
  }

  return wrapped
}
