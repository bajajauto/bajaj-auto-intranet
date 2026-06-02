import { Heart, MapPin, Sparkles, Users } from 'lucide-react'
import { useCsrImpact } from '@/hooks/useCsrPrograms'

const COUNTERS = [
  { key: 'livesTouched', label: 'Lives touched', icon: Heart },
  { key: 'villagesReached', label: 'Villages reached', icon: MapPin },
  { key: 'volunteerHours', label: 'Volunteer hours', icon: Users },
  { key: 'activeProjects', label: 'Active projects', icon: Sparkles },
]

export default function ImpactCounter() {
  const impact = useCsrImpact()

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {COUNTERS.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-card border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-white/70">
            <Icon size={14} />
            <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
          </div>
          <p className="mt-1 text-xl font-bold leading-none text-white sm:text-2xl">
            {impact[key]}
          </p>
        </div>
      ))}
    </div>
  )
}
