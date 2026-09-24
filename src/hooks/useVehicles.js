import { vehicleService } from '@/services/vehicleService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useVehicles() {
  return useServiceQuery(queryKeys.vehicles, () => vehicleService.getAll(), { fallback: [] })
}
