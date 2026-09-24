import { z } from 'zod'
import { isoDate, nonEmpty, slug } from './_shared.js'

/*
 * Drives the badge styling in NoticesPanel, so a new value is a UI change and
 * not just data. Enumerated on purpose: an unexpected priority should fail
 * loudly here rather than render an unstyled pill in production.
 */
export const noticePrioritySchema = z.enum(['Notice', 'Important'])

export const noticeSchema = z.object({
  id: slug,
  title: nonEmpty,
  body: nonEmpty,
  date: isoDate,
  /** Free text — a label, not a switch. Comms can add new ones freely. */
  category: nonEmpty,
  priority: noticePrioritySchema,
})

export const noticesContract = {
  getAll: { returns: z.array(noticeSchema) },
}
