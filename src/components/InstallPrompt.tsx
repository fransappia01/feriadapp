import { usePwaInstall } from '../hooks/usePwaInstall'
import { isMobileBrowser } from '../utils/pwa'

export function InstallPrompt() {
  const { showPrompt, isIos, install, dismiss } = usePwaInstall()

  if (!showPrompt) return null

  return (
    <div
      className="fixed inset-x-0 z-40 mx-auto w-full max-w-md px-4 sm:max-w-lg sm:px-6"
      style={{ bottom: 'calc(5.25rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-app bg-app-elevated/95 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3">
        <p className="min-w-0 flex-1 truncate text-xs text-app-muted sm:text-[13px]">
          {isMobileBrowser() ? 'Agregá Feriadapp al inicio' : 'Instalá Feriadapp en tu dispositivo'}
        </p>

        {!isIos ? (
          <button
            type="button"
            onClick={() => void install()}
            className="shrink-0 rounded-full bg-celeste px-3 py-1.5 text-xs font-semibold text-btn transition hover:opacity-90"
          >
            Instalar
          </button>
        ) : (
          <span className="shrink-0 text-[11px] font-medium text-celeste-soft">Safari → Compartir</span>
        )}

        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar"
          className="shrink-0 rounded-full p-1 text-app-muted transition hover:bg-app-hover hover:text-app"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
