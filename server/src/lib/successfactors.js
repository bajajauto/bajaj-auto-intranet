/*
 * SAP SuccessFactors Employee Central, read over OData v2 — the HR record a
 * letter certifies. Field choices follow IT's "Employee Master API mapping
 * sheet" and the Postman collection that came with it; the two address types
 * and the phone are not on the sheet and were read off the BALTEST tenant.
 *
 * Three reads per lookup, all filtered server-side to one person:
 *   PerEmail        official email → personIdExternal
 *   EmpJob          current job row, with company, BU, location, person
 *   PerAddressDEFLT home and permanent addresses
 */

/* Picklist option ids, from the mapping sheet. Tenant-specific. */
const OFFICIAL_EMAIL_TYPE = '116528'

/*
 * FOCompany externalCode → our entity id. BATL is `CTL` in SuccessFactors.
 * Overseas companies (Spain, Thailand, Brazil) have no letterhead here, so
 * they map to nothing and the record is refused rather than mislabelled.
 */
const ENTITY_BY_COMPANY = { BAL: 'BAL', BACL: 'BACL', CTL: 'BATL', BAF: 'BAF' }

const JOB_SELECT = [
  'userId',
  'localJobTitle',
  'companyNav/externalCode',
  'businessUnitNav/name',
  'locationNav/name',
  'employmentNav/startDate',
  'employmentNav/personNav/personalInfoNav/displayName',
  'employmentNav/personNav/emailNav/emailType',
  'employmentNav/personNav/emailNav/emailAddress',
  'employmentNav/personNav/phoneNav/phoneNumber',
  'employmentNav/personNav/phoneNav/isPrimary',
].join(',')

const JOB_EXPAND = [
  'companyNav',
  'businessUnitNav',
  'locationNav',
  'employmentNav/personNav/personalInfoNav',
  'employmentNav/personNav/emailNav',
  'employmentNav/personNav/phoneNav',
].join(',')

/** OData string literal: single quotes doubled. */
const literal = (s) => `'${String(s).replace(/'/g, "''")}'`

/** `/Date(1514764800000)/` or `/Date(1514764800000+0000)/` → `2018-01-01`. */
export function toIsoDate(value) {
  const ms = /\/Date\((-?\d+)/.exec(value ?? '')?.[1]
  return ms ? new Date(Number(ms)).toISOString().slice(0, 10) : ''
}

const results = (nav) => nav?.results ?? []

/*
 * Street lines live in address2/address3 on most records; address1 is mostly
 * empty. `state` is a picklist code this API user cannot resolve, so the
 * line ends at city and PIN. County is free text and often repeats the city.
 */
export function formatAddress(row) {
  if (!row) return ''
  const parts = []
  for (const raw of [row.address1, row.address2, row.address3, row.county, row.city, row.zipCode]) {
    const part = (raw ?? '').trim().replace(/[,\s]+$/, '')
    if (!part || part.toLowerCase() === 'null') continue
    if (parts.some((p) => p.toLowerCase() === part.toLowerCase())) continue
    parts.push(part)
  }
  return parts.join(', ')
}

/**
 * One EmpJob row plus that person's addresses → the letters `employee` shape.
 * Missing fields come back empty; the caller validates against the contract
 * and says which ones.
 */
export function toEmployee(job, addresses = []) {
  const person = job.employmentNav?.personNav
  const emails = results(person?.emailNav)
  const phones = results(person?.phoneNav)
  const address = (type) =>
    formatAddress(addresses.find((a) => a.addressType?.toLowerCase() === type))

  return {
    name: results(person?.personalInfoNav)[0]?.displayName ?? '',
    empId: job.userId ?? '',
    entity: ENTITY_BY_COMPANY[job.companyNav?.externalCode] ?? '',
    designation: job.localJobTitle ?? '',
    businessUnit: job.businessUnitNav?.name ?? '',
    location: job.locationNav?.name ?? '',
    dateOfJoining: toIsoDate(job.employmentNav?.startDate),
    email: emails.find((e) => e.emailType === OFFICIAL_EMAIL_TYPE)?.emailAddress ?? '',
    mobile: (phones.find((p) => p.isPrimary) ?? phones[0])?.phoneNumber ?? '',
    localAddress: address('home'),
    permanentAddress: address('permanent'),
  }
}

/**
 * A client bound to one tenant. `fetch` is injectable so tests run on canned
 * responses with no tenant behind them.
 */
export function createSuccessFactors({ baseUrl, username, password, timeoutMs = 10_000, fetch = globalThis.fetch }) {
  if (!baseUrl || !username || !password) {
    throw new Error('EMPLOYEE_SOURCE=successfactors needs SF_API_URL, SF_USERNAME and SF_PASSWORD.')
  }
  const authorization = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
  const root = `${baseUrl.replace(/\/+$/, '')}/odata/v2/`

  async function get(entity, params) {
    const query = new URLSearchParams({ $format: 'json', ...params })
    const res = await fetch(`${root}${entity}?${query}`, {
      headers: { authorization, accept: 'application/json' },
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (!res.ok) {
      // Status and entity only — the body can echo the filter, i.e. an email.
      throw Object.assign(new Error(`SuccessFactors ${entity} answered ${res.status}`), {
        statusCode: 502,
      })
    }
    return (await res.json()).d.results
  }

  /**
   * The employee whose *official* email is `email`, or null. More than one
   * match is also null: two people sharing an address must not get each
   * other's letters.
   */
  async function employeeByEmail(email) {
    if (!email) return null
    // `eq` is case-sensitive here, and some addresses are stored with capitals.
    const matches = await get('PerEmail', {
      $filter: `tolower(emailAddress) eq ${literal(email.toLowerCase())} and emailType eq ${literal(OFFICIAL_EMAIL_TYPE)}`,
      $select: 'personIdExternal',
    })
    const ids = [...new Set(matches.map((m) => m.personIdExternal))]
    if (ids.length !== 1) return null

    const [jobs, addresses] = await Promise.all([
      get('EmpJob', {
        $filter: `userId eq ${literal(ids[0])}`,
        $select: JOB_SELECT,
        $expand: JOB_EXPAND,
      }),
      get('PerAddressDEFLT', {
        $filter: `personIdExternal eq ${literal(ids[0])}`,
        $select: 'addressType,address1,address2,address3,county,city,zipCode',
      }),
    ])
    if (jobs.length !== 1) return null
    return toEmployee(jobs[0], addresses)
  }

  return { employeeByEmail }
}
