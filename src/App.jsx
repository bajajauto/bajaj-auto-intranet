import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { AUTH_CALLBACK_PATH, SIGNED_OUT_PATH } from '@/lib/env'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { UserProvider } from '@/context/UserContext'
import RequireAuth from '@/components/auth/RequireAuth'
import AuthCallback from '@/components/auth/AuthCallback'
import SignedOut from '@/components/auth/SignedOut'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import MainContent from '@/components/layout/MainContent'
import SosModal from '@/components/emergency/SosModal'
import FloatingSupportButton from '@/components/shared/FloatingSupportButton'
import SplashScreen from '@/components/layout/SplashScreen'

// Fixed top bar and icon rail, the scrolling page beside them, and the two
// things any part of the page can summon: Jarvis and the SOS sheet.
function AppShell() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar />
      <MainContent />
      <FloatingSupportButton />
      <SosModal />
    </div>
  )
}

/*
 * The intranet itself: one scrolling page, navigated by the header's scroll
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
        <AppShell />
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
