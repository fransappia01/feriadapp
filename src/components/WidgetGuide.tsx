import { Capacitor } from '@capacitor/core'
import { isStandalonePwa } from '../utils/pwa'

export function WidgetGuide() {
  const platform = Capacitor.getPlatform()
  const isNative = Capacitor.isNativePlatform()
  const isPwa = isStandalonePwa()

  if (isPwa && !isNative) {
    return (
      <section className="mx-6 mb-4 rounded-3xl border border-app bg-app-elevated/70 p-5 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-puente/15 text-puente">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-app">App instalada</h2>
            <p className="mt-1 text-xs leading-relaxed text-app-muted">
              Ya tenés Feriadapp en tu pantalla de inicio. Abrila como cualquier app para ver el contador y el
              calendario, incluso sin internet si ya cargaste los feriados antes.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-app-muted">
              El widget numérico pequeño en la pantalla de inicio requiere la app nativa de Android o iOS.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const instructions =
    platform === 'ios'
      ? 'Mantené presionada la pantalla de inicio → botón + → buscá Feriadapp → elegí el tamaño del widget.'
      : platform === 'android'
        ? 'Mantené presionada la pantalla de inicio → Widgets → Feriadapp. Verás el contador de días actualizado.'
        : 'Instalá la app nativa para Android o iOS si querés el widget numérico en la pantalla de inicio.'

  return (
    <section className="mx-6 mb-4 rounded-3xl border border-app bg-app-elevated/70 p-5 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-celeste/15 text-celeste">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-app">Widget nativo (opcional)</h2>
          <p className="mt-1 text-xs leading-relaxed text-app-muted">{instructions}</p>

          {!isNative && (
            <p className="mt-2 text-xs leading-relaxed text-app-muted">
              Como PWA tenés el ícono en inicio y la app completa. El widget pequeño con solo el número es extra, vía
              Play Store o App Store.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
