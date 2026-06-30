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
      className={`theme-toggle focus-ring ${isDark ? 'is-dark' : 'is-light'}`}
    >
      <span className="theme-toggle-sky" aria-hidden="true">
        <span className="theme-toggle-stars" />
        <span className="theme-toggle-cloud theme-toggle-cloud-back" />
        <span className="theme-toggle-cloud theme-toggle-cloud-front" />
        <span className="theme-toggle-orb">
          <span className="theme-toggle-crater crater-one" />
          <span className="theme-toggle-crater crater-two" />
          <span className="theme-toggle-crater crater-three" />
        </span>
      </span>
    </button>
  )
}
