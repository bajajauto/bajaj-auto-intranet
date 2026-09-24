import { z } from 'zod'
import { iconName, isoDateTime, nonEmpty, slug } from './_shared.js'

export const notificationPrioritySchema = z.enum(['Urgent', 'New'])

export const notificationSchema = z.object({
  id: slug,
  title: nonEmpty,
  timestamp: isoDateTime,
  priority: notificationPrioritySchema,
  icon: iconName,
})

export const notificationsContract = {
  getAll: { returns: z.array(notificationSchema) },
}
