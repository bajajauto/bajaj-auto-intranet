import { createContext, useContext, useMemo } from 'react'
import { useAuth } from './AuthContext'

/*
 * The signed-in employee, as the *chrome* needs them — the header greeting, the
 * profile menu, the volunteer sign-up's prefilled name.
 *
 * This is not the record letters are built from. That one is `employeeSchema`,
 * it carries addresses and a date of joining, and it is resolved server-side
 * from the access token precisely so that nothing the browser holds can reach
 * a letterhead. Two shapes, two sources, on purpose.
 *
 * What an ID token actually carries is a name and an email. `jobTitle` and
 * `department` are not standard claims — they arrive either as optional claims
 * IT configures on the app registration, or from Graph, or from SuccessFactors
 * via our own API. Until one of those lands they are empty, and every consumer
 * has to treat them as optional rather than assume the mock's fullness.
 */

const MOCK_USER = Object.freeze({
  name: 'Debosmita Paul',
  email: 'employee@bajajauto.com',
  designation: 'Manager(HR)',
  department: 'Digitization',
  role: 'employee',
  avatar: null,
})

const UserContext = createContext(MOCK_USER)

function fromClaims(account, claims) {
  return {
    name: claims?.name ?? account?.name ?? account?.username ?? 'Employee',
    email: claims?.preferred_username ?? account?.username ?? '',
    // Optional claims, if IT has configured them; otherwise filled in later.
    designation: claims?.jobTitle ?? '',
    department: claims?.department ?? '',
    role: 'employee',
    avatar: null,
  }
}

export function UserProvider({ children }) {
  const { enabled, account, claims } = useAuth()

  const user = useMemo(
    () => (enabled ? fromClaims(account, claims) : MOCK_USER),
    [enabled, account, claims],
  )

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext)
}
