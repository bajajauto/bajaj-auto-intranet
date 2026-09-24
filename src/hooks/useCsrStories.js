import { csrService } from '@/services/csrService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useCsrStories() {
  return useServiceQuery(queryKeys.csrStories, () => csrService.getStories(), { fallback: [] })
}
