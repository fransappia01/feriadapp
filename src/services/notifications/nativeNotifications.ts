import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import type { ScheduledNotification } from './schedule'

const CHANNEL_ID = 'feriadapp-reminders'

export async function ensureNativeNotificationChannel(): Promise<void> {
  if (Capacitor.getPlatform() !== 'android') return

  await LocalNotifications.createChannel({
    id: CHANNEL_ID,
    name: 'Recordatorios de feriados',
    description: 'Avisos creativos antes de cada feriado',
    importance: 4,
    visibility: 1,
  })
}

export async function requestNativeNotificationPermission(): Promise<boolean> {
  const result = await LocalNotifications.requestPermissions()
  return result.display === 'granted'
}

export async function getNativeNotificationPermission(): Promise<boolean> {
  const result = await LocalNotifications.checkPermissions()
  return result.display === 'granted'
}

export async function scheduleNativeNotifications(
  notifications: ScheduledNotification[],
): Promise<void> {
  await ensureNativeNotificationChannel()

  const pending = await LocalNotifications.getPending()
  if (pending.notifications.length > 0) {
    await LocalNotifications.cancel({
      notifications: pending.notifications.map((notification) => ({ id: notification.id })),
    })
  }

  if (notifications.length === 0) return

  await LocalNotifications.schedule({
    notifications: notifications.map((notification) => ({
      id: notification.numericId,
      title: notification.title,
      body: notification.body,
      schedule: { at: new Date(notification.at) },
      sound: undefined,
      iconColor: '#6CB4EE',
      channelId: CHANNEL_ID,
      extra: {
        feriadoFecha: notification.feriadoFecha,
        milestone: notification.milestone,
      },
    })),
  })
}

export async function cancelNativeNotifications(): Promise<void> {
  const pending = await LocalNotifications.getPending()
  if (pending.notifications.length === 0) return

  await LocalNotifications.cancel({
    notifications: pending.notifications.map((notification) => ({ id: notification.id })),
  })
}

export function isNativeNotificationsAvailable(): boolean {
  return Capacitor.isNativePlatform()
}
