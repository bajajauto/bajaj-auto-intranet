import { z } from 'zod'
import { assetRef, isoDate, nonEmpty, slug } from './_shared.js'

/*
 * The only domain whose data comes from a system of record rather than a CMS.
 * Everything below `employeeSchema` is document structure the app builds
 * itself; `employeeSchema` is the part that must come from HRMS in step 5, and
 * it is the field list to hand whoever owns that integration.
 */

export const employeeSchema = z.object({
  name: nonEmpty,
  empId: nonEmpty,
  /** Derived from the employee record, never chosen — there is no entity picker. */
  entity: z.enum(['BAL', 'BACL', 'BATL', 'BAF']),
  designation: nonEmpty,
  businessUnit: nonEmpty,
  location: nonEmpty,
  dateOfJoining: isoDate,
  email: nonEmpty.email(),
  mobile: nonEmpty,
  localAddress: nonEmpty,
  permanentAddress: nonEmpty,
})

export const entitySchema = z.object({
  id: nonEmpty,
  name: nonEmpty,
  logo: assetRef,
  address: z.array(nonEmpty).min(1),
  tel: nonEmpty.optional(),
  fax: nonEmpty.optional(),
  website: nonEmpty.optional(),
  registeredOffice: nonEmpty.optional(),
  gstin: nonEmpty.optional(),
  pan: nonEmpty.optional(),
  contactEmail: nonEmpty.optional(),
})

/* --- document body ------------------------------------------------------- */

export const letterBlockSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('paragraph'), text: nonEmpty }),
  z.object({ kind: z.literal('subheading'), text: nonEmpty }),
  z.object({ kind: z.literal('labelled'), label: nonEmpty, value: nonEmpty }),
  z.object({
    kind: z.literal('list'),
    items: z.array(nonEmpty).min(1),
    ordered: z.boolean().optional(),
  }),
  z.object({ kind: z.literal('signature'), label: nonEmpty }),
])

/** A second page with its own layout — currently only the vehicle letter. */
export const letterSectionSchema = z.object({
  title: nonEmpty,
  intro: nonEmpty.optional(),
  groups: z
    .array(
      z.object({
        heading: nonEmpty,
        items: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
})

/** `To,` block — a single line, or several rendered one per line. */
const addresseeSchema = z.union([nonEmpty, z.array(nonEmpty).min(1)])

const documentBodySchema = z.object({
  addressee: addresseeSchema,
  heading: nonEmpty,
  blocks: z.array(letterBlockSchema).min(1),
  salutation: nonEmpty.optional(),
  subheading: nonEmpty.optional(),
  title: nonEmpty.optional(),
  citation: nonEmpty.optional(),
  signatory: nonEmpty.optional(),
  sections: z.array(letterSectionSchema).optional(),
  /** `slash` switches the issued-on line to DD/MM/YYYY. */
  dateFormat: z.enum(['slash']).optional(),
})

/* --- what the service returns -------------------------------------------- */

export const generatedLetterSchema = documentBodySchema.extend({
  letterTypeId: slug,
  entity: entitySchema,
  employee: employeeSchema,
  /** A live Date, not a string — the preview formats it at render. */
  issuedOn: z.date(),
  issuedOnLabel: nonEmpty,
  note: nonEmpty,
})

export const generatedFormSchema = documentBodySchema.extend({
  formId: slug,
  entity: entitySchema,
  employee: employeeSchema,
  issuedOn: z.date(),
})

export const employeeLettersContract = {
  getEmployee: { returns: employeeSchema },
  getSignatories: { returns: z.array(nonEmpty).min(1) },
  /** Null when the id has no builder — config and adapter have drifted. */
  generate: {
    args: z.tuple([
      z.object({
        letterTypeId: slug,
        input: z.record(z.unknown()).optional(),
        entity: entitySchema,
      }),
    ]),
    returns: generatedLetterSchema.nullable(),
  },
  generateForm: {
    args: z.tuple([
      z.object({
        formId: slug,
        input: z.record(z.unknown()).optional(),
        entity: entitySchema,
      }),
    ]),
    returns: generatedFormSchema.nullable(),
  },
}
