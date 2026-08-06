import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Pixels of horizontal drag for one full 360° turn. Sized so a turn takes
// roughly two phone-widths of swipe: enough travel that the vehicle reads as
// an object being rotated rather than a filmstrip being scrubbed. Every
// sequence gets the same full-turn distance regardless of frame count, so an
// 8-frame set and a 36-frame set feel identical under the thumb.
const FULL_TURN_DRAG_PX = 640

// Momentum decay, expressed per second rather than per animation frame so the
// feel is identical at 60Hz and 120Hz. e^-4.35 ≈ 0.013 of the velocity
// survives one second. The old per-tick constant made momentum die twice as
// fast on a high-refresh display and lurch whenever a frame was dropped.
const DAMPING = 4.35
// Spin speed, in frames per second, below which momentum is over.
const MIN_SPIN = 1
// Runaway guard: three turns a second is already more than anyone means.
const MAX_TURNS_PER_SEC = 3
// Weight of the newest pointer sample in the running velocity average. Low
// enough to ignore one noisy delta, high enough that a flick still reflects
// the last few milliseconds rather than the whole drag.
const VELOCITY_SMOOTHING = 0.3

// Settling onto a whole frame is eased, not jumped. At eight frames a hard
// snap yanks the vehicle through up to 22.5°, which is the single most
// visible stutter in the whole interaction.
const SNAP_MS = 260
const STEP_MS = 220

// How much of a turn the intro plays before handing over. Enough to read as
// "this rotates", short enough that nobody waits for it.
const INTRO_SWEEP = 0.34
const INTRO_MS = 1500

// The angle readout and the scrubber thumb are text and a pixel offset. They
// do not need recomputing on every sample a 1000Hz mouse produces — that was
// costing a full React render per pointer event, and left the canvas painting
// one commit behind the pointer.
const READOUT_MS = 66

// Tab-out, a long GC pause, or a dropped frame must not teleport the vehicle.
const MAX_DELTA_S = 0.05

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

/**
 * Drag-to-spin state machine for a frame sequence.
 *
 * Position is kept in a ref and unwrapped (it may grow past frameCount or go
 * negative); indices are wrapped only at paint time. Keeping the physics
 * continuous is what lets momentum, snapping and stepping cross the 0/360
 * boundary without a discontinuity.
 *
 * Rendering is deliberately decoupled from React: one persistent rAF loop
 * owns the physics and calls `onRender(position, velocity)` directly. State
 * updates are throttled to the readout rate. Nothing about a spin should cost
 * a render.
 *
 * Four behaviours do the heavy lifting:
 *  - the intro sweep rotates on its own, then yields (motion is what tells
 *    people the thing is grabbable — better than any tooltip),
 *  - momentum carries a flick past the end of the drag,
 *  - releasing eases onto the nearest whole frame so it always settles clean,
 *  - velocity is smoothed, so a shaky hand does not read as a shaky vehicle.
 */
export function useTurntable({ frameCount, enabled = true, reducedMotion = false, onRender }) {
  const [frame, setFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const positionRef = useRef(0)
  const velocityRef = useRef(0)
  const modeRef = useRef('idle')
  const dirtyRef = useRef(true)

  const loopRef = useRef(0)
  const lastTimeRef = useRef(0)
  const lastReadoutRef = useRef(0)

  const lastXRef = useRef(0)
  const interactedRef = useRef(false)

  const introStartRef = useRef(0)
  const introFromRef = useRef(0)
  const introSweepRef = useRef(0)

  const easeFromRef = useRef(0)
  const easeToRef = useRef(0)
  const easeStartRef = useRef(0)
  const easeMsRef = useRef(SNAP_MS)

  // Held in a ref so changing the painter never restarts the loop.
  const renderRef = useRef(onRender)
  renderRef.current = onRender

  const count = frameCount || 1
  const maxVelocity = count * MAX_TURNS_PER_SEC
  const pxPerFrame = useMemo(
    () => (frameCount ? FULL_TURN_DRAG_PX / frameCount : FULL_TURN_DRAG_PX),
    [frameCount]
  )

  const publishReadout = useCallback(
    (now, force = false) => {
      if (!force && now - lastReadoutRef.current < READOUT_MS) return
      lastReadoutRef.current = now
      const wrapped = ((Math.round(positionRef.current) % count) + count) % count
      setFrame((current) => (current === wrapped ? current : wrapped))
    },
    [count]
  )

  // One loop for every kind of motion. It parks itself the moment there is
  // nothing left to animate and nothing left to paint.
  const tick = useCallback(
    (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, MAX_DELTA_S)
      lastTimeRef.current = now

      switch (modeRef.current) {
        case 'intro': {
          const t = Math.min((now - introStartRef.current) / INTRO_MS, 1)
          positionRef.current = introFromRef.current + introSweepRef.current * easeOutCubic(t)
          dirtyRef.current = true
          if (t >= 1) {
            positionRef.current = introFromRef.current + introSweepRef.current
            modeRef.current = 'idle'
          }
          break
        }
        case 'glide': {
          velocityRef.current *= Math.exp(-DAMPING * dt)
          if (Math.abs(velocityRef.current) < MIN_SPIN) {
            velocityRef.current = 0
            easeFromRef.current = positionRef.current
            easeToRef.current = Math.round(positionRef.current)
            easeStartRef.current = now
            easeMsRef.current = SNAP_MS
            modeRef.current = 'ease'
          } else {
            positionRef.current += velocityRef.current * dt
            dirtyRef.current = true
          }
          break
        }
        case 'ease': {
          const span = easeMsRef.current
          const t = span > 0 ? Math.min((now - easeStartRef.current) / span, 1) : 1
          const from = easeFromRef.current
          positionRef.current = from + (easeToRef.current - from) * easeOutCubic(t)
          dirtyRef.current = true
          if (t >= 1) {
            positionRef.current = easeToRef.current
            modeRef.current = 'idle'
          }
          break
        }
        default:
          break
      }

      if (dirtyRef.current) {
        dirtyRef.current = false
        renderRef.current?.(positionRef.current, velocityRef.current)
        publishReadout(now, modeRef.current === 'idle')
      }

      if (modeRef.current === 'idle' && !dirtyRef.current) {
        loopRef.current = 0
        return
      }
      loopRef.current = requestAnimationFrame(tick)
    },
    [publishReadout]
  )

  const ensureLoop = useCallback(() => {
    if (loopRef.current) return
    lastTimeRef.current = performance.now()
    loopRef.current = requestAnimationFrame(tick)
  }, [tick])

  const invalidate = useCallback(() => {
    dirtyRef.current = true
    ensureLoop()
  }, [ensureLoop])

  const markInteracted = useCallback(() => {
    if (interactedRef.current) return
    interactedRef.current = true
    setHasInteracted(true)
  }, [])

  // Intro sweep. Bails the moment the user touches it — their input always
  // outranks the demo.
  useEffect(() => {
    if (!enabled || !frameCount) return undefined
    if (reducedMotion || interactedRef.current) {
      invalidate()
      return undefined
    }
    introFromRef.current = positionRef.current
    // Round the sweep to whole frames so the intro parks on an actual
    // photograph. Landing between two of them leaves the vehicle sitting in a
    // permanent cross-fade — a visible ghost on every part of the bodywork
    // that moved between the two shots, and the very first thing anyone sees.
    introSweepRef.current = Math.max(1, Math.round(count * INTRO_SWEEP))
    introStartRef.current = performance.now()
    modeRef.current = 'intro'
    ensureLoop()
    return undefined
  }, [enabled, frameCount, count, reducedMotion, ensureLoop, invalidate])

  useEffect(
    () => () => {
      cancelAnimationFrame(loopRef.current)
      loopRef.current = 0
    },
    []
  )

  const onPointerDown = useCallback(
    (event) => {
      if (!enabled || !frameCount) return
      modeRef.current = 'drag'
      velocityRef.current = 0
      lastXRef.current = event.clientX
      lastTimeRef.current = performance.now()
      setIsDragging(true)
      markInteracted()
      event.currentTarget.setPointerCapture?.(event.pointerId)
      ensureLoop()
    },
    [enabled, frameCount, markInteracted, ensureLoop]
  )

  const onPointerMove = useCallback(
    (event) => {
      if (modeRef.current !== 'drag') return

      // Coalesced events carry every sample the hardware produced between
      // paints. Integrating all of them keeps a fast drag tracking the
      // pointer exactly instead of cutting the corners off it.
      const samples = event.getCoalescedEvents?.() ?? []
      const points = samples.length ? samples : [event]

      const now = performance.now()
      const dt = Math.max((now - lastTimeRef.current) / 1000, 1 / 1000)
      lastTimeRef.current = now

      let travelled = 0
      for (const point of points) {
        travelled += point.clientX - lastXRef.current
        lastXRef.current = point.clientX
      }

      // Dragging right turns the vehicle's near side away from the viewer,
      // matching how a physical turntable responds to a push.
      const deltaFrames = -travelled / pxPerFrame
      positionRef.current += deltaFrames

      const instant = Math.max(-maxVelocity, Math.min(maxVelocity, deltaFrames / dt))
      velocityRef.current =
        velocityRef.current * (1 - VELOCITY_SMOOTHING) + instant * VELOCITY_SMOOTHING

      invalidate()
    },
    [pxPerFrame, maxVelocity, invalidate]
  )

  const onPointerUp = useCallback(
    (event) => {
      if (modeRef.current !== 'drag') return
      setIsDragging(false)
      event.currentTarget.releasePointerCapture?.(event.pointerId)

      const now = performance.now()
      // A pointer that was held still before release has no flick in it, no
      // matter what the average still says.
      const stale = now - lastTimeRef.current > 120
      if (!stale && Math.abs(velocityRef.current) > MIN_SPIN && !reducedMotion) {
        modeRef.current = 'glide'
      } else {
        velocityRef.current = 0
        easeFromRef.current = positionRef.current
        easeToRef.current = Math.round(positionRef.current)
        easeStartRef.current = now
        easeMsRef.current = reducedMotion ? 0 : SNAP_MS
        modeRef.current = 'ease'
      }
      ensureLoop()
    },
    [reducedMotion, ensureLoop]
  )

  // Keyboard parity: the spin must be reachable without a pointer. Stepping
  // eases rather than cuts — at 45° a frame, a cut is a jump scare.
  const step = useCallback(
    (delta) => {
      if (!enabled || !frameCount) return
      velocityRef.current = 0
      markInteracted()
      easeFromRef.current = positionRef.current
      easeToRef.current = Math.round(positionRef.current) + delta
      easeStartRef.current = performance.now()
      easeMsRef.current = reducedMotion ? 0 : STEP_MS
      modeRef.current = 'ease'
      ensureLoop()
    },
    [enabled, frameCount, reducedMotion, markInteracted, ensureLoop]
  )

  // The scrubber is a direct-manipulation control: it tracks the thumb with
  // no easing, or it fights the hand holding it.
  const goToFrame = useCallback(
    (index) => {
      if (!enabled || !frameCount) return
      velocityRef.current = 0
      markInteracted()
      // Take the shortest way round, so dragging the thumb past the end does
      // not unwind the whole sequence backwards.
      const current = positionRef.current
      const wrapped = ((current % count) + count) % count
      let delta = index - wrapped
      if (delta > count / 2) delta -= count
      if (delta < -count / 2) delta += count
      positionRef.current = current + delta
      modeRef.current = 'idle'
      invalidate()
    },
    [enabled, frameCount, count, markInteracted, invalidate]
  )

  return {
    frame,
    angle: frameCount ? Math.round((frame / frameCount) * 360) : 0,
    isDragging,
    hasInteracted,
    step,
    goToFrame,
    invalidate,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  }
}
