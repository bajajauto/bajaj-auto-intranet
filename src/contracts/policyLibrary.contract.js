import { z } from 'zod'
import { iconName, nonEmpty, slug } from './_shared.js'

/*
 * The library is a two-level tree that is sometimes only one level deep.
 *
 * Most categories hold topic folders; four hold their files directly because
 * that is how they sit on disk. Rather than making `topics` and `documents`
 * both optional on one loose object, a leaf category is modelled as exactly
 * what it is — the same shape as a topic. So `policyNodeSchema` describes both,
 * and a category is either a branch of nodes or a node itself.
 */

export const policyDocumentTypeSchema = z.enum(['pdf', 'docx', 'xlsx', 'png'])

export const policyDocumentSchema = z.object({
  name: nonEmpty,
  type: policyDocumentTypeSchema,
  /** Bytes. Rendered as a human size next to the download link. */
  size: z.number().int().positive(),
  /*
   * Today a path under public/ — all 104 files, 64MB, ship inside the bundle.
   * In step 5 this becomes a SharePoint document URL, which means it stops
   * being guaranteed to resolve. Nothing else about the shape changes.
   */
  href: nonEmpty,
})

/** Prose lifted out of a policy's Description file and rendered inline. */
export const policyReadableSchema = z.object({
  id: slug,
  title: nonEmpty,
  icon: iconName,
  /** `qa` renders as questions; `points` as headed bullet groups. */
  kind: z.enum(['qa', 'points']),
  entries: z
    .array(
      z.object({
        q: nonEmpty,
        a: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
})

export const policyContactSchema = z.object({
  purpose: nonEmpty,
  /** Absent where the guidance names a process rather than a person to write to. */
  email: nonEmpty.email().optional(),
})

/** A topic, or a category with no topics under it. Same shape either way. */
export const policyNodeSchema = z.object({
  id: slug,
  name: nonEmpty,
  icon: iconName,
  summary: nonEmpty,
  covered: z.array(nonEmpty),
  documents: z.array(policyDocumentSchema),
  readables: z.array(policyReadableSchema).optional(),
  contacts: z.array(policyContactSchema).optional(),
})

export const policyBranchSchema = z.object({
  id: slug,
  name: nonEmpty,
  icon: iconName,
  topics: z.array(policyNodeSchema).min(1),
})

export const policyCategorySchema = z.union([policyBranchSchema, policyNodeSchema])

export const policyLibraryContract = {
  /** Null for an unknown bucket id — the caller passes ids read from config. */
  getByBucket: {
    args: z.tuple([slug]),
    returns: z.array(policyCategorySchema).nullable(),
  },
}
