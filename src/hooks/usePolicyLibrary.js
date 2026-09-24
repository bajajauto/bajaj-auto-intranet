import { policyLibraryService } from '@/services/policyLibraryService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

// Null for a bucket whose documents have not been collected yet — the modal
// falls back to its plain benefit list for those.
export function usePolicyLibrary(bucketId) {
  return useServiceQuery(
    queryKeys.policyBucket(bucketId),
    () => policyLibraryService.getByBucket(bucketId),
    { fallback: null, enabled: Boolean(bucketId) },
  )
}
