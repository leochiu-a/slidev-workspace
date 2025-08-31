import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './src/preview',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/preview'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
