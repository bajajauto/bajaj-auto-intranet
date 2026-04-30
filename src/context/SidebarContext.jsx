import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileOpen, setMobileOpen] = useState(false)

  function collapseSidebar() {
    setIsExpanded(false)
  }

  function expandSidebar() {
    setIsExpanded(true)
  }

  function toggleSidebar() {
    setIsExpanded((prev) => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, collapseSidebar, expandSidebar, isMobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
