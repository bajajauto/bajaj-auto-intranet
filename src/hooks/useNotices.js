import { noticeService } from '@/services/noticeService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useNotices() {
  return useServiceQuery(queryKeys.notices, () => noticeService.getAll(), { fallback: [] })
}
