import { defineConfig } from "tsdown";

export default defineConfig([
  // Library build
  {
    entry: ["./src/index.ts"],
    platform: "node",
    fromVite: true,
    dts: true,
    external: ["fs", "path", "url", "yaml"],
  },
  // CLI build
  {
    entry: ["./src/cli.ts"],
    platform: "node",
    outDir: "dist",
    external: ["fs", "path", "url", "yaml"],
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
]);
