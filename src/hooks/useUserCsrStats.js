import { csrService } from '@/services/csrService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

/*
 * Per-user data, so it is never shared between employees and must not be
 * cached server-side. In step 5 this is the one CSR call that comes from
 * Postgres rather than the CMS.
 */
export function useUserCsrStats() {
  return useServiceQuery(queryKeys.csrUserStats, () => csrService.getUserStats(), {
    fallback: null,
  })
}
