import type { Feriado } from '../types/feriado'
import { capitalize, formatLongDate, parseFeriadoDate } from '../utils/dates'
import { getCountdownSnapshot } from '../utils/countdown'
import { TIPO_LABELS } from '../utils/feriados'
import { Logo } from './Logo'

interface CountdownViewProps {
  feriados: Feriado[]
}

export function CountdownView({ feriados }: CountdownViewProps) {
  const snapshot = getCountdownSnapshot(feriados)

  if (!snapshot) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-20 text-center sm:px-6">
        <Logo size="md" className="mb-8" />
        <p className="text-base text-app-muted sm:text-lg">
          No hay más feriados cargados para este período.
        </p>
      </div>
    )
  }

  const feriadoDate = parseFeriadoDate(snapshot.feriadoFecha)
  const displayFeriado = feriados.find((f) => f.fecha === snapshot.feriadoFecha)

  return (
    <div className="flex flex-1 flex-col px-4 pb-4 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] sm:px-6">
      <header className="mx-auto mb-8 flex w-full max-w-sm flex-col items-center text-center sm:mb-10">
        <Logo size="md" />
        <h1 className="mt-5 text-base font-medium text-app-muted sm:text-lg">
          {snapshot.isToday ? 'Hoy es feriado' : 'Próximo feriado'}
        </h1>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center">
        <div className="relative flex aspect-square w-[min(72vw,16rem)] max-w-xs items-center justify-center sm:w-64">
          <div className="absolute inset-[8%] rounded-full bg-celeste/10 blur-3xl" />
          <div className="relative text-center">
            <span className="tabular-nums text-[clamp(3.75rem,22vw,5.75rem)] font-extrabold leading-none tracking-tight text-app">
              {snapshot.days}
            </span>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-app-muted sm:text-sm">
              {snapshot.days === 1 ? 'día' : 'días'}
            </p>
          </div>
        </div>

        <div className="mt-8 w-full max-w-sm rounded-3xl border border-app bg-app-elevated/80 p-5 text-center backdrop-blur-sm sm:mt-10 sm:p-6">
          <p className="text-base font-semibold leading-snug text-app sm:text-lg">
            {snapshot.feriadoNombre}
          </p>
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
        <p className="mt-6 text-center text-[11px] text-app-muted/70 sm:mt-8 sm:text-xs">
          Datos oficiales según calendario nacional argentino
        </p>
      )}
    </div>
  )
}
