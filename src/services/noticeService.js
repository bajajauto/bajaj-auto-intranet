import { noticesMock } from './adapters/mock/noticesMock'
import { noticesApi } from './adapters/api/noticesApi'
import { resolveAdapter } from './resolveAdapter'

export const noticeService = resolveAdapter(noticesMock, noticesApi)
