import * as Icons from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { navGroups } from '@/config/navigation.config'

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
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

  function handleNavigate(sectionId) {
    scrollToSection(sectionId)
    setMobileOpen(false)
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
          fixed top-[100px] bottom-0 left-0 z-30 overflow-y-auto bg-white border-r border-gray-200
          transition-all duration-200 ease-in-out
          ${isExpanded ? 'w-64' : 'w-16'}
          hidden md:flex flex-col
        `}
        aria-label="Main navigation"
      >
        <SidebarContent
          isExpanded={isExpanded}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      </aside>

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-gray-200
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
        />
      </aside>
    </>
  )
}

function SidebarContent({ isExpanded, activeSection, onNavigate }) {
  return (
    <nav className="flex-1 py-4 px-2 space-y-4">
      {navGroups.map((group) => (
        <div key={group.id}>
          {isExpanded && (
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
              {group.label}
            </p>
          )}
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
        </div>
      ))}
    </nav>
  )
}
