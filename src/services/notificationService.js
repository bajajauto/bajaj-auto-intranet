import { notificationsMock } from './adapters/mock/notificationsMock'
import { notificationsApi } from './adapters/api/notificationsApi'
import { resolveAdapter } from './resolveAdapter'

export const notificationService = resolveAdapter(notificationsMock, notificationsApi)
