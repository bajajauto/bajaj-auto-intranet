import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ExternalLink, Factory, MapPin, RotateCcw, Satellite } from 'lucide-react'
import earthMapUrl from '@/assets/globe/bluemarble-2048.png'
import navAbout from '@/assets/icons/ocean/nav-about.webp'
import Panel from '@/components/shared/Panel'
import PanelTitle from '@/components/shared/PanelTitle'

const LOCATION_GROUPS = [
  {
    id: 'bajaj-auto',
    abbr: 'BA',
    label: 'Bajaj Auto Ltd',
    description: 'Manufacturing plants & headquarters',
    subGroups: [
      {
        id: 'manufacturing-plants',
        label: 'Manufacturing Plants',
        locations: [
          {
            id: 'chakan',
            name: 'Chakan',
            type: 'Manufacturing + engineering',
            country: 'India',
            coordinates: '18.75 deg N, 73.86 deg E',
            presence: 'Pune industrial belt',
            mapPosition: { x: '64%', y: '45%' },
            subLocations: ['Plant 1', 'Plant 2', 'Chakan R&D'],
          },
          {
            id: 'waluj',
            name: 'Waluj',
            type: 'Manufacturing plant',
            country: 'India',
            coordinates: '19.88 deg N, 75.23 deg E',
            presence: 'Aurangabad cluster',
            mapPosition: { x: '58%', y: '52%' },
            subLocations: ['Waluj Plant', 'Admin Block'],
          },
          {
            id: 'pantnagar',
            name: 'Pantnagar',
            type: 'Manufacturing plant',
            country: 'India',
            coordinates: '29.02 deg N, 79.49 deg E',
            presence: 'Uttarakhand campus',
            mapPosition: { x: '70%', y: '30%' },
            subLocations: ['Plant', 'Township'],
          },
        ],
      },
      {
        id: 'headquarters',
        label: 'Headquarters',
        locations: [
          {
            id: 'akurdi',
            name: 'Akurdi',
            type: 'Corporate + EV hub',
            country: 'India',
            coordinates: '18.65 deg N, 73.77 deg E',
            presence: 'Pune campus',
            mapPosition: { x: '62%', y: '48%' },
            subLocations: ['R&D', 'DDC', 'Chetak Plant', 'Utsah', 'Library', 'Old Corp', 'Transport'],
          },
        ],
      },
      {
        id: 'regional-offices',
        label: 'Regional Offices',
        locations: [
          {
            id: 'mumbai-ro',
            name: 'Mumbai',
            type: 'Regional office',
            country: 'India',
            coordinates: '19.07 deg N, 72.87 deg E',
            presence: 'West India hub',
            mapPosition: { x: '55%', y: '55%' },
            subLocations: ['Mumbai RO'],
          },
          {
            id: 'delhi-ro',
            name: 'Delhi',
            type: 'Regional office',
            country: 'India',
            coordinates: '28.61 deg N, 77.20 deg E',
            presence: 'North India hub',
            mapPosition: { x: '65%', y: '35%' },
            subLocations: ['Delhi RO'],
          },
          {
            id: 'chennai-ro',
            name: 'Chennai',
            type: 'Regional office',
            country: 'India',
            coordinates: '13.08 deg N, 80.27 deg E',
            presence: 'South India hub',
            mapPosition: { x: '62%', y: '70%' },
            subLocations: ['Chennai RO'],
          },
          {
            id: 'kolkata-ro',
            name: 'Kolkata',
            type: 'Regional office',
            country: 'India',
            coordinates: '22.57 deg N, 88.36 deg E',
            presence: 'East India hub',
            mapPosition: { x: '72%', y: '48%' },
            subLocations: ['Kolkata RO'],
          },
        ],
      },
    ],
  },
  {
    id: 'bajaj-auto-credit',
    abbr: 'BAC',
    label: 'Bajaj Auto Credit Limited',
    description: 'Financial office network',
    subGroups: [
      {
        id: 'headquarters',
        label: 'Headquarters',
        locations: [
          {
            id: 'akurdi-bacl',
            name: 'Akurdi',
            type: 'Corporate office',
            country: 'India',
            coordinates: '18.65 deg N, 73.77 deg E',
            presence: 'Pune campus',
            mapPosition: { x: '62%', y: '48%' },
            subLocations: ['BACL Office'],
          },
        ],
      },
      {
        id: 'regional-offices',
        label: 'Regional Offices',
        locations: [
          {
            id: 'mumbai-bacl',
            name: 'Mumbai',
            type: 'Regional office',
            country: 'India',
            coordinates: '19.07 deg N, 72.87 deg E',
            presence: 'West India hub',
            mapPosition: { x: '55%', y: '55%' },
            subLocations: ['BACL Mumbai RO'],
          },
          {
            id: 'delhi-bacl',
            name: 'Delhi',
            type: 'Regional office',
            country: 'India',
            coordinates: '28.61 deg N, 77.20 deg E',
            presence: 'North India hub',
            mapPosition: { x: '65%', y: '35%' },
            subLocations: ['BACL Delhi RO'],
          },
          {
            id: 'chennai-bacl',
            name: 'Chennai',
            type: 'Regional office',
            country: 'India',
            coordinates: '13.08 deg N, 80.27 deg E',
            presence: 'South India hub',
            mapPosition: { x: '62%', y: '70%' },
            subLocations: ['BACL Chennai RO'],
          },
          {
            id: 'kolkata-bacl',
            name: 'Kolkata',
            type: 'Regional office',
            country: 'India',
            coordinates: '22.57 deg N, 88.36 deg E',
            presence: 'East India hub',
            mapPosition: { x: '72%', y: '48%' },
            subLocations: ['BACL Kolkata RO'],
          },
        ],
      },
    ],
  },
  {
    id: 'bajaj-auto-technology',
    abbr: 'BAT',
    label: 'Bajaj Auto Technology Limited',
    description: 'Technology & digital hub',
    locations: [
      {
        id: 'bangalore-batl',
        name: 'Bangalore',
        type: 'Technology office',
        country: 'India',
        coordinates: '12.97 deg N, 77.59 deg E',
        presence: 'South India tech hub',
        mapPosition: { x: '54%', y: '72%' },
        subLocations: ['BATL Office'],
      },
    ],
  },
  {
    // Placeholder until the Foundation's own sites are confirmed.
    id: 'bajaj-auto-foundation',
    abbr: 'BAF',
    label: 'Bajaj Auto Foundation',
    description: 'CSR & community initiatives',
    locations: [
      {
        id: 'akurdi-baf',
        name: 'Akurdi',
        type: 'Foundation office',
        country: 'India',
        coordinates: '18.65 deg N, 73.77 deg E',
        presence: 'Pune campus',
        mapPosition: { x: '62%', y: '48%' },
        subLocations: ['Foundation Office'],
      },
    ],
  },
]

const BAJAJ_COUNTRIES = [
  { name: 'Argentina', lat: -34, lng: -64 },
  { name: 'Australia', lat: -25, lng: 133 },
  { name: 'Austria', lat: 47, lng: 13 },
  { name: 'Bangladesh', lat: 24, lng: 90 },
  { name: 'Benin', lat: 9, lng: 2 },
  { name: 'Brazil', lat: -15, lng: -47 },
  { name: 'Burundi', lat: -3, lng: 30 },
  { name: 'Chile', lat: -35, lng: -71 },
  { name: 'Colombia', lat: 4, lng: -74 },
  { name: 'Costa Rica', lat: 10, lng: -84 },
  { name: 'Egypt', lat: 27, lng: 30 },
  { name: 'Ethiopia', lat: 9, lng: 40 },
  { name: 'Ghana', lat: 8, lng: -1 },
  { name: 'Guatemala', lat: 15, lng: -90 },
  { name: 'India', lat: 21, lng: 78, primary: true },
  { name: 'Indonesia', lat: -5, lng: 120 },
  { name: 'Iraq', lat: 33, lng: 44 },
  { name: 'Japan', lat: 36, lng: 138 },
  { name: 'Kenya', lat: -1, lng: 37 },
  { name: 'Malawi', lat: -13, lng: 34 },
  { name: 'Malaysia', lat: 4, lng: 109 },
  { name: 'Mexico', lat: 23, lng: -102 },
  { name: 'Mozambique', lat: -18, lng: 35 },
  { name: 'Nepal', lat: 28, lng: 84 },
  { name: 'Netherlands', lat: 52, lng: 5 },
  { name: 'Nigeria', lat: 10, lng: 8 },
  { name: 'Peru', lat: -10, lng: -76 },
  { name: 'Philippines', lat: 13, lng: 122 },
  { name: 'Rwanda', lat: -2, lng: 30 },
  { name: 'Russia', lat: 60, lng: 100 },
  { name: 'Somalia', lat: 6, lng: 46 },
  { name: 'South Africa', lat: -29, lng: 25 },
  { name: 'Spain', lat: 40, lng: -4 },
  { name: 'Sri Lanka', lat: 7, lng: 81 },
  { name: 'Sudan', lat: 15, lng: 32 },
  { name: 'Tanzania', lat: -6, lng: 35 },
  { name: 'Thailand', lat: 15, lng: 101 },
  { name: 'Togo', lat: 8, lng: 1 },
  { name: 'UAE', lat: 24, lng: 54 },
  { name: 'Uganda', lat: 1, lng: 32 },
  { name: 'Venezuela', lat: 8, lng: -66 },
  { name: 'Vietnam', lat: 16, lng: 107 },
  { name: 'Zambia', lat: -13, lng: 27 },
]

const MARKET_COUNT = 108

// Region buttons turn the globe to a centre point and hold it there.
const REGIONS = [
  { id: 'global', label: 'Global' },
  { id: 'americas', label: 'Americas', lat: 2, lng: -72 },
  { id: 'europe', label: 'Europe', lat: 48, lng: 12 },
  { id: 'africa', label: 'Africa', lat: 4, lng: 22 },
  { id: 'apac', label: 'Asia Pacific', lat: 14, lng: 110 },
]

const CAMERA_Z = { min: 4.3, max: 7.2, start: 5.45 }

/*
 * The 3D globe. It spins on its own, pauses while a marker is hovered, turns
 * to a country or region when asked, and can be dragged round by hand. The
 * parent drives it through `controlsRef` — flyTo, reset, setPaused, zoom —
 * rather than through props, because each is an instruction to an animation
 * loop that runs outside React, not state to render.
 */
function GlobePresence({ controlsRef, activeCountry, onActiveCountry }) {
  const mountRef = useRef(null)
  const markerRefs = useRef({})
  const isPausedRef = useRef(false)
  const userPausedRef = useRef(false)
  const targetRef = useRef(null)
  const setActive = useRef(onActiveCountry)
  setActive.current = onActiveCountry

  const pauseOnCountry = (countryName) => {
    isPausedRef.current = true
    setActive.current(countryName)
  }

  const resumeGlobe = () => {
    if (targetRef.current) return
    isPausedRef.current = userPausedRef.current
    setActive.current('India')
  }

  const flyToCountry = (country) => {
    targetRef.current = country
    isPausedRef.current = false
    setActive.current(country.name)
  }

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let disposed = false
    let cleanupGlobe = () => {}

    const initGlobe = async () => {
      const THREE = await import('three')
      if (disposed) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 100)
      camera.position.set(0, 0, CAMERA_Z.start)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      mount.appendChild(renderer.domElement)

      const loader = new THREE.TextureLoader()
      const earthTexture = await loader.loadAsync(earthMapUrl)
      if (disposed) {
        earthTexture.dispose()
        return
      }

      earthTexture.colorSpace = THREE.SRGBColorSpace
      earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()

      const latLngToVector3 = (lat, lng, radius) => {
        const phi = THREE.MathUtils.degToRad(90 - lat)
        const theta = THREE.MathUtils.degToRad(lng + 180)
        return new THREE.Vector3(
          -(radius * Math.sin(phi) * Math.cos(theta)),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
      }

      const globeGroup = new THREE.Group()
      globeGroup.rotation.y = -0.75
      const baseRotationX = THREE.MathUtils.degToRad(-8)
      globeGroup.rotation.x = baseRotationX
      scene.add(globeGroup)

      const earthGeometry = new THREE.SphereGeometry(1.55, 128, 128)
      const earthMaterial = new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.88,
        metalness: 0.02,
        emissive: new THREE.Color('#03152e'),
        emissiveIntensity: 0.08,
      })
      globeGroup.add(new THREE.Mesh(earthGeometry, earthMaterial))

      const atmosphereGeometry = new THREE.SphereGeometry(1.66, 128, 128)
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: '#5fb6d6',
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
        depthWrite: false,
      })
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      scene.add(atmosphere)

      scene.add(new THREE.AmbientLight('#9cc9ff', 0.7))
      const sunLight = new THREE.DirectionalLight('#ffffff', 3.2)
      sunLight.position.set(4, 2.4, 5)
      scene.add(sunLight)
      const rimLight = new THREE.DirectionalLight('#67e8f9', 1.1)
      rimLight.position.set(-4, 0.4, -1.8)
      scene.add(rimLight)

      const countryVecs = BAJAJ_COUNTRIES.map((c) => ({ name: c.name, vec: latLngToVector3(c.lat, c.lng, 1.68) }))
      const normalizeRotation = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle))

      const focusOn = (target) => {
        const v = latLngToVector3(target.lat, target.lng, 1)
        const targetY = normalizeRotation(Math.atan2(-v.x, v.z))
        const targetX = THREE.MathUtils.clamp(
          baseRotationX + THREE.MathUtils.degToRad(target.lat) * 0.35,
          THREE.MathUtils.degToRad(-32),
          THREE.MathUtils.degToRad(24)
        )
        const yDelta = normalizeRotation(targetY - globeGroup.rotation.y)
        globeGroup.rotation.y += yDelta * 0.08
        globeGroup.rotation.x += (targetX - globeGroup.rotation.x) * 0.08
        if (Math.abs(yDelta) < 0.004 && Math.abs(targetX - globeGroup.rotation.x) < 0.004) {
          targetRef.current = null
          isPausedRef.current = true
        }
      }

      let zoomTarget = CAMERA_Z.start
      controlsRef.current = {
        flyTo(target) {
          targetRef.current = target
          isPausedRef.current = false
        },
        reset() {
          targetRef.current = null
          userPausedRef.current = false
          isPausedRef.current = false
          zoomTarget = CAMERA_Z.start
        },
        setPaused(paused) {
          userPausedRef.current = paused
          isPausedRef.current = paused
        },
        zoom(direction) {
          zoomTarget = THREE.MathUtils.clamp(zoomTarget - direction * 0.6, CAMERA_Z.min, CAMERA_Z.max)
        },
      }

      // Drag to rotate. A drag cancels any fly-to in progress and holds the
      // globe where it is let go, as a paused globe does.
      let drag = null
      const onPointerDown = (e) => {
        drag = { x: e.clientX, y: e.clientY }
        targetRef.current = null
        isPausedRef.current = true
        mount.setPointerCapture(e.pointerId)
      }
      const onPointerMove = (e) => {
        if (!drag) return
        globeGroup.rotation.y += (e.clientX - drag.x) * 0.006
        globeGroup.rotation.x = THREE.MathUtils.clamp(
          globeGroup.rotation.x + (e.clientY - drag.y) * 0.004,
          THREE.MathUtils.degToRad(-40),
          THREE.MathUtils.degToRad(40)
        )
        drag = { x: e.clientX, y: e.clientY }
      }
      const onPointerUp = () => {
        drag = null
      }
      mount.addEventListener('pointerdown', onPointerDown)
      mount.addEventListener('pointermove', onPointerMove)
      mount.addEventListener('pointerup', onPointerUp)
      mount.addEventListener('pointercancel', onPointerUp)

      const resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      })
      resizeObserver.observe(mount)

      const updateMarkers = () => {
        const { clientWidth: w, clientHeight: h } = mount
        countryVecs.forEach(({ name, vec }) => {
          const el = markerRefs.current[name]
          if (!el) return
          const world = vec.clone().applyMatrix4(globeGroup.matrixWorld)
          const screen = world.clone().project(camera)
          const visible = world.z > -0.18
          const x = Math.min(Math.max((screen.x * 0.5 + 0.5) * w, 30), w - 30)
          const y = Math.min(Math.max((-screen.y * 0.5 + 0.5) * h, 40), h - 20)
          el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
          el.style.opacity = visible ? '1' : '0'
          el.style.pointerEvents = visible ? 'auto' : 'none'
          el.tabIndex = visible ? 0 : -1
        })
      }

      // Nothing is drawn while the globe cannot be seen — scrolled away, tab
      // hidden, or under a modal's blur, which would otherwise be recomputed
      // for the whole viewport on every frame of spin.
      let onScreen = true
      const visibility = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting
        },
        { threshold: 0.01 }
      )
      visibility.observe(mount)
      const root = document.getElementById('root')
      const isVisible = () => onScreen && !document.hidden && !root?.classList.contains('modal-open')

      let frameId = 0
      const animate = () => {
        frameId = window.requestAnimationFrame(animate)
        if (!isVisible()) return

        if (targetRef.current) {
          focusOn(targetRef.current)
        } else if (!isPausedRef.current && !drag) {
          globeGroup.rotation.y += 0.0026
          globeGroup.rotation.x += (baseRotationX - globeGroup.rotation.x) * 0.015
        }
        camera.position.z += (zoomTarget - camera.position.z) * 0.12
        updateMarkers()
        renderer.render(scene, camera)
      }
      animate()

      cleanupGlobe = () => {
        window.cancelAnimationFrame(frameId)
        visibility.disconnect()
        resizeObserver.disconnect()
        mount.removeEventListener('pointerdown', onPointerDown)
        mount.removeEventListener('pointermove', onPointerMove)
        mount.removeEventListener('pointerup', onPointerUp)
        mount.removeEventListener('pointercancel', onPointerUp)
        controlsRef.current = null
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
        earthGeometry.dispose()
        earthMaterial.dispose()
        atmosphereGeometry.dispose()
        atmosphereMaterial.dispose()
        earthTexture.dispose()
        renderer.dispose()
      }
    }

    initGlobe().catch(() => {})

    return () => {
      disposed = true
      cleanupGlobe()
    }
  }, [controlsRef])

  return (
    <div className="relative h-[340px] sm:h-[380px]">
      <div ref={mountRef} className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing" aria-hidden="true" />

      {BAJAJ_COUNTRIES.map((country) => {
        const isActive = activeCountry === country.name
        return (
          <button
            key={country.name}
            type="button"
            ref={(node) => {
              if (node) markerRefs.current[country.name] = node
              else delete markerRefs.current[country.name]
            }}
            className="group absolute left-0 top-0 z-10 flex h-7 w-7 items-center justify-center rounded-full focus-ring"
            aria-label={`${country.name}${country.primary ? ' HQ' : ''}`}
            onMouseEnter={() => pauseOnCountry(country.name)}
            onMouseLeave={resumeGlobe}
            onFocus={() => pauseOnCountry(country.name)}
            onBlur={resumeGlobe}
            onClick={() => flyToCountry(country)}
          >
            <span
              className={`block rounded-full ring-white/60 transition-all duration-200 ${
                country.primary
                  ? 'h-3.5 w-3.5 bg-ocean-900 ring-2 shadow-[0_0_12px_rgba(9,52,75,0.6)]'
                  : isActive
                    ? 'h-3.5 w-3.5 bg-ocean-700 ring-2 shadow-[0_0_14px_rgba(29,104,133,0.6)]'
                    : 'h-2 w-2 bg-white ring-1 ring-ocean-700/60 group-hover:scale-150'
              }`}
            />
            {(country.primary || isActive) && (
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-ocean-900 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
                {country.primary ? 'India - HQ' : country.name}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function SatellitePreview({ location }) {
  return (
    <div className="relative h-32 overflow-hidden rounded-card bg-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(35deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(125deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(125,211,252,0.35),transparent_22%),radial-gradient(circle_at_70%_64%,rgba(37,99,235,0.36),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(19,62,130,0.8))]" />
      <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rotate-[-12deg] bg-white/15" />
      <div className="absolute left-1/3 top-0 h-full w-2 rotate-[22deg] bg-white/10" />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: location.mapPosition.x, top: location.mapPosition.y }}
      >
        <span className="relative flex h-4 w-4 rounded-full bg-white">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
          <span className="m-auto h-2 w-2 rounded-full bg-brand-primary" />
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          <Satellite size={12} />
          Satellite view
        </span>
        <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-brand-dark">
          {location.coordinates}
        </span>
      </div>
    </div>
  )
}

function PlantCard({ location }) {
  return (
    <article className="site-surface-interactive rounded-card border p-3 transition-all hover:-translate-y-0.5 hover:shadow-modal">
      <SatellitePreview location={location} />

      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-brand-primary">
              <MapPin size={14} />
              <h3 className="text-base font-semibold text-text-primary">{location.name}</h3>
            </div>
            <p className="mt-1 text-xs text-text-secondary">{location.type}</p>
          </div>
          <button
            type="button"
            className="rounded-btn p-1.5 text-text-secondary hover:bg-bg-alt hover:text-brand-primary focus-ring"
            aria-label={`Open ${location.name} satellite view`}
          >
            <ExternalLink size={15} />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-card bg-brand-light px-3 py-2">
          <Factory size={15} className="flex-shrink-0 text-brand-primary" />
          <p className="text-xs font-medium text-brand-primary">{location.presence}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {location.subLocations.map((subLocation) => (
            <span
              key={subLocation}
              className="rounded-full border border-brand-primary/10 bg-bg-alt px-2 py-1 text-[11px] text-text-secondary"
            >
              {subLocation}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

// The network panel's entity rows step down the ocean scale.
const ENTITY_TONES = ['bg-ocean-500 text-white', 'bg-[#68a1bc] text-white', 'bg-[#93c4d5] text-[#013b5c]', 'bg-[#b6d8e1] text-[#013b5c]']

const CHIP =
  'h-[25px] flex-none rounded-[11px] px-3 text-[11px] font-medium transition-colors focus-ring'
const CHIP_OFF = 'bg-[#8bc2d6] text-[#0a1620] hover:bg-[#7ab6cc]'
const CHIP_ON = 'bg-gradient-to-r from-[#093449] to-[#2188a9] text-white'

function NetworkEntity({ group, tone, onEnter, onEnterSubGroup }) {
  const tags = group.subGroups?.length ? group.subGroups : null
  const dark = tone.includes('text-white')
  const tag = `rounded-[7px] border border-[#f2f8ff] bg-[#e4f1ff] px-2 text-[10.5px] font-medium leading-[18px] text-[#033b56] transition-colors hover:bg-white focus-ring`

  return (
    <div className={`rounded-xl p-2.5 transition-transform hover:translate-x-1 ${tone}`}>
      <div className="min-w-0">
        <p className="truncate text-[12.5px] font-semibold">{group.label}</p>
        <p className={`truncate text-[12px] ${dark ? 'text-white/85' : 'text-[#013857]'}`}>{group.description}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags ? (
          tags.map((sg) => (
            <button key={sg.id} type="button" onClick={() => onEnterSubGroup(group.id, sg.id)} className={tag}>
              {sg.label}
            </button>
          ))
        ) : (
          <button type="button" onClick={onEnter} className={tag}>
            {group.locations.length} {group.locations.length === 1 ? 'location' : 'locations'}
          </button>
        )}
      </div>
    </div>
  )
}

/*
 * About Bajaj Auto: the globe with its region and zoom controls on the left,
 * the four Bajaj entities on the right. Choosing an entity's office group
 * swaps the presence box for that group's location cards, with a way back.
 */
export default function LocationsSection() {
  const controlsRef = useRef(null)
  const [region, setRegion] = useState('global')
  const [paused, setPaused] = useState(false)
  const [activeCountry, setActiveCountry] = useState('India')
  const [enteredGroup, setEnteredGroup] = useState(null)
  const [enteredSubGroup, setEnteredSubGroup] = useState(null)

  const group = LOCATION_GROUPS.find((g) => g.id === enteredGroup)
  const subGroup = group?.subGroups?.find((sg) => sg.id === enteredSubGroup)
  const displayLocations = subGroup ? subGroup.locations : group?.locations
  const displayLabel = subGroup ? `${group.label} · ${subGroup.label}` : group?.label

  function chooseRegion(r) {
    setRegion(r.id)
    if (r.id === 'global') {
      controlsRef.current?.reset()
      setPaused(false)
    } else {
      controlsRef.current?.flyTo(r)
    }
  }

  function togglePause() {
    const next = !paused
    setPaused(next)
    controlsRef.current?.setPaused(next)
  }

  function chooseCountry(country) {
    setActiveCountry(country.name)
    setRegion(null)
    controlsRef.current?.flyTo(country)
  }

  function enter(groupId, subGroupId = null) {
    setEnteredGroup(groupId)
    setEnteredSubGroup(subGroupId)
  }

  return (
    <Panel as="section" id="about" aria-labelledby="about-heading" className="scroll-mt-20 p-4 sm:p-5">
      <PanelTitle id="about-heading" icon={navAbout} title="About Bajaj Auto" />

      <div className="mt-4 rounded-[18px] border border-[#e3edf3] bg-white p-4 sm:p-5">
        {group ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => enter(null)}
                className="flex items-center gap-1.5 rounded-lg bg-ocean-100 px-3 py-1.5 text-xs font-semibold text-ocean-700 transition-colors hover:bg-ocean-200 focus-ring"
              >
                <ArrowLeft size={13} />
                Back
              </button>
              <span className="text-sm font-semibold text-ocean-ink">{displayLabel}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {displayLocations?.map((location) => (
                <PlantCard key={location.id} location={location} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-[640px]">
                <h3 className="text-[16px] font-semibold text-[#000709]">Bajaj Auto Presence</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#4f5f61]">
                  Explore selected locations from Bajaj Auto’s worldwide footprint. Drag the globe, choose a
                  region or hover a marker to discover key markets.
                </p>
              </div>
              <div className="flex items-center gap-2.5 rounded-[10px] border border-[#e3eeee] bg-gradient-to-br from-[#fcfeff] to-[#e5eff0] px-3 py-2">
                <span className="text-[22px] font-semibold tracking-[-0.02em] text-black">{MARKET_COUNT}</span>
                <span className="text-[10.5px] leading-tight tracking-[0.12em] text-[#405a5e]">
                  COUNTRIES
                  <br />
                  WORLDWIDE
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-5 lg:grid-cols-[1.8fr_1fr]">
              <div className="min-w-0 rounded-[18px] border border-[#d6e6ee] bg-gradient-to-b from-[#e1eff8] to-[#dceff5] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div role="group" aria-label="Region" className="flex flex-wrap gap-1.5">
                    {REGIONS.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        aria-pressed={region === r.id}
                        onClick={() => chooseRegion(r)}
                        className={`${CHIP} ${region === r.id ? CHIP_ON : CHIP_OFF}`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <button type="button" onClick={togglePause} aria-pressed={paused} className={`${CHIP} ${CHIP_OFF}`}>
                      {paused ? 'Play' : 'Pause'}
                    </button>
                    <button type="button" aria-label="Zoom out" onClick={() => controlsRef.current?.zoom(-1)} className={`${CHIP} ${CHIP_OFF} w-7 px-0`}>
                      −
                    </button>
                    <button type="button" aria-label="Zoom in" onClick={() => controlsRef.current?.zoom(1)} className={`${CHIP} ${CHIP_OFF} w-7 px-0`}>
                      +
                    </button>
                    <button
                      type="button"
                      aria-label="Reset view"
                      onClick={() => chooseRegion(REGIONS[0])}
                      className={`${CHIP} ${CHIP_OFF} flex w-7 items-center justify-center px-0`}
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>
                </div>

                <GlobePresence controlsRef={controlsRef} activeCountry={activeCountry} onActiveCountry={setActiveCountry} />

                <p className="text-[10.5px] text-[#718688]">Drag to rotate · hover a location · use region filters</p>
                <div className="scrollbar-none mt-2 flex gap-1.5 overflow-x-auto pb-1">
                  {BAJAJ_COUNTRIES.map((country) => (
                    <button
                      key={country.name}
                      type="button"
                      onClick={() => chooseCountry(country)}
                      className={`h-[20px] flex-none rounded-[10px] px-2.5 text-[10.5px] font-medium transition-colors focus-ring ${
                        activeCountry === country.name ? CHIP_ON : 'bg-[#8cc0d4] text-[#0a1620] hover:bg-[#7ab6cc]'
                      }`}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] border border-[#dfeaf3] bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#022738]">Bajaj network</p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-[#505a69]">
                      Business and operating presence across the Bajaj ecosystem.
                    </p>
                  </div>
                  <span className="flex-none text-[10px] text-[#032436]">{LOCATION_GROUPS.length} entities</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  {LOCATION_GROUPS.map((g, i) => (
                    <NetworkEntity
                      key={g.id}
                      group={g}
                      tone={ENTITY_TONES[i % ENTITY_TONES.length]}
                      onEnter={() => enter(g.id)}
                      onEnterSubGroup={enter}
                    />
                  ))}
                </div>
                <p className="mt-4 text-[12.5px] leading-snug text-[#012336]">
                  The globe highlights selected locations within Bajaj Auto’s {MARKET_COUNT}-country worldwide
                  footprint.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Panel>
  )
}
