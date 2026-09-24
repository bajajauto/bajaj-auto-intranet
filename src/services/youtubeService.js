import { youtubeMock } from './adapters/mock/youtubeMock'
import { youtubeApi } from './adapters/api/youtubeApi'
import { resolveAdapter } from './resolveAdapter'

export const youtubeService = resolveAdapter(youtubeMock, youtubeApi)
