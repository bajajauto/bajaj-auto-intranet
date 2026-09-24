import { api, seg } from './_client'

export const podcastApi = {
  getAll: () => api.get('/podcast/episodes'),
  /** At most one episode per volume; the server returns it or 404s. */
  getByVolume: (volumeId) => api.getOrNull(`/podcast/episodes/by-volume/${seg(volumeId)}`),
}
