import { useCallback, useEffect, useRef, useState } from 'react'

// Horizontal pixels of drag per frame. ~7px lands the full 360° a little wider
// than a phone screen, which feels like turning an object rather than scrubbing
// a filmstrip.
const PX_PER_FRAME = 7
const FRICTION = 0.93
const MIN_SPIN = 0.015
// How much of a turn the intro plays before handing over. Enough to read as
// "this rotates", short enough that nobody waits for it.
const INTRO_SWEEP = 0.34
const INTRO_MS = 1500

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

/**
 * Drag-to-spin state machine for a frame sequence.
 *
 * Three behaviours do the heavy lifting for discoverability:
 *  - the intro sweep rotates on its own, then yields (motion is what tells
 *    people the thing is grabbable — better than any tooltip),
 *  - momentum carries a flick past the end of the drag,
 *  - releasing snaps to the nearest whole frame so it always settles clean.
 */
export function useTurntable({ frameCount, enabled = true, reducedMotion = false }) {
  const [frame, setFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const positionRef = useRef(0)
  const velocityRef = useRef(0)
  const rafRef = useRef(0)
  const lastXRef = useRef(0)
  const interactedRef = useRef(false)

  const commit = useCallback(
    (next) => {
      const count = frameCount || 1
      const wrapped = ((next % count) + count) % count
      positionRef.current = wrapped
      setFrame(Math.round(wrapped) % count)
    },
    [frameCount]
  )

  const markInteracted = useCallback(() => {
    if (interactedRef.current) return
    interactedRef.current = true
    setHasInteracted(true)
  }, [])

  // Intro sweep. Bails the moment the user touches it — their input always
  // outranks the demo.
  useEffect(() => {
    if (!enabled || !frameCount || reducedMotion) return undefined

    const from = positionRef.current
    const distance = frameCount * INTRO_SWEEP
    const start = performance.now()

    const step = (now) => {
      if (interactedRef.current) return
      const t = Math.min((now - start) / INTRO_MS, 1)
      commit(from + distance * easeOutCubic(t))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [enabled, frameCount, reducedMotion, commit])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const glide = useCallback(() => {
    const step = () => {
      velocityRef.current *= FRICTION
      if (Math.abs(velocityRef.current) < MIN_SPIN) {
        commit(Math.round(positionRef.current))
        rafRef.current = 0
        return
      }
      commit(positionRef.current + velocityRef.current)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [commit])

  const onPointerDown = useCallback(
    (event) => {
      if (!enabled || !frameCount) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      velocityRef.current = 0
      lastXRef.current = event.clientX
      setIsDragging(true)
      markInteracted()
      event.currentTarget.setPointerCapture?.(event.pointerId)
    },
    [enabled, frameCount, markInteracted]
  )

  const onPointerMove = useCallback(
    (event) => {
      if (!isDragging) return
      // Dragging right turns the vehicle's near side away from the viewer,
      // matching how a physical turntable responds to a push.
      velocityRef.current = -(event.clientX - lastXRef.current) / PX_PER_FRAME
      lastXRef.current = event.clientX
      commit(positionRef.current + velocityRef.current)
    },
    [isDragging, commit]
  )

  const onPointerUp = useCallback(
    (event) => {
      if (!isDragging) return
      setIsDragging(false)
      event.currentTarget.releasePointerCapture?.(event.pointerId)
      if (Math.abs(velocityRef.current) > MIN_SPIN && !reducedMotion) glide()
      else commit(Math.round(positionRef.current))
    },
    [isDragging, reducedMotion, glide, commit]
  )

  // Keyboard parity: the spin must be reachable without a pointer.
  const step = useCallback(
    (delta) => {
      if (!enabled || !frameCount) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      velocityRef.current = 0
      markInteracted()
      commit(Math.round(positionRef.current) + delta)
    },
    [enabled, frameCount, markInteracted, commit]
  )

  const goToFrame = useCallback(
    (index) => {
      if (!enabled || !frameCount) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      velocityRef.current = 0
      markInteracted()
      commit(index)
    },
    [enabled, frameCount, markInteracted, commit]
  )

  return {
    frame,
    angle: frameCount ? Math.round((frame / frameCount) * 360) : 0,
    isDragging,
    hasInteracted,
    step,
    goToFrame,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  }
}
