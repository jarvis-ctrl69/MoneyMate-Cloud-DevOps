import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/dashboard': 'http://localhost:5000',
      '/transactions': 'http://localhost:5000',
      '/goals': 'http://localhost:5000',
      '/opening-balance': 'http://localhost:5000',
    },
  },
})
