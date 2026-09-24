import { api, seg } from './_client'

export const vehiclesApi = {
  getAll: () => api.get('/vehicles'),
  getById: (id) => api.getOrNull(`/vehicles/${seg(id)}`),
}
