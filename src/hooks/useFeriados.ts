import { useCallback, useEffect, useState } from 'react'
import { fetchFeriadosForYears } from '../services/feriadosApi'
import { loadFeriadosCache, saveFeriadosCache } from '../services/feriadosCache'
import type { Feriado } from '../types/feriado'
import { getYearsToFetch } from '../utils/feriados'

interface UseFeriadosResult {
  feriados: Feriado[]
  loading: boolean
  error: string | null
  isOfflineData: boolean
  refetch: () => void
}

export function useFeriados(): UseFeriadosResult {
  const [feriados, setFeriados] = useState<Feriado[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOfflineData, setIsOfflineData] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    setIsOfflineData(false)

    try {
      const years = getYearsToFetch()
      const data = await fetchFeriadosForYears(years)
      setFeriados(data)
      saveFeriadosCache(data)
    } catch (err) {
      const cached = loadFeriadosCache()

      if (cached?.feriados.length) {
        setFeriados(cached.feriados)
        setIsOfflineData(true)
        setError(null)
      } else {
        setError(err instanceof Error ? err.message : 'Error al cargar los feriados')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { feriados, loading, error, isOfflineData, refetch: load }
}
