/*
 * Renders the app icons the PWA manifest and index.html point at, from the
 * product mark in brand.config — so the home-screen icon is the header's "1"
 * and never a hand-exported PNG that drifts from it.
 *
 * Two families, because Android treats them differently:
 * - `any`: the numeral large on a full-bleed square. Used where the launcher
 *   shows the icon as drawn (and for the favicon and apple-touch icon).
 * - `maskable`: the numeral shrunk into the centre safe zone. The launcher
 *   crops these to its own shape — circle, squircle — and anything outside the
 *   middle 80% can be cut off.
 *
 * Run: npm run icons   (writes public/favicon.svg and public/icons/*.png)
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { productMark } from '../src/config/brand.config.js'

const BACKGROUND = '#133E82' // brand-dark — also the manifest's theme colour
const INK = '#FFFFFF'

/* How tall the numeral stands, as a share of the icon's side. */
const SCALE_ANY = 0.62
const SCALE_MASKABLE = 0.46

function iconSvg(size, scale, { rounded = false } = {}) {
  const { ink } = productMark
  const k = (size * scale) / ink.height
  const x = size / 2 - (ink.x + ink.width / 2) * k
  const y = size / 2 - (ink.y + ink.height / 2) * k
  const radius = rounded ? size * 0.2 : 0
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${BACKGROUND}"/>
  <path d="${productMark.path}" fill="${INK}" transform="translate(${x} ${y}) scale(${k})"/>
</svg>`
}

const outputs = [
  { file: 'icons/icon-192.png', size: 192, scale: SCALE_ANY },
  { file: 'icons/icon-512.png', size: 512, scale: SCALE_ANY },
  { file: 'icons/icon-maskable-512.png', size: 512, scale: SCALE_MASKABLE },
  { file: 'icons/apple-touch-icon.png', size: 180, scale: SCALE_ANY },
  { file: 'icons/favicon-32.png', size: 32, scale: SCALE_ANY },
]

await mkdir('public/icons', { recursive: true })
await writeFile('public/favicon.svg', iconSvg(64, SCALE_ANY, { rounded: true }))

const browser = await chromium.launch()
const page = await browser.newPage()
for (const { file, size, scale } of outputs) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${iconSvg(size, scale)}</body></html>`,
  )
  await page.locator('svg').screenshot({ path: `public/${file}` })
  console.log('wrote', `public/${file}`)
}
await browser.close()
console.log('wrote public/favicon.svg')
