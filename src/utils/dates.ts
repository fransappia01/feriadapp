import {
  addMonths,
  differenceInCalendarDays,
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { es } from 'date-fns/locale'

const TIMEZONE = 'America/Argentina/Buenos_Aires'

export function getTodayArgentina(): Date {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)

  const year = Number(parts.find((part) => part.type === 'year')?.value)
  const month = Number(parts.find((part) => part.type === 'month')?.value)
  const day = Number(parts.find((part) => part.type === 'day')?.value)

  return startOfDay(new Date(year, month - 1, day))
}

export function parseFeriadoDate(fecha: string): Date {
  return startOfDay(parseISO(fecha))
}

export function formatLongDate(date: Date): string {
  return format(date, "EEEE d 'de' MMMM", { locale: es })
}

export function formatShortDate(date: Date): string {
  return format(date, 'd MMM yyyy', { locale: es })
}

export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy', { locale: es })
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function daysUntil(target: Date, from: Date = getTodayArgentina()): number {
  return differenceInCalendarDays(startOfDay(target), startOfDay(from))
}

export function isToday(date: Date): boolean {
  return isSameDay(date, getTodayArgentina())
}

export { addMonths, startOfMonth, subMonths }
