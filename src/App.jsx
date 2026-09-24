import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { AUTH_CALLBACK_PATH, SIGNED_OUT_PATH } from '@/lib/env'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import { UserProvider } from '@/context/UserContext'
import RequireAuth from '@/components/auth/RequireAuth'
import AuthCallback from '@/components/auth/AuthCallback'
import SignedOut from '@/components/auth/SignedOut'
import TopBanner from '@/components/layout/TopBanner'
import Header from '@/components/layout/Header'
import MainContent from '@/components/layout/MainContent'
import Footer from '@/components/layout/Footer'
import FloatingSupportButton from '@/components/shared/FloatingSupportButton'
import SplashScreen from '@/components/layout/SplashScreen'

function FooterObserver({ footerRef }) {
  const { setFooterVisible } = useSidebar()

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [footerRef, setFooterVisible])

  return null
}

function AppShell({ splashDone }) {
  const footerRef = useRef(null)

  return (
    <div className="flex flex-col min-h-screen">
      <FooterObserver footerRef={footerRef} />
      <TopBanner />
      {/* The shell mounts under the splash, so the header's mark would form
          where nobody could see it. It replays as the splash clears instead. */}
      <Header revealMark={splashDone} />
      <div className="flex flex-1 pt-[96px] md:pt-[116px]">
        <MainContent />
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
      <FloatingSupportButton />
    </div>
  )
}

/*
 * The intranet itself: one scrolling page, navigated by the sidebar's scroll
 * spy rather than by URL. Routing exists at this stage only to give sign-in
 * somewhere to land — deep links into articles and letters are their own piece
 * of work, and turning these sections into routes here would be that work done
 * badly and by accident.
 *
 * The splash lives inside this route so it plays once, on entry to the app,
 * and not over the sign-in screens.
 */
function HomePage() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <UserProvider>
        <SidebarProvider>
          <AppShell splashDone={splashDone} />
        </SidebarProvider>
      </UserProvider>
    </>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path={AUTH_CALLBACK_PATH} element={<AuthCallback />} />
            <Route path={SIGNED_OUT_PATH} element={<SignedOut />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            {/* Nothing is deep-linkable yet, so an unknown path is a typo, not
                a 404 worth building a page for. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
