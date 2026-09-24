import { api } from './_client'

export const newsApi = {
  getAll: () => api.get('/news'),
}
