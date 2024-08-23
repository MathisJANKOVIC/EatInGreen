import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: { mode: string }): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [react()],
    server: {
      watch: {
        usePolling: true
      },
      port: Number(env.VITE_SERVER_PORT),
    },
  })
}