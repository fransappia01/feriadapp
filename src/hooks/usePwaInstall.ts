import { Capacitor } from '@capacitor/core'
import { useCallback, useEffect, useState } from 'react'
import {
  dismissInstallPrompt,
  isIosDevice,
  isStandalonePwa,
  wasInstallPromptDismissed,
} from '../utils/pwa'

interface UsePwaInstallResult {
  canInstall: boolean
  isInstalled: boolean
  isIos: boolean
  showPrompt: boolean
  install: () => Promise<'accepted' | 'dismissed' | 'unavailable'>
  dismiss: () => void
}

export function usePwaInstall(): UsePwaInstallResult {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(isStandalonePwa)
  const [dismissed, setDismissed] = useState(wasInstallPromptDismissed)
  const isNative = Capacitor.isNativePlatform()
  const isIos = isIosDevice()

  useEffect(() => {
    if (isNative) return

    const onBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setDismissed(false)
    }

    const onAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [isNative])

  const install = useCallback(async () => {
    if (!deferredPrompt) return 'unavailable'

    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    setDeferredPrompt(null)

    if (choice.outcome === 'accepted') {
      setIsInstalled(true)
    }

    return choice.outcome
  }, [deferredPrompt])

  const dismiss = useCallback(() => {
    dismissInstallPrompt()
    setDismissed(true)
  }, [])

  const canInstall = !isNative && !isInstalled && (Boolean(deferredPrompt) || isIos)
  const showPrompt = canInstall && !dismissed

  return {
    canInstall,
    isInstalled,
    isIos,
    showPrompt,
    install,
    dismiss,
  }
}
