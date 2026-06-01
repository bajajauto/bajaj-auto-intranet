import { podcastService } from '@/services/podcastService'

export function usePodcastEpisodes() {
  return podcastService.getAll()
}
