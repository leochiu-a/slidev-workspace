import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import { slidesPlugin } from "./src/scripts/vite-plugin-slides";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "./src/preview",
  plugins: [vue(), tailwindcss(), slidesPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/preview"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
