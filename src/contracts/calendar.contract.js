import { z } from 'zod'
import { isoDate, nonEmpty } from './_shared.js'

/*
 * One array carries three sources that will diverge completely in step 5:
 * `holiday` and `event` come from the CMS and are the same for everyone,
 * `meeting` comes from the signed-in employee's Graph calendar.
 *
 * They share a shape here because CalendarWidget renders them identically.
 * Whoever splits the fetch must keep the merged output matching this schema.
 */
export const calendarEntryTypeSchema = z.enum(['holiday', 'event', 'meeting'])

export const calendarEntrySchema = z.object({
  date: isoDate,
  label: nonEmpty,
  type: calendarEntryTypeSchema,
  location: nonEmpty,
  /** A range (`4:00 pm - 5:00 pm`) or a holiday descriptor (`Paid Holiday`). */
  time: nonEmpty,
  /** Holidays only — explains a substituted off day. */
  remarks: nonEmpty.optional(),
})

export const calendarContract = {
  getEvents: { returns: z.array(calendarEntrySchema) },
}
