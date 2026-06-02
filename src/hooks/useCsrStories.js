import { csrService } from '@/services/csrService'

export function useCsrStories() {
  return csrService.getStories()
}
