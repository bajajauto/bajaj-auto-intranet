import { useRef, useState, useEffect } from 'react'
import { Search, Bell, HelpCircle, Menu, LogOut, ChevronDown } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { useUser } from '@/context/UserContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { notificationService } from '@/services/notificationService'
import NotificationsPanel from '@/components/notifications/NotificationsPanel'

export default function Header() {
  const { toggleSidebar, isMobileOpen, setMobileOpen } = useSidebar()
  const user = useUser()
  const isMobile = useMediaQuery('(max-width: 767px)')

  const [searchQuery, setSearchQuery] = useState('')
  const [isNotifOpen, setNotifOpen] = useState(false)
  const [isProfileOpen, setProfileOpen] = useState(false)

  const notifications = notificationService.getAll()
  const unreadCount = notifications.length

  const notifRef = useRef(null)
  const profileRef = useRef(null)

  function closeAll() {
    setNotifOpen(false)
    setProfileOpen(false)
  }

  function handleMenuClick() {
    if (isMobile) {
      setMobileOpen(!isMobileOpen)
    } else {
      toggleSidebar()
    }
  }

  function handleBellClick() {
    setProfileOpen(false)
    setNotifOpen((v) => !v)
  }

  function handleProfileClick() {
    setNotifOpen(false)
    setProfileOpen((v) => !v)
  }

  useEffect(() => {
    if (!isNotifOpen && !isProfileOpen) return
    function onMouseDown(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [isNotifOpen, isProfileOpen])

  useEffect(() => {
    if (!isNotifOpen && !isProfileOpen) return
    function onKeyDown(e) {
      if (e.key === 'Escape') closeAll()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isNotifOpen, isProfileOpen])

  return (
    <header className="fixed top-9 left-0 right-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shadow-card">
      {/* Hamburger */}
      <button
        onClick={handleMenuClick}
        className="p-2 rounded-btn text-text-secondary hover:bg-bg-alt focus-ring"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0 select-none">
        <div className="w-8 h-8 bg-brand-primary rounded-sm flex items-center justify-center">
          <span className="text-white text-sm font-black tracking-tight">B</span>
        </div>
        <div className="leading-none">
          <div className="text-brand-dark font-black text-sm tracking-wider uppercase">Bajaj</div>
          <div className="text-text-secondary font-medium text-[10px] tracking-widest uppercase">Auto</div>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-xl">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees, policies, documents..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-btn border border-gray-200 bg-bg-alt focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            aria-label="Global search"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleBellClick}
            aria-label="Notifications"
            aria-expanded={isNotifOpen}
            aria-haspopup="true"
            className="relative p-2 rounded-btn text-text-secondary hover:bg-bg-alt focus-ring"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 z-50">
              <NotificationsPanel />
            </div>
          )}
        </div>

        {/* Help */}
        <button
          className="p-2 rounded-btn text-text-secondary hover:bg-bg-alt focus-ring"
          aria-label="Help"
        >
          <HelpCircle size={20} />
        </button>

        {/* User profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={handleProfileClick}
            aria-label="User menu"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            className="flex items-center gap-2 px-3 py-1.5 rounded-btn hover:bg-bg-alt focus-ring"
          >
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-text-primary leading-tight">{user.name}</div>
              <div className="text-xs text-text-secondary leading-tight">{user.designation}</div>
            </div>
            <ChevronDown
              size={14}
              className={`hidden md:block text-text-secondary transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-card shadow-modal border border-gray-100 z-50">
              {/* Profile header */}
              <div className="px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white text-base font-semibold flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
                  <p className="text-xs text-text-secondary truncate">{user.email}</p>
                </div>
              </div>

              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-text-secondary">{user.designation}</p>
                <p className="text-xs text-text-secondary">{user.department}</p>
              </div>

              <div className="border-t border-gray-100 p-2">
                <button
                  disabled
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary rounded-btn opacity-50 cursor-not-allowed"
                  aria-label="Sign out (unavailable in Phase 1)"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
