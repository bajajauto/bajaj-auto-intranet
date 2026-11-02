import { attentionMock } from './adapters/mock/attentionMock'
import { attentionApi } from './adapters/api/attentionApi'
import { resolveAdapter } from './resolveAdapter'

export const attentionService = resolveAdapter(attentionMock, attentionApi)
