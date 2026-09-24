import { z } from 'zod'
import { absoluteUrl, cssValue, isoDate, nonEmpty, slug } from './_shared.js'

export const podcastEpisodeSchema = z.object({
  id: slug,
  title: nonEmpty,
  summary: nonEmpty,
  audioUrl: absoluteUrl,
  durationSec: z.number().int().positive(),
  publishedOn: isoDate,
  /** Joins an episode to its Bajaj Bytes volume — see bytesVolumeSchema.id. */
  sourceVolumeId: slug,
  coverGradient: cssValue,
  coverAccent: cssValue,
})

export const podcastContract = {
  getAll: { returns: z.array(podcastEpisodeSchema) },
  getByVolume: {
    args: z.tuple([slug]),
    returns: podcastEpisodeSchema.nullable(),
  },
}
