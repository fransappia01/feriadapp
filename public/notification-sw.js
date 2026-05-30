const timers = new Map()

function clearAllTimers() {
  timers.forEach((timerId) => clearTimeout(timerId))
  timers.clear()
}

function scheduleNotification(notification) {
  const delay = notification.at - Date.now()
  const maxDelay = 1000 * 60 * 60 * 24 * 30

  if (delay <= 0 || delay > maxDelay) return

  const timerId = setTimeout(() => {
    self.registration.showNotification(notification.title, {
      body: notification.body,
      icon: '/pwa-192.png',
      badge: '/pwa-192.png',
      tag: notification.id,
      data: { url: '/' },
    })
    timers.delete(notification.id)
  }, delay)

  timers.set(notification.id, timerId)
}

self.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return

  if (data.type === 'SCHEDULE_FERIADAPP') {
    clearAllTimers()
    ;(data.notifications || []).forEach(scheduleNotification)
  }

  if (data.type === 'CANCEL_FERIADAPP') {
    clearAllTimers()
  }
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) {
          return client.focus()
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(event.notification.data?.url || '/')
      }

      return undefined
    }),
  )
})
