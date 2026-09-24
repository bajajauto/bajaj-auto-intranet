import { useCsrPrograms } from '@/hooks/useCsrPrograms'
import Skeleton from '@/components/shared/Skeleton'
import QueryBoundary from '@/components/shared/QueryBoundary'
import ProgramCard from './ProgramCard'

function ProgramsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-36 w-full" rounded="rounded-card" />
      ))}
    </div>
  )
}

export default function ProgramsGrid() {
  const programsQuery = useCsrPrograms()

  return (
    <div className="rounded-card border border-emerald-100 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-text-primary">What we do</h3>
          <p className="mt-0.5 text-xs text-text-secondary">
            Explore Bajaj Auto Foundation focus areas.
          </p>
        </div>
      </div>

      <QueryBoundary
        query={programsQuery}
        skeleton={<ProgramsSkeleton />}
        label="our focus areas"
        emptyMessage="No programmes published yet."
        compact
      >
        {(items) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </QueryBoundary>
    </div>
  )
}
