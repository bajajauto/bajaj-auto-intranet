import { DATA_SOURCE } from '@/lib/env'
import { withSimulatedTransport } from './adapters/mock/_transport'

/*
 * Picks which adapter a service is backed by, from one environment value.
 *
 * This is the seam the whole Phase 2 plan turns on: swapping the site from mock
 * data to the real API is `VITE_DATA_SOURCE=api`, not twelve import changes.
 * Both sides return Promises, so nothing downstream can tell them apart.
 */
export function resolveAdapter(mock, api) {
  return DATA_SOURCE === 'api' ? api : withSimulatedTransport(mock)
}
