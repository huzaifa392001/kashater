import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 🔥 இதை add பண்ணு
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':   ['react', 'react-dom'],
          'vendor-router':  ['react-router-dom'],
          'vendor-mui':     ['@mui/material'],
          'vendor-redux':   ['@reduxjs/toolkit', 'react-redux'],
          'vendor-country': ['country-state-city'],
          'vendor-forms':   ['react-hook-form'],
        },
      },
    },
  },
})
