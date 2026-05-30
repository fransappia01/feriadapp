import { subDays } from 'date-fns'
import type { Feriado } from '../../types/feriado'
import { getCountdownSnapshot } from '../../utils/countdown'
import { daysUntil, getTodayArgentina, parseFeriadoDate } from '../../utils/dates'
import {
  NOTIFICATION_MILESTONES,
  pickNotificationCopy,
  shortenFeriadoName,
  type NotificationMilestone,
} from './messages'

const TIMEZONE = 'America/Argentina/Buenos_Aires'

export interface ScheduledNotification {
  id: string
  numericId: number
  at: number
  title: string
  body: string
  milestone: NotificationMilestone
  feriadoFecha: string
}

export function buildNotificationNumericId(feriadoFecha: string, milestone: number): number {
  const dateNum = Number(feriadoFecha.replace(/-/g, ''))
  return ((dateNum % 100000) * 100 + milestone) % 2147483647
}

function atNineAmArgentina(date: Date): Date {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const year = Number(parts.find((part) => part.type === 'year')?.value)
  const month = Number(parts.find((part) => part.type === 'month')?.value)
  const day = Number(parts.find((part) => part.type === 'day')?.value)

  // Argentina (UTC-3): 09:00 ART = 12:00 UTC
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
}

export function buildNotificationSchedule(feriados: Feriado[]): ScheduledNotification[] {
  const snapshot = getCountdownSnapshot(feriados)
  if (!snapshot) return []

  const feriadoDate = parseFeriadoDate(snapshot.feriadoFecha)
  const today = getTodayArgentina()
  const now = Date.now()
  const shortName = shortenFeriadoName(snapshot.feriadoNombre)
  const schedule: ScheduledNotification[] = []

  for (const milestone of NOTIFICATION_MILESTONES) {
    const daysLeft = daysUntil(feriadoDate, today)
    if (daysLeft > milestone) continue

    const notifyDay = milestone === 0 ? feriadoDate : subDays(feriadoDate, milestone)
    const at = atNineAmArgentina(notifyDay)

    if (at.getTime() <= now) continue

    const { title, body } = pickNotificationCopy(
      milestone,
      {
        days: milestone,
        feriadoNombre: snapshot.feriadoNombre,
        shortName,
      },
      `${snapshot.feriadoFecha}:${milestone}`,
    )

    schedule.push({
      id: `${snapshot.feriadoFecha}-${milestone}`,
      numericId: buildNotificationNumericId(snapshot.feriadoFecha, milestone),
      at: at.getTime(),
      title,
      body,
      milestone,
      feriadoFecha: snapshot.feriadoFecha,
    })
  }

  return schedule.sort((a, b) => a.at - b.at)
}

export function getNextScheduledNotification(
  schedule: ScheduledNotification[],
): ScheduledNotification | null {
  const now = Date.now()
  return schedule.find((item) => item.at > now) ?? null
}
