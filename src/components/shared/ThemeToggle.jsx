import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="rounded-btn p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-ring md:p-2"
    >
      {isDark ? <Sun className="h-[18px] w-[18px] md:h-5 md:w-5" /> : <Moon className="h-[18px] w-[18px] md:h-5 md:w-5" />}
    </button>
  )
}
