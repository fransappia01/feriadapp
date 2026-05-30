import { useEffect } from 'react'
import { syncWidgetData } from '../services/widgetSync'
import type { Feriado } from '../types/feriado'
import { getCountdownSnapshot } from '../utils/countdown'

export function useWidgetSync(feriados: Feriado[], enabled: boolean) {
  useEffect(() => {
    if (!enabled || feriados.length === 0) return

    const snapshot = getCountdownSnapshot(feriados)
    if (!snapshot) return

    void syncWidgetData(snapshot)
  }, [enabled, feriados])
}
