import { api } from './_client'

export const attentionApi = {
  getSummary: () => api.get('/me/attention'),
}
