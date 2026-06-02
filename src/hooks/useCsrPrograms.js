import { csrService } from '@/services/csrService'

export function useCsrPrograms() {
  return csrService.getPrograms()
}

export function useCsrImpact() {
  return csrService.getImpact()
}
