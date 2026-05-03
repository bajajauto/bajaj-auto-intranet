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
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-btn text-sm transition-colors focus-ring
        ${
          isActive
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

    if (isCollapsible) {
      onToggleGroup(group.id)
      return
    }

    if (firstItem) onNavigate(firstItem.sectionId)
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-card transition-colors focus-ring
        ${
          isActive
            ? 'bg-brand-light text-brand-primary'
            : 'text-text-primary hover:bg-bg-alt hover:text-brand-primary'
        }`}
      title={!isExpanded ? group.label : undefined}
      aria-label={group.label}
      aria-expanded={isCollapsible && !group.hideChildren ? isGroupExpanded : undefined}
    >
      <span className="w-10 h-10 rounded-card bg-brand-light flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-brand-primary" />
      </span>

      {isExpanded && (
        <span className="flex-1 text-left text-sm font-semibold whitespace-normal leading-snug">
          {group.label}
        </span>
      )}
    </button>
  )
}

export default function Sidebar({ activeSection, onForceSection }) {
  const { isExpanded, isMobileOpen, setMobileOpen } = useSidebar()
  const [expandedGroups, setExpandedGroups] = useState({
    'employee-services': true,
  })

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
          sticky top-[116px] h-[calc(100vh-116px)] overflow-y-auto bg-white border-r border-gray-200
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
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200
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
    <nav className="flex-1 py-4 px-2 space-y-2">
      {navGroups.map((group) => {
        const isCollapsible = group.collapsible
        const isGroupExpanded = expandedGroups[group.id]
        const isPortalName = group.isPortalName

        if (isPortalName) {
          return (
            <div key={group.id} className={isExpanded ? 'px-3 py-3 mb-2' : 'px-3 py-2'}>
              {isExpanded && (
                <div className="font-sans text-2xl font-semibold tracking-[0.24em] text-brand-primary uppercase">
                  {group.label}
                </div>
              )}
            </div>
          )
        }

        return (
          <div key={group.id} className="border-b border-gray-100 pb-2 last:border-b-0">
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
