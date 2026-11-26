import { useMemo } from 'react'
import { jarvisService } from '@/services/jarvisService'
import { queryKeys } from '@/lib/queryClient'
import { BUCKET_IDS, buildPolicyEntries, buildStaticEntries } from '@/lib/jarvisBot/knowledge'
import { useServiceQuery } from './useServiceQuery'
import { useCalendarEvents } from './useCalendarEvents'

const STATIC_ENTRIES = buildStaticEntries()

/*
 * Everything Jarvis can answer from. The static half (services, letters, links,
 * benefit buckets) is ready at once; the policy library and the calendar arrive
 * through their services, and `enabled` holds the policy fetch back until the
 * chat is first opened so the home page does not pay for it.
 *
 * While those are pending Jarvis still answers from the static half —
 * `isPending` lets the panel say so rather than claim a policy does not exist.
 */
export function useJarvisKnowledge({ enabled }) {
  const library = useServiceQuery(
    queryKeys.jarvisPolicyLibrary,
    () => jarvisService.getPolicyLibrary(BUCKET_IDS),
    { fallback: [], enabled }
  )
  const calendar = useCalendarEvents()

  const knowledge = useMemo(() => {
    const byDate = (a, b) => a.date.localeCompare(b.date)
    return {
      entries: [...buildPolicyEntries(library.data), ...STATIC_ENTRIES],
      holidays: calendar.data.filter((e) => e.type === 'holiday').sort(byDate),
      events: calendar.data.filter((e) => e.type === 'event').sort(byDate),
    }
  }, [library.data, calendar.data])

  return {
    data: knowledge,
    isPending: (enabled && library.isPending) || calendar.isPending,
    isError: library.isError || calendar.isError,
    refetch: () => {
      library.refetch()
      calendar.refetch()
    },
  }
}
