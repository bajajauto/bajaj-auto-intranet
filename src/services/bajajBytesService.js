import { bajajBytesMock } from './adapters/mock/bajajBytesMock'
import { bajajBytesApi } from './adapters/api/bajajBytesApi'
import { resolveAdapter } from './resolveAdapter'

export const bajajBytesService = resolveAdapter(bajajBytesMock, bajajBytesApi)
