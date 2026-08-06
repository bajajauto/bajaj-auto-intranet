import { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import { UserProvider } from '@/context/UserContext'
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

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <ThemeProvider>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <UserProvider>
        <SidebarProvider>
          <AppShell splashDone={splashDone} />
        </SidebarProvider>
      </UserProvider>
    </ThemeProvider>
  )
}
