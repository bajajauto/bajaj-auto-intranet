/*
 * Drives the Jarvis chat end to end: open it, ask questions that hit each kind
 * of answer (a policy from the policy library, a holiday from the calendar, a
 * letter, a Pitstop link, the fallback), and check that an answer's button
 * really opens what it names.
 *
 * The chat lives behind a click, so the page-level smoke test never sees it.
 *
 *   node scripts/smoke-jarvis.mjs http://localhost:5173/
 */
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5173/'
const PASS = '\x1b[32m ok \x1b[0m'
const FAIL = '\x1b[31mFAIL\x1b[0m'

let failures = 0
const check = (label, ok, detail) => {
  if (ok) {
    console.log(`  ${PASS} ${label}`)
  } else {
    failures += 1
    console.log(`  ${FAIL} ${label}${detail ? `\n        ${detail}` : ''}`)
  }
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => {
  if (m.type() === 'error' && !m.text().includes('ERR_BLOCKED_BY_ORB')) errors.push(m.text())
})

const input = () => page.getByPlaceholder('Ask Jarvis anything…')

// Sends a question and returns the text of the reply bubble it produced.
async function ask(question) {
  const bubbles = page.locator('.whitespace-pre-line')
  const before = await bubbles.count()
  await input().fill(question)
  await input().press('Enter')
  // The question and the reply each add a bubble.
  await page.waitForFunction(
    (n) => document.querySelectorAll('.whitespace-pre-line').length >= n + 2,
    before,
    { timeout: 10000 }
  )
  return (await bubbles.last().innerText()).replace(/\s+/g, ' ')
}

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  // Splash gates the shell.
  await page.waitForTimeout(3000)

  await page.getByRole('button', { name: 'Open Jarvis chat' }).click()
  await input().waitFor({ state: 'visible', timeout: 10000 })
  check('chat opens', true)
  // Let the policy library land before asking about it.
  await page.waitForTimeout(1200)

  console.log('\nanswers')
  const cases = [
    ['leave policy', /Leave Policy enables employees/i, 'policy summary from the library'],
    ['what car can I take for intercity travel', /Innova/i, 'a DTP FAQ'],
    ['next holiday', /next holiday is|no more holidays/i, 'the calendar'],
    ['bonafide letter', /Confirms your employment/i, 'a letter type'],
    ['my payslip', /Compensation portal/i, 'a Pitstop service'],
    ['password reset', /MIS Password Management/i, 'a policy document by name'],
    ['who won the cricket match', /couldn.t find that/i, 'the fallback'],
  ]
  for (const [question, expected, label] of cases) {
    const reply = await ask(question)
    check(`"${question}" → ${label}`, expected.test(reply), reply.slice(0, 140))
  }

  console.log('\nbuttons')
  await ask('leave policy')
  await page.getByRole('button', { name: 'Browse all policies' }).last().click()
  const dlg = page.locator('[role="dialog"]')
  await dlg.waitFor({ state: 'visible', timeout: 10000 })
  check('"Browse all policies" opens the Policies modal', true)
  await page.keyboard.press('Escape')
  await dlg.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {})

  check('no console errors', errors.length === 0, errors.slice(0, 3).join('\n        '))
  await page.screenshot({ path: '.smoke-jarvis.png' })
} catch (err) {
  failures += 1
  console.log(`  ${FAIL} ${err.message.split('\n')[0]}`)
  await page.screenshot({ path: '.smoke-jarvis.png' }).catch(() => {})
} finally {
  await browser.close()
}

console.log(failures === 0 ? '\nJARVIS SMOKE PASSED' : `\n${failures} failure(s)`)
process.exit(failures === 0 ? 0 : 1)
