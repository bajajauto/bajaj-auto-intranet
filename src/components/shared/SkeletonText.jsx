import Skeleton from './Skeleton'

/*
 * A paragraph's worth of skeleton lines. The last line is short because real
 * text rarely fills its final line — it reads as text rather than as bars.
 */
export default function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  )
}
