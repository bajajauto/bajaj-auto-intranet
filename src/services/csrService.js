import { csrMock } from './adapters/mock/csrMock'
import { csrApi } from './adapters/api/csrApi'
import { resolveAdapter } from './resolveAdapter'

export const csrService = resolveAdapter(csrMock, csrApi)
