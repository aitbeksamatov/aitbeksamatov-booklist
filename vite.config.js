import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Встроенный модуль для работы с путями

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Обучаем Vite понимать, что @/ — это твоя папка ./src
      '@': path.resolve(__dirname, './src'),
    },
  },
})