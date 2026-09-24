import { z } from 'zod'
import { nonEmpty } from './_shared.js'

/*
 * The ticker mixes two different row types in one array, so this is a
 * discriminated union rather than one schema with optional fields — a `quote`
 * missing its price should fail, not pass as a malformed `stat`.
 *
 * These will arrive from two different places in step 5: the quote from a
 * market data feed, the stats from the dispatch report.
 */
export const stockQuoteSchema = z.object({
  type: z.literal('quote'),
  symbol: nonEmpty,
  exchange: nonEmpty,
  price: z.number().positive(),
  changePercent: z.number(),
})

export const stockStatSchema = z.object({
  type: z.literal('stat'),
  label: nonEmpty,
  /** Pre-formatted in the Indian grouping convention — `3,96,420`, not a number. */
  value: nonEmpty,
  unit: nonEmpty,
  changePercent: z.number(),
})

export const tickerItemSchema = z.discriminatedUnion('type', [
  stockQuoteSchema,
  stockStatSchema,
])

export const stockContract = {
  getAll: { returns: z.array(tickerItemSchema) },
}
