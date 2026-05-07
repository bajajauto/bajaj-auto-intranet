import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Factory, Globe2, MapPin, Satellite } from 'lucide-react'
import earthMapUrl from '@/assets/globe/bluemarble-2048.png'

const LOCATIONS = [
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
  {
    id: 'bangalore',
    name: 'Bangalore',
    type: 'Regional office',
    country: 'India',
    coordinates: '12.97 deg N, 77.59 deg E',
    presence: 'South India office',
    mapPosition: { x: '54%', y: '72%' },
    subLocations: ['Bangalore Office'],
  },
  {
    id: 'regional-offices',
    name: 'Regional Offices',
    type: 'Sales + service network',
    country: 'India',
    coordinates: 'Multi-city',
    presence: 'Metro network',
    mapPosition: { x: '38%', y: '40%' },
    subLocations: ['Mumbai RO', 'Delhi RO', 'Chennai RO', 'Kolkata RO'],
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

function GlobePresence() {
  const mountRef = useRef(null)
  const markerRefs = useRef({})
  const isPausedRef = useRef(false)
  const targetCountryRef = useRef(null)
  const [activeCountry, setActiveCountry] = useState('India')

  const pauseOnCountry = (countryName) => {
    isPausedRef.current = true
    setActiveCountry(countryName)
  }

  const resumeGlobe = () => {
    if (targetCountryRef.current) return
    isPausedRef.current = false
    setActiveCountry('India')
  }

  const flyToCountry = (country) => {
    targetCountryRef.current = country
    isPausedRef.current = false
    setActiveCountry(country.name)
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
      camera.position.set(0, 0, 5.4)

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
      const earth = new THREE.Mesh(earthGeometry, earthMaterial)
      globeGroup.add(earth)

      const atmosphereGeometry = new THREE.SphereGeometry(1.66, 128, 128)
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: '#8bdcff',
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      })
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      scene.add(atmosphere)

      const starGeometry = new THREE.BufferGeometry()
      const starPositions = []
      for (let i = 0; i < 120; i += 1) {
        starPositions.push((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6, -3 - Math.random() * 5)
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
      const starMaterial = new THREE.PointsMaterial({
        color: '#dbeafe',
        size: 0.012,
        transparent: true,
        opacity: 0.55,
      })
      const stars = new THREE.Points(starGeometry, starMaterial)
      scene.add(stars)

      scene.add(new THREE.AmbientLight('#9cc9ff', 0.7))
      const sunLight = new THREE.DirectionalLight('#ffffff', 3.2)
      sunLight.position.set(4, 2.4, 5)
      scene.add(sunLight)
      const rimLight = new THREE.DirectionalLight('#67e8f9', 1.1)
      rimLight.position.set(-4, 0.4, -1.8)
      scene.add(rimLight)

      const countryVecs = BAJAJ_COUNTRIES.map((c) => ({
        name: c.name,
        lat: c.lat,
        lng: c.lng,
        vec: latLngToVector3(c.lat, c.lng, 1.68),
      }))

      const normalizeRotation = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle))

      const focusCountry = (country) => {
        const countryVec = latLngToVector3(country.lat, country.lng, 1)
        const targetY = normalizeRotation(Math.atan2(-countryVec.x, countryVec.z))
        const targetX = THREE.MathUtils.clamp(
          baseRotationX + THREE.MathUtils.degToRad(country.lat) * 0.35,
          THREE.MathUtils.degToRad(-32),
          THREE.MathUtils.degToRad(24)
        )
        const yDelta = normalizeRotation(targetY - globeGroup.rotation.y)
        globeGroup.rotation.y += yDelta * 0.08
        globeGroup.rotation.x += (targetX - globeGroup.rotation.x) * 0.08

        if (Math.abs(yDelta) < 0.004 && Math.abs(targetX - globeGroup.rotation.x) < 0.004) {
          targetCountryRef.current = null
          isPausedRef.current = true
        }
      }

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
          const x = (screen.x * 0.5 + 0.5) * w
          const y = (-screen.y * 0.5 + 0.5) * h
          el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
          el.style.opacity = visible ? '1' : '0'
          el.style.pointerEvents = visible ? 'auto' : 'none'
          el.tabIndex = visible ? 0 : -1
        })
      }

      let frameId = 0
      const animate = () => {
        frameId = window.requestAnimationFrame(animate)
        const targetCountry = targetCountryRef.current

        if (targetCountry) {
          focusCountry(targetCountry)
        } else if (!isPausedRef.current) {
          globeGroup.rotation.y += 0.0026
          globeGroup.rotation.x += (baseRotationX - globeGroup.rotation.x) * 0.015
          atmosphere.rotation.y += 0.0008
          stars.rotation.y -= 0.00015
        }
        updateMarkers()
        renderer.render(scene, camera)
      }
      animate()

      cleanupGlobe = () => {
        window.cancelAnimationFrame(frameId)
        resizeObserver.disconnect()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
        earthGeometry.dispose()
        earthMaterial.dispose()
        atmosphereGeometry.dispose()
        atmosphereMaterial.dispose()
        starGeometry.dispose()
        starMaterial.dispose()
        earthTexture.dispose()
        renderer.dispose()
      }
    }

    initGlobe().catch(() => {})

    return () => {
      disposed = true
      cleanupGlobe()
    }
  }, [])

  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-card border border-white/10 bg-[#061f48]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.16),transparent_55%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_100%,48px_48px,48px_48px]" />
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />

      {/* Header overlay */}
      <div className="pointer-events-none absolute left-6 top-6 z-20">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
          <Globe2 size={12} />
          Global Presence
        </div>
        <p className="mt-3 text-5xl font-bold leading-none tracking-tight text-white">43</p>
        <p className="mt-1 text-sm text-white/50">Countries worldwide</p>
        <div className="mt-4 inline-flex max-w-[15rem] items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.8)]" />
          {activeCountry === 'India' ? 'India - HQ market' : activeCountry}
        </div>
      </div>

      <div className="absolute right-5 top-5 z-20 hidden w-72 rounded-card border border-white/10 bg-black/25 p-3 text-white shadow-modal backdrop-blur-md lg:block">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Markets</p>
            <p className="text-sm font-semibold text-white">Country presence</p>
          </div>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/70">
            {BAJAJ_COUNTRIES.length}
          </span>
        </div>
        <div className="grid max-h-[392px] grid-cols-2 gap-1.5 overflow-y-auto pr-1 overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/35">
          {BAJAJ_COUNTRIES.map((country) => {
            const isActive = activeCountry === country.name
            return (
              <button
                key={country.name}
                type="button"
                className={`min-w-0 rounded-btn border px-2.5 py-2 text-left text-[11px] font-medium transition-all focus-ring ${
                  isActive
                    ? 'border-white/50 bg-white text-brand-dark shadow-[0_0_18px_rgba(255,255,255,0.22)]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/15 hover:text-white'
                }`}
                onMouseEnter={() => setActiveCountry(country.name)}
                onMouseLeave={() => {
                  if (!targetCountryRef.current && !isPausedRef.current) setActiveCountry('India')
                }}
                onFocus={() => setActiveCountry(country.name)}
                onBlur={() => {
                  if (!targetCountryRef.current && !isPausedRef.current) setActiveCountry('India')
                }}
                onClick={() => flyToCountry(country)}
              >
                <span className="block truncate">{country.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 z-20 flex gap-1.5 overflow-x-auto pb-1 lg:hidden [&::-webkit-scrollbar]:hidden">
        {BAJAJ_COUNTRIES.map((country) => (
          <button
            key={country.name}
            type="button"
            className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all focus-ring ${
              activeCountry === country.name
                ? 'border-white/60 bg-white text-brand-dark'
                : 'border-white/10 bg-black/25 text-white/70 backdrop-blur-sm'
            }`}
            onMouseEnter={() => setActiveCountry(country.name)}
            onMouseLeave={() => {
              if (!targetCountryRef.current && !isPausedRef.current) setActiveCountry('India')
            }}
            onFocus={() => setActiveCountry(country.name)}
            onBlur={() => {
              if (!targetCountryRef.current && !isPausedRef.current) setActiveCountry('India')
            }}
            onClick={() => flyToCountry(country)}
          >
            {country.name}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-20 hidden items-center gap-2 lg:flex">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/55 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
          Export market
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/55 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          India HQ
        </div>
      </div>

      {/* Country marker overlays */}
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
            className="absolute left-0 top-0 z-10 group flex h-8 w-8 items-center justify-center rounded-full focus-ring"
            aria-label={`${country.name}${country.primary ? ' HQ' : ''}`}
            onMouseEnter={() => pauseOnCountry(country.name)}
            onMouseLeave={resumeGlobe}
            onFocus={() => pauseOnCountry(country.name)}
            onBlur={resumeGlobe}
            onClick={() => flyToCountry(country)}
          >
            {country.primary ? (
              <>
                <span className="relative flex h-4 w-4 items-center justify-center rounded-full">
                  <span className={`absolute inset-0 rounded-full bg-white/50 ${isActive ? 'animate-ping' : ''}`} />
                  <span
                    className={`relative rounded-full bg-white transition-all duration-200 ${
                      isActive
                        ? 'h-5 w-5 shadow-[0_0_20px_rgba(255,255,255,0.95)]'
                        : 'h-4 w-4 shadow-[0_0_12px_rgba(255,255,255,0.75)]'
                    }`}
                  />
                </span>
                <span className={`pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-brand-dark shadow-md transition-opacity duration-150 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  India - HQ
                </span>
              </>
            ) : (
              <>
                <span
                  className={`block rounded-full ring-white/15 transition-all duration-200 ${
                    isActive
                      ? 'h-4 w-4 scale-125 bg-white ring-2 shadow-[0_0_16px_rgba(255,255,255,0.9)]'
                      : 'h-2 w-2 bg-sky-300/70 ring-1 group-hover:scale-[1.9] group-hover:bg-white group-hover:ring-2 group-hover:ring-white/50 group-hover:shadow-[0_0_7px_rgba(255,255,255,0.55)]'
                  }`}
                />
                <span className={`pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand-dark shadow-sm transition-opacity duration-150 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {country.name}
                </span>
              </>
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
    <article className="rounded-card border border-gray-100 bg-white p-3 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-modal">
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

export default function LocationsSection() {
  return (
    <div className="space-y-5">
      <GlobePresence />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {LOCATIONS.map((location) => (
          <PlantCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  )
}
