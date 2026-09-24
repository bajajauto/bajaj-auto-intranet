import { useCallback, useMemo } from 'react'
import { employeeLettersService } from '@/services/employeeLettersService'
import { entities } from '@/config/letters.config'
import { queryKeys } from '@/lib/queryClient'
import { useServiceQuery } from './useServiceQuery'

/*
 * Resolves the signed-in employee, the legal entity their letters are issued
 * on, and the two generate calls.
 *
 * The entity is derived, never chosen: it follows from the employee record, so
 * the request form has no entity picker. An unrecognised code falls back to BAL
 * — every employee sits under one of the four, and a letter with no letterhead
 * at all is worse than one on the parent company's.
 *
 * `generate` is async and returns null until the employee record has loaded,
 * because a letter cannot be built without an entity to issue it on. Callers
 * await it and render the preview from the resolved document.
 */
export function useEmployeeLetters() {
  const employeeQuery = useServiceQuery(
    queryKeys.letterEmployee,
    () => employeeLettersService.getEmployee(),
    { fallback: null },
  )
  const signatoriesQuery = useServiceQuery(
    queryKeys.letterSignatories,
    () => employeeLettersService.getSignatories(),
    { fallback: [] },
  )

  const employee = employeeQuery.data
  const entity = useMemo(
    () => (employee ? (entities[employee.entity] ?? entities.BAL) : null),
    [employee],
  )

  const generate = useCallback(
    (letterTypeId, input) =>
      entity
        ? employeeLettersService.generate({ letterTypeId, input, entity })
        : Promise.resolve(null),
    [entity],
  )

  const generateForm = useCallback(
    (formId, input) =>
      entity
        ? employeeLettersService.generateForm({ formId, input, entity })
        : Promise.resolve(null),
    [entity],
  )

  return {
    employee,
    entity,
    signatories: signatoriesQuery.data,
    generate,
    generateForm,
    isPending: employeeQuery.isPending || signatoriesQuery.isPending,
    isError: employeeQuery.isError || signatoriesQuery.isError,
    refetch: employeeQuery.refetch,
  }
}
