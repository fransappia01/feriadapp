import type { Feriado } from '../types/feriado'
import { daysUntil, parseFeriadoDate } from './dates'
import { getNextFeriado, getTodayFeriado } from './feriados'

export interface CountdownSnapshot {
  days: number
  isToday: boolean
  feriadoNombre: string
  feriadoFecha: string
  updatedAt: string
}

export function getCountdownSnapshot(feriados: Feriado[]): CountdownSnapshot | null {
  const todayFeriado = getTodayFeriado(feriados)
  const nextFeriado = getNextFeriado(feriados)
  const displayFeriado = todayFeriado ?? nextFeriado

  if (!displayFeriado) return null

  const feriadoDate = parseFeriadoDate(displayFeriado.fecha)
  const isToday = Boolean(todayFeriado)
  const days = isToday ? 0 : daysUntil(feriadoDate)

  return {
    days,
    isToday,
    feriadoNombre: displayFeriado.nombre,
    feriadoFecha: displayFeriado.fecha,
    updatedAt: new Date().toISOString(),
  }
}
