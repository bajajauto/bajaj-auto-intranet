import { bajajBytesService } from '@/services/bajajBytesService'

export function useBajajBytesVolumes() {
  return bajajBytesService.getAll()
}
