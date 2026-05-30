interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = 'Cargando feriados...' }: LoadingStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 pt-24">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-celeste/30 border-t-celeste" />
      <p className="text-sm text-app-muted">{message}</p>
    </div>
  )
}
