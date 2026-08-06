import { useCallback, useRef, useState, useEffect } from 'react'
import { Search, Menu, LogOut, ChevronDown } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { useUser } from '@/context/UserContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { noticeService } from '@/services/noticeService'
import NoticesPanel from '@/components/notices/NoticesPanel'
import ThemeToggle from '@/components/shared/ThemeToggle'
import UnionMark from '@/components/layout/UnionMark'
import bajajFooterLockup from '@/assets/bajaj-footer-lockup.png'
import { productBrand } from '@/config/brand.config'

function AnnouncementIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M13 35.5 7.7 40.8c-1.2 1.2-.4 3.2 1.3 3.2h13.5L13 35.5Z" fill="#1A56A8" />
      <path d="M21.7 38.8 31 53.6c.7 1.2 2.4 1.4 3.4.4l3-3c.7-.7.8-1.8.3-2.6L30.8 37l-9.1 1.8Z" fill="#E5E7EB" />
      <path d="M21.7 38.8 31 53.6c.7 1.2 2.4 1.4 3.4.4l3-3c.7-.7.8-1.8.3-2.6L30.8 37" stroke="#C7CCD3" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M10 22.8c-2.9 1.2-4.8 4-4.8 7.2s1.9 6 4.8 7.2l10.5 4.5V18.3L10 22.8Z" fill="#1A56A8" />
      <path d="M20.5 18.3 45 8v44L20.5 41.7V18.3Z" fill="#F4F6F8" />
      <path d="M20.5 18.3 45 8v44L20.5 41.7V18.3Z" stroke="#1A56A8" strokeWidth="3" strokeLinejoin="round" />
      <path d="M25 21.8 40.5 15v34L25 42.2V21.8Z" fill="#EAF3FF" />
      <ellipse cx="45" cy="30" rx="8" ry="22" fill="#F7FBFF" stroke="#1A56A8" strokeWidth="3" />
      <ellipse cx="45" cy="30" rx="3.7" ry="9" fill="#1A56A8" />
      <path d="M54 15 61 7l-3.1 10.7 5.4-.7-8.7 9.3 3-9.6-3.6-1.7Z" fill="#7DD3FC" />
      <path d="M55 30.5 62 28l-5.1 5.2 4.4 1.8-8 2 3.6-4.2-1.9-2.3Z" fill="#7DD3FC" />
      <path d="M54 44.5 62 53l-10.7-4 1.7 5.6-8.9-9.6 9.1 3.6.8-4.1Z" fill="#7DD3FC" />
    </svg>
  )
}

// How often the header mark replays itself.
const MARK_REPLAY_MS = 5000

export default function Header({ revealMark = false }) {
  const { isMobileOpen, setMobileOpen } = useSidebar()
  const user = useUser()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [searchQuery, setSearchQuery] = useState('')
  const [isNoticesOpen, setNoticesOpen] = useState(false)
  const [isProfileOpen, setProfileOpen] = useState(false)
  const [noticesSeen, setNoticesSeen] = useState(false)

  const notices = noticeService.getAll()
  const noticeCount = notices.length

  const noticesRef = useRef(null)
  const profileRef = useRef(null)

  // Remounting the mark is what restarts its animation — a CSS animation will
  // not re-run on an element that never left. The header mounts underneath the
  // splash, so the first run happens unseen; `revealMark` fires the one that
  // matters, as the splash clears, and hovering the lockup asks for it again.
  const [markRun, setMarkRun] = useState(0)
  const replayMark = useCallback(() => setMarkRun((run) => run + 1), [])

  useEffect(() => {
    if (revealMark) replayMark()
  }, [revealMark, replayMark])

  // ...and then on a loop. The mark's own run finishes around 2.3s (UnionMark's
  // BLOOM_MS is 2050 plus the bloom itself), so a 5s cycle lands a clear pause
  // between runs rather than clipping one mid-flight.
  //
  // Skipped entirely under reduced-motion: this is the one animation on the
  // page that repeats forever on its own, so leaving it running is exactly what
  // that preference is asking us not to do. The mark still renders, settled.
  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(replayMark, MARK_REPLAY_MS)
    return () => clearInterval(id)
  }, [replayMark, prefersReducedMotion])

  function closeAll() {
    setNoticesOpen(false)
    setProfileOpen(false)
  }

  function handleMenuClick() {
    setMobileOpen(!isMobileOpen)
  }

  function handleNoticesClick() {
    setProfileOpen(false)
    setNoticesOpen((v) => !v)
    setNoticesSeen(true)
  }

  function handleProfileClick() {
    setNoticesOpen(false)
    setProfileOpen((v) => !v)
  }

  useEffect(() => {
    if (!isNoticesOpen && !isProfileOpen) return
    function onMouseDown(e) {
      if (noticesRef.current && !noticesRef.current.contains(e.target)) setNoticesOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [isNoticesOpen, isProfileOpen])

  useEffect(() => {
    if (!isNoticesOpen && !isProfileOpen) return
    function onKeyDown(e) {
      if (e.key === 'Escape') closeAll()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isNoticesOpen, isProfileOpen])

  return (
    <header className="app-header-chrome fixed left-0 right-0 top-8 md:top-9 z-40 h-16 md:h-20 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_minmax(18rem,36rem)_1fr] items-center gap-2 md:gap-4 pl-3 pr-1.5 md:px-4">
      <div className="flex min-w-0 items-center gap-2 md:gap-3">

        {isMobile && (
          <button
            onClick={handleMenuClick}
            className="rounded-btn p-1.5 text-white/80 hover:bg-white/10 hover:text-white focus-ring"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Logo */}
        <div
          className="flex min-w-0 flex-shrink select-none items-center gap-2 md:flex-shrink-0 md:gap-3"
          onMouseEnter={replayMark}
        >
          <img
            src={bajajFooterLockup}
            alt="Bajaj Auto - The World's Favourite Indian"
            className="h-8 w-auto object-contain sm:h-9 md:h-12"
          />
          <div className="h-7 w-px bg-white/30 md:h-9" aria-hidden="true" />
          {/* The logo to the left carries "Bajaj", so only the numeral is
              drawn — and it assembles itself exactly as the splash's does,
              crowd included. The scene is far wider than the mark it settles
              into and overflows its box on both sides, so for the couple of
              seconds it runs it passes over the lockup to its left. The full
              name is what assistive tech reads. */}
          {/* Nudged off the rule. The scene overflows its box by a good deal
              more than the mark is wide, so sitting tight against the divider
              put the motorcycle over the lockup on the way in. */}
          <span className="ml-2 leading-none sm:ml-3 md:ml-5">
            <span className="sr-only">{productBrand.name}</span>
            <UnionMark key={markRun} className="h-6 w-auto text-white sm:h-7 md:h-8" />
          </span>
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
      <div className="flex min-w-0 translate-x-1 items-center justify-end gap-1 md:translate-x-0 md:gap-2">
        {/* Light / dark theme toggle */}
        <ThemeToggle />

        {/* Announcements */}
        <div className="relative" ref={noticesRef}>
          <button
            onClick={handleNoticesClick}
            aria-label="Notices"
            aria-expanded={isNoticesOpen}
            aria-haspopup="true"
            className="relative flex h-9 w-9 items-center justify-center rounded-btn text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-ring md:h-10 md:w-10"
          >
            <AnnouncementIcon className="h-6 w-6 drop-shadow-sm" />
            {noticeCount > 0 && !noticesSeen && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-brand-dark">
                {noticeCount > 9 ? '9+' : noticeCount}
              </span>
            )}
          </button>

          {isNoticesOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 z-50">
              <NoticesPanel />
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
            <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#161f33] rounded-card shadow-modal border border-gray-100 dark:border-white/10 z-50">
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

              <div className="px-4 py-2 border-t border-gray-100 dark:border-white/10">
                <p className="text-xs text-text-secondary">{user.designation}</p>
                <p className="text-xs text-text-secondary">{user.department}</p>
              </div>

              <div className="border-t border-gray-100 dark:border-white/10 p-2">
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
