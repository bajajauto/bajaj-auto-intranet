import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', '.mobile-shots')
mkdirSync(outDir, { recursive: true })

const URL = process.env.URL || 'http://localhost:5173/'
const devices = [
  { name: 'android-360', width: 360, height: 800 },
  { name: 'iphone-390', width: 390, height: 844 },
]

const browser = await chromium.launch()
for (const d of devices) {
  const ctx = await browser.newContext({
    viewport: { width: d.width, height: d.height },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2600) // let splash auto-dismiss (2000ms) + settle

  // The real "zoomed/broken" signature: does the page scroll sideways?
  const overflow = await page.evaluate(() => {
    const de = document.documentElement
    const offenders = []
    const vw = de.clientWidth
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.right > vw + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString().slice(0, 80)) || '',
          left: Math.round(r.left),
          right: Math.round(r.right),
        })
      }
    })
    return {
      docWidth: de.scrollWidth,
      viewWidth: vw,
      overflows: de.scrollWidth > vw + 1,
      offenders: offenders.slice(0, 15),
    }
  })
  console.log(`\n=== ${d.name} (${d.width}px) ===`)
  console.log(`scrollWidth=${overflow.docWidth} viewport=${overflow.viewWidth} horizontalOverflow=${overflow.overflows}`)
  if (overflow.offenders.length) {
    console.log('Elements crossing the viewport edge:')
    overflow.offenders.forEach((o) => console.log(`  <${o.tag} class="${o.cls}"> L${o.left} R${o.right}`))
  }

  await page.screenshot({ path: join(outDir, `${d.name}-full.png`), fullPage: true })
  await ctx.close()
}
await browser.close()
console.log('\nScreenshots written to .mobile-shots/')
