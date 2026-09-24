/*
 * Employee letters & forms — the whole module is driven from this file.
 *
 * Replaces the Jarvis Teams bot flow (Menu → Employee Letters → modal form →
 * PDF). The bot asked for letter type first, then revealed only the fields that
 * type actually needs; the same shape is kept here because it is what employees
 * already know, and because the letter templates genuinely differ in what they
 * need to be filled in — a bonafide letter needs a purpose, a visa NOC needs a
 * passport and travel dates.
 *
 * Data only, no React. Adding a purpose or a form here is enough — the modal
 * renders whatever it finds.
 */

import balLogo from '@/assets/letterheads/bal-logo.png'
import baclLogo from '@/assets/letterheads/bacl-logo.png'
import batlLogo from '@/assets/letterheads/batl-logo.png'

/*
 * The four legal entities an employee can belong to. Which one a letter is
 * issued on is not a choice the employee makes — it follows from their record,
 * which is why there is no entity picker in the request form. The preview shows
 * the resolved entity so a wrong posting is caught before the letter is used.
 *
 * BAF has no logo artwork: the letterhead DOCX it came from carries a blank
 * white PNG in the logo slot. It falls back to the wordmark until the real file
 * lands — `logo: null` is the signal, not an oversight.
 *
 * Addresses and phone/fax are transcribed from the letterhead DOCX headers.
 * BAL's letterhead was not in the pack; its block is built from the same Akurdi
 * address the other three share, with the corporate identifiers taken from the
 * Form 60 template, which is the one place BAL's registered details appear.
 */
export const entities = {
  BAL: {
    id: 'BAL',
    name: 'Bajaj Auto Ltd.',
    logo: balLogo,
    address: ['Akurdi, Pune 411035, India'],
    tel: '+91 20 27472851',
    fax: '+91 20 27473398',
    website: 'www.bajajauto.com',
    // From the Form 60 working certificate — the registered-office block.
    registeredOffice:
      '51A, Corporate Building, Mumbai Pune Road, Akurdi, Pune, Maharashtra, 411035',
    gstin: '27AADCB2923M1ZL',
    pan: 'AADCB2923M',
    contactEmail: 'customerservice@bajajauto.co.in',
  },
  BACL: {
    id: 'BACL',
    name: 'Bajaj Auto Credit Ltd.',
    logo: baclLogo,
    address: ['Akurdi, Pune 411035, India'],
    tel: '+91 20 27472851',
    fax: '+91 20 27473398',
    website: 'www.bajajautocredit.com',
  },
  BATL: {
    id: 'BATL',
    name: 'Bajaj Auto Technology Limited',
    // Kept on the letterhead because contracts and bank records still carry the
    // old name; dropping it makes letters harder to match against them.
    formerName: 'Formerly known as Chetak Technology Ltd.',
    logo: batlLogo,
    address: ['Akurdi, Pune 411035, India.'],
    tel: '+91 20 27472851',
    fax: '+91 20 27473398',
    website: 'www.batltd.com',
  },
  BAF: {
    id: 'BAF',
    name: 'Bajaj Auto Foundation',
    logo: null,
    address: ['Akurdi, Pune 411035, India'],
    tel: '+91 20 27472851',
    fax: '+91 20 27473398',
    website: null,
  },
}

export const entityIds = Object.keys(entities)

/*
 * Purposes shared by the three certificate letters. The templates that arrived
 * were 45 PDFs — 15 purposes × 3 letter types — differing in exactly one token,
 * so they collapse to one list against three bodies.
 *
 * `other` opens a free-text field, which is how the bot handled it.
 */
export const letterPurposes = [
  'Address Change in Aadhar Card',
  'Bank Account Opening and Address Change',
  'Buying Vehicle',
  'Car Loan',
  'Car Registration',
  'Child School Admission',
  'Credit Card',
  'Driving License',
  'Gas Connection',
  'Higher Education',
  'Home Loan',
  'Land Loan',
  'Personal Loan',
  'Renting House',
  'Other',
]

export const OTHER_PURPOSE = 'Other'

/*
 * Field kinds the request form knows how to render. Kept small on purpose —
 * anything that needs a bespoke control belongs in the component, not here.
 */
export const relationshipOptions = ['Self', 'Parent', 'Spouse', 'Child']
export const purchaseMethodOptions = ['Cash', 'Loan (through BACL)']

/*
 * The five distinct letters. `fields` are the ones the employee fills; every
 * letter also carries the employee's own record, which is read-only.
 *
 * `id` is what the mock adapter switches on to pick a body template.
 */
export const letterTypes = [
  {
    id: 'address-proof',
    label: 'Address Proof',
    heading: 'CERTIFICATE: ADDRESS PROOF',
    description: 'Certifies both your local and permanent address on record.',
    icon: 'MapPinned',
    usesPurpose: true,
    fields: [],
  },
  {
    id: 'residential-proof',
    label: 'Residential Proof',
    heading: 'CERTIFICATE: RESIDENTIAL PROOF',
    description: 'Certifies the address you are currently residing at.',
    icon: 'Home',
    usesPurpose: true,
    fields: [],
  },
  {
    id: 'bonafide',
    label: 'Bonafide Employee Letter',
    heading: 'BONAFIDE EMPLOYEE LETTER',
    description: 'Confirms your employment, role and business unit.',
    icon: 'FileCheck2',
    usesPurpose: true,
    fields: [],
  },
  {
    id: 'visa',
    label: 'Visa Application Letter',
    heading: 'NO OBJECTION LETTER: VISA APPLICATION',
    description: 'No-objection letter addressed to the visa officer.',
    icon: 'Plane',
    usesPurpose: false,
    fields: [
      { name: 'passportNumber', label: 'Passport Number', type: 'text', required: true },
      { name: 'passportIssueDate', label: 'Passport Issue Date', type: 'date', required: true },
      { name: 'passportExpiryDate', label: 'Passport Expiry Date', type: 'date', required: true },
      { name: 'leaveStartDate', label: 'Leave Start Date', type: 'date', required: true },
      { name: 'leaveEndDate', label: 'Leave End Date', type: 'date', required: true },
      { name: 'contactNumber', label: 'Contact Number', type: 'tel', required: true },
      { name: 'travelDestination', label: 'Travel Destination', type: 'text', required: true },
    ],
  },
  {
    id: 'vehicle-discount',
    label: 'Bajaj Vehicle Discount Letter',
    heading: 'BONAFIDE CERTIFICATE',
    description: 'Employee discount letter to present at the dealer. Valid 30 days.',
    icon: 'Bike',
    usesPurpose: false,
    fields: [
      {
        name: 'customerName',
        label: 'Customer Name',
        // The vehicle must be registered in this name, which is the single
        // most common reason these letters get rejected at the dealer.
        hint: 'The vehicle has to be registered in this name.',
        type: 'text',
        required: true,
      },
      {
        name: 'relationship',
        label: 'Relationship to the Employee',
        type: 'select',
        options: relationshipOptions,
        required: true,
      },
      {
        name: 'purchaseMethod',
        label: 'Method of Purchase',
        type: 'select',
        options: purchaseMethodOptions,
        required: true,
      },
    ],
  },
]

/*
 * Form 60 is the one form that is generated rather than downloaded — it is a
 * working certificate the company signs, so it needs employee data and a named
 * signatory. The other eight are blank PDFs the employee fills by hand.
 */
export const generatedForms = [
  {
    id: 'form-60',
    label: 'Form 60',
    heading: 'Form 60',
    subheading: '{See rule 47 (1)ca}',
    title: 'Working Certificate',
    description: 'Working certificate for the RTO, in lieu of PAN.',
    icon: 'FileSignature',
    fields: [
      { name: 'rtoAddress', label: 'RTO Address', type: 'text', required: true },
      { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
      { name: 'permanentAddress', label: 'Permanent Address', type: 'text', required: true },
      { name: 'uan', label: 'UAN', hint: '12-digit UAN number', type: 'text', required: true },
      { name: 'pan', label: 'PAN', type: 'text', required: true },
      {
        name: 'authorisedSignatory',
        label: 'Name of the Authorised Signatory',
        type: 'select',
        source: 'signatories',
        required: true,
      },
    ],
    declaration:
      'Please review your data carefully. Once submitted, it will generate FORM 60. If needed, you can generate a new one using the same process.',
  },
]

/*
 * Blank forms, served from public/forms/. Filenames are the originals, spaces
 * and double-spaces and all — the component encodes them, nothing here is
 * pre-escaped.
 */
const FORMS_ROOT = '/forms'

export const downloadableForms = [
  {
    id: 'pf-non-refundable-loan',
    label: 'PF Non-Refundable Loan',
    description: 'Application for a non-refundable withdrawal from your PF.',
    href: `${FORMS_ROOT}/Application for PF Non-Refundable Loan.pdf`,
  },
  {
    id: 'pf-refundable-loan',
    label: 'PF Refundable Loan',
    description: 'Application for a refundable loan against your PF.',
    href: `${FORMS_ROOT}/Application for PF Refundable Loan.pdf`,
  },
  {
    id: 'bank-account-intimation',
    label: 'Bank Account Number Intimation',
    description: 'Notify payroll of a new or changed salary account.',
    href: `${FORMS_ROOT}/Bank Account Number Intimation Form.pdf`,
  },
  {
    id: 'cash-voucher',
    label: 'Cash Voucher',
    description: 'Voucher for petty-cash disbursement.',
    href: `${FORMS_ROOT}/Cash Voucher.pdf`,
  },
  {
    id: 'company-car-expenses',
    label: 'Company Car Petrol & Maintenance',
    description: 'Reimbursement of fuel and upkeep on a company car.',
    href: `${FORMS_ROOT}/Company Car Petrol  Maintenance Expenses -  Reimbursement Form.pdf`,
  },
  {
    id: 'conveyance-claim',
    label: 'Conveyance Charges Claim',
    description: 'Reimbursement of local conveyance charges.',
    href: `${FORMS_ROOT}/Conveyance charges Reimbursement Claim.pdf`,
  },
  {
    id: 'form-12bb',
    label: 'Form 12BB',
    description: 'Declaration of tax-saving investments to payroll.',
    href: `${FORMS_ROOT}/Form-12BB-Blank-Format.pdf`,
  },
  {
    id: 'hospitalisation-claim',
    label: 'Hospitalisation Expenses Claim',
    description: 'Reimbursement of hospitalisation expenses.',
    href: `${FORMS_ROOT}/Hospitalization  Expenses Reimbursement Claim Form.pdf`,
  },
]

/*
 * Useful links — the bot's fourth menu item, carried over as-is. These are the
 * systems employees bounce to most, several of which have no other entry point
 * from the hub.
 */
export const usefulLinks = [
  { label: 'IT Summit', href: 'https://balithelpdesk.bajajauto.com/MDLIncidentMgmt/UserDefault.aspx' },
  { label: 'ESS (Desktop)', href: 'http://ep6prdn.bajajauto.co.in:50000/irj/portal' },
  { label: 'EKAM (Android)', href: 'https://tinyurl.com/EkamiAndroidBAL' },
  { label: 'EKAM (iOS)', href: 'https://tinyurl.com/EkamiOSBAL' },
  { label: 'SuccessFactors', href: 'https://www.successfactors.com/BAL/' },
  { label: 'BOLT (Desktop)', href: 'https://bolt.bajajauto.co.in/' },
  { label: 'BOLT (Android)', href: 'https://play.google.com/store/apps/details?id=com.disprz.bajajbolt' },
  { label: 'BOLT (iOS)', href: 'https://apps.apple.com/in/app/my-bolt/id6749361126' },
  { label: 'VPN', href: 'https://webaccess.bajajauto.com/choose_site' },
  { label: 'Happay (Web)', href: 'https://bajajauto.happay.in' },
  { label: 'Happay (Android)', href: 'https://play.google.com/store/apps/details?id=com.happay.v2.travel' },
  { label: 'Happay (iOS)', href: 'https://apps.apple.com/in/app/happay-travel/id1558617666' },
  { label: 'GEM', href: 'https://bajajauto.gratifi.com' },
]

/*
 * Every generated letter closes with this. It is what makes an unsigned PDF
 * acceptable to the banks and RTOs these letters go to, so it is not optional
 * and does not vary by letter.
 */
/*
 * Both now live with the letter bodies that use them, so the API server can
 * read them without pulling in this file's bundled letterhead assets.
 * Re-exported here so existing importers keep working.
 */
export {
  SYSTEM_GENERATED_NOTE,
  VEHICLE_LETTER_VALIDITY_DAYS,
} from '@/services/letters/buildLetter'
