// CONFIGURATION VITE ULTRA-MINIMALE POUR DEBUG
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002, // Port que vous mentionnez
    host: 'localhost',
    open: false
  },
  // Suppression de toutes les optimisations avancées
  // pour isoler les problèmes potentiels
})
