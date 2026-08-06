import { useEffect, useMemo, useRef, useState } from 'react'
import { buildFrameUrls } from '@/config/vehicleFrames'

/**
 * Preloads a vehicle's turntable frames before the spin is handed to the user.
 *
 * Frames are decoded up front because swapping an <img> src mid-drag flashes on
 * the first paint of every frame; drawing pre-decoded Images to a canvas does
 * not. Loading is deferred to modal-open — a full sequence has no business in
 * the initial page load.
 */
// A sparse sequence has to arrive complete: with eight frames, a missing one
// is a 45° hole the vehicle vanishes into. Dense sequences are the opposite —
// waiting for all 72 wastes the time the user could already be spinning, and
// a gap there is a few degrees nobody notices before it fills in.
const DENSE_SEQUENCE = 16
const DENSE_READY_FRACTION = 0.5

function interactiveThreshold(total) {
  if (total <= DENSE_SEQUENCE) return total
  return Math.ceil(total * DENSE_READY_FRACTION)
}

export function useFrameSequence(vehicleId, frameCount = 0, frameSource = null) {
  const urls = useMemo(
    () => buildFrameUrls(vehicleId, frameCount, frameSource),
    [vehicleId, frameCount, frameSource]
  )

  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(urls.length === 0)
  const imagesRef = useRef([])

  useEffect(() => {
    imagesRef.current = []
    setLoaded(0)

    if (urls.length === 0) {
      setReady(true)
      return undefined
    }

    setReady(false)
    let cancelled = false
    let settled = 0

    imagesRef.current = urls.map((url) => {
      const image = new Image()
      // Errors count as settled too — one missing frame should not hang the
      // viewer behind a progress ring that never fills.
      image.onload = image.onerror = () => {
        if (cancelled) return
        settled += 1
        setLoaded(settled)
        if (settled === urls.length) setReady(true)
      }
      image.src = url
      return image
    })

    return () => {
      cancelled = true
    }
  }, [urls])

  return {
    images: imagesRef,
    frameCount: urls.length,
    hasFrames: urls.length > 0,
    loaded,
    ready,
    // Whether the spin can be handed over. Never `ready` for a dense
    // sequence, which becomes usable well before it is complete.
    interactive: urls.length === 0 || loaded >= interactiveThreshold(urls.length),
    progress: urls.length === 0 ? 1 : loaded / urls.length,
  }
}
