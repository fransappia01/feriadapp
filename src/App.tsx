import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { CalendarView } from './components/CalendarView'
import { CountdownView } from './components/CountdownView'
import { ErrorState } from './components/ErrorState'
import { InstallPrompt } from './components/InstallPrompt'
import { LoadingState } from './components/LoadingState'
import { NotificationToggle } from './components/NotificationToggle'
import { ThemeToggle } from './components/ThemeToggle'
import { useFeriados } from './hooks/useFeriados'
import { useWidgetSync } from './hooks/useWidgetSync'
import type { TabId } from './types/feriado'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('inicio')
  const { feriados, loading, error, isOfflineData, refetch } = useFeriados()
  const ready = !loading && !error

  useWidgetSync(feriados, ready)

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:max-w-lg md:max-w-xl">
      <NotificationToggle feriados={feriados} ready={ready} />
      <ThemeToggle />

      {loading && <LoadingState />}
      {error && !loading && <ErrorState message={error} onRetry={refetch} />}
      {ready && (
        <>
          {activeTab === 'inicio' && (
            <>
              {isOfflineData && (
                <div className="mx-4 mb-2 mt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] rounded-2xl border border-app bg-app-surface/70 px-4 py-2.5 text-xs text-app-muted sm:mx-6">
                  Mostrando feriados guardados. Conectate para actualizar.
                </div>
              )}
              <CountdownView feriados={feriados} />
            </>
          )}
          {activeTab === 'calendario' && (
            <>
              {isOfflineData && (
                <div className="mx-4 mb-2 mt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] rounded-2xl border border-app bg-app-surface/70 px-4 py-2.5 text-xs text-app-muted sm:mx-6">
                  Datos sin conexión — calendario desde caché local.
                </div>
              )}
              <CalendarView feriados={feriados} />
            </>
          )}
        </>
      )}

      <InstallPrompt />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
