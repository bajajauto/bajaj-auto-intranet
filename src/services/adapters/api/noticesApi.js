import { api } from './_client'

export const noticesApi = {
  getAll: () => api.get('/notices'),
}
