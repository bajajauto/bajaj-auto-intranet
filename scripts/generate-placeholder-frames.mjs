#!/usr/bin/env node
/**
 * Renders solid, shaded turntable frames for the 360° hero viewer.
 *
 *   npm run frames:placeholder
 *
 * Output: public/vehicles/<id>/frame-NN.svg, 36 frames at 10° steps — the
 * layout `src/config/vehicleFrames.js` builds URLs for.
 *
 * Frames live in public/ rather than src/assets/ on purpose: they are media,
 * not code. Routing 180 files through the JS module graph cost either a 22s
 * dev page load (eager glob) or a 74s production build and 180 tiny chunks
 * (lazy glob). As static assets they cost neither.
 *
 * How it works: each vehicle is authored once as a set of 3D parts (wheels,
 * extruded side profiles, boxes, tubes) in its rest pose. Every part expands
 * to filled polygons; per frame we spin the whole model about y, light each
 * polygon from a fixed key light, sort far-to-near (painter's algorithm) and
 * paint it in the model's brand colour. The result reads as a real vehicle in
 * paint, not a wireframe — swap in commissioned photography when it arrives and
 * delete the generated folders.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public/vehicles')

const FRAME_COUNT = 36
const WIDTH = 720
const HEIGHT = 520
const GROUND_Y = 402
const SCALE = 228
const FOCAL = 4.2

// ── Shared paint ────────────────────────────────────────────────────────────
// Materials reused across every model, so tyres and chrome read the same on
// each vehicle. Each colour is a plain [r, g, b] the shader tints per face.

const TYRE = [30, 32, 37]
const RIM = [188, 194, 203]
const HUB = [116, 122, 131]
const GLASS = [150, 196, 224]

// ── Geometry primitives ────────────────────────────────────────────────────
// Axes: +x forward (nose), +y up, +z to the vehicle's right. The turntable
// spins about y, so every part is authored once in its rest pose. Each helper
// returns { faces, strokes }: faces are filled polygons (arrays of [x,y,z]
// points with a base colour); strokes are thin tubes for forks, bars and trim.

function merge(...parts) {
  const faces = []
  const strokes = []
  for (const p of parts) {
    if (p.faces) faces.push(...p.faces)
    if (p.strokes) strokes.push(...p.strokes)
  }
  return { faces, strokes }
}

// A wheel: tyre band + two sidewalls, a bright rim disc, a hub and spokes.
// The tread band is real geometry, so the wheel narrows to an edge as the
// turntable brings it side-on — which is what sells the spin.
function wheel({ center: [cx, cy, cz], radius, width, spokes = 6, segments = 28 }) {
  const half = width / 2
  const ring = (z, r) =>
    Array.from({ length: segments }, (_, i) => {
      const t = (i / segments) * Math.PI * 2
      return [cx + r * Math.cos(t), cy + r * Math.sin(t), z]
    })

  const innerTyre = ring(cz - half, radius)
  const outerTyre = ring(cz + half, radius)
  const faces = []
  const strokes = []

  // Tread band — one quad per segment around the circumference.
  for (let i = 0; i < segments; i += 1) {
    const j = (i + 1) % segments
    faces.push({ pts: [innerTyre[i], innerTyre[j], outerTyre[j], outerTyre[i]], color: TYRE })
  }

  // Two sidewalls, a rim disc and a hub on each face.
  for (const z of [cz - half, cz + half]) {
    faces.push({ pts: ring(z, radius), color: TYRE })
    faces.push({ pts: ring(z, radius * 0.62), color: RIM })
    faces.push({ pts: ring(z, radius * 0.24), color: HUB })
    for (let s = 0; s < spokes; s += 1) {
      const t = (s / spokes) * Math.PI * 2
      strokes.push({
        from: [cx, cy, z],
        to: [cx + radius * 0.58 * Math.cos(t), cy + radius * 0.58 * Math.sin(t), z],
        color: HUB,
        width: 2.4,
      })
    }
  }

  return { faces, strokes }
}

// A 2D side-view outline extruded to a thickness — the workhorse for tanks,
// aprons, cabins and cowls. Two side panels plus a band wrapping the edge.
function prism({ profile, halfWidth, color, band = color }) {
  const left = profile.map(([x, y]) => [x, y, -halfWidth])
  const right = profile.map(([x, y]) => [x, y, halfWidth])
  const faces = [
    { pts: left, color },
    { pts: right, color },
  ]
  for (let i = 0; i < profile.length; i += 1) {
    const j = (i + 1) % profile.length
    faces.push({ pts: [left[i], left[j], right[j], right[i]], color: band })
  }
  return { faces, strokes: [] }
}

function box({ min: [x0, y0, z0], max: [x1, y1, z1], color }) {
  const c = [
    [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
    [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
  ]
  const quads = [
    [0, 1, 2, 3], [5, 4, 7, 6], [4, 0, 3, 7],
    [1, 5, 6, 2], [3, 2, 6, 7], [4, 5, 1, 0],
  ]
  return { faces: quads.map((q) => ({ pts: q.map((i) => c[i]), color })), strokes: [] }
}

// A thin round tube for forks, handlebars, grab rails and exhausts — cheaper
// than a swept solid and reads correctly at this scale.
function bar({ from, to, color, width = 3 }) {
  return { faces: [], strokes: [{ from, to, color, width }] }
}

// ── Models ─────────────────────────────────────────────────────────────────
// Brand-recognisable paint per vehicle; the shader tints these per face.

const RED = [200, 30, 42] // Pulsar racing red
const ORANGE = [255, 106, 0] // KTM orange
const TEAL = [26, 128, 146] // Chetak
const YELLOW = [242, 194, 44] // RE auto
const BLUE = [44, 112, 198] // Qute
const INK = [30, 31, 37] // near-black frame / engine
const STEEL = [96, 102, 112]

const motorcycle = merge(
  wheel({ center: [-0.62, 0.33, 0], radius: 0.33, width: 0.1, spokes: 6 }),
  wheel({ center: [0.62, 0.33, 0], radius: 0.33, width: 0.09, spokes: 6 }),
  // Engine / crankcase.
  box({ min: [-0.2, 0.3, -0.15], max: [0.28, 0.58, 0.15], color: INK }),
  // Fuel tank + tail — the painted body.
  prism({
    halfWidth: 0.12,
    color: RED,
    band: [150, 22, 32],
    profile: [
      [-0.86, 0.76], [-0.42, 0.82], [-0.16, 0.72], [0.06, 0.84],
      [0.4, 0.86], [0.52, 0.7], [0.3, 0.56], [-0.18, 0.52], [-0.58, 0.56],
    ],
  }),
  // Seat.
  prism({
    halfWidth: 0.1,
    color: INK,
    profile: [[-0.62, 0.6], [-0.2, 0.62], [-0.18, 0.54], [-0.6, 0.53]],
  }),
  bar({ from: [0.46, 0.78, -0.09], to: [0.62, 0.34, -0.09], color: STEEL, width: 3.4 }),
  bar({ from: [0.46, 0.78, 0.09], to: [0.62, 0.34, 0.09], color: STEEL, width: 3.4 }),
  bar({ from: [0.46, 0.78, 0], to: [0.44, 0.94, 0], color: INK }),
  bar({ from: [0.44, 0.94, -0.3], to: [0.44, 0.94, 0.3], color: INK, width: 3.4 }),
  bar({ from: [0.44, 0.94, -0.3], to: [0.39, 0.87, -0.34], color: INK }),
  bar({ from: [0.44, 0.94, 0.3], to: [0.39, 0.87, 0.34], color: INK }),
  bar({ from: [-0.18, 0.42, -0.1], to: [-0.62, 0.33, -0.1], color: INK, width: 3.4 }),
  bar({ from: [-0.18, 0.42, 0.1], to: [-0.62, 0.33, 0.1], color: INK, width: 3.4 })
)

const scooter = merge(
  wheel({ center: [-0.5, 0.26, 0], radius: 0.26, width: 0.11, spokes: 6 }),
  wheel({ center: [0.54, 0.26, 0], radius: 0.26, width: 0.1, spokes: 6 }),
  // Front apron / legshield.
  prism({
    halfWidth: 0.17,
    color: TEAL,
    band: [18, 96, 110],
    profile: [[-0.8, 0.52], [-0.72, 0.76], [-0.3, 0.82], [-0.06, 0.74], [-0.04, 0.4], [-0.62, 0.36]],
  }),
  // Floorboard.
  prism({
    halfWidth: 0.16,
    color: [20, 100, 114],
    profile: [[-0.06, 0.44], [0.32, 0.44], [0.32, 0.34], [-0.06, 0.34]],
  }),
  // Rear body + seat hump.
  prism({
    halfWidth: 0.15,
    color: TEAL,
    band: [18, 96, 110],
    profile: [[0.32, 0.34], [0.34, 0.72], [0.5, 0.92], [0.66, 0.86], [0.56, 0.56], [0.52, 0.34]],
  }),
  // Seat.
  prism({
    halfWidth: 0.155,
    color: INK,
    profile: [[0.3, 0.78], [0.52, 0.8], [0.52, 0.72], [0.3, 0.7]],
  }),
  bar({ from: [-0.76, 0.66, 0], to: [-0.78, 0.94, 0], color: STEEL, width: 3 }),
  bar({ from: [-0.78, 0.94, 0], to: [-0.8, 1.0, 0], color: INK }),
  bar({ from: [-0.8, 1.0, -0.28], to: [-0.8, 1.0, 0.28], color: INK, width: 3.4 }),
  bar({ from: [-0.8, 1.0, -0.28], to: [-0.75, 0.95, -0.31], color: INK }),
  bar({ from: [-0.8, 1.0, 0.28], to: [-0.75, 0.95, 0.31], color: INK })
)

const threeWheeler = merge(
  wheel({ center: [0.78, 0.26, 0], radius: 0.26, width: 0.1, spokes: 5 }),
  wheel({ center: [-0.62, 0.28, -0.46], radius: 0.28, width: 0.12, spokes: 5 }),
  wheel({ center: [-0.62, 0.28, 0.46], radius: 0.28, width: 0.12, spokes: 5 }),
  // Cabin / passenger body.
  box({ min: [-0.92, 0.3, -0.44], max: [0.62, 1.12, 0.44], color: YELLOW }),
  // Roof.
  box({ min: [-0.86, 1.12, -0.4], max: [0.5, 1.26, 0.4], color: [30, 32, 38] }),
  // Front nose / cowl.
  prism({
    halfWidth: 0.22,
    color: YELLOW,
    band: [196, 150, 24],
    profile: [[0.62, 0.34], [0.86, 0.44], [0.92, 0.72], [0.62, 0.86]],
  }),
  // Windshield.
  prism({
    halfWidth: 0.34,
    color: GLASS,
    profile: [[0.5, 0.72], [0.62, 0.72], [0.62, 1.08], [0.5, 1.08]],
  }),
  bar({ from: [0.62, 0.86, 0], to: [0.78, 0.3, 0], color: INK, width: 3.4 })
)

const quadricycle = merge(
  wheel({ center: [0.66, 0.27, -0.56], radius: 0.27, width: 0.13, spokes: 5 }),
  wheel({ center: [0.66, 0.27, 0.56], radius: 0.27, width: 0.13, spokes: 5 }),
  wheel({ center: [-0.66, 0.27, -0.56], radius: 0.27, width: 0.13, spokes: 5 }),
  wheel({ center: [-0.66, 0.27, 0.56], radius: 0.27, width: 0.13, spokes: 5 }),
  // Lower body.
  box({ min: [-0.98, 0.26, -0.52], max: [0.98, 0.8, 0.52], color: BLUE }),
  // Greenhouse / cabin.
  box({ min: [-0.78, 0.8, -0.48], max: [0.62, 1.32, 0.48], color: [34, 92, 168] }),
  // Windscreen slope.
  prism({
    halfWidth: 0.46,
    color: GLASS,
    profile: [[0.62, 0.82], [0.98, 0.82], [0.98, 0.9], [0.62, 1.3]],
  }),
  // Side glass.
  box({ min: [-0.76, 0.9, -0.49], max: [0.6, 1.24, -0.47], color: GLASS }),
  box({ min: [-0.76, 0.9, 0.47], max: [0.6, 1.24, 0.49], color: GLASS })
)

// Naked streetfighter: taller stance, stubby upswept tail, exposed trellis
// frame. Distinct enough from the Pulsar that switching between the two never
// looks like the viewer failed to update.
const streetfighter = merge(
  wheel({ center: [-0.6, 0.36, 0], radius: 0.36, width: 0.11, spokes: 5 }),
  wheel({ center: [0.64, 0.36, 0], radius: 0.36, width: 0.1, spokes: 5 }),
  // Tank + tail bodywork.
  prism({
    halfWidth: 0.13,
    color: ORANGE,
    band: [198, 82, 0],
    profile: [
      [-0.78, 1.02], [-0.5, 1.06], [-0.34, 0.86], [0.02, 0.98],
      [0.36, 0.96], [0.48, 0.78], [0.22, 0.64], [-0.3, 0.66],
    ],
  }),
  // Engine.
  box({ min: [-0.16, 0.36, -0.16], max: [0.26, 0.66, 0.16], color: INK }),
  // Trellis lattice — the streetfighter's signature read, in frame orange.
  bar({ from: [-0.3, 0.66, -0.14], to: [0.16, 0.9, -0.14], color: ORANGE, width: 3 }),
  bar({ from: [-0.3, 0.66, 0.14], to: [0.16, 0.9, 0.14], color: ORANGE, width: 3 }),
  bar({ from: [-0.28, 0.9, -0.14], to: [0.14, 0.62, -0.14], color: ORANGE, width: 3 }),
  bar({ from: [-0.28, 0.9, 0.14], to: [0.14, 0.62, 0.14], color: ORANGE, width: 3 }),
  bar({ from: [0.44, 0.9, -0.1], to: [0.64, 0.37, -0.1], color: STEEL, width: 3.4 }),
  bar({ from: [0.44, 0.9, 0.1], to: [0.64, 0.37, 0.1], color: STEEL, width: 3.4 }),
  bar({ from: [0.44, 0.9, 0], to: [0.42, 1.08, 0], color: INK }),
  bar({ from: [0.42, 1.08, -0.32], to: [0.42, 1.08, 0.32], color: INK, width: 3.4 }),
  bar({ from: [0.42, 1.08, -0.32], to: [0.36, 1.0, -0.36], color: INK }),
  bar({ from: [0.42, 1.08, 0.32], to: [0.36, 1.0, 0.36], color: INK }),
  // Upswept tail.
  bar({ from: [-0.5, 1.06, -0.1], to: [-0.82, 1.16, -0.1], color: ORANGE, width: 3 }),
  bar({ from: [-0.5, 1.06, 0.1], to: [-0.82, 1.16, 0.1], color: ORANGE, width: 3 }),
  bar({ from: [-0.82, 1.16, -0.1], to: [-0.82, 1.16, 0.1], color: INK }),
  // Underslung exhaust.
  bar({ from: [-0.1, 0.4, 0.16], to: [-0.5, 0.5, 0.2], color: STEEL, width: 3.4 })
)

const MODELS = {
  re: threeWheeler,
  pulsar: motorcycle,
  chetak: scooter,
  duke: streetfighter,
  qute: quadricycle,
}

// ── Render ─────────────────────────────────────────────────────────────────

// Fixed key light in view space (upper-left, toward the camera at -z).
const LIGHT = normalize([-0.35, 0.72, -0.6])
const AMBIENT = 0.52
const DIFFUSE = 0.6

function normalize([x, y, z]) {
  const len = Math.hypot(x, y, z) || 1
  return [x / len, y / len, z / len]
}

// Newell's method — robust normal for a (possibly non-planar) polygon.
function faceNormal(pts) {
  let nx = 0
  let ny = 0
  let nz = 0
  for (let i = 0; i < pts.length; i += 1) {
    const a = pts[i]
    const b = pts[(i + 1) % pts.length]
    nx += (a[1] - b[1]) * (a[2] + b[2])
    ny += (a[2] - b[2]) * (a[0] + b[0])
    nz += (a[0] - b[0]) * (a[1] + b[1])
  }
  return normalize([nx, ny, nz])
}

// Spin about y, then perspective-project. Returns screen point + view depth.
function rotate([x, y, z], sin, cos) {
  return [x * cos + z * sin, y, -x * sin + z * cos]
}

function project([rx, ry, rz]) {
  const k = FOCAL / (FOCAL + rz)
  return { x: WIDTH / 2 + rx * k * SCALE, y: GROUND_Y - ry * k * SCALE, k }
}

const round = (n) => Math.round(n * 10) / 10
const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)))

function shade([r, g, b], normal) {
  // Orient the normal toward the camera so both faces of thin parts light up.
  const n = normal[2] > 0 ? [-normal[0], -normal[1], -normal[2]] : normal
  const d = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2])
  const f = AMBIENT + DIFFUSE * d
  return `rgb(${clamp(r * f)},${clamp(g * f)},${clamp(b * f)})`
}

function renderFrame(model, angle) {
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)

  const prims = []

  for (const face of model.faces) {
    const rotated = face.pts.map((p) => rotate(p, sin, cos))
    const projected = rotated.map(project)
    const depth = rotated.reduce((s, p) => s + p[2], 0) / rotated.length
    const fill = shade(face.color, faceNormal(rotated))
    const points = projected.map((p) => `${round(p.x)},${round(p.y)}`).join(' ')
    prims.push({
      depth,
      svg: `<polygon points="${points}" fill="${fill}" stroke="${fill}" stroke-width="0.7"/>`,
    })
  }

  for (const stroke of model.strokes) {
    const ra = rotate(stroke.from, sin, cos)
    const rb = rotate(stroke.to, sin, cos)
    const pa = project(ra)
    const pb = project(rb)
    const depth = (ra[2] + rb[2]) / 2
    const width = round(stroke.width * ((pa.k + pb.k) / 2))
    const color = shade(stroke.color, faceNormal([ra, rb, [ra[0], ra[1] + 1, ra[2]]]))
    prims.push({
      depth,
      svg: `<line x1="${round(pa.x)}" y1="${round(pa.y)}" x2="${round(pb.x)}" y2="${round(
        pb.y
      )}" stroke="${color}" stroke-width="${width}"/>`,
    })
  }

  // Painter's algorithm: far parts first so near ones paint over them.
  prims.sort((a, b) => b.depth - a.depth)

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">`,
    `<ellipse cx="${WIDTH / 2}" cy="${GROUND_Y + 8}" rx="270" ry="34" fill="#05070c" opacity="0.28"/>`,
    `<g stroke-linecap="round" stroke-linejoin="round">${prims.map((p) => p.svg).join('')}</g>`,
    '</svg>',
  ].join('')
}

let written = 0
for (const [id, model] of Object.entries(MODELS)) {
  const dir = join(OUT_DIR, id)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })

  for (let frame = 0; frame < FRAME_COUNT; frame += 1) {
    const angle = (frame / FRAME_COUNT) * Math.PI * 2
    const name = `frame-${String(frame).padStart(2, '0')}.svg`
    writeFileSync(join(dir, name), renderFrame(model, angle), 'utf8')
    written += 1
  }
  console.log(`${id}: ${FRAME_COUNT} frames`)
}

console.log(`\n${written} rendered frames written to public/vehicles/`)
console.log(
  `Each vehicle declares its own frameCount in services/adapters/mock/vehiclesMock.js —\n` +
    `keep it at ${FRAME_COUNT}, or set 0 to fall back to the poster.`
)
