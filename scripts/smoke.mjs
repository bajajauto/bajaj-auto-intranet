/*
 * Loads the running app, waits for the data layer to settle, and reports any
 * console error or failed request.
 *
 * Exists because a build passing proves the modules resolve, not that the page
 * renders — the async refactor's failure mode is a runtime crash inside a
 * component, which the compiler cannot see.
 *
 * Run: npm run dev, then node scripts/smoke.mjs [url]
 */
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5173/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

const errors = []
const failures = []

page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))
page.on('requestfailed', (req) => {
  // Vite's HMR socket and third-party image hosts are not the app's health.
  if (req.url().includes('/@vite/')) return
  failures.push(`${req.method()} ${req.url()} — ${req.failure()?.errorText}`)
})

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
// The splash screen gates the shell; give it and the first queries time to land.
await page.waitForTimeout(Number(process.env.SMOKE_SETTLE_MS ?? 3500))

const seen = await page.evaluate(() => ({
  hasRoot: Boolean(document.querySelector('#root')?.children.length),
  text: document.body.innerText.replace(/\s+/g, ' ').slice(0, 400),
  skeletons: document.querySelectorAll('[data-skeleton]').length,
  alerts: document.querySelectorAll('[role="alert"]').length,
}))

await page.screenshot({ path: '.smoke.png', fullPage: false })
await browser.close()

console.log('rendered:', seen.hasRoot)
console.log('skeletons still on screen:', seen.skeletons)
console.log('error panels on screen:', seen.alerts)
console.log('\nvisible text:\n ', seen.text)

if (errors.length) {
  console.log(`\nconsole errors (${errors.length}):`)
  for (const e of errors.slice(0, 12)) console.log('  -', e)
}
if (failures.length) {
  console.log(`\nfailed requests (${failures.length}):`)
  for (const f of failures.slice(0, 12)) console.log('  -', f)
}

const bad = errors.length > 0 || !seen.hasRoot
console.log(bad ? '\nSMOKE FAILED' : '\nSMOKE PASSED')
process.exit(bad ? 1 : 0)
