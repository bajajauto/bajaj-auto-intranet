/*
 * Snapshots every mock adapter response to JSON for the API server to serve.
 *
 * Why generate rather than let the server import the mocks: the mock files
 * import bundled assets (`import cover from '@/assets/news/q4.jpg'`) and use the
 * `@/` alias, neither of which plain Node can resolve. Running them through
 * Vite here resolves both, and the server ends up with zero coupling to the
 * front-end build.
 *
 * Why generate rather than hand-write server fixtures: there would then be two
 * copies of every response, and they would drift within a week.
 *
 * Every snapshot is validated against `src/contracts/` before it is written, so
 * a fixture that violates the contract fails the build rather than the server.
 *
 * Run: npm run fixtures
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const OUT = 'server/fixtures'

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

const load = (p) => server.ssrLoadModule(p)
const mock = async (name) => {
  const mod = await load(`/src/services/adapters/mock/${name}Mock.js`)
  return mod[`${name}Mock`]
}

let violations = 0

/** Validates a snapshot against its contract before it can be written. */
function check(label, schema, value) {
  const result = schema.safeParse(value)
  if (result.success) return value
  violations += 1
  console.error(`  ✗ ${label}`)
  for (const issue of result.error.issues.slice(0, 5)) {
    console.error(`      ${issue.path.join('.') || '(root)'}: ${issue.message}`)
  }
  return value
}

try {
  const { contracts } = await load('/src/contracts/index.js')
  const { entities } = await load('/src/config/letters.config.js')

  const [news, notices, notifications, calendar, stock, vehicles, bytes, podcast, youtube, policy, csr, letters] =
    await Promise.all([
      mock('news'), mock('notices'), mock('notifications'), mock('calendar'),
      mock('stock'), mock('vehicles'), mock('bajajBytes'), mock('podcast'),
      mock('youtube'), mock('policyLibrary'), mock('csr'), mock('employeeLetters'),
    ])

  const POLICY_BUCKETS = [
    'pay-compensation-finance',
    'health-insurance-safety',
    'leave-travel-flexibility',
    'vehicle-mobility',
    'workplace-essentials',
    'workplace-governance-compliance',
    'career-growth-development',
    'management-information-systems',
  ]

  const files = {
    'news.json': check('news', contracts.news.getAll.returns, news.getAll()),
    'notices.json': check('notices', contracts.notices.getAll.returns, notices.getAll()),
    'notifications.json': check(
      'notifications',
      contracts.notifications.getAll.returns,
      notifications.getAll(),
    ),
    'calendar.json': check('calendar', contracts.calendar.getEvents.returns, calendar.getEvents()),
    'ticker.json': check('ticker', contracts.stock.getAll.returns, stock.getAll()),
    'vehicles.json': check('vehicles', contracts.vehicles.getAll.returns, vehicles.getAll()),
    'bytes-volumes.json': check('bytes', contracts.bajajBytes.getAll.returns, bytes.getAll()),
    'podcast-episodes.json': check('podcast', contracts.podcast.getAll.returns, podcast.getAll()),
    'videos.json': check('videos', contracts.youtube.getAll.returns, youtube.getAll()),
    'policies.json': Object.fromEntries(
      POLICY_BUCKETS.map((id) => [
        id,
        check(`policies/${id}`, contracts.policyLibrary.getByBucket.returns, policy.getByBucket(id)),
      ]),
    ),
    'csr.json': {
      impact: check('csr/impact', contracts.csr.getImpact.returns, csr.getImpact()),
      programs: check('csr/programs', contracts.csr.getPrograms.returns, csr.getPrograms()),
      opportunities: check(
        'csr/opportunities',
        contracts.csr.getOpportunities.returns,
        csr.getOpportunities(),
      ),
      stories: check('csr/stories', contracts.csr.getStories.returns, csr.getStories()),
      userStats: check('csr/userStats', contracts.csr.getUserStats.returns, csr.getUserStats()),
    },
    'letters.json': {
      employee: check(
        'letters/employee',
        contracts.employeeLetters.getEmployee.returns,
        letters.getEmployee(),
      ),
      signatories: check(
        'letters/signatories',
        contracts.employeeLetters.getSignatories.returns,
        letters.getSignatories(),
      ),
    },
    /*
     * Logos are stripped: they are bundled front-end assets, and the letter
     * preview already has them from its own config. The server only needs the
     * legal fields Form 60 prints.
     */
    'entities.json': Object.fromEntries(
      Object.entries(entities).map(([id, e]) => {
        const { logo, ...rest } = e
        return [id, rest]
      }),
    ),
  }

  await mkdir(OUT, { recursive: true })
  for (const [name, data] of Object.entries(files)) {
    const json = JSON.stringify(data, null, 2)
    await writeFile(`${OUT}/${name}`, json + '\n', 'utf8')
    console.log(`  ${name.padEnd(24)} ${(json.length / 1024).toFixed(1)} kB`)
  }
} finally {
  await server.close()
}

console.log(
  violations === 0
    ? `\nfixtures written to ${OUT}/`
    : `\n${violations} fixture(s) violate their contract`,
)
process.exit(violations === 0 ? 0 : 1)
