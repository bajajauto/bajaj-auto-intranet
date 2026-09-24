/*
 * Validates every mock adapter against its contract.
 *
 * Mocks are loaded through Vite rather than plain Node so that `@/` aliases and
 * asset imports (`import cover from '@/assets/news/q4.jpg'`) resolve exactly as
 * they do in the app — an asset import yields the URL string the browser gets,
 * which is what the contract describes.
 *
 * Run: npm run verify:contracts
 */
import { createServer } from 'vite'

const PASS = '\x1b[32m✓\x1b[0m'
const FAIL = '\x1b[31m✗\x1b[0m'
const DIM = (s) => `\x1b[2m${s}\x1b[0m`

/*
 * Sample arguments for methods that take them. Each entry is one invocation.
 * The point is coverage of *variants*, not of every id — policy buckets and
 * letter types are listed exhaustively because each one exercises a different
 * branch of its schema. The deliberate `nope` calls prove the null path.
 */
const INVOCATIONS = {
  bajajBytes: { getById: [['vol-7'], ['nope']] },
  podcast: { getByVolume: [['vol-7'], ['nope']] },
  youtube: { getByCategory: [['md-meetings'], ['interviews'], ['stories']] },
  csr: { getOpportunityById: [['opp-1'], ['nope']] },
  vehicles: { getById: [['re'], ['nope']] },
  policyLibrary: {
    getByBucket: [
      ['pay-compensation-finance'],
      ['health-insurance-safety'],
      ['leave-travel-flexibility'],
      ['vehicle-mobility'],
      ['workplace-essentials'],
      ['workplace-governance-compliance'],
      ['career-growth-development'],
      ['management-information-systems'],
      ['nope'],
    ],
  },
}

/** Letter inputs, keyed by letter type. Mirrors `fields` in letters.config.js. */
const LETTER_INPUTS = {
  'address-proof': {},
  'residential-proof': {},
  bonafide: {},
  visa: {
    passportNumber: 'Z1234567',
    passportIssueDate: '2021-03-11',
    passportExpiryDate: '2031-03-10',
    leaveStartDate: '2026-07-25',
    leaveEndDate: '2026-07-31',
    contactNumber: '+919999999999',
    travelDestination: 'Syria',
  },
  'vehicle-discount': {
    customerName: 'A N Other',
    relationship: 'Spouse',
    purchaseMethod: 'Cash',
  },
}

const FORM_60_INPUT = {
  rtoAddress: 'RTO Pune, Sangamwadi',
  fatherName: 'Someone Paul',
  permanentAddress: 'Akurdi, Pune 411035',
  uan: '100200300400',
  pan: 'AAAAA0000A',
  authorisedSignatory: 'MUKUND MADHAV',
}

function report(method, label, result) {
  if (result.success) {
    console.log(`  ${PASS} ${method}${label ? DIM(`(${label})`) : ''}`)
    return 0
  }
  console.log(`  ${FAIL} ${method}${label ? DIM(`(${label})`) : ''}`)
  for (const issue of result.error.issues.slice(0, 8)) {
    const path = issue.path.length ? issue.path.join('.') : '(root)'
    console.log(`      ${path}: ${issue.message}`)
  }
  const extra = result.error.issues.length - 8
  if (extra > 0) console.log(DIM(`      ...and ${extra} more`))
  return 1
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let failures = 0

try {
  const { contracts } = await server.ssrLoadModule('/src/contracts/index.js')
  const { entities } = await server.ssrLoadModule('/src/config/letters.config.js')

  for (const [service, contract] of Object.entries(contracts)) {
    const modPath = `/src/services/adapters/mock/${service}Mock.js`
    let mod
    try {
      mod = await server.ssrLoadModule(modPath)
    } catch (err) {
      console.log(`\n${service}`)
      console.log(`  ${FAIL} could not load ${modPath}`)
      console.log(`      ${err.message.split('\n')[0]}`)
      failures += 1
      continue
    }

    const adapter = mod[`${service}Mock`] ?? Object.values(mod)[0]
    console.log(`\n${service}`)

    for (const [method, spec] of Object.entries(contract)) {
      if (typeof adapter?.[method] !== 'function') {
        console.log(`  ${FAIL} ${method} — not implemented by the mock`)
        failures += 1
        continue
      }

      // Letters need per-letter-type inputs, so they get bespoke invocations.
      if (service === 'employeeLetters' && method === 'generate') {
        for (const [letterTypeId, input] of Object.entries(LETTER_INPUTS)) {
          const out = adapter.generate({ letterTypeId, input, entity: entities.BAL })
          failures += report(method, letterTypeId, spec.returns.safeParse(out))
        }
        continue
      }
      if (service === 'employeeLetters' && method === 'generateForm') {
        const out = adapter.generateForm({
          formId: 'form-60',
          input: FORM_60_INPUT,
          entity: entities.BAL,
        })
        failures += report(method, 'form-60', spec.returns.safeParse(out))
        continue
      }

      const calls = INVOCATIONS[service]?.[method] ?? [[]]
      for (const args of calls) {
        const out = adapter[method](...args)
        failures += report(method, args.join(', '), spec.returns.safeParse(out))
      }
    }
  }
} finally {
  await server.close()
}

console.log(
  failures === 0
    ? `\n${PASS} all mocks satisfy their contracts`
    : `\n${FAIL} ${failures} contract violation${failures === 1 ? '' : 's'}`,
)
process.exit(failures === 0 ? 0 : 1)
