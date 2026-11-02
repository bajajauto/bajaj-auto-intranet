import { EMPLOYEE_SOURCE, SF_API_URL, SF_PASSWORD, SF_TIMEOUT_MS, SF_USERNAME } from '../config.js'
import { employeeSchema } from '../../../src/contracts/employeeLetters.contract.js'
import { cached } from './cache.js'
import { read } from './store.js'
import { createSuccessFactors } from './successfactors.js'

/*
 * Who the signed-in person is *as an employee* — the record a letter certifies.
 *
 * The only input is `request.user`, the identity a verified token proves. The
 * browser never names an employee: no empId in a query string, no designation
 * in a body. That is what stops someone printing a letter with somebody else's
 * name, or their own with a better title.
 *
 * Shaped as sources: `fixture` for development, `successfactors` for real.
 */

/** Emails and UPNs differ only in case often enough to matter. */
const sameAccount = (a, b) =>
  typeof a === 'string' && typeof b === 'string' && a.toLowerCase() === b.toLowerCase()

/*
 * Built at boot, so a missing SF_* variable stops the server starting instead
 * of surfacing as the first employee's 500.
 */
const successFactors =
  EMPLOYEE_SOURCE === 'successfactors'
    ? createSuccessFactors({
        baseUrl: SF_API_URL,
        username: SF_USERNAME,
        password: SF_PASSWORD,
        timeoutMs: SF_TIMEOUT_MS,
      })
    : null

/** What HR has to fill in, in words an employee can pass on. */
const FIELD_LABELS = {
  name: 'name',
  empId: 'employee ID',
  entity: 'company (BAL, BACL, BATL or BAF)',
  designation: 'designation',
  businessUnit: 'business unit',
  location: 'location',
  dateOfJoining: 'date of joining',
  email: 'official email',
  mobile: 'mobile number',
  localAddress: 'current address',
  permanentAddress: 'permanent address',
}

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
   * Keyed on the token's UPN matched against the official email in
   * SuccessFactors. Switch to AD `employeeId` if IT confirms it equals the
   * SuccessFactors user id — people without a mailbox have no UPN to match.
   *
   * A record that exists but fails the contract is a 422 naming the gaps,
   * not a 403: the person is known, HR just has blanks to fill.
   */
  async successfactors(user) {
    const email = user?.upn?.toLowerCase()
    if (!email) return null
    const employee = await cached(`employee:${email}`, () => successFactors.employeeByEmail(email))
    if (!employee) return null

    const parsed = employeeSchema.safeParse(employee)
    if (parsed.success) return parsed.data

    const missing = [...new Set(parsed.error.issues.map((i) => FIELD_LABELS[i.path[0]] ?? i.path[0]))]
    throw Object.assign(
      new Error(`Your HR record is missing: ${missing.join(', ')}. Please ask HR to update it.`),
      { statusCode: 422 },
    )
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
