import { newsService } from '@/services/newsService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useNews() {
  return useServiceQuery(queryKeys.news, () => newsService.getAll(), { fallback: [] })
}
