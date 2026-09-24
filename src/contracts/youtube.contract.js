import { z } from 'zod'
import { absoluteUrl, isoDate, nonEmpty, slug } from './_shared.js'

export const videoCategorySchema = z.enum(['md-meetings', 'interviews', 'stories'])

/*
 * Two kinds of row share this collection: real YouTube embeds, and links out
 * to something that cannot be embedded (a Teams recording). They are not
 * cleanly discriminated by a `type` field, so the invariant is enforced by
 * refinement instead: a row must be playable one way or the other.
 *
 * `durationSec` is absent on external links because we cannot know it.
 */
export const videoSchema = z
  .object({
    id: slug,
    title: nonEmpty,
    category: videoCategorySchema,
    publishedOn: isoDate,
    description: nonEmpty,
    youtubeId: nonEmpty.optional(),
    /*
     * VideoCard falls back to YouTube's own hqdefault thumbnail when absent, so
     * this is only needed for videos with no youtubeId — a Teams recording has
     * no derivable thumbnail.
     */
    thumbnailUrl: absoluteUrl.optional(),
    externalUrl: absoluteUrl.optional(),
    durationSec: z.number().int().positive().optional(),
  })
  .refine((v) => Boolean(v.youtubeId) || Boolean(v.externalUrl), {
    message: 'a video needs either a youtubeId or an externalUrl',
    path: ['youtubeId'],
  })

export const youtubeContract = {
  getAll: { returns: z.array(videoSchema) },
  getByCategory: {
    args: z.tuple([videoCategorySchema]),
    returns: z.array(videoSchema),
  },
}
