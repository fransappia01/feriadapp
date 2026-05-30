import { Capacitor, registerPlugin } from '@capacitor/core'
import type { CountdownSnapshot } from '../utils/countdown'

const STORAGE_KEY = 'feriadapp-widget'

interface WidgetBridgePlugin {
  updateData(options: {
    days: string
    label: string
    title: string
    name: string
    isToday: string
  }): Promise<void>
  refresh(): Promise<void>
}

const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge')

export async function syncWidgetData(snapshot: CountdownSnapshot): Promise<void> {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))

  if (!Capacitor.isNativePlatform()) return

  const daysLabel = snapshot.days === 1 ? 'día' : 'días'
  const title = snapshot.isToday ? 'Hoy es feriado' : 'Próximo feriado'

  try {
    await WidgetBridge.updateData({
      days: String(snapshot.days),
      label: daysLabel,
      title,
      name: snapshot.feriadoNombre,
      isToday: snapshot.isToday ? '1' : '0',
    })
  } catch {
    // Builds sin plugin nativo configurado.
  }
}

export function getStoredWidgetData(): CountdownSnapshot | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as CountdownSnapshot
  } catch {
    return null
  }
}
