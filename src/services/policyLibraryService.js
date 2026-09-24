import { policyLibraryMock } from './adapters/mock/policyLibraryMock'
import { policyLibraryApi } from './adapters/api/policyLibraryApi'
import { resolveAdapter } from './resolveAdapter'

export const policyLibraryService = resolveAdapter(policyLibraryMock, policyLibraryApi)
