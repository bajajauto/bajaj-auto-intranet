import { useCsrPrograms } from '@/hooks/useCsrPrograms'
import ProgramCard from './ProgramCard'

export default function ProgramsGrid() {
  const programs = useCsrPrograms()

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-text-primary">What we do</h3>
        <span className="text-xs text-text-secondary">{programs.length} programmes</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  )
}
