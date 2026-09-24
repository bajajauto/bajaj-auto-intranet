import { csrService } from '@/services/csrService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useVolunteerOpportunities() {
  return useServiceQuery(queryKeys.csrOpportunities, () => csrService.getOpportunities(), {
    fallback: [],
  })
}
