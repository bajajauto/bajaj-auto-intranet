import { chromium } from 'playwright'

const URL = process.env.URL || 'http://localhost:5173/'
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 360, height: 800 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
})
const page = await ctx.newPage()
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(2600)

const sources = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth
  const out = []
  document.querySelectorAll('*').forEach((el) => {
    const style = getComputedStyle(el)
    if (style.position === 'fixed' || style.position === 'absolute') return
    const w = el.getBoundingClientRect().width
    if (w <= vw + 1) return
    // Leaf source: this element overflows but NONE of its children do.
    const kids = Array.from(el.children)
    const anyKidOverflows = kids.some((k) => k.getBoundingClientRect().width > vw + 1)
    if (!anyKidOverflows) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.toString().slice(0, 130)) || '',
        width: Math.round(w),
        scrollW: el.scrollWidth,
        overflowX: style.overflowX,
      })
    }
  })
  return { vw, out }
})

console.log(`viewport=${sources.vw}`)
console.log('Overflow SOURCES (parent fits, element does not):')
sources.out.forEach((o) => console.log(`  <${o.tag} class="${o.cls}"> width=${o.width} scrollW=${o.scrollW}`))
if (!sources.out.length) console.log('  (none found at flow level — overflow is from a fixed/absolute element)')

await browser.close()
