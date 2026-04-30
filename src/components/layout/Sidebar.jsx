import { useState } from 'react'
import * as Icons from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { navGroups } from '@/config/navigation.config'

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return

  // Account for fixed TopBanner (36px) + fixed Header (64px) wrapper padding.
  const HEADER_OFFSET_PX = 16
  const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET_PX
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

function NavItem({ item, isExpanded, isActive, onNavigate }) {
  const Icon = Icons[item.icon] ?? Icons.Circle

  return (
    <button
      onClick={() => onNavigate(item.sectionId)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-btn text-sm transition-colors focus-ring
        ${isActive
          ? 'bg-brand-light text-brand-primary font-medium'
          : 'text-text-secondary hover:bg-bg-alt hover:text-text-primary'
        }`}
      title={!isExpanded ? item.label : undefined}
      aria-label={item.label}
    >
      <Icon size={20} className="flex-shrink-0" />
      {isExpanded && <span className="truncate">{item.label}</span>}
    </button>
  )
}

export default function Sidebar({ activeSection }) {
  const { isExpanded, isMobileOpen, setMobileOpen } = useSidebar()
  const [expandedGroups, setExpandedGroups] = useState({
    'employee-services': true,
  })

  function handleNavigate(sectionId) {
    scrollToSection(sectionId)
    setMobileOpen(false)
  }

  function toggleGroup(groupId) {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          sticky top-0 h-screen overflow-y-auto bg-white border-r border-gray-200
          transition-all duration-200 ease-in-out flex-shrink-0
          ${isExpanded ? 'w-56' : 'w-16'}
          hidden md:flex flex-col
        `}
        aria-label="Main navigation"
      >
        <SidebarContent
          isExpanded={isExpanded}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          expandedGroups={expandedGroups}
          onToggleGroup={toggleGroup}
        />
      </aside>

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          overflow-y-auto transition-transform duration-200 ease-in-out
          md:hidden flex flex-col pt-[100px]
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Main navigation"
      >
        <SidebarContent
          isExpanded={true}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          expandedGroups={expandedGroups}
          onToggleGroup={toggleGroup}
        />
      </aside>
    </>
  )
}

function SidebarContent({ isExpanded, activeSection, onNavigate, expandedGroups, onToggleGroup }) {
  return (
    <nav className="flex-1 py-4 px-2 space-y-2">
      {navGroups.map((group) => {
        const isCollapsible = group.collapsible
        const isGroupExpanded = expandedGroups[group.id]
        const isPortalName = group.isPortalName

        if (isPortalName) {
          return (
            <div key={group.id} className={isExpanded ? 'px-3 py-3 mb-2' : 'px-3 py-2'}>
              {isExpanded && (
                <div className="text-base font-black tracking-wider text-brand-primary uppercase">
                  {group.label}
                </div>
              )}
            </div>
          )
        }

        return (
          <div key={group.id}>
            {isCollapsible ? (
              <>
                <button
                  onClick={() => onToggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-btn text-sm font-medium text-text-secondary hover:bg-bg-alt hover:text-text-primary transition-colors focus-ring"
                  aria-expanded={isGroupExpanded}
                >
                  <span>{isExpanded ? group.label : ''}</span>
                  {isExpanded && (
                    <Icons.ChevronDown
                      size={16}
                      className={`flex-shrink-0 transition-transform ${
                        isGroupExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {isGroupExpanded && (
                  <ul className="space-y-0.5 mt-1 ml-2">
                    {group.items.filter((item) => item.enabled !== false).map((item) => (
                      <li key={item.id}>
                        <NavItem
                          item={item}
                          isExpanded={isExpanded}
                          isActive={activeSection === item.sectionId}
                          onNavigate={onNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <ul className="space-y-0.5">
                {group.items.filter((item) => item.enabled !== false).map((item) => (
                  <li key={item.id}>
                    <NavItem
                      item={item}
                      isExpanded={isExpanded}
                      isActive={activeSection === item.sectionId}
                      onNavigate={onNavigate}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
