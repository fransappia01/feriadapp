import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="group fixed right-4 top-4 z-[60] flex items-center gap-2 rounded-full border border-app bg-app-elevated/90 p-1 pl-3 shadow-lg backdrop-blur-md transition hover:border-celeste/40"
      style={{ marginTop: 'env(safe-area-inset-top)' }}
    >
      <span className="hidden text-[11px] font-medium text-app-muted sm:inline">
        {isDark ? 'Oscuro' : 'Claro'}
      </span>

      <span
        className={`relative flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition ${
          isDark ? 'bg-app-surface' : 'bg-celeste/20'
        }`}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-celeste text-btn shadow-sm transition-transform duration-300 ${
            isDark ? 'translate-x-0' : 'translate-x-6'
          }`}
        >
          {isDark ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
        </span>
      </span>
    </button>
  )
}
