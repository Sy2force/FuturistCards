import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3010,
    host: true,
    open: false,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', '@heroicons/react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          utils: ['axios', 'react-hot-toast']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsDir: 'assets',
    emptyOutDir: true
  },
  preview: {
    port: 4173,
    host: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios', 'framer-motion']
  }
});
