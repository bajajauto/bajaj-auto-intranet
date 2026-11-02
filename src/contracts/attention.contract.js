import { z } from 'zod'

/*
 * The two personal counts on the home page's "needs your attention" card.
 * Meetings and the next holiday come from the calendar contract; these two
 * have no other home yet. Both will come from SuccessFactors through our API,
 * resolved from the access token, so the shape is per-employee by design.
 */
export const attentionSummarySchema = z.object({
  /** Days of leave the employee can still take this year. */
  leaveBalance: z.number().nonnegative(),
  /** Requests waiting on this employee's approval. */
  pendingApprovals: z.number().int().nonnegative(),
})

export const attentionContract = {
  getSummary: { returns: attentionSummarySchema },
}
