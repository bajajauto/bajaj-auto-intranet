import { z } from 'zod'
import { absoluteUrl, cssValue, nonEmpty, slug } from './_shared.js'

export const bytesVolumeSchema = z.object({
  id: slug,
  label: nonEmpty,
  /** Human month label — `May 2026`. Display only, never parsed. */
  month: nonEmpty,
  href: absoluteUrl,
  gradient: cssValue,
  accent: cssValue,
})

export const bajajBytesContract = {
  getAll: { returns: z.array(bytesVolumeSchema) },
  getById: {
    args: z.tuple([slug]),
    returns: bytesVolumeSchema.nullable(),
  },
}
