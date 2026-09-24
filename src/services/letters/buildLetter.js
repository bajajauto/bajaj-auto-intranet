/*
 * Letter and form composition — shared by the app and the API server.
 *
 * Extracted from the mock adapter so there is exactly one copy of every letter
 * body. The server imports this file directly by relative path, so it must stay
 * dependency-free: no `@/` alias, no bundled assets, no React. Plain functions
 * over plain data.
 *
 * Three date formats are in play because the templates use three: the
 * certificate letters spell the month out, the vehicle discount letter uses
 * dd/mm/yyyy, and Form 60 uses dd-Mon-yyyy. They are reproduced rather than
 * unified — these letters are read against bank and RTO records that were
 * created from earlier copies of the same templates.
 */

export const SYSTEM_GENERATED_NOTE =
  'This is a system generated letter. No Signature required'

export const VEHICLE_LETTER_VALIDITY_DAYS = 30

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function toDate(value) {
  if (!value) return null
  const d = value instanceof Date ? value : new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

const pad = (n) => String(n).padStart(2, '0')

// "July 23, 2026" — the certificate letters and the visa NOC.
export function formatLongDate(value) {
  const d = toDate(value)
  if (!d) return ''
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

// "24/07/2026" — the vehicle discount letter.
export function formatSlashDate(value) {
  const d = toDate(value)
  if (!d) return ''
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

// "16-May-2022" — Form 60.
export function formatDashDate(value) {
  const d = toDate(value)
  if (!d) return ''
  return `${pad(d.getDate())}-${MONTHS[d.getMonth()].slice(0, 3)}-${d.getFullYear()}`
}
// The two opening paragraphs every certificate letter shares.
function employmentPreamble(emp) {
  return [
    `This is to confirm, that ${emp.name} (${emp.empId}) has been working in our organisation since ${formatLongDate(emp.dateOfJoining)}, as a full-time employee.`,
    `${emp.name} is currently working in our organisation as ${emp.designation} in the ${emp.businessUnit} Business Unit at ${emp.location}.`,
  ]
}

function purposeSentence(purpose) {
  return `This certificate is being issued for the purpose of ${purpose}.`
}

/*
 * Each builder returns a block list the preview renders. Block kinds:
 *   paragraph · labelled (label + value, kept on one line) · list · note
 * Anything needing its own layout — the vehicle letter's guidance page — comes
 * back as `sections` on the document instead.
 */
const builders = {
  'address-proof': (emp, input) => ({
    addressee: 'TO WHOMSOEVER IT MAY CONCERN',
    heading: 'CERTIFICATE: ADDRESS PROOF',
    blocks: [
      ...employmentPreamble(emp).map((text) => ({ kind: 'paragraph', text })),
      { kind: 'paragraph', text: 'As per our records the addresses are as below-' },
      { kind: 'labelled', label: 'Local Address', value: emp.localAddress },
      { kind: 'labelled', label: 'Permanent Address', value: emp.permanentAddress },
      { kind: 'paragraph', text: purposeSentence(input.purpose) },
    ],
  }),

  'residential-proof': (emp, input) => ({
    addressee: 'TO WHOMSOEVER IT MAY CONCERN',
    heading: 'CERTIFICATE: RESIDENTIAL PROOF',
    blocks: [
      ...employmentPreamble(emp).map((text) => ({ kind: 'paragraph', text })),
      { kind: 'paragraph', text: `As per our records ${emp.name} is currently residing at-` },
      { kind: 'labelled', label: 'Residential Address', value: emp.localAddress },
      { kind: 'paragraph', text: purposeSentence(input.purpose) },
    ],
  }),

  bonafide: (emp, input) => ({
    addressee: 'TO WHOMSOEVER IT MAY CONCERN',
    heading: 'BONAFIDE EMPLOYEE LETTER',
    blocks: [
      ...employmentPreamble(emp).map((text) => ({ kind: 'paragraph', text })),
      { kind: 'paragraph', text: purposeSentence(input.purpose) },
    ],
  }),

  /*
   * The travel sentence in the source PDF reads "…from July 25, 2026 to <July
   * 31, 2026 for   to travel to Syria." — a stray angle bracket and an empty
   * "for" slot from a placeholder that never got filled. Reproduced correctly
   * here rather than faithfully; the broken version is what employees have been
   * handing to consulates.
   */
  visa: (emp, input) => ({
    salutation: 'Dear Sir/Madam,',
    addressee: ['To,', 'The Visa Officer'],
    heading: 'NO OBJECTION LETTER: VISA APPLICATION',
    blocks: [
      ...employmentPreamble(emp).map((text) => ({ kind: 'paragraph', text })),
      { kind: 'subheading', text: 'Passport Details:' },
      { kind: 'labelled', label: 'Passport No.', value: input.passportNumber },
      { kind: 'labelled', label: 'Date of Issue', value: formatLongDate(input.passportIssueDate) },
      { kind: 'labelled', label: 'Date of Expiry', value: formatLongDate(input.passportExpiryDate) },
      { kind: 'labelled', label: 'Contact Number', value: input.contactNumber },
      {
        kind: 'paragraph',
        text: `${emp.name} has been sanctioned leave from ${formatLongDate(input.leaveStartDate)} to ${formatLongDate(input.leaveEndDate)} to travel to ${input.travelDestination}.`,
      },
      {
        kind: 'paragraph',
        text: 'This letter is being issued for the purpose of VISA APPLICATION.',
      },
      {
        kind: 'paragraph',
        text: `We request you to kindly extend all assistance to enable the employee to travel to ${input.travelDestination}.`,
      },
    ],
  }),

  'vehicle-discount': (emp, input) => ({
    dateFormat: 'slash',
    addressee: 'To',
    heading: 'BONAFIDE CERTIFICATE',
    blocks: [
      {
        kind: 'paragraph',
        text: `This is to confirm, that ${emp.name} (${emp.empId}) has been working in our organisation since ${formatSlashDate(emp.dateOfJoining)}, as a full-time employee.`,
      },
      { kind: 'subheading', text: 'Details of the Purchase:' },
      {
        kind: 'list',
        ordered: true,
        items: [
          `Customer Name – ${input.customerName}`,
          `Relationship to the Employee – ${input.relationship}`,
          `Method of Purchase – ${input.purchaseMethod}`,
        ],
      },
      {
        kind: 'paragraph',
        text: `The validity of this letter is limited to ${VEHICLE_LETTER_VALIDITY_DAYS} days from the date of issuance. Please ensure that it reaches the dealer within this time frame.`,
      },
      { kind: 'signature', label: 'Signature of the Applicant' },
    ],
    // Page 2 — the guidance sheet that ships with every discount letter.
    sections: [
      {
        title: `Dear ${emp.name},`,
        intro:
          'You are one step away from availing the special Employee Discount Benefit on purchasing a Bajaj vehicle. Please go through the following points carefully to ensure a smooth process:',
        groups: [
          {
            heading: 'Steps to avail the discount:',
            items: [
              'Inform the dealer staff proactively that you are a Bajaj Auto employee and present your Employee Discount Letter to avail the benefit',
              'Check your system generated CDMS-invoice carefully before processing payment to ensure the discount is correctly reflected',
              'If you wish to take a vehicle loan, please inform the BACL Loan Team that you are an employee. For any queries related to financing, you may contact: Mr. Bharat Badshah Rahane (Email: bharatrahane@bajajautocredit.com)',
            ],
          },
          {
            heading: 'Important guidelines:',
            items: [
              'This discount is applicable only when the Employee Discount Letter is presented to the dealer',
              'Please do not make any payment until the discount is reflected in the invoice',
              'By availing this benefit, you consent to share your mobile number with Bajaj Auto Sales team so that they may reach out to you with all necessary information related to your vehicle purchase',
              'You are encouraged to read the complete Employee Vehicle Policy and guidelines available on ESS (Policies & Rules → Vehicle Policies)',
            ],
          },
        ],
        outro: [
          'For any queries related to the policy or process, please reach out to Bajaj Auto Helpdesk. To directly connect with an agent for employee discount-related queries, kindly dial +91-7219821111, press 1, and then press 1 again. The Helpdesk will also support in connecting you with the relevant business POC, if required.',
          'We look forward to seeing you ride with Bajaj!',
        ],
        signOff: ['Regards,', 'Bajaj Auto Ltd.'],
        note: 'This is a system-generated letter, and no further certification is required',
      },
    ],
  }),
}

/*
 * Form 60 is a working certificate rather than a letter — it is addressed to
 * the RTO and carries the company's registration details, so it is built from
 */
function buildForm60(emp, entity, input) {
  return {
    heading: 'Form 60',
    subheading: '{See rule 47 (1)ca}',
    title: 'Working Certificate',
    addressee: ['To', 'The Registering Authority,', input.rtoAddress],
    citation: 'THE GAZETTE OF INDIA: EXTRAORDINARY',
    blocks: [
      {
        kind: 'paragraph',
        text: `We hereby declare that ${emp.name} S/o D/o ${input.fatherName} permanent address ${input.permanentAddress} is working in our company/organization since ${formatDashDate(emp.dateOfJoining)}. ${emp.name} job is transferable. It is further to certify that we have offices in four States/UTs or more. Details of our organisation is as follows –`,
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          `Name of organization – ${entity.name}`,
          `Registration number of organisation – ${entity.gstin ?? '—'}`,
          `GST registration number (optional) – ${entity.gstin ?? '—'}`,
          `PAN – ${entity.pan ?? '—'}`,
          `Address of registered/corporate office – ${entity.registeredOffice ?? entity.address.join(', ')}`,
          `E-mail address – ${entity.contactEmail ?? '—'}`,
        ],
      },
      { kind: 'paragraph', text: 'Details of employee is as follows –' },
      {
        kind: 'list',
        ordered: true,
        items: [
          `Employment id of employee – ${emp.empId}`,
          `UAN (Unique Account Number) of employee – ${input.uan}`,
          `Mobile number of employee – ${emp.mobile}`,
          `E-mail address of employee – ${emp.email}`,
          `PAN of employee – ${input.pan}`,
        ],
      },
    ],
    signatory: input.authorisedSignatory,
  }
}


/*
 * Composes a letter. Returns null for an unknown id rather than throwing — the
 * caller only ever passes ids read from config, so a null means config and this
 * file have drifted apart.
 *
 * `entity` is deliberately NOT attached here. On the server it would mean
 * shipping the letterhead logo through the API; the caller already knows which
 * entity it asked for and attaches its own.
 */
export function composeLetter({ letterTypeId, employee, input = {}, issuedOn = new Date() }) {
  const build = builders[letterTypeId]
  if (!build) return null

  const doc = build(employee, input)

  return {
    ...doc,
    letterTypeId,
    employee,
    issuedOn,
    issuedOnLabel:
      doc.dateFormat === 'slash' ? formatSlashDate(issuedOn) : `Date: ${formatLongDate(issuedOn)}`,
    note: doc.note ?? SYSTEM_GENERATED_NOTE,
  }
}

/** Form 60 is the only generated form; the rest are scanned downloads. */
export function composeForm({ formId, employee, entity, input = {}, issuedOn = new Date() }) {
  if (formId !== 'form-60') return null
  return { ...buildForm60(employee, entity, input), formId, employee, issuedOn }
}
