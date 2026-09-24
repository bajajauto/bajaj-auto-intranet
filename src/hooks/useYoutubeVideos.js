import { youtubeService } from '@/services/youtubeService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useYoutubeVideos() {
  return useServiceQuery(queryKeys.youtubeVideos, () => youtubeService.getAll(), {
    fallback: [],
  })
}
