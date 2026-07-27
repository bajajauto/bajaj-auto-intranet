import { useEffect, useRef, useState } from 'react'
import { Hand, ImageOff } from 'lucide-react'
import { heroBanner } from '@/config/banner.config'
import { useFrameSequence } from '@/hooks/useFrameSequence'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTurntable } from '@/hooks/useTurntable'

const HINT_STORAGE_KEY = 'bajaj:turntable-hint-seen'

function readHintSeen() {
  try {
    return window.localStorage.getItem(HINT_STORAGE_KEY) === '1'
  } catch {
    // Private mode / storage disabled — showing the hint again is harmless.
    return false
  }
}

function markHintSeen() {
  try {
    window.localStorage.setItem(HINT_STORAGE_KEY, '1')
  } catch {
    /* no-op */
  }
}

function drawFrame(canvas, image) {
  if (!canvas || !image?.naturalWidth) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const targetWidth = Math.round(width * dpr)
  const targetHeight = Math.round(height * dpr)

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth
    canvas.height = targetHeight
  }

  const context = canvas.getContext('2d')
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, width, height)

  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
}

/**
 * Zoomed crop of the hero artwork, used until a vehicle has real spin frames.
 * Reusing the banner means every vehicle has a presentable still on day one and
 * the modal visually continues from the thing that was clicked.
 */
function VehiclePoster({ vehicle }) {
  const { x, y, width, height } = vehicle.hotspot

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-2">
      {/* Sized by height, not width: the crops range from a wide quadricycle to
          a tall scooter, and only the height is bounded by the modal. */}
      <div
        role="img"
        aria-label={`${vehicle.name}, from the Distinctly Ahead hero artwork`}
        className="min-h-0 max-w-full flex-1 rounded-2xl bg-no-repeat shadow-modal"
        style={{
          aspectRatio: `${width * heroBanner.width} / ${height * heroBanner.height}`,
          backgroundImage: `url(${heroBanner.src})`,
          backgroundSize: `${100 / width}% ${100 / height}%`,
          backgroundPosition: `${(x / (1 - width)) * 100}% ${(y / (1 - height)) * 100}%`,
        }}
      />
      <p className="flex items-center gap-2 text-[11px] font-medium text-white/45">
        <ImageOff size={13} />
        360° frames not published for this model yet
      </p>
    </div>
  )
}

export default function VehicleTurntable({ vehicle }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { images, frameCount, hasFrames, ready, progress } = useFrameSequence(
    vehicle.id,
    vehicle.frameCount,
    vehicle.frameSource
  )
  const isPhotoReal = Boolean(vehicle.frameSource)
  const { frame, angle, isDragging, hasInteracted, step, goToFrame, dragHandlers } = useTurntable({
    frameCount,
    enabled: ready && hasFrames,
    reducedMotion,
  })

  const canvasRef = useRef(null)
  const [hintDismissed, setHintDismissed] = useState(readHintSeen)

  useEffect(() => {
    if (hasInteracted && !hintDismissed) {
      setHintDismissed(true)
      markHintSeen()
    }
  }, [hasInteracted, hintDismissed])

  useEffect(() => {
    if (!hasFrames) return
    drawFrame(canvasRef.current, images.current[frame])
  }, [hasFrames, images, frame, ready])

  // Redraw on resize so the vehicle stays centred and crisp.
  useEffect(() => {
    if (!hasFrames) return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const observer = new ResizeObserver(() => drawFrame(canvas, images.current[frame]))
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [hasFrames, images, frame])

  // No photographed frame sequence published for this vehicle, but a real
  // interactive 3D model is — embed it in place of the canvas turntable.
  if (vehicle.embedUrl) {
    return (
      <div className="relative h-[230px] sm:h-[280px] md:h-[330px]">
        <iframe
          title={`${vehicle.name} 3D model`}
          src={vehicle.embedUrl}
          className="h-full w-full bg-transparent"
          style={{ backgroundColor: 'transparent' }}
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
      </div>
    )
  }

  if (!hasFrames) {
    return (
      <div className="relative h-[230px] sm:h-[280px] md:h-[330px]">
        <VehiclePoster vehicle={vehicle} />
      </div>
    )
  }

  const showHint = !hintDismissed && ready

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-[230px] select-none sm:h-[280px] md:h-[330px]">
        <canvas
          ref={canvasRef}
          {...dragHandlers}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              step(-1)
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              step(1)
            }
          }}
          role="slider"
          tabIndex={0}
          aria-label={`Rotate the ${vehicle.name}`}
          aria-valuemin={0}
          aria-valuemax={359}
          aria-valuenow={angle}
          aria-valuetext={`${angle} degrees`}
          className={`h-full w-full touch-none rounded-2xl focus-ring ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={vehicle.frameTint ? { filter: vehicle.frameTint } : undefined}
        />

        {/* Turntable plinth — grounds the vehicle so it isn't floating in
            space. Real photo frames already carry their own soft shadow, so
            only the generated placeholder frames need this drawn in. */}
        {!isPhotoReal && (
          <div className="pointer-events-none absolute inset-x-[18%] bottom-5 h-6 rounded-[50%] bg-black/45 blur-md" />
        )}

        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-black/30 backdrop-blur-sm">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-200 ease-out"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <p className="text-[11px] font-medium text-white/60">
              Loading 360° view · {Math.round(progress * 100)}%
            </p>
          </div>
        )}

        {showHint && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
            <span aria-hidden="true">◄</span>
            <Hand size={13} className="animate-pulse motion-reduce:animate-none" />
            drag to rotate
            <span aria-hidden="true">►</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 px-1">
        <input
          type="range"
          min={0}
          max={frameCount - 1}
          value={frame}
          onChange={(event) => goToFrame(Number(event.target.value))}
          aria-label={`Scrub the ${vehicle.name} rotation`}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white focus-ring"
        />
        <span className="w-12 shrink-0 text-right text-xs font-semibold tabular-nums text-white/70">
          {angle}°
        </span>
      </div>
    </div>
  )
}
