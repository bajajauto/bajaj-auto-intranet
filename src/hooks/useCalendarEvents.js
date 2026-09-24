import { calendarService } from '@/services/calendarService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useCalendarEvents() {
  return useServiceQuery(queryKeys.calendar, () => calendarService.getEvents(), { fallback: [] })
}

/*
 * The personal slice of the same feed. `select` derives it from the cached
 * response rather than fetching again, so a panel showing meetings and a
 * widget showing holidays share one request.
 *
 * In step 5 the source splits — holidays and events come from the CMS, meetings
 * from Graph — but that happens behind the adapter and this stays as it is.
 */
export function useMeetings() {
  return useServiceQuery(queryKeys.calendar, () => calendarService.getEvents(), {
    fallback: [],
    select: (events) => events.filter((event) => event.type === 'meeting'),
  })
}
