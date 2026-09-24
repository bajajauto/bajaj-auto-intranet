import { stockService } from '@/services/stockService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useStockTicker() {
  return useServiceQuery(queryKeys.stock, () => stockService.getAll(), { fallback: [] })
}
