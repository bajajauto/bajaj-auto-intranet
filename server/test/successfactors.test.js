import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { employeeSchema } from '../../src/contracts/employeeLetters.contract.js'
import { createSuccessFactors, formatAddress, toEmployee, toIsoDate } from '../src/lib/successfactors.js'

/*
 * Canned OData responses shaped like the BALTEST tenant's. Every value is
 * invented; nothing here came out of the tenant.
 */

const JOB = {
  userId: '900001',
  localJobTitle: 'Senior Manager',
  companyNav: { externalCode: 'CTL' },
  businessUnitNav: { name: 'Two Wheeler' },
  locationNav: { name: 'Akurdi' },
  employmentNav: {
    startDate: '/Date(1514764800000)/',
    personNav: {
      personalInfoNav: { results: [{ displayName: 'Asha Kulkarni' }] },
      emailNav: {
        results: [
          { emailType: '116527', emailAddress: 'asha@example.com' },
          { emailType: '116528', emailAddress: 'asha.kulkarni@bajajauto.co.in' },
        ],
      },
      phoneNav: {
        results: [
          { phoneNumber: '9000000001', isPrimary: false },
          { phoneNumber: '9000000002', isPrimary: true },
        ],
      },
    },
  },
}

const ADDRESSES = [
  { addressType: 'home', address1: null, address2: 'Flat 4, Sun Towers,', address3: 'Nigdi', county: 'PUNE', city: 'Pune', zipCode: '411044' },
  { addressType: 'Permanent', address1: '', address2: '12 Station Road', address3: 'Shivaji Nagar', county: 'null', city: 'Kolhapur', zipCode: '416003' },
]

describe('mapping', () => {
  test('SuccessFactors dates become YYYY-MM-DD', () => {
    assert.equal(toIsoDate('/Date(1514764800000)/'), '2018-01-01')
    assert.equal(toIsoDate('/Date(1514764800000+0000)/'), '2018-01-01')
    assert.equal(toIsoDate(null), '')
  })

  test('addresses skip blanks, "null" and repeats', () => {
    assert.equal(formatAddress(ADDRESSES[0]), 'Flat 4, Sun Towers, Nigdi, PUNE, 411044')
    assert.equal(formatAddress(ADDRESSES[1]), '12 Station Road, Shivaji Nagar, Kolhapur, 416003')
  })

  test('a full record satisfies the letters contract', () => {
    const employee = toEmployee(JOB, ADDRESSES)
    assert.equal(employeeSchema.safeParse(employee).success, true)
    assert.equal(employee.entity, 'BATL')
    assert.equal(employee.email, 'asha.kulkarni@bajajauto.co.in')
    assert.equal(employee.mobile, '9000000002')
    assert.equal(employee.dateOfJoining, '2018-01-01')
  })

  test('an overseas company maps to no entity', () => {
    const employee = toEmployee({ ...JOB, companyNav: { externalCode: 'BAL SPAIN' } }, ADDRESSES)
    assert.equal(employee.entity, '')
  })

  test('missing addresses come back empty, for the caller to name', () => {
    const employee = toEmployee(JOB, [])
    assert.equal(employee.localAddress, '')
    assert.equal(employee.permanentAddress, '')
  })
})

/** A fetch that answers by entity name and records every URL it was given. */
function fakeFetch(answers) {
  const calls = []
  const fetch = async (url, init) => {
    calls.push({ url: new URL(url), init })
    const entity = new URL(url).pathname.split('/').pop()
    const answer = answers[entity]
    if (typeof answer === 'number') return new Response('{}', { status: answer })
    return Response.json({ d: { results: answer ?? [] } })
  }
  return { fetch, calls }
}

const client = (fetch) =>
  createSuccessFactors({ baseUrl: 'https://sf.test/', username: 'u@CO', password: 'p', fetch })

describe('client', () => {
  test('resolves an official email to an employee', async () => {
    const { fetch, calls } = fakeFetch({
      PerEmail: [{ personIdExternal: '900001' }],
      EmpJob: [JOB],
      PerAddressDEFLT: ADDRESSES,
    })
    const employee = await client(fetch).employeeByEmail('asha.kulkarni@bajajauto.co.in')
    assert.equal(employee.empId, '900001')
    assert.equal(calls[0].init.headers.authorization, `Basic ${Buffer.from('u@CO:p').toString('base64')}`)
    assert.match(calls[0].url.searchParams.get('$filter'), /emailType eq '116528'/)
    assert.equal(calls[1].url.searchParams.get('$filter'), "userId eq '900001'")
  })

  test('quotes in the email cannot break out of the filter', async () => {
    const { fetch, calls } = fakeFetch({})
    await client(fetch).employeeByEmail("O'Brien@bajajauto.co.in")
    assert.match(calls[0].url.searchParams.get('$filter'), /tolower\(emailAddress\) eq 'o''brien@bajajauto\.co\.in'/)
  })

  test('no match is null, and stops after one call', async () => {
    const { fetch, calls } = fakeFetch({})
    assert.equal(await client(fetch).employeeByEmail('nobody@bajajauto.co.in'), null)
    assert.equal(calls.length, 1)
  })

  test('two people on one email is null, not either of them', async () => {
    const { fetch } = fakeFetch({
      PerEmail: [{ personIdExternal: '900001' }, { personIdExternal: '900002' }],
    })
    assert.equal(await client(fetch).employeeByEmail('shared@bajajauto.co.in'), null)
  })

  test('an upstream failure is a 502 that does not echo the email', async () => {
    const { fetch } = fakeFetch({ PerEmail: 401 })
    await assert.rejects(client(fetch).employeeByEmail('asha.kulkarni@bajajauto.co.in'), (err) => {
      assert.equal(err.statusCode, 502)
      assert.doesNotMatch(err.message, /asha/)
      return true
    })
  })

  test('refuses to build without credentials', () => {
    assert.throws(() => createSuccessFactors({ baseUrl: 'https://sf.test' }), /SF_USERNAME/)
  })
})
