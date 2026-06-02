import { csrService } from '@/services/csrService'

export function useUserCsrStats() {
  return csrService.getUserStats()
}
