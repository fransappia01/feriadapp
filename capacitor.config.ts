import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.feriadapp.app',
  appName: 'Feriadapp',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
