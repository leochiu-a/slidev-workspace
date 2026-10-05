import { build, preview } from "vite";
import { createViteConfig } from "../src/cli/vite";

// Build the workspace page for the fixture in SLIDEV_WORKSPACE_CWD and serve it.
// Slide decks themselves are not built; only the workspace page is under test.
const config = createViteConfig(undefined, "build");
await build({ ...config, build: { ...config.build, emptyOutDir: true } });
const server = await preview({
  ...config,
  preview: { port: 4173, strictPort: true, open: false },
});
server.printUrls();
