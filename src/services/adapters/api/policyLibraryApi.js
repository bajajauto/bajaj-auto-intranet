import { api, seg } from './_client'

export const policyLibraryApi = {
  /** Null for a bucket with no library collected yet — the modal falls back. */
  getByBucket: (bucketId) => api.getOrNull(`/policies/${seg(bucketId)}`),
}
