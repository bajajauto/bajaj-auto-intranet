import { api, seg } from './_client'

export const bajajBytesApi = {
  getAll: () => api.get('/bytes/volumes'),
  getById: (id) => api.getOrNull(`/bytes/volumes/${seg(id)}`),
}
