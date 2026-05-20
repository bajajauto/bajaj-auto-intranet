import { useState } from 'react'
import { iconMap } from '@/components/shared/iconMap'
import { useSidebar } from '@/context/SidebarContext'
import { navGroups } from '@/config/navigation.config'

// TopBanner 36px + Header 80px + 8px breathing room = 124px
const TOP_OFFSET = 124

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - TOP_OFFSET
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

function NavItem({ item, isExpanded, isActive, onNavigate }) {
  const Icon = iconMap[item.icon] ?? iconMap.Circle

  return (
    <button
      onClick={() => onNavigate(item.sectionId)}
      className={`group relative w-full flex items-center gap-3 rounded-btn border-l-4 px-3 py-2 text-sm transition-all duration-200 focus-ring hover:scale-[1.02] hover:shadow-sm
        ${
          isActive
            ? 'border-brand-primary bg-white text-brand-primary font-medium shadow-sm'
            : 'border-transparent text-text-secondary hover:bg-white/80 hover:text-brand-primary'
        }`}
      aria-label={item.label}
    >
      <Icon size={20} className="flex-shrink-0 transition-transform group-hover:scale-110" />
      {isExpanded && <span className="truncate">{item.label}</span>}
      {!isExpanded && (
        <>
          {isActive && (
            <span className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-primary" />
          )}
          <span className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 z-50 -translate-y-1/2 rounded-btn bg-brand-dark px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-modal transition-all group-hover:translate-x-1 group-hover:opacity-100">
            {item.label}
          </span>
        </>
      )}
    </button>
  )
}

function GroupButton({
  group,
  isExpanded,
  isActive,
  isGroupExpanded,
  isCollapsible,
  onToggleGroup,
  onNavigate,
}) {
  const Icon = iconMap[group.icon] ?? iconMap.Circle

  function handleClick() {
    const firstItem = group.items.find((item) => item.enabled !== false)

    if (group.hideChildren) {
      if (firstItem) onNavigate(firstItem.sectionId)
      return
    }

    if (isExpanded && isCollapsible) {
      onToggleGroup(group.id)
      return
    }

    if (firstItem) onNavigate(firstItem.sectionId)
  }

  return (
    <button
      onClick={handleClick}
      className={`group relative w-full flex items-center gap-3 rounded-card border-l-4 px-3 py-3 transition-all duration-200 focus-ring hover:scale-[1.02] hover:shadow-sm
        ${
          isActive
            ? 'border-brand-primary bg-white text-brand-primary shadow-sm'
            : 'border-transparent text-text-primary hover:bg-white/80 hover:text-brand-primary'
        }`}
      aria-label={group.label}
      aria-expanded={isCollapsible && !group.hideChildren ? isGroupExpanded : undefined}
    >
      <span
        className={`w-10 h-10 rounded-card flex items-center justify-center flex-shrink-0 shadow-sm ring-1 transition-all duration-200 ${
          isActive
            ? 'bg-brand-primary text-white ring-brand-primary/20'
            : 'bg-brand-light text-brand-primary ring-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white'
        }`}
      >
        <Icon size={22} className="transition-transform duration-200 group-hover:scale-110" />
      </span>

      {isExpanded && (
        <span className="flex-1 text-left text-sm font-semibold whitespace-normal leading-snug">
          {group.label}
        </span>
      )}

      {!isExpanded && (
        <>
          {isActive && (
            <span className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-primary" />
          )}
          <span className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 z-50 -translate-y-1/2 rounded-btn bg-brand-dark px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-modal transition-all group-hover:translate-x-1 group-hover:opacity-100">
            {group.label}
          </span>
        </>
      )}
    </button>
  )
}

export default function Sidebar({ activeSection, onForceSection }) {
  const { isExpanded, isMobileOpen, setMobileOpen } = useSidebar()
  const [expandedGroups, setExpandedGroups] = useState({})

  function handleNavigate(sectionId) {
    onForceSection?.(sectionId) // highlight immediately; don't wait for IntersectionObserver
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
          sticky top-[116px] h-[calc(100vh-116px)] overflow-y-auto bg-gradient-to-b from-white via-white to-brand-light/60 border-r border-brand-primary/10
          transition-all duration-200 ease-in-out flex-shrink-0
          ${isExpanded ? 'w-72' : 'w-16'}
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
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-white via-white to-brand-light/60 border-r border-brand-primary/10
          overflow-y-auto transition-transform duration-200 ease-in-out
          md:hidden flex flex-col pt-[116px]
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
    <nav className="flex-1 py-4 px-2 space-y-3">
      {navGroups.map((group) => {
        const isCollapsible = group.collapsible
        const isGroupExpanded = expandedGroups[group.id]
        const isPortalName = group.isPortalName

        if (isPortalName) {
          return (
            <div key={group.id} className={isExpanded ? 'px-3 pb-4 pt-2 mb-2' : 'px-3 py-2'}>
              {isExpanded && (
                <>
                  <div className="font-sans text-2xl font-semibold tracking-[0.24em] uppercase bg-gradient-to-r from-brand-primary to-brand-dark bg-clip-text text-transparent">
                    {group.label}
                  </div>
                  <div className="mt-3 h-px bg-gradient-to-r from-brand-primary/30 via-brand-primary/10 to-transparent" />
                </>
              )}
            </div>
          )
        }

        return (
          <div key={group.id} className="pt-1">
            <GroupButton
              group={group}
              isExpanded={isExpanded}
              isActive={group.items.some((item) => item.sectionId === activeSection)}
              isGroupExpanded={isGroupExpanded}
              isCollapsible={isCollapsible}
              onToggleGroup={onToggleGroup}
              onNavigate={onNavigate}
            />

            {group.hideChildren ? null : isCollapsible ? (
              <>
                {isExpanded && isGroupExpanded && (
                  <ul className="space-y-0.5 mt-1 ml-2">
                    {group.items
                      .filter((item) => item.enabled !== false)
                      .map((item) => (
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
              isExpanded && (
                <ul className="space-y-0.5 mt-1 ml-2">
                  {group.items
                    .filter((item) => item.enabled !== false)
                    .map((item) => (
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
              )
            )}
          </div>
        )
      })}
    </nav>
  )
}
