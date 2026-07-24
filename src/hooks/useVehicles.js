import { vehicleService } from '@/services/vehicleService'

export function useVehicles() {
  return vehicleService.getAll()
}
