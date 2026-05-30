interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 pt-24 text-center">
      <div className="rounded-2xl bg-app-elevated px-5 py-4 text-sm text-app-muted">{message}</div>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-celeste px-5 py-2.5 text-sm font-semibold text-btn transition hover:opacity-90"
      >
        Reintentar
      </button>
    </div>
  )
}
