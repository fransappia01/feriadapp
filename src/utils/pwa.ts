const DISMISS_KEY = 'feriadapp-pwa-install-dismissed'

export function isStandalonePwa(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

export function isIosDevice(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function isMobileBrowser(): boolean {
  return isIosDevice() || /Android/i.test(navigator.userAgent)
}

export function wasInstallPromptDismissed(): boolean {
  return localStorage.getItem(DISMISS_KEY) === '1'
}

export function dismissInstallPrompt(): void {
  localStorage.setItem(DISMISS_KEY, '1')
}

export function clearInstallPromptDismissal(): void {
  localStorage.removeItem(DISMISS_KEY)
}

export function getIosInstallSteps(): string[] {
  return [
    'Tocá el botón Compartir en Safari',
    'Elegí "Agregar a pantalla de inicio"',
    'Confirmá con Agregar',
  ]
}

export function getAndroidBrowserInstallSteps(): string[] {
  return [
    'Tocá el menú del navegador (⋮)',
    'Elegí "Instalar app" o "Agregar a pantalla de inicio"',
    'Confirmá la instalación',
  ]
}
