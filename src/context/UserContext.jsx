import { createContext, useContext } from 'react'

const mockUser = {
  name: 'Employee Name',
  email: 'employee@bajajauto.com',
  designation: 'Senior Engineer',
  department: 'R&D',
  role: 'employee',
  avatar: null,
}

const UserContext = createContext(mockUser)

export function UserProvider({ children }) {
  return <UserContext.Provider value={mockUser}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
