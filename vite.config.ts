import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './', // ✅ Needed for cPanel/static hosting
  build: {
    outDir: 'dist',
    // ❌ Removed manualChunks to avoid runtime errors with React
    chunkSizeWarningLimit: 1000,
  },
})
