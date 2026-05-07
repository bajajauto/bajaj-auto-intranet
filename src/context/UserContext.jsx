import { createContext, useContext } from 'react'

const mockUser = {
  name: 'Debosmita Paul',
  email: 'employee@bajajauto.com',
  designation: 'Manager(HR)',
  department: 'Digitization',
  role: 'employee',
  avatar: null,
}

const UserContext = createContext(mockUser)

export function UserProvider({ children }) {
  return <UserContext.Provider value={mockUser}>{children}</UserContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext)
}
