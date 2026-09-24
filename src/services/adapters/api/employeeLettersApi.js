import { api } from './_client'

/*
 * Restores the two things the wire cannot carry.
 *
 * `issuedOn` is a live Date in the contract because the preview formats it at
 * render; JSON has no date type, so the server sends an ISO string.
 *
 * `entity` is omitted by the server on purpose — sending it would mean shipping
 * the letterhead logo through the API. The caller passed the entity in, so it
 * is put back here. Without it the preview has no letterhead to draw and the
 * document renders blank.
 */
function hydrate(doc, entity) {
  if (!doc) return null
  return { ...doc, issuedOn: new Date(doc.issuedOn), entity }
}

/*
 * Generation is a POST because it is not a lookup: the server renders a
 * document from HRMS fields plus the employee's input, and records that it was
 * issued. The audit log is the reason this cannot move to the client.
 */
export const employeeLettersApi = {
  getEmployee: () => api.get('/letters/employee'),

  getSignatories: () => api.get('/letters/signatories'),

  generate: ({ letterTypeId, input, entity }) =>
    api
      .postOrNull('/letters/generate', { letterTypeId, input, entityId: entity?.id })
      .then((doc) => hydrate(doc, entity)),

  generateForm: ({ formId, input, entity }) =>
    api
      .postOrNull('/letters/forms/generate', { formId, input, entityId: entity?.id })
      .then((doc) => hydrate(doc, entity)),
}
