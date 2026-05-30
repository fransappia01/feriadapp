import type { Feriado } from '../types/feriado'

const API_BASE = 'https://api.argentinadatos.com/v1/feriados'

export async function fetchFeriados(year: number): Promise<Feriado[]> {
  const response = await fetch(`${API_BASE}/${year}`)

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los feriados de ${year}`)
  }

  return response.json()
}

export async function fetchFeriadosForYears(years: number[]): Promise<Feriado[]> {
  const results = await Promise.all(years.map((year) => fetchFeriados(year)))
  const merged = results.flat()

  return merged.sort((a, b) => a.fecha.localeCompare(b.fecha))
}
