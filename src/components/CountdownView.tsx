import type { Feriado } from '../types/feriado'
import { capitalize, formatLongDate, parseFeriadoDate } from '../utils/dates'
import { getCountdownSnapshot } from '../utils/countdown'
import { TIPO_LABELS } from '../utils/feriados'

interface CountdownViewProps {
  feriados: Feriado[]
}

export function CountdownView({ feriados }: CountdownViewProps) {
  const snapshot = getCountdownSnapshot(feriados)

  if (!snapshot) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
        <p className="text-lg text-app-muted">No hay más feriados cargados para este período.</p>
      </div>
    )
  }

  const feriadoDate = parseFeriadoDate(snapshot.feriadoFecha)
  const displayFeriado = feriados.find((f) => f.fecha === snapshot.feriadoFecha)

  return (
    <div className="flex flex-1 flex-col px-6 pb-4 pt-16">
      <header className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-celeste-soft">
          Feriadapp
        </p>
        <h1 className="mt-2 text-lg font-medium text-app-muted">
          {snapshot.isToday ? 'Hoy es feriado' : 'Próximo feriado'}
        </h1>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center">
        <div className="relative flex h-48 w-48 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-celeste/10 blur-2xl" />
          <div className="relative text-center">
            <span className="tabular-nums text-[5.5rem] font-extrabold leading-none tracking-tight text-app">
              {snapshot.days}
            </span>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-app-muted">
              {snapshot.days === 1 ? 'día' : 'días'}
            </p>
          </div>
        </div>

        <div className="mt-10 w-full max-w-sm rounded-3xl border border-app bg-app-elevated/80 p-6 text-center backdrop-blur-sm">
          <p className="text-lg font-semibold leading-snug text-app">{snapshot.feriadoNombre}</p>
          <p className="mt-2 text-sm capitalize text-app-muted">
            {capitalize(formatLongDate(feriadoDate))}
          </p>
          {displayFeriado && (
            <span className="mt-4 inline-flex rounded-full bg-app-overlay px-3 py-1 text-xs font-medium text-celeste-soft">
              {TIPO_LABELS[displayFeriado.tipo]}
            </span>
          )}
        </div>
      </section>

      {!snapshot.isToday && (
        <p className="mt-8 text-center text-xs text-app-muted/80">
          Datos oficiales según calendario nacional argentino
        </p>
      )}
    </div>
  )
}
