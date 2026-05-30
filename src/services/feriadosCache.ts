import type { Feriado } from '../types/feriado'

const CACHE_KEY = 'feriadapp-feriados-cache'

interface FeriadosCache {
  feriados: Feriado[]
  cachedAt: string
}

export function saveFeriadosCache(feriados: Feriado[]): void {
  const payload: FeriadosCache = {
    feriados,
    cachedAt: new Date().toISOString(),
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
}

export function loadFeriadosCache(): FeriadosCache | null {
  const raw = localStorage.getItem(CACHE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as FeriadosCache
  } catch {
    return null
  }
}
