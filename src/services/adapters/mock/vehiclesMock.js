// The five vehicles composed into the "Distinctly Ahead" hero artwork.
//
// `hotspot` is the vehicle's clickable box expressed as fractions of the
// banner image (see banner.config.js). Those same fractions drive the zoomed
// poster in the spin modal, so the artwork and the hotspots can never drift
// apart — retouch the banner and only these five numbers need revisiting.
//
// `frameCount` is how many turntable frames exist in public/vehicles/<id>/.
// Set it to 0 for a model whose 360° frames have not been published — the
// viewer falls back to a poster crop instead of rendering broken frames.
//
// Specs are representative Phase 1 values. Phase 2 swaps this adapter for the
// product catalogue feed; no component changes.
const VEHICLES = [
  {
    id: 're',
    name: 'Bajaj RE',
    tagline: 'The three-wheeler that moves a country',
    category: 'Commercial',
    accent: 'text-amber-300',
    frameCount: 36,
    hotspot: { x: 0.092, y: 0.288, width: 0.186, height: 0.48 },
    specs: [
      { label: 'Engine', value: '236 cc DTS-i' },
      { label: 'Max power', value: '10.3 PS' },
      { label: 'Fuel options', value: 'Petrol / CNG / LPG' },
      { label: 'Seating', value: '3 + 1' },
      { label: 'Kerb weight', value: '400 kg' },
    ],
  },
  {
    id: 'pulsar',
    name: 'Pulsar N160',
    tagline: 'Definitely Daring',
    category: 'Motorcycle',
    accent: 'text-sky-300',
    frameCount: 36,
    hotspot: { x: 0.25, y: 0.36, width: 0.19, height: 0.465 },
    specs: [
      { label: 'Engine', value: '164.82 cc oil-cooled' },
      { label: 'Max power', value: '15.68 PS @ 8750 rpm' },
      { label: 'Max torque', value: '14.65 Nm @ 6750 rpm' },
      { label: 'Transmission', value: '5-speed' },
      { label: 'Kerb weight', value: '152 kg' },
    ],
  },
  {
    id: 'chetak',
    name: 'Chetak',
    tagline: 'Hamesha ke liye',
    category: 'Electric',
    accent: 'text-rose-300',
    frameCount: 36,
    hotspot: { x: 0.42, y: 0.23, width: 0.166, height: 0.716 },
    specs: [
      { label: 'Battery', value: '3.2 kWh lithium-ion' },
      { label: 'Certified range', value: '123 km (IDC)' },
      { label: 'Top speed', value: '73 km/h' },
      { label: 'Charging time', value: '3 h 50 m (0–80%)' },
      { label: 'Kerb weight', value: '134 kg' },
    ],
  },
  {
    id: 'duke',
    name: 'KTM 390 Duke',
    tagline: 'Ready to Race',
    category: 'Motorcycle',
    accent: 'text-orange-300',
    frameCount: 36,
    hotspot: { x: 0.57, y: 0.326, width: 0.185, height: 0.504 },
    specs: [
      { label: 'Engine', value: '398.63 cc liquid-cooled' },
      { label: 'Max power', value: '46 PS @ 8500 rpm' },
      { label: 'Max torque', value: '39 Nm @ 7000 rpm' },
      { label: 'Transmission', value: '6-speed, quickshifter' },
      { label: 'Kerb weight', value: '168 kg' },
    ],
  },
  {
    id: 'qute',
    name: 'Qute',
    tagline: 'Small footprint, big idea',
    category: 'Quadricycle',
    accent: 'text-emerald-300',
    frameCount: 36,
    hotspot: { x: 0.74, y: 0.32, width: 0.219, height: 0.473 },
    specs: [
      { label: 'Engine', value: '216.6 cc liquid-cooled' },
      { label: 'Max power', value: '13.1 PS @ 5500 rpm' },
      { label: 'Fuel options', value: 'Petrol / CNG' },
      { label: 'Seating', value: '4' },
      { label: 'Kerb weight', value: '451 kg' },
    ],
  },
]

export const vehiclesMock = {
  getAll() {
    return VEHICLES
  },

  getById(id) {
    return VEHICLES.find((vehicle) => vehicle.id === id) ?? null
  },
}
