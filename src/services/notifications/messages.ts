export const NOTIFICATION_MILESTONES = [15, 7, 1, 0] as const

export type NotificationMilestone = (typeof NOTIFICATION_MILESTONES)[number]

export interface MessageContext {
  days: number
  feriadoNombre: string
  shortName: string
}

type MessageBuilder = (context: MessageContext) => string

const TITLES = [
  'Feriadapp te avisa',
  'Ojo con el feriado',
  'Che, mirá esto',
  'Alerta de descanso',
  'Planificador de ocio',
] as const

const BODY_TEMPLATES: Record<NotificationMilestone, MessageBuilder[]> = {
  15: [
    (c) => `${c.days} días para el próximo feriado. ¿Vas a salir de joda?`,
    (c) => `¿Ya programaste algún viajecito? Faltan ${c.days} días nomás.`,
    (c) => `${c.days} días para ${c.shortName}. Este feriado te mira con cara de "¿y?".`,
  ],
  7: [
    (c) => `Una semana exacta para ${c.shortName}. ¿Ya avisaste que el lunes no existís?`,
    (c) => `${c.days} días. Se viene finde largo o mini escapada, vos mandás.`,
    () => `Faltan siete días. Momento perfecto para cancelar planes y hacer otros mejores.`,
  ],
  1: [
    (c) => `Mañana es feriado: ${c.shortName}. Última chance de fingir productividad.`,
    () => `Falta 1 día. ¿Todo listo o vas a improvisar como siempre?`,
    (c) => `Mañana no laburás. ${c.shortName}. Hacé lo tuyo.`,
  ],
  0: [
    (c) => `HOY ES FERIADO. ${c.shortName}. Dormí, salí, desconectá.`,
    () => `Se vino para descansar y dormir 48 horas seguidas. Feliz feriado.`,
    (c) => `Hoy no se trabaja. ${c.shortName}. Disfrutalo sin culpa.`,
  ],
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function shortenFeriadoName(name: string, maxLength = 42): string {
  if (name.length <= maxLength) return name
  return `${name.slice(0, maxLength - 1).trim()}…`
}

export function pickNotificationCopy(
  milestone: NotificationMilestone,
  context: MessageContext,
  seed: string,
): { title: string; body: string } {
  const templates = BODY_TEMPLATES[milestone]
  const index = hashString(`${seed}:${milestone}`) % templates.length
  const titleIndex = hashString(`${seed}:title:${milestone}`) % TITLES.length

  return {
    title: TITLES[titleIndex],
    body: templates[index](context),
  }
}
