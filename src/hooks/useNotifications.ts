import { useCallback, useEffect, useState } from 'react'
import type { Feriado } from '../types/feriado'
import {
  disableNotifications,
  enableNotifications,
  getNotificationPermissionStatus,
  isNotificationPlatformSupported,
  isNotificationsEnabledPreference,
  syncHolidayNotifications,
} from '../services/notifications'

interface UseNotificationsResult {
  supported: boolean
  enabled: boolean
  permission: 'granted' | 'denied' | 'prompt' | 'unsupported'
  loading: boolean
  enable: () => Promise<boolean>
  disable: () => Promise<void>
  toggle: () => Promise<void>
}

export function useNotifications(feriados: Feriado[], ready: boolean): UseNotificationsResult {
  const [supported, setSupported] = useState(false)
  const [enabled, setEnabled] = useState(isNotificationsEnabledPreference)
  const [permission, setPermission] = useState<UseNotificationsResult['permission']>('prompt')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      const platformSupported = await isNotificationPlatformSupported()
      const permissionStatus = await getNotificationPermissionStatus()

      setSupported(platformSupported)
      setPermission(permissionStatus)
      setEnabled(isNotificationsEnabledPreference() && permissionStatus === 'granted')
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!ready || !enabled || permission !== 'granted') return
    void syncHolidayNotifications(feriados)
  }, [enabled, feriados, permission, ready])

  const enable = useCallback(async () => {
    const granted = await enableNotifications()
    const permissionStatus = await getNotificationPermissionStatus()
    setPermission(permissionStatus)
    setEnabled(granted)

    if (granted && ready) {
      await syncHolidayNotifications(feriados)
    }

    return granted
  }, [feriados, ready])

  const disable = useCallback(async () => {
    await disableNotifications()
    setEnabled(false)
  }, [])

  const toggle = useCallback(async () => {
    if (enabled) {
      await disable()
      return
    }

    await enable()
  }, [disable, enable, enabled])

  return {
    supported,
    enabled,
    permission,
    loading,
    enable,
    disable,
    toggle,
  }
}
