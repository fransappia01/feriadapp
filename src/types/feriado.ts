export type TipoFeriado = 'inamovible' | 'trasladable' | 'puente'

export interface Feriado {
  fecha: string
  tipo: TipoFeriado
  nombre: string
}

export type TabId = 'inicio' | 'calendario'
