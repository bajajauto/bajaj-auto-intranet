import { api, seg } from './_client'

export const csrApi = {
  getImpact: () => api.get('/csr/impact'),
  getPrograms: () => api.get('/csr/programs'),
  getOpportunities: () => api.get('/csr/opportunities'),
  getOpportunityById: (id) => api.getOrNull(`/csr/opportunities/${seg(id)}`),
  getStories: () => api.get('/csr/stories'),
  /** Per-user, from Postgres rather than the CMS. Never cached server-side. */
  getUserStats: () => api.get('/csr/me/stats'),
}
