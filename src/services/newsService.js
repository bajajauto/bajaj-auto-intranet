import { newsMock } from './adapters/mock/newsMock'
import { newsApi } from './adapters/api/newsApi'
import { resolveAdapter } from './resolveAdapter'

export const newsService = resolveAdapter(newsMock, newsApi)
