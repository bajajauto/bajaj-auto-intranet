import { attentionService } from '@/services/attentionService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useAttentionSummary() {
  return useServiceQuery(queryKeys.attention, () => attentionService.getSummary())
}
