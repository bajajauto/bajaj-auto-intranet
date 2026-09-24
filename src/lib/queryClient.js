import { QueryClient } from '@tanstack/react-query'

/*
 * `staleTime` deliberately matches the 5-minute cache the API will hold, so the
 * browser and the server agree on how fresh "fresh" is. A shorter client
 * staleTime would just refetch content the server is still serving from cache.
 *
 * `refetchOnWindowFocus` is off: this is an intranet homepage people leave open
 * all day, not a trading screen. Refetching every alt-tab would be noise.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * Query keys, in one place so a cache invalidation can never miss a consumer
 * through a typo. Keys are arrays so a prefix invalidates a whole domain.
 */
export const queryKeys = {
  news: ['news'],
  notices: ['notices'],
  notifications: ['notifications'],
  calendar: ['calendar'],
  stock: ['stock'],
  vehicles: ['vehicles'],
  bytesVolumes: ['bytes', 'volumes'],
  podcastEpisodes: ['podcast', 'episodes'],
  podcastByVolume: (volumeId) => ['podcast', 'volume', volumeId],
  youtubeVideos: ['youtube', 'videos'],
  policyBucket: (bucketId) => ['policy', 'bucket', bucketId],
  csrPrograms: ['csr', 'programs'],
  csrImpact: ['csr', 'impact'],
  csrStories: ['csr', 'stories'],
  csrOpportunities: ['csr', 'opportunities'],
  csrUserStats: ['csr', 'userStats'],
  letterEmployee: ['letters', 'employee'],
  letterSignatories: ['letters', 'signatories'],
}
