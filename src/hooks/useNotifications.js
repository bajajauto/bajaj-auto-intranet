import { notificationService } from '@/services/notificationService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useNotifications() {
  return useServiceQuery(queryKeys.notifications, () => notificationService.getAll(), {
    fallback: [],
  })
}
