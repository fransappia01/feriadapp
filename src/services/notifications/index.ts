import { Capacitor } from '@capacitor/core'
import type { Feriado } from '../../types/feriado'
import {
  cancelNativeNotifications,
  getNativeNotificationPermission,
  isNativeNotificationsAvailable,
  requestNativeNotificationPermission,
  scheduleNativeNotifications,
} from './nativeNotifications'
import { buildNotificationSchedule } from './schedule'
import {
  areWebNotificationsSupported,
  cancelWebNotifications,
  getWebNotificationPermission,
  isNotificationsEnabledPreference,
  requestWebNotificationPermission,
  scheduleWebNotifications,
  setNotificationsEnabledPreference,
} from './webNotifications'

export async function isNotificationPlatformSupported(): Promise<boolean> {
  if (isNativeNotificationsAvailable()) return true
  return areWebNotificationsSupported()
}

export async function getNotificationPermissionStatus(): Promise<
  'granted' | 'denied' | 'prompt' | 'unsupported'
> {
  if (isNativeNotificationsAvailable()) {
    const granted = await getNativeNotificationPermission()
    return granted ? 'granted' : 'prompt'
  }

  const permission = getWebNotificationPermission()
  if (permission === 'unsupported') return 'unsupported'
  if (permission === 'default') return 'prompt'
  return permission
}

export async function enableNotifications(): Promise<boolean> {
  const granted = isNativeNotificationsAvailable()
    ? await requestNativeNotificationPermission()
    : await requestWebNotificationPermission()

  if (!granted) return false

  setNotificationsEnabledPreference(true)
  return true
}

export async function disableNotifications(): Promise<void> {
  setNotificationsEnabledPreference(false)

  if (isNativeNotificationsAvailable()) {
    await cancelNativeNotifications()
  } else {
    await cancelWebNotifications()
  }
}

export async function syncHolidayNotifications(feriados: Feriado[]): Promise<void> {
  if (!isNotificationsEnabledPreference()) return

  const permission = await getNotificationPermissionStatus()
  if (permission !== 'granted') return

  const schedule = buildNotificationSchedule(feriados)

  if (Capacitor.isNativePlatform()) {
    await scheduleNativeNotifications(schedule)
  } else {
    await scheduleWebNotifications(schedule)
  }
}

export { isNotificationsEnabledPreference }
