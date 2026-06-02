import { csrService } from '@/services/csrService'

export function useVolunteerOpportunities() {
  return csrService.getOpportunities()
}
