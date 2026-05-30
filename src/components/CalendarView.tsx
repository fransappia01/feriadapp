import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import type { Feriado } from '../types/feriado'
import {
  capitalize,
  formatMonthYear,
  getTodayArgentina,
  isToday,
  parseFeriadoDate,
} from '../utils/dates'
import {
  getFeriadoMap,
  getUpcomingFeriados,
  TIPO_COLORS,
  TIPO_LABELS,
} from '../utils/feriados'

interface CalendarViewProps {
  feriados: Feriado[]
}

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export function CalendarView({ feriados }: CalendarViewProps) {
  const today = getTodayArgentina()
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const feriadoMap = useMemo(() => getFeriadoMap(feriados), [feriados])
  const upcoming = useMemo(() => getUpcomingFeriados(feriados).slice(0, 6), [feriados])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = new Date(monthStart)
  calendarStart.setDate(calendarStart.getDate() - getDay(monthStart))

  const calendarEnd = new Date(monthEnd)
  calendarEnd.setDate(calendarEnd.getDate() + (6 - getDay(monthEnd)))

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const selectedFeriado = selectedDate
    ? feriadoMap.get(format(selectedDate, 'yyyy-MM-dd'))
    : undefined

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 pb-8 pt-16">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-celeste-soft">
          Calendario
        </p>
        <h1 className="mt-1 text-2xl font-bold text-app">Feriados {today.getFullYear()}</h1>
      </header>

      <section className="rounded-3xl border border-app bg-app-elevated/70 p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentMonth((month) => subMonths(month, 1))}
            className="rounded-full p-2 text-app-muted transition hover:bg-app-hover hover:text-app"
            aria-label="Mes anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <h2 className="text-base font-semibold capitalize text-app">
            {capitalize(formatMonthYear(currentMonth))}
          </h2>

          <button
            type="button"
            onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
            className="rounded-full p-2 text-app-muted transition hover:bg-app-hover hover:text-app"
            aria-label="Mes siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-1 text-center text-[11px] font-medium text-app-muted">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const key = format(day, 'yyyy-MM-dd')
            const feriado = feriadoMap.get(key)
            const inCurrentMonth = isSameMonth(day, currentMonth)
            const selected = selectedDate ? format(selectedDate, 'yyyy-MM-dd') === key : false
            const todayMatch = isToday(day)

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition ${
                  inCurrentMonth ? 'text-app' : 'text-app-faint'
                } ${selected ? 'bg-celeste/20 ring-1 ring-celeste/50' : 'hover:bg-app-hover'} ${
                  todayMatch ? 'font-bold' : 'font-medium'
                }`}
              >
                {todayMatch && (
                  <span className="absolute inset-x-2 top-1 h-0.5 rounded-full bg-celeste" />
                )}
                {day.getDate()}
                {feriado && (
                  <span
                    className={`mt-0.5 h-1.5 w-1.5 rounded-full ${TIPO_COLORS[feriado.tipo]}`}
                  />
                )}
              </button>
            )
          })}
        </div>

        {selectedFeriado && selectedDate && (
          <div className="mt-4 rounded-2xl border border-app bg-panel p-4">
            <p className="text-sm font-semibold text-app">{selectedFeriado.nombre}</p>
            <p className="mt-1 text-xs capitalize text-app-muted">
              {capitalize(format(selectedDate, "EEEE d 'de' MMMM", { locale: es }))}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-app-overlay px-2.5 py-0.5 text-[11px] text-celeste-soft">
              {TIPO_LABELS[selectedFeriado.tipo]}
            </span>
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-app-muted">Próximos feriados</h3>
        <ul className="space-y-2">
          {upcoming.map((feriado) => (
            <li
              key={feriado.fecha}
              className="flex items-center gap-3 rounded-2xl border border-app bg-app-surface/80 px-4 py-3"
            >
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${TIPO_COLORS[feriado.tipo]}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-app">{feriado.nombre}</p>
                <p className="text-xs capitalize text-app-muted">
                  {capitalize(format(parseFeriadoDate(feriado.fecha), 'EEE d MMM', { locale: es }))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-3 rounded-2xl border border-app bg-app-surface/50 px-4 py-3">
        {(Object.keys(TIPO_LABELS) as Array<keyof typeof TIPO_LABELS>).map((tipo) => (
          <div key={tipo} className="flex items-center gap-2 text-xs text-app-muted">
            <span className={`h-2 w-2 rounded-full ${TIPO_COLORS[tipo]}`} />
            {TIPO_LABELS[tipo]}
          </div>
        ))}
      </section>
    </div>
  )
}
