// Turntable frames are served as static assets from public/vehicles/, not
// imported through the JS module graph.
//
//   public/vehicles/<vehicle-id>/frame-00.svg … frame-35.svg
//
// They were originally discovered with `import.meta.glob`, which reads nicely
// but makes 180 media files part of the build: an eager glob cost a 22s dev
// page load (one module request per frame, on every page load, for everyone),
// and a lazy glob cost a 74s production build and 180 tiny JS chunks. Static
// assets cost neither — Vite copies public/ verbatim.
//
// The trade is that the frame count can no longer be inferred from disk, so
// each vehicle declares its own `frameCount`. That belongs in the vehicle data
// anyway: "does this model have a 360° view yet" is a product fact, not a
// bundler detail.

const BASE = '/vehicles'
const EXTENSION = 'svg'

/**
 * Frame URLs for a vehicle, in turntable order. Returns [] when the vehicle
 * has no published frames, which is what drives the poster fallback.
 */
export function buildFrameUrls(vehicleId, frameCount) {
  if (!vehicleId || !frameCount) return []

  return Array.from(
    { length: frameCount },
    (_, index) => `${BASE}/${vehicleId}/frame-${String(index).padStart(2, '0')}.${EXTENSION}`
  )
}
