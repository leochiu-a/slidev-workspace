import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { slidesPlugin } from 'slidev-workspace'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), slidesPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
