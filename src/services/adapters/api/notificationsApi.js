import { api } from './_client'

export const notificationsApi = {
  getAll: () => api.get('/notifications'),
}
