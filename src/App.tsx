import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { CalendarView } from './components/CalendarView'
import { CountdownView } from './components/CountdownView'
import { ErrorState } from './components/ErrorState'
import { InstallPrompt, PwaInstalledBadge } from './components/InstallPrompt'
import { LoadingState } from './components/LoadingState'
import { ThemeToggle } from './components/ThemeToggle'
import { WidgetGuide } from './components/WidgetGuide'
import { useFeriados } from './hooks/useFeriados'
import { useWidgetSync } from './hooks/useWidgetSync'
import type { TabId } from './types/feriado'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('inicio')
  const { feriados, loading, error, isOfflineData, refetch } = useFeriados()
  const ready = !loading && !error

  useWidgetSync(feriados, ready)

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col pb-24">
      <ThemeToggle />

      {loading && <LoadingState />}
      {error && !loading && <ErrorState message={error} onRetry={refetch} />}
      {ready && (
        <>
          {activeTab === 'inicio' && (
            <>
              <InstallPrompt />
              <PwaInstalledBadge />
              {isOfflineData && (
                <div className="mx-6 mb-4 rounded-2xl border border-app bg-app-surface/70 px-4 py-2.5 text-xs text-app-muted">
                  Mostrando feriados guardados. Conectate para actualizar.
                </div>
              )}
              <CountdownView feriados={feriados} />
              <WidgetGuide />
            </>
          )}
          {activeTab === 'calendario' && (
            <>
              {isOfflineData && (
                <div className="mx-4 mb-2 mt-14 rounded-2xl border border-app bg-app-surface/70 px-4 py-2.5 text-xs text-app-muted">
                  Datos sin conexión — calendario desde caché local.
                </div>
              )}
              <CalendarView feriados={feriados} />
            </>
          )}
        </>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
