import { z } from 'zod'
import { absoluteUrl, cssValue, iconName, isoDate, nonEmpty, slug } from './_shared.js'

/** Headline numbers. Pre-formatted strings where the source uses units (`2.4M`). */
export const csrImpactSchema = z.object({
  livesTouched: nonEmpty,
  villagesReached: z.number().int().nonnegative(),
  volunteerHours: nonEmpty,
  activeProjects: z.number().int().nonnegative(),
  fiscalYear: nonEmpty,
})

export const csrProgramSchema = z.object({
  id: slug,
  title: nonEmpty,
  icon: iconName,
  summary: nonEmpty,
  stat: nonEmpty,
  statLabel: nonEmpty,
  /** Tailwind gradient stops, e.g. `from-amber-400 to-orange-500`. */
  accent: nonEmpty,
})

export const volunteerOpportunitySchema = z
  .object({
    id: slug,
    title: nonEmpty,
    date: isoDate,
    timeRange: nonEmpty,
    location: nonEmpty,
    role: nonEmpty,
    slotsTotal: z.number().int().positive(),
    slotsTaken: z.number().int().nonnegative(),
    coverGradient: cssValue,
    summary: nonEmpty,
  })
  .refine((o) => o.slotsTaken <= o.slotsTotal, {
    message: 'slotsTaken cannot exceed slotsTotal',
    path: ['slotsTaken'],
  })

export const csrStorySchema = z.object({
  id: slug,
  headline: nonEmpty,
  excerpt: nonEmpty,
  /*
   * Currently remote Unsplash URLs. newsMock already hit Unsplash returning
   * 403 to hotlinks and moved to bundled assets; these four have the same
   * problem and have not been moved yet.
   */
  image: absoluteUrl,
  publishedOn: isoDate,
  /** References csrProgramSchema.id. */
  program: slug,
})

export const userCsrStatsSchema = z.object({
  hoursFiscalYear: z.number().nonnegative(),
  fiscalYear: nonEmpty,
  lastVolunteeredOn: isoDate,
  lastEventTitle: nonEmpty,
  /*
   * TODO(step 5): the mock ships this empty, so the element shape is a guess.
   * Assumed to be volunteerOpportunitySchema.id references. Confirm against the
   * real signup record before building the write path — this is bucket 3 data
   * and will come from Postgres, not the CMS.
   */
  upcomingSignups: z.array(slug),
})

export const csrContract = {
  getImpact: { returns: csrImpactSchema },
  getPrograms: { returns: z.array(csrProgramSchema) },
  getOpportunities: { returns: z.array(volunteerOpportunitySchema) },
  getOpportunityById: {
    args: z.tuple([slug]),
    returns: volunteerOpportunitySchema.nullable(),
  },
  getStories: { returns: z.array(csrStorySchema) },
  getUserStats: { returns: userCsrStatsSchema },
}
