import { api } from './_client'

/*
 * Merges two sources server-side: CMS holidays and events, which are the same
 * for everyone, plus the signed-in employee's Graph meetings. The client sees
 * one list, exactly as the mock returns it.
 */
export const calendarApi = {
  getEvents: () => api.get('/calendar/events'),
}
