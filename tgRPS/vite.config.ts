import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['0a56-2401-4900-1c63-4e9b-dd8-b5ce-ba88-fd28.ngrok-free.app']
  }
})