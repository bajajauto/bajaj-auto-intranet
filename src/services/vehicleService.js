import { vehiclesMock } from './adapters/mock/vehiclesMock'
import { vehiclesApi } from './adapters/api/vehiclesApi'
import { resolveAdapter } from './resolveAdapter'

export const vehicleService = resolveAdapter(vehiclesMock, vehiclesApi)
