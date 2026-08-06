# components/vehicles/ – Hero 360° Vehicle Viewer

Click a vehicle in the "Distinctly Ahead" hero banner to open a turntable view
of it. Rendered from `layout/HeroBanner.jsx`.

## Component Map

| Component | What it renders |
|---|---|
| `VehicleHotspots.jsx` | Transparent click targets over the banner artwork, one per vehicle, revealing a name chip on hover/focus |
| `VehicleSpinModal.jsx` | Full-screen dark viewer: turntable, spec list, and a pill switcher for the rest of the range |
| `VehicleTurntable.jsx` | The spin surface — canvas + frame preloader, or the poster fallback when a vehicle has no frames |

## Coordinate Contract

`vehiclesMock` stores each `hotspot` as **fractions of the banner image**
(`banner.config.js` holds its intrinsic 2012×782 size). Two consequences:

- `HeroBanner` shares one `PLATE_BOX` class string between the artwork and the
  hotspot overlay. They must stay identical — a CSS-cropped background would
  make the hotspots un-anchorable.
- The same fractions drive the poster fallback's zoom, so retouching the banner
  means updating five numbers in one file.

These are the only inline styles in the feature. The coordinates are data, not
design tokens, so Tailwind classes cannot express them.

## Adding 360° Frames

Two steps:

1. Drop a numbered sequence into `public/vehicles/<vehicle-id>/`:

   ```
   public/vehicles/pulsar/frame-00.svg … frame-35.svg
   ```

2. Set that vehicle's `frameCount` in `vehiclesMock.js` (0 = poster fallback).

Vehicle ids are `re`, `pulsar`, `chetak`, `duke`, `qute`. Convention: 36 frames
at 10° steps, anticlockwise from the front three-quarter view. Frames load on
modal open, never at page load.

### Why public/ and not src/assets/

Frames were first discovered with `import.meta.glob`, which reads better and
needs no `frameCount` — but it puts 180 media files in the JS module graph, and
both glob modes are costly at that scale:

| | dev page load | prod build | JS chunks |
|---|---|---|---|
| `eager: true` | **22s** (one module request per frame, every load, for everyone) | 4s | 3 |
| lazy glob | 2.7s | **74s** | **183** |
| `public/` + `frameCount` | 2.7s | 36s | 3 |

Static assets win on both axes; the cost is one extra number per vehicle, which
belongs in the vehicle data anyway — "does this model have a 360° view yet" is
a product fact, not a bundler detail. Extension is pinned in `vehicleFrames.js`
(`EXTENSION`); change it there when real WebP frames land.

## Placeholder Frames

The current frames are **synthetic wireframes**, not product imagery — they
exist so the interaction can be judged before real photography is commissioned.

```
npm run frames:placeholder
```

Regenerates all 180 from `scripts/generate-placeholder-frames.mjs`, which
projects small hand-authored 3D wireframes (one per vehicle class) through a
turntable at 10° steps, with depth-sorted edges and a depth fade.

Delete `public/vehicles/<id>/` and drop real frames in; nothing else changes.
Keep the five models visually distinct — Pulsar and Duke originally shared one
mesh and rendered identically, which read as a broken viewer rather than a
placeholder.

## Frame Density — Read This Before Tuning Smoothness

Bajaj publishes far fewer frames than a turntable needs:

| Vehicle | Frames | Degrees per step |
|---|---|---|
| RE, Pulsar N160, Qute | 8 | **45°** |
| Chetak | 16 | 22.5° |
| KTM 390 Duke | — (Sketchfab embed) | continuous |

A showroom turntable is 36–72 frames. At 45° a step there is genuinely nothing
between two photographs, so **no amount of easing produces continuous
rotation** — that is a content limit, not a code one. The viewer's job is to
never look broken within it, which is what the two rules below are for.

The frame counts above were verified against the CDN: index `08` is a 404 for
the 8-frame sequences, `16` for the Chetak.

### The two rules that keep 8 frames presentable

1. **At rest, always sit on a whole frame.** A resting position between two
   frames is a permanent cross-fade — a visible double image on everything
   that moved between the shots. The intro sweep, the momentum snap, and
   keyboard stepping all round to integers for this reason; the intro rounds
   its *sweep distance* rather than easing to an arbitrary fraction.
2. **Above walking pace, smear rather than strobe.** `drawTurntable` paints up
   to four trailing samples at decaying opacity, ramping in over
   0.15–1.2 turns/sec. The eye reads the smear as speed instead of as missing
   frames. Below the threshold there is no blur at all, which is where the
   vehicle actually gets looked at.

## Interaction Notes

- **Rendering is off React's render path.** `useTurntable` runs one persistent
  rAF loop that owns the physics and calls `onRender(position, velocity)`
  directly; React state carries only the angle readout and the scrubber thumb,
  throttled to ~15Hz. Driving the canvas from state cost a render per pointer
  event and painted a commit behind the pointer.
- **Position is unwrapped.** It may exceed `frameCount` or go negative; indices
  wrap only at paint time. That is what lets momentum, snapping and stepping
  cross 0°/360° without a discontinuity.
- **Physics are per-second, not per-frame.** Momentum decays as
  `e^(-DAMPING·dt)`. A per-tick constant made momentum die twice as fast on a
  120Hz display and lurch on any dropped frame.
- **One full turn is a fixed 640px of drag** regardless of frame count, so an
  8-frame and a 36-frame sequence feel identical under the thumb.
- **Flick velocity is smoothed** (EMA over coalesced pointer samples) so a
  shaky hand does not read as a shaky vehicle.
- **Intro sweep** rotates `round(frameCount × 0.34)` frames on open then
  yields. Motion is what tells people the vehicle is grabbable; it aborts the
  instant the user touches it.
- **Snapping is eased, not cut** (260ms). At 45° a frame, a hard snap is a
  visible yank.
- **Loading**: sparse sequences (≤16) must arrive complete — one missing frame
  is a 45° hole the vehicle vanishes into. Denser ones hand over at 50% and
  stream the rest in. See `interactiveThreshold` in `useFrameSequence`.
- **The drag hint** dies permanently on first interaction
  (`localStorage: bajaj:turntable-hint-seen`).
- **Keyboard**: the canvas is a `role="slider"`; ←/→ step one frame. A range
  scrubber below it does the same with a pointer, taking the shortest way round.
- **Reduced motion** disables the intro sweep, momentum and blur. Drag still
  works — it is user-driven, not animation.

## Not Yet Built

Angle-anchored hotspots (a callout appearing over the engine at ~40°, the DRL
at ~270°) — the thing that turns the spin from eye candy into a
product-knowledge tool. Deferred until real frames exist to anchor them to.
