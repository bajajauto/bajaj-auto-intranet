import { SidebarProvider } from '@/context/SidebarContext'
import { UserProvider } from '@/context/UserContext'
import TopBanner from '@/components/layout/TopBanner'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import MainContent from '@/components/layout/MainContent'

export default function App() {
  return (
    <UserProvider>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen">
          <TopBanner />
          <Header />
          <div className="flex flex-1 pt-[calc(36px+64px)]">
            <Sidebar />
            <MainContent />
          </div>
        </div>
      </SidebarProvider>
    </UserProvider>
  )
}
