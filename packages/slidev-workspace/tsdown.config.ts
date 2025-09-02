import { defineConfig } from "tsdown";

export default defineConfig([
  // Library build
  {
    entry: ["./src/index.ts"],
    platform: "node",
    fromVite: true,
    dts: true,
    external: ["fs", "path", "url", "yaml", "slidev:content"],
  },
  // Vite plugin build
  {
    entry: ["./src/vite/plugin-slides.ts"],
    platform: "node",
    fromVite: true,
    dts: true,
    external: ["fs", "path", "url", "yaml", "slidev:content", "vite"],
  },
  // CLI build
  {
    entry: ["./src/cli.ts"],
    platform: "node",
    outDir: "dist",
    external: ["fs", "path", "url", "yaml", "slidev:content"],
  },
]);
