import { podcastMock } from './adapters/mock/podcastMock'
import { podcastApi } from './adapters/api/podcastApi'
import { resolveAdapter } from './resolveAdapter'

export const podcastService = resolveAdapter(podcastMock, podcastApi)
