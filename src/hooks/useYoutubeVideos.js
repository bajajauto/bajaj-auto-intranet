import { youtubeService } from '@/services/youtubeService'

export function useYoutubeVideos() {
  return youtubeService.getAll()
}
