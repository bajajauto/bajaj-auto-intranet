import { stockService } from '@/services/stockService'

export function useStockTicker() {
  return stockService.getAll()
}
