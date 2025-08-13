import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    historyApiFallback: true // Ensures client-side routing works
  },
  preview: {
    historyApiFallback: true // Also for production preview
  }
})
