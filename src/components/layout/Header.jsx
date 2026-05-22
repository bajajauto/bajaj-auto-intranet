import { useRef, useState, useEffect } from 'react'
import { Search, Bell, Menu, LogOut, ChevronDown } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { useUser } from '@/context/UserContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { notificationService } from '@/services/notificationService'
import NotificationsPanel from '@/components/notifications/NotificationsPanel'
import logoImage from '@/assets/bajaj-mark-transparent.png'

export default function Header() {
  const { isMobileOpen, setMobileOpen } = useSidebar()
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
    setMobileOpen(!isMobileOpen)
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
    <header className="fixed top-9 left-0 right-0 z-40 h-20 bg-brand-dark grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_minmax(18rem,36rem)_1fr] items-center px-4 gap-4 shadow-modal">
      <div className="flex items-center gap-3 min-w-0">
        {isMobile && (
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-btn text-white/80 hover:bg-white/10 hover:text-white focus-ring"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 select-none">
          <img src={logoImage} alt="Bajaj Auto Logo" className="h-12 w-auto" />
          <div className="h-9 w-px bg-white/35" aria-hidden="true" />
          <div className="font-ekam italic text-white font-normal text-3xl tracking-[0.16em] leading-none">
            EKAM
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex w-full">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/50"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees, policies, documents..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-btn border border-white/20 bg-white/95 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white"
            aria-label="Global search"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center justify-end gap-2 min-w-0">
        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleBellClick}
            aria-label="Notifications"
            aria-expanded={isNotifOpen}
            aria-haspopup="true"
            className="relative p-2 rounded-btn text-white/80 hover:bg-white/10 hover:text-white focus-ring"
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

        {/* User profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={handleProfileClick}
            aria-label="User menu"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            className="flex items-center gap-2 px-3 py-1.5 rounded-btn hover:bg-white/10 focus-ring"
          >
            <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-white leading-tight">{user.name}</div>
              <div className="text-xs text-white/70 leading-tight">{user.designation}</div>
            </div>
            <ChevronDown
              size={14}
              className={`hidden md:block text-white/70 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
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
