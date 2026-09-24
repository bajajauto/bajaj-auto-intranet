import { z } from 'zod'
import { assetRef, isoDate, nonEmpty, slug } from './_shared.js'

export const newsArticleSchema = z.object({
  id: slug,
  headline: nonEmpty,
  excerpt: nonEmpty,
  date: isoDate,
  /** Editorial category shown as a pill — free text, owned by Comms. */
  sourceTag: nonEmpty,
  /*
   * Today a Vite bundled import, which is a build-time string that always
   * resolves. From a CMS this becomes a remote URL that can 404 or arrive
   * oversized — see NewsCard before making that swap.
   */
  image: assetRef,
  /** One string per rendered paragraph. Not HTML — the component maps over it. */
  body: z.array(nonEmpty).min(1),
})

export const newsContract = {
  getAll: { returns: z.array(newsArticleSchema) },
}
