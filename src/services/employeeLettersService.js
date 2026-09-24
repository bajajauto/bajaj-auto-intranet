import { employeeLettersMock } from './adapters/mock/employeeLettersMock'
import { employeeLettersApi } from './adapters/api/employeeLettersApi'
import { resolveAdapter } from './resolveAdapter'

export const employeeLettersService = resolveAdapter(employeeLettersMock, employeeLettersApi)
