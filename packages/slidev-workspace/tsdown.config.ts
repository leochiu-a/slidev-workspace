import { defineConfig } from "tsdown";

export default defineConfig([
  // Library build
  {
    entry: ["./src/index.ts"],
    platform: "neutral",
    fromVite: true,
    dts: true,
  },
  // CLI build
  {
    entry: ["./src/cli.ts"],
    platform: "node",
    outDir: "dist",
    outBase: "src",
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
]);
