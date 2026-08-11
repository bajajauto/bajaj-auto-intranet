import { policyLibraryService } from '@/services/policyLibraryService'

// Null for a bucket whose documents have not been collected yet — the modal
// falls back to its plain benefit list for those.
export function usePolicyLibrary(bucketId) {
  return policyLibraryService.getByBucket(bucketId)
}
