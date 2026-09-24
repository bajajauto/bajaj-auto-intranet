import { z } from 'zod'
import { absoluteUrl, fraction, nonEmpty, slug } from './_shared.js'

export const vehicleSpecSchema = z.object({
  label: nonEmpty,
  value: nonEmpty,
})

/** The vehicle's clickable box, as fractions of the hero banner image. */
export const hotspotSchema = z.object({
  x: fraction,
  y: fraction,
  width: fraction,
  height: fraction,
})

export const frameSourceSchema = z.object({
  baseUrl: absoluteUrl,
  extension: nonEmpty,
})

/*
 * `frameCount: 0` means no published turntable, and the viewer falls back to a
 * poster crop. The refinement encodes the pairing the comment in vehiclesMock
 * describes: a vehicle claiming frames must say where they come from.
 */
export const vehicleSchema = z
  .object({
    id: slug,
    name: nonEmpty,
    tagline: nonEmpty,
    category: nonEmpty,
    /** Tailwind text colour class, e.g. `text-amber-300`. */
    accent: nonEmpty,
    frameCount: z.number().int().nonnegative(),
    frameSource: frameSourceSchema.optional(),
    hotspot: hotspotSchema,
    specs: z.array(vehicleSpecSchema).min(1),
  })
  .refine((v) => v.frameCount === 0 || Boolean(v.frameSource), {
    message: 'a vehicle with frameCount > 0 needs a frameSource',
    path: ['frameSource'],
  })

export const vehiclesContract = {
  getAll: { returns: z.array(vehicleSchema) },
  getById: {
    args: z.tuple([slug]),
    returns: vehicleSchema.nullable(),
  },
}
