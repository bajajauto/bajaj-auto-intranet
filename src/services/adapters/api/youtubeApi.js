import { api, seg } from './_client'

export const youtubeApi = {
  getAll: () => api.get('/videos'),
  getByCategory: (category) => api.get(`/videos?category=${seg(category)}`),
}
