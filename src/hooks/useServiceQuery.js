import { useQuery } from '@tanstack/react-query'

/*
 * The single shape every data hook in the app returns.
 *
 * Wrapping `useQuery` rather than using it directly does two things worth the
 * indirection: it gives every hook the same signature, and it applies a
 * `fallback` so components can map over `data` without a null check while the
 * first fetch is still in flight.
 *
 * `fallback` is NOT `initialData` — initialData would mark the cache as
 * populated and suppress the loading state. This only affects what a consumer
 * reads, never what the cache believes.
 */
export function useServiceQuery(queryKey, queryFn, { fallback, ...options } = {}) {
  const query = useQuery({ queryKey, queryFn, ...options })

  return {
    ...query,
    data: query.data === undefined ? fallback : query.data,
  }
}
