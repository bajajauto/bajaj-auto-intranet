import { Search, Bell, HelpCircle, Menu } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { useUser } from '@/context/UserContext'

export default function Header() {
  const { toggleSidebar } = useSidebar()
  const user = useUser()

  return (
    <header className="fixed top-9 left-0 right-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shadow-card">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-btn text-text-secondary hover:bg-bg-alt focus-ring"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-32 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-text-secondary">
          Bajaj Auto
        </div>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="search"
            placeholder="Search employees, policies, documents..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-btn border border-gray-200 bg-bg-alt focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            aria-label="Global search"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          className="relative p-2 rounded-btn text-text-secondary hover:bg-bg-alt focus-ring"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
            4
          </span>
        </button>

        <button
          className="p-2 rounded-btn text-text-secondary hover:bg-bg-alt focus-ring"
          aria-label="Help"
        >
          <HelpCircle size={20} />
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 rounded-btn hover:bg-bg-alt focus-ring">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-medium">
            {user.name.charAt(0)}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-text-primary leading-tight">{user.name}</div>
            <div className="text-xs text-text-secondary leading-tight">{user.designation}</div>
          </div>
        </button>
      </div>
    </header>
  )
}
