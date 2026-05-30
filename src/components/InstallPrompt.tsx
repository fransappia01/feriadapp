import { usePwaInstall } from '../hooks/usePwaInstall'
import {
  getAndroidBrowserInstallSteps,
  getIosInstallSteps,
  isMobileBrowser,
} from '../utils/pwa'

export function InstallPrompt() {
  const { showPrompt, isIos, install, dismiss } = usePwaInstall()

  if (!showPrompt) return null

  const steps = isIos ? getIosInstallSteps() : getAndroidBrowserInstallSteps()
  const title = isMobileBrowser()
    ? 'Agregá Feriadapp a tu pantalla de inicio'
    : 'Instalá Feriadapp como app'

  return (
    <section className="mx-6 mb-4 overflow-hidden rounded-3xl border border-celeste/30 bg-gradient-to-br from-celeste/15 to-app-elevated/90 p-5 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-celeste text-btn">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3v12M7 8l5-5 5 5" />
            <path d="M5 21h14" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-app">{title}</h2>
          <p className="mt-1 text-xs leading-relaxed text-app-muted">
            Funciona como app: contador, calendario, modo claro/oscuro y datos guardados sin conexión.
          </p>

          {!isIos && (
            <button
              type="button"
              onClick={() => void install()}
              className="mt-3 rounded-full bg-celeste px-4 py-2 text-xs font-semibold text-btn transition hover:opacity-90"
            >
              Instalar app
            </button>
          )}

          {isIos && (
            <ol className="mt-3 space-y-1.5 text-xs text-app-muted">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-2">
                  <span className="font-semibold text-celeste-soft">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}

          {!isIos && !isMobileBrowser() && (
            <p className="mt-2 text-xs text-app-muted">
              También podés usar el ícono de instalación en la barra de direcciones del navegador.
            </p>
          )}
        </div>

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
    </section>
  )
}

export function PwaInstalledBadge() {
  const { isInstalled } = usePwaInstall()

  if (!isInstalled) return null

  return (
    <div className="mx-6 mb-4 flex items-center gap-2 rounded-2xl border border-app bg-app-surface/70 px-4 py-2.5">
      <span className="h-2 w-2 rounded-full bg-puente" />
      <p className="text-xs text-app-muted">App instalada en tu dispositivo</p>
    </div>
  )
}
