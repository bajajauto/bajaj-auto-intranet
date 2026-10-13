import { useCallback, useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, LogOut, Menu, Search, X } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { useAuth } from '@/context/AuthContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useNotices } from '@/hooks/useNotices'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import NoticesPanel from '@/components/notices/NoticesPanel'
import ThemeToggle from '@/components/shared/ThemeToggle'
import UnionMark from '@/components/layout/UnionMark'
import bajajLockupBlue from '@/assets/bajaj-lockup-blue.png'
import bajajLockupWhite from '@/assets/bajaj-footer-lockup.png'
import { productBrand } from '@/config/brand.config'
import { headerNav, pageSections } from '@/config/navigation.config'
import { CONTAINER, SITE_SEARCH_ID } from '@/lib/layout'
import { scrollToSection } from '@/utils/scrollToSection'

// How often the header mark replays itself.
const MARK_REPLAY_MS = 5000

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

const ICON_BUTTON =
  'relative flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-chip focus-ring'

export default function Header({ revealMark = false }) {
  const user = useUser()
  const { enabled: authEnabled, signOut } = useAuth()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [activeSection] = useScrollSpy(pageSections)

  const [isNoticesOpen, setNoticesOpen] = useState(false)
  const [isProfileOpen, setProfileOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [noticesSeen, setNoticesSeen] = useState(false)

  const notices = useNotices().data
  const noticeCount = notices.length

  const noticesRef = useRef(null)
  const profileRef = useRef(null)
  const menuRef = useRef(null)

  // Remounting the mark is what restarts its animation — a CSS animation will
  // not re-run on an element that never left. The header mounts underneath the
  // splash, so the first run happens unseen; `revealMark` fires the one that
  // matters, as the splash clears, and hovering the lockup asks for it again.
  const [markRun, setMarkRun] = useState(0)
  const replayMark = useCallback(() => setMarkRun((run) => run + 1), [])

  useEffect(() => {
    if (revealMark) replayMark()
  }, [revealMark, replayMark])

  // ...and then on a loop, unless reduced motion is asked for: this is the one
  // animation on the page that repeats forever on its own.
  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const id = setInterval(replayMark, MARK_REPLAY_MS)
    return () => clearInterval(id)
  }, [replayMark, prefersReducedMotion])

  const closeAll = useCallback(() => {
    setNoticesOpen(false)
    setProfileOpen(false)
    setMenuOpen(false)
  }, [])

  const anyOpen = isNoticesOpen || isProfileOpen || isMenuOpen

  useEffect(() => {
    if (!anyOpen) return undefined
    function onMouseDown(e) {
      if (noticesRef.current && !noticesRef.current.contains(e.target)) setNoticesOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') closeAll()
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [anyOpen, closeAll])

  function goTo(sectionId) {
    closeAll()
    scrollToSection(sectionId)
  }

  function handleSearchClick() {
    closeAll()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById(SITE_SEARCH_ID)?.focus({ preventScroll: true })
  }

  const isActive = (item) => item.covers.includes(activeSection)

  return (
    <header className="sticky top-10 z-40 border-b border-line/[0.06] bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
      <div className={`${CONTAINER} flex h-14 items-center gap-4 lg:gap-8`}>
        {/* Lockup: the parent brand, then the product's own mark. */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            goTo('top')
          }}
          onMouseEnter={replayMark}
          className="flex flex-shrink-0 select-none items-center gap-2 rounded-lg focus-ring md:gap-3"
          aria-label={`${productBrand.name} — Bajaj Auto intranet home`}
        >
          {/* The Bajaj Auto lockup: brand blue on the light header, the
              original white artwork on the dark one. The blue file is the white
              one recoloured, so the two are the same shape exactly. */}
          <img
            src={bajajLockupBlue}
            alt=""
            className="h-8 w-auto object-contain dark:hidden sm:h-9 md:h-10"
          />
          <img
            src={bajajLockupWhite}
            alt=""
            className="hidden h-8 w-auto object-contain dark:block sm:h-9 md:h-10"
          />
          <span className="h-7 w-px bg-line/20 md:h-9" aria-hidden="true" />
          {/* The scene the mark assembles from overflows its box on both sides
              for the couple of seconds it runs; the margin keeps the
              motorcycle off the lockup on the way in. */}
          <span className="ml-2 leading-none sm:ml-3 md:ml-5">
            <UnionMark
              key={markRun}
              className="h-6 w-auto text-brand-primary dark:text-white sm:h-7 md:h-7"
            />
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium xl:flex">
          {headerNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.sectionId}`}
              onClick={(e) => {
                e.preventDefault()
                goTo(item.sectionId)
              }}
              aria-current={isActive(item) ? 'location' : undefined}
              className={`relative rounded py-1 transition-colors focus-ring ${
                isActive(item) ? 'text-brand-primary' : 'text-ink hover:text-brand-primary'
              }`}
            >
              {item.label}
              {isActive(item) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand-primary" />
              )}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={handleSearchClick}
            className={`${ICON_BUTTON} hidden sm:flex`}
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <ThemeToggle />

          <div className="relative" ref={noticesRef}>
            <button
              type="button"
              onClick={() => {
                setProfileOpen(false)
                setMenuOpen(false)
                setNoticesOpen((v) => !v)
                setNoticesSeen(true)
              }}
              aria-label={
                noticeCount > 0 && !noticesSeen ? `Notices, ${noticeCount} unread` : 'Notices'
              }
              aria-expanded={isNoticesOpen}
              aria-haspopup="true"
              className={ICON_BUTTON}
            >
              <Bell size={20} strokeWidth={1.8} />
              {noticeCount > 0 && !noticesSeen && (
                <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-orange px-1 text-[10px] font-bold leading-none text-white">
                  {noticeCount > 9 ? '9+' : noticeCount}
                </span>
              )}
            </button>

            {isNoticesOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
                <NoticesPanel />
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setNoticesOpen(false)
                setMenuOpen(false)
                setProfileOpen((v) => !v)
              }}
              aria-label={`Account: ${user.name}`}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              className="flex h-11 items-center gap-1.5 rounded-full px-1.5 transition-colors hover:bg-chip focus-ring"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-[13px] font-bold text-white">
                {initials(user.name)}
              </span>
              <ChevronDown
                size={14}
                className={`hidden text-muted transition-transform duration-200 sm:block ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl bg-surface shadow-lifted ring-1 ring-line/[0.06]">
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white">
                    {initials(user.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                </div>

                {/* Both come from optional claims or, later, SuccessFactors.
                    Until one of those is wired the block would be an empty strip. */}
                {(user.designation || user.department) && (
                  <div className="border-t border-line/[0.06] px-4 py-2">
                    {user.designation && <p className="text-xs text-muted">{user.designation}</p>}
                    {user.department && <p className="text-xs text-muted">{user.department}</p>}
                  </div>
                )}

                <div className="border-t border-line/[0.06] p-2">
                  {/* Stays disabled with VITE_AUTH_MODE=off: there is no session
                      to end, and a button that appears to work but does nothing
                      is worse on a shared terminal than one that plainly cannot. */}
                  <button
                    type="button"
                    disabled={!authEnabled}
                    onClick={authEnabled ? signOut : undefined}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                      authEnabled
                        ? 'text-ink hover:bg-chip'
                        : 'cursor-not-allowed text-muted opacity-50'
                    }`}
                    aria-label={authEnabled ? 'Sign out' : 'Sign out (sign-in is not enabled)'}
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Below xl the nav folds into this sheet rather than disappearing —
              phones need the same way round the page as desktops do. */}
          <div className="relative xl:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => {
                setNoticesOpen(false)
                setProfileOpen(false)
                setMenuOpen((v) => !v)
              }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              className={ICON_BUTTON}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isMenuOpen && (
              <nav
                aria-label="Main"
                className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl bg-surface p-2 shadow-lifted ring-1 ring-line/[0.06]"
              >
                {headerNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.sectionId}`}
                    onClick={(e) => {
                      e.preventDefault()
                      goTo(item.sectionId)
                    }}
                    aria-current={isActive(item) ? 'location' : undefined}
                    className={`flex items-center rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors focus-ring ${
                      isActive(item)
                        ? 'bg-brand-primary/10 text-brand-primary'
                        : 'text-ink hover:bg-chip'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
