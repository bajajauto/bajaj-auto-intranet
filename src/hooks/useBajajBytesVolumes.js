import { bajajBytesService } from '@/services/bajajBytesService'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

export function useBajajBytesVolumes() {
  return useServiceQuery(queryKeys.bytesVolumes, () => bajajBytesService.getAll(), {
    fallback: [],
  })
}
