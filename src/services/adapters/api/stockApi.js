import { api } from './_client'

export const stockApi = {
  getAll: () => api.get('/ticker'),
}
