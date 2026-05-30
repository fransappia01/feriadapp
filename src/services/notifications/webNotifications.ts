import type { ScheduledNotification } from './schedule'

const STORAGE_KEY = 'feriadapp-notifications-enabled'

export function areWebNotificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator
}

export function getWebNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!areWebNotificationsSupported()) return 'unsupported'
  return Notification.permission
}

export async function requestWebNotificationPermission(): Promise<boolean> {
  if (!areWebNotificationsSupported()) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false

  const result = await Notification.requestPermission()
  return result === 'granted'
}

export async function scheduleWebNotifications(
  notifications: ScheduledNotification[],
): Promise<void> {
  if (!areWebNotificationsSupported() || Notification.permission !== 'granted') return

  const registration = await navigator.serviceWorker.ready
  registration.active?.postMessage({
    type: 'SCHEDULE_FERIADAPP',
    notifications: notifications.map((notification) => ({
      id: notification.id,
      at: notification.at,
      title: notification.title,
      body: notification.body,
    })),
  })
}

export async function cancelWebNotifications(): Promise<void> {
  if (!areWebNotificationsSupported()) return

  const registration = await navigator.serviceWorker.ready
  registration.active?.postMessage({ type: 'CANCEL_FERIADAPP' })
}

export function isNotificationsEnabledPreference(): boolean {
  return localStorage.getItem(STORAGE_KEY) === '1'
}

export function setNotificationsEnabledPreference(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0')
}

export async function syncNotificationsEnabledPreference(enabled: boolean): Promise<void> {
  setNotificationsEnabledPreference(enabled)

  if (!enabled) {
    await cancelWebNotifications()
  }
}
