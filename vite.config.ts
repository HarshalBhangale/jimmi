import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    allowedHosts: [
      "https://4294-18-175-165-31.ngrok-free.app",
      "https://2227-18-175-165-31.ngrok-free.app",
      "localhost",
      "127.0.0.1",
    ]
  }
})
