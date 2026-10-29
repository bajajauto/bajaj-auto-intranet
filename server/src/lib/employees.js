import { EMPLOYEE_SOURCE } from '../config.js'
import { read } from './store.js'

/*
 * Who the signed-in person is *as an employee* — the record a letter certifies.
 *
 * The only input is `request.user`, the identity a verified token proves. The
 * browser never names an employee: no empId in a query string, no designation
 * in a body. That is what stops someone printing a letter with somebody else's
 * name, or their own with a better title.
 *
 * Shaped as sources so SuccessFactors (step E) drops in beside the fixture one
 * without a route changing.
 */

/** Emails and UPNs differ only in case often enough to matter. */
const sameAccount = (a, b) =>
  typeof a === 'string' && typeof b === 'string' && a.toLowerCase() === b.toLowerCase()

const sources = {
  /*
   * The one generated employee. With auth off (`user` null) that is simply the
   * developer's view; with auth on, it is served only to the account whose
   * email it carries — anyone else gets no record, not someone else's.
   */
  async fixture(user) {
    const { employee } = await read('letters')
    if (!user) return employee
    return sameAccount(employee.email, user.upn) ? employee : null
  },

  /*
   * Step E. Keyed on AD `employeeId` if IT confirms it equals the
   * SuccessFactors number; otherwise on email. Until then it must not run.
   */
  async successfactors() {
    throw new Error('EMPLOYEE_SOURCE=successfactors is not built yet.')
  },
}

const resolve = sources[EMPLOYEE_SOURCE]
if (!resolve) {
  throw new Error(`Unknown EMPLOYEE_SOURCE "${EMPLOYEE_SOURCE}".`)
}

/**
 * The caller's employee record, or null after replying 403.
 *
 * 403, not 404: the person is signed in, the API just has no HR record for
 * them — a contractor, a new joiner not yet synced. That is worth a log line,
 * because it is also what a misconfigured directory looks like.
 */
export async function employeeFor(request, reply) {
  const employee = await resolve(request.user)
  if (employee) return employee

  request.log.warn({ oid: request.user?.oid, upn: request.user?.upn }, 'no employee record')
  reply.code(403).send({ error: 'No employee record is linked to this account.' })
  return null
}
