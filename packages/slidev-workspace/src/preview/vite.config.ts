import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { slidesPlugin } from '../scripts/vite-plugin-slides'

export default defineConfig({
  plugins: [
    vue(),
    slidesPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})