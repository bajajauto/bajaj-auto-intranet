import { podcastService } from '@/services/podcastService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function usePodcastEpisodes() {
  return useServiceQuery(queryKeys.podcastEpisodes, () => podcastService.getAll(), {
    fallback: [],
  })
}

/** Null when a volume has no episode — the hub hides the player for those. */
export function usePodcastEpisodeByVolume(volumeId) {
  return useServiceQuery(
    queryKeys.podcastByVolume(volumeId),
    () => podcastService.getByVolume(volumeId),
    { fallback: null, enabled: Boolean(volumeId) },
  )
}
