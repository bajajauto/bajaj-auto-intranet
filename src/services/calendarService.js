import { calendarMock } from './adapters/mock/calendarMock'
import { calendarApi } from './adapters/api/calendarApi'
import { resolveAdapter } from './resolveAdapter'

export const calendarService = resolveAdapter(calendarMock, calendarApi)
