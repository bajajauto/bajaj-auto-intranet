import ErrorState from './ErrorState'
import EmptyState from './EmptyState'

/*
 * Renders the right thing for a query's state, so 25 call sites don't each
 * hand-roll the same four branches.
 *
 * Children is a function of the resolved data. It is only called once data
 * exists, which means a consumer never has to null-check — the reason this is
 * a render prop rather than plain children.
 *
 * `isEmpty` defaults to "an array with nothing in it". Pass your own for a
 * shape where empty means something else, or `null` to skip the empty branch.
 */
const defaultIsEmpty = (data) => Array.isArray(data) && data.length === 0

export default function QueryBoundary({
  query,
  skeleton,
  label = 'this section',
  emptyMessage = 'Nothing here yet',
  isEmpty = defaultIsEmpty,
  compact = false,
  children,
}) {
  if (query.isPending) return skeleton ?? null

  if (query.isError) {
    return <ErrorState label={label} onRetry={query.refetch} compact={compact} />
  }

  if (isEmpty && isEmpty(query.data)) {
    return <EmptyState message={emptyMessage} compact={compact} />
  }

  return children(query.data)
}
