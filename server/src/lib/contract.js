import { contracts } from '../../../src/contracts/index.js'
import { IS_PRODUCTION } from '../config.js'

export { contracts }

/*
 * Validates a response against the contract before it leaves the server.
 *
 * The contracts are imported straight from the front-end source tree — one
 * definition, both sides. That is the whole point: a response the client cannot
 * parse should fail here, where there is a log, rather than in a browser.
 *
 * Development fails loudly so drift is caught while someone is looking at it.
 * Production logs and sends anyway: a schema that has drifted by one optional
 * field should not take the intranet homepage down.
 */
export function validate(request, schema, value, label) {
  const result = schema.safeParse(value)
  if (result.success) return value

  const issues = result.error.issues.slice(0, 5).map((i) => ({
    path: i.path.join('.') || '(root)',
    message: i.message,
  }))
  request.log.error({ contract: label, issues }, 'response violates its contract')

  if (!IS_PRODUCTION) {
    const err = new Error(`Response for ${label} violates its contract`)
    err.statusCode = 500
    err.contractIssues = issues
    throw err
  }
  return value
}
