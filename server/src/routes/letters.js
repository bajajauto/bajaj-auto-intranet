import { z } from 'zod'
import { read } from '../lib/store.js'
import { contracts, validate } from '../lib/contract.js'
import { composeLetter, composeForm } from '../../../src/services/letters/buildLetter.js'

/*
 * Letters are the one domain the server composes rather than serves.
 *
 * The bodies come from `src/services/letters/buildLetter.js`, the same module
 * the mock adapter uses, so there is one copy of every template. Generating
 * here rather than in the browser is what makes the issuance log possible and
 * stops an employee editing their own designation before printing.
 *
 * The response carries no `entity`: that would mean shipping the letterhead
 * logo through the API. The client attaches its own — it already knows which
 * entity it asked for.
 */

const generateBody = z.object({
  letterTypeId: z.string().min(1),
  entityId: z.string().min(1),
  input: z.record(z.string(), z.unknown()).optional(),
})

const formBody = z.object({
  formId: z.string().min(1),
  entityId: z.string().min(1),
  input: z.record(z.string(), z.unknown()).optional(),
})

/*
 * The contract describes what the *client* ends up holding, which includes
 * `entity`. The wire response deliberately omits it, so validation runs against
 * the contract minus that one field — still checking every letter body, block
 * kind and date the client depends on.
 */
const wireLetterSchema = contracts.employeeLetters.generate.returns.unwrap().omit({ entity: true })
const wireFormSchema = contracts.employeeLetters.generateForm.returns.unwrap().omit({ entity: true })

export default async function lettersRoutes(app) {
  app.get('/letters/employee', async (request) => {
    const { employee } = await read('letters')
    return validate(
      request,
      contracts.employeeLetters.getEmployee.returns,
      employee,
      '/letters/employee',
    )
  })

  app.get('/letters/signatories', async (request) => {
    const { signatories } = await read('letters')
    return validate(
      request,
      contracts.employeeLetters.getSignatories.returns,
      signatories,
      '/letters/signatories',
    )
  })

  app.post('/letters/generate', async (request, reply) => {
    const parsed = generateBody.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'Invalid request body.' })
    }

    const { employee } = await read('letters')
    const doc = composeLetter({
      letterTypeId: parsed.data.letterTypeId,
      employee,
      input: parsed.data.input ?? {},
    })
    if (!doc) return reply.code(404).send(null)

    /*
     * The issuance log. Today it is a structured log line; in step 5 it becomes
     * a Postgres row, which is an audit requirement rather than a feature.
     */
    request.log.info(
      { letterTypeId: doc.letterTypeId, empId: employee.empId, entityId: parsed.data.entityId },
      'letter issued',
    )

    return validate(request, wireLetterSchema, doc, 'POST /letters/generate')
  })

  app.post('/letters/forms/generate', async (request, reply) => {
    const parsed = formBody.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'Invalid request body.' })
    }

    const [{ employee }, entities] = await Promise.all([read('letters'), read('entities')])
    const entity = entities[parsed.data.entityId]
    if (!entity) return reply.code(400).send({ error: 'Unknown entity.' })

    const doc = composeForm({
      formId: parsed.data.formId,
      employee,
      entity,
      input: parsed.data.input ?? {},
    })
    if (!doc) return reply.code(404).send(null)

    request.log.info(
      { formId: doc.formId, empId: employee.empId, entityId: parsed.data.entityId },
      'form issued',
    )

    return validate(request, wireFormSchema, doc, 'POST /letters/forms/generate')
  })
}
