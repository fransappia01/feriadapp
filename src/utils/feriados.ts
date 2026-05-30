import type { Feriado, TipoFeriado } from '../types/feriado'
import { daysUntil, getTodayArgentina, parseFeriadoDate } from './dates'

export const TIPO_LABELS: Record<TipoFeriado, string> = {
  inamovible: 'Inamovible',
  trasladable: 'Trasladable',
  puente: 'Turístico / puente',
}

export const TIPO_COLORS: Record<TipoFeriado, string> = {
  inamovible: 'bg-inamovible',
  trasladable: 'bg-trasladable',
  puente: 'bg-puente',
}

export function getFeriadoMap(feriados: Feriado[]): Map<string, Feriado> {
  return new Map(feriados.map((feriado) => [feriado.fecha, feriado]))
}

export function getUpcomingFeriados(feriados: Feriado[]): Feriado[] {
  const today = getTodayArgentina()

  return feriados.filter((feriado) => {
    const date = parseFeriadoDate(feriado.fecha)
    return daysUntil(date, today) >= 0
  })
}

export function getNextFeriado(feriados: Feriado[]): Feriado | null {
  const upcoming = getUpcomingFeriados(feriados)
  return upcoming[0] ?? null
}

export function getTodayFeriado(feriados: Feriado[]): Feriado | null {
  const today = getTodayArgentina()

  return (
    feriados.find((feriado) => parseFeriadoDate(feriado.fecha).getTime() === today.getTime()) ??
    null
  )
}

export function getYearsToFetch(referenceDate: Date = getTodayArgentina()): number[] {
  const year = referenceDate.getFullYear()
  const month = referenceDate.getMonth()

  if (month >= 10) {
    return [year, year + 1]
  }

  return [year]
}
