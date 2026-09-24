import { csrService } from '@/services/csrService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useCsrPrograms() {
  return useServiceQuery(queryKeys.csrPrograms, () => csrService.getPrograms(), { fallback: [] })
}

export function useCsrImpact() {
  return useServiceQuery(queryKeys.csrImpact, () => csrService.getImpact(), { fallback: null })
}
