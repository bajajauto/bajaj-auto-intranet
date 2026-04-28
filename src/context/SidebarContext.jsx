import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileOpen, setMobileOpen] = useState(false)

  function toggleSidebar() {
    setIsExpanded((prev) => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, isMobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
