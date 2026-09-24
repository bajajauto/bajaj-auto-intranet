/*
 * End-to-end check of the API against the contracts.
 *
 * Deliberately drives the *real* api adapters from `src/services/adapters/api/`
 * over real HTTP, rather than calling fetch itself. That way it tests the exact
 * code path the browser takes — route shape, query encoding, 404-to-null,
 * date revival — instead of a parallel implementation that could agree with the
 * server while the app disagrees with both.
 *
 * Loaded through Vite so the adapters' `@/` imports resolve.
 *
 * Run: (server running) node scripts/verify-api.mjs [baseUrl]
 */
import { createServer } from 'vite'

const BASE = process.argv[2] ?? 'http://localhost:3000'

const PASS = '\x1b[32m ok \x1b[0m'
const FAIL = '\x1b[31mFAIL\x1b[0m'
const DIM = (s) => `\x1b[2m${s}\x1b[0m`

let failures = 0

function report(label, result) {
  if (result === true || result?.success) {
    console.log(`  ${PASS} ${label}`)
    return
  }
  failures += 1
  console.log(`  ${FAIL} ${label}`)
  if (result?.error) {
    for (const issue of result.error.issues.slice(0, 4)) {
      console.log(`        ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    }
  } else if (typeof result === 'string') {
    console.log(`        ${result}`)
  }
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  define: { 'import.meta.env.VITE_API_BASE_URL': JSON.stringify(BASE) },
})

try {
  const { contracts } = await vite.ssrLoadModule('/src/contracts/index.js')
  const { entities } = await vite.ssrLoadModule('/src/config/letters.config.js')
  const api = async (file, name) =>
    (await vite.ssrLoadModule(`/src/services/adapters/api/${file}.js`))[name]

  const [news, notices, notifications, calendar, stock, vehicles, bytes, podcast, videos, policies, csr, letters] =
    await Promise.all([
      api('newsApi', 'newsApi'), api('noticesApi', 'noticesApi'),
      api('notificationsApi', 'notificationsApi'), api('calendarApi', 'calendarApi'),
      api('stockApi', 'stockApi'), api('vehiclesApi', 'vehiclesApi'),
      api('bajajBytesApi', 'bajajBytesApi'), api('podcastApi', 'podcastApi'),
      api('youtubeApi', 'youtubeApi'), api('policyLibraryApi', 'policyLibraryApi'),
      api('csrApi', 'csrApi'), api('employeeLettersApi', 'employeeLettersApi'),
    ])

  const c = contracts

  console.log(`\ncollections  ${DIM(BASE)}`)
  report('GET /news', c.news.getAll.returns.safeParse(await news.getAll()))
  report('GET /notices', c.notices.getAll.returns.safeParse(await notices.getAll()))
  report(
    'GET /notifications',
    c.notifications.getAll.returns.safeParse(await notifications.getAll()),
  )
  report('GET /calendar/events', c.calendar.getEvents.returns.safeParse(await calendar.getEvents()))
  report('GET /ticker', c.stock.getAll.returns.safeParse(await stock.getAll()))
  report('GET /vehicles', c.vehicles.getAll.returns.safeParse(await vehicles.getAll()))
  report('GET /bytes/volumes', c.bajajBytes.getAll.returns.safeParse(await bytes.getAll()))
  report('GET /podcast/episodes', c.podcast.getAll.returns.safeParse(await podcast.getAll()))
  report('GET /videos', c.youtube.getAll.returns.safeParse(await videos.getAll()))

  console.log('\nlookups (hit, then miss -> null)')
  report('vehicles.getById(re)', c.vehicles.getById.returns.safeParse(await vehicles.getById('re')))
  report('vehicles.getById(nope) is null', (await vehicles.getById('nope')) === null)
  report('bytes.getById(vol-7)', c.bajajBytes.getById.returns.safeParse(await bytes.getById('vol-7')))
  report('bytes.getById(nope) is null', (await bytes.getById('nope')) === null)
  report(
    'podcast.getByVolume(vol-7)',
    c.podcast.getByVolume.returns.safeParse(await podcast.getByVolume('vol-7')),
  )
  report('podcast.getByVolume(nope) is null', (await podcast.getByVolume('nope')) === null)

  console.log('\nfiltering and buckets')
  for (const category of ['md-meetings', 'interviews', 'stories']) {
    const rows = await videos.getByCategory(category)
    const shaped = c.youtube.getByCategory.returns.safeParse(rows)
    const onlyThisCategory = rows.every((v) => v.category === category)
    report(
      `videos?category=${category} (${rows.length})`,
      shaped.success ? onlyThisCategory || 'server returned another category' : shaped,
    )
  }
  const BUCKETS = [
    'pay-compensation-finance', 'health-insurance-safety', 'leave-travel-flexibility',
    'vehicle-mobility', 'workplace-essentials', 'workplace-governance-compliance',
    'career-growth-development', 'management-information-systems',
  ]
  for (const b of BUCKETS) {
    report(`policies/${b}`, c.policyLibrary.getByBucket.returns.safeParse(await policies.getByBucket(b)))
  }
  report('policies/nope is null', (await policies.getByBucket('nope')) === null)

  console.log('\ncsr')
  report('csr.getImpact', c.csr.getImpact.returns.safeParse(await csr.getImpact()))
  report('csr.getPrograms', c.csr.getPrograms.returns.safeParse(await csr.getPrograms()))
  report('csr.getOpportunities', c.csr.getOpportunities.returns.safeParse(await csr.getOpportunities()))
  report(
    'csr.getOpportunityById(opp-1)',
    c.csr.getOpportunityById.returns.safeParse(await csr.getOpportunityById('opp-1')),
  )
  report('csr.getOpportunityById(nope) is null', (await csr.getOpportunityById('nope')) === null)
  report('csr.getStories', c.csr.getStories.returns.safeParse(await csr.getStories()))
  report('csr.getUserStats', c.csr.getUserStats.returns.safeParse(await csr.getUserStats()))

  console.log('\nletters')
  report('letters.getEmployee', c.employeeLetters.getEmployee.returns.safeParse(await letters.getEmployee()))
  report(
    'letters.getSignatories',
    c.employeeLetters.getSignatories.returns.safeParse(await letters.getSignatories()),
  )

  const LETTER_INPUTS = {
    'address-proof': { purpose: 'bank account opening' },
    'residential-proof': { purpose: 'bank account opening' },
    bonafide: { purpose: 'bank account opening' },
    visa: {
      passportNumber: 'Z1234567', passportIssueDate: '2021-03-11',
      passportExpiryDate: '2031-03-10', leaveStartDate: '2026-07-25',
      leaveEndDate: '2026-07-31', contactNumber: '+919999999999',
      travelDestination: 'Syria',
    },
    'vehicle-discount': { customerName: 'A N Other', relationship: 'Spouse', purchaseMethod: 'Cash' },
  }
  for (const [letterTypeId, input] of Object.entries(LETTER_INPUTS)) {
    /*
     * Validate exactly what the adapter returns — no patching. An earlier
     * version of this file attached `entity` itself before validating, which
     * hid the fact that the adapter did not, and the letterhead rendered blank.
     */
    const doc = await letters.generate({ letterTypeId, input, entity: entities.BAL })
    report(`POST generate(${letterTypeId})`, c.employeeLetters.generate.returns.safeParse(doc))
  }
  report(
    'POST generate(nope) is null',
    (await letters.generate({ letterTypeId: 'nope', input: {}, entity: entities.BAL })) === null,
  )

  const form = await letters.generateForm({
    formId: 'form-60',
    input: {
      rtoAddress: 'RTO Pune, Sangamwadi', fatherName: 'Someone Paul',
      permanentAddress: 'Akurdi, Pune 411035', uan: '100200300400',
      pan: 'AAAAA0000A', authorisedSignatory: 'MUKUND MADHAV',
    },
    entity: entities.BAL,
  })
  report('POST forms/generate(form-60)', c.employeeLetters.generateForm.returns.safeParse(form))
  report('issuedOn revived to a Date', form?.issuedOn instanceof Date)
  report('entity re-attached by the adapter', form?.entity?.id === 'BAL')

  console.log('\noperational')
  const health = await (await fetch(`${BASE}/health`)).json()
  report('GET /health', health.status === 'ok' || JSON.stringify(health))
  const missing = await fetch(`${BASE}/no-such-route`)
  report('unknown route -> 404', missing.status === 404 || `got ${missing.status}`)
  const purge = await fetch(`${BASE}/admin/cache/purge`, { method: 'POST' })
  report('purge without token -> 503/401', [503, 401].includes(purge.status) || `got ${purge.status}`)
} finally {
  await vite.close()
}

console.log(
  failures === 0
    ? '\n\x1b[32mall API responses satisfy their contracts\x1b[0m'
    : `\n\x1b[31m${failures} failure(s)\x1b[0m`,
)
process.exit(failures === 0 ? 0 : 1)
