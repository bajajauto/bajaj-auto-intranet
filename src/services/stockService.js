import { stockMock } from './adapters/mock/stockMock'
import { stockApi } from './adapters/api/stockApi'
import { resolveAdapter } from './resolveAdapter'

export const stockService = resolveAdapter(stockMock, stockApi)
