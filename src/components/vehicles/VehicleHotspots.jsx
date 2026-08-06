import { RotateCw } from 'lucide-react'

/**
 * Transparent click targets laid over the hero artwork, one per vehicle.
 *
 * Positions come from each vehicle's `hotspot` fractions, so this layer must be
 * rendered in a box with exactly the banner's aspect ratio — HeroBanner shares
 * one geometry constant between the artwork and this overlay to guarantee that.
 * Inline styles are unavoidable here: the coordinates are data, not design
 * tokens, and Tailwind has no class for "37.4% from the left".
 */
export default function VehicleHotspots({ vehicles, onSelect }) {
  return (
    <div className="absolute inset-0">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          type="button"
          onClick={() => onSelect(vehicle)}
          aria-label={`Explore the ${vehicle.name} in 360°`}
          title={`${vehicle.name} — 360° view`}
          className="group absolute rounded-2xl transition-colors duration-300 hover:bg-white/[0.07] focus:outline-none focus-visible:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-white/70"
          style={{
            left: `${vehicle.hotspot.x * 100}%`,
            top: `${vehicle.hotspot.y * 100}%`,
            width: `${vehicle.hotspot.width * 100}%`,
            height: `${vehicle.hotspot.height * 100}%`,
          }}
        >
          {/* Name + affordance, revealed on hover or keyboard focus. */}
          <span className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-[11px]">
            <RotateCw size={11} className={vehicle.accent} />
            {vehicle.name}
          </span>
        </button>
      ))}
    </div>
  )
}
