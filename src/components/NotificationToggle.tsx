import { useNotifications } from '../hooks/useNotifications'
import type { Feriado } from '../types/feriado'

interface NotificationToggleProps {
  feriados: Feriado[]
  ready: boolean
}

export function NotificationToggle({ feriados, ready }: NotificationToggleProps) {
  const { supported, enabled, permission, loading, toggle } = useNotifications(feriados, ready)

  if (loading || !supported) return null

  const blocked = permission === 'denied'
  const label = blocked
    ? 'Notificaciones bloqueadas'
    : enabled
      ? 'Notificaciones activadas'
      : 'Activar recordatorios'

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={blocked}
      aria-label={label}
      aria-pressed={enabled}
      title={label}
      className={`fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition ${
        enabled
          ? 'border-celeste/50 bg-celeste/15 text-celeste'
          : 'border-app bg-app-elevated/90 text-app-muted hover:border-celeste/30 hover:text-app'
      } ${blocked ? 'cursor-not-allowed opacity-50' : ''}`}
      style={{ marginTop: 'env(safe-area-inset-top)' }}
    >
      {enabled ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
          <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
          <path d="M3 3l18 18" />
        </svg>
      )}
    </button>
  )
}
