import { policyLibraryService } from './policyLibraryService'

/*
 * Jarvis reads the same services the page does; it owns no data of its own.
 * The one thing it needs that no single screen fetches is the whole policy
 * library at once, so that is gathered here, bucket by bucket. A bucket that
 * fails or has no library yet is skipped rather than failing the lot — Jarvis
 * still answers from everything else.
 */
export const jarvisService = {
  async getPolicyLibrary(buckets) {
    const results = await Promise.allSettled(
      buckets.map((bucket) => policyLibraryService.getByBucket(bucket.id))
    )
    return results
      .map((result, i) => ({
        bucket: buckets[i],
        categories: result.status === 'fulfilled' ? result.value : null,
      }))
      .filter((item) => Array.isArray(item.categories))
  },
}
