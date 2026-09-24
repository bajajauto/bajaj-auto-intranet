/*
 * Employee letters — mock adapter.
 *
 * The employee record below stands in for what HRMS will return. The letter
 * bodies themselves live in `@/services/letters/buildLetter`, shared with the
 * API server so there is exactly one copy of every template.
 */

import { composeLetter, composeForm } from '@/services/letters/buildLetter'

/*
 * The signed-in employee. Mirrors the record the Jarvis bot pre-filled and
 * locked — everything here is read-only in the request form, because a letter
 * that certifies details the employee typed themselves certifies nothing.
 */
const employee = {
  name: 'DEBOSMITA PAUL',
  empId: '118687',
  entity: 'BAL',
  designation: 'MGR (HR)',
  businessUnit: 'HR Digitization',
  location: 'Akurdi',
  dateOfJoining: '2022-05-16',
  email: 'dpaul1@bajajauto.co.in',
  mobile: '+916265403750',
  localAddress:
    'WW - 3/11 BAJAJ VIHAR COLONY, INSIDE BAJAJ CAMPUS, AKURDI - 411035, Maharashtra',
  permanentAddress:
    'SUDIP KUMAR PAUL; SHRISHTI NAGAR; TARANG APARTMENT - 5; FLAT, NEW ASANSOL; SEN RALEIGH ROAD, ASANSOL, PASCHIM BARDHAMAN - 713305, West Bengal',
}

/*
 * Authorised signatories for Form 60. In Phase 2 this comes from the HR master
 * filtered to the employee's entity; the bot showed one flat list.
 */
const signatories = [
  'MUKUND MADHAV',
  'CALVIN LYNGDOH',
  'PRADIP B PALWE',
  'MOHAN VAMSHI K',
]

export const employeeLettersMock = {
  getEmployee: () => employee,

  getSignatories: () => signatories,

  generate: ({ letterTypeId, input = {}, entity }) => {
    const doc = composeLetter({ letterTypeId, employee, input })
    return doc && { ...doc, entity }
  },

  generateForm: ({ formId, input = {}, entity }) => {
    const doc = composeForm({ formId, employee, entity, input })
    return doc && { ...doc, entity }
  },
}
