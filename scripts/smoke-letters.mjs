/*
 * Drives the Documents & Forms modal end to end: open it, generate a letter,
 * generate Form 60, and check the rendered document actually contains the
 * employee's details and the values that were typed in.
 *
 * This exists because the page-level smoke test passed while this modal was
 * crashing on open. Everything reachable only behind a click needs its own
 * check, or an async regression hides behind a tile nobody automated.
 *
 * Run against either data source:
 *   node scripts/smoke-letters.mjs http://localhost:5173/
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

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  // Splash gates the shell.
  await page.waitForTimeout(3000)

  await page.getByText(/DOCUMENTS\s*\/\s*FORMS/i).first().click()
  const dlg = page.locator('[role="dialog"]')
  await dlg.waitFor({ state: 'visible', timeout: 15000 })
  check('modal opens', true)

  // --- a letter ----------------------------------------------------------
  console.log('\nletters')
  await dlg.getByText(/Bonafide Employee Letter/i).first().click()
  const letterForm = dlg.locator('form')
  await letterForm.waitFor({ state: 'visible', timeout: 15000 })
  check('request form renders', true)

  await letterForm.locator('select').first().selectOption({ label: 'Home Loan' })
  for (const cb of await letterForm.locator('input[type="checkbox"]').all()) await cb.check()
  await dlg.getByRole('button', { name: /generate/i }).first().click()
  await page.waitForTimeout(1800)

  const letterText = (await dlg.innerText()).replace(/\s+/g, ' ')
  check('document rendered', /Your document is ready/i.test(letterText))
  check('carries the letter body', /BONAFIDE EMPLOYEE LETTER/i.test(letterText))
  check('carries the employee record', /DEBOSMITA PAUL/i.test(letterText))
  check('carries the chosen purpose', /purpose of Home Loan/i.test(letterText))

  // --- Form 60 -----------------------------------------------------------
  console.log('\nform 60')
  await dlg.getByRole('button', { name: /^Forms$/ }).click()
  await page.waitForTimeout(700)
  await dlg.getByText(/Form 60/i).first().click()
  const formEl = dlg.locator('form')
  await formEl.waitFor({ state: 'visible', timeout: 15000 })

  for (const el of await formEl.locator('input:not([readonly])[type="text"]').all()) {
    await el.fill('TEST VALUE')
  }
  for (const sel of await formEl.locator('select').all()) await sel.selectOption({ index: 1 })
  for (const cb of await formEl.locator('input[type="checkbox"]').all()) await cb.check()

  await dlg.getByRole('button', { name: /generate/i }).first().click()
  await page.waitForTimeout(1800)

  const formText = (await dlg.innerText()).replace(/\s+/g, ' ')
  check('document rendered', /Your document is ready/i.test(formText))
  check('is the working certificate', /Working Certificate/i.test(formText))
  check('carries the employee record', /DEBOSMITA PAUL/i.test(formText))
  check('carries the typed input', /TEST VALUE/.test(formText))

  check('no console errors', errors.length === 0, errors.slice(0, 3).join('\n        '))
  await page.screenshot({ path: '.smoke-letters.png' })
} catch (err) {
  failures += 1
  console.log(`  ${FAIL} ${err.message.split('\n')[0]}`)
  await page.screenshot({ path: '.smoke-letters.png' }).catch(() => {})
} finally {
  await browser.close()
}

console.log(failures === 0 ? '\nLETTERS SMOKE PASSED' : `\n${failures} failure(s)`)
process.exit(failures === 0 ? 0 : 1)
