import type { Plugin } from "vite";
import { watch } from "fs";
import { getAllSlidesFrontmatter } from "../scripts/getSlideFrontmatter.js";
import { loadConfig, resolveSlidesDirs } from "../scripts/config.js";
import {
  startAllSlidesDevServer,
  stopAllDevServers,
  type DevServerInfo,
} from "../scripts/devServer.js";

export function slidesPlugin(): Plugin {
  let devServers: DevServerInfo[] = [];

  return {
    name: "vite-plugin-slides",

    async configureServer(server) {
      const watchers: ReturnType<typeof watch>[] = [];

      // Resolve slides directories at runtime, not build time
      const config = loadConfig();
      const slidesDirs = resolveSlidesDirs(config);

      try {
        devServers = await startAllSlidesDevServer();
      } catch (error) {
        console.error("❌ Failed to start slides dev servers:", error);
      }

      // Watch for changes in all slides directories
      slidesDirs.forEach((slidesDir) => {
        const watcher = watch(
          slidesDir,
          { recursive: true },
          (eventType, filename) => {
            if (filename && filename.endsWith("slides.md")) {
              // Reload frontmatter
              try {
                const slides = getAllSlidesFrontmatter();

                // Trigger HMR update
                server.ws.send({
                  type: "custom",
                  event: "slides-updated",
                  data: slides,
                });
              } catch (error) {
                console.error("❌ Error reading slides frontmatter:", error);
              }
            }
          },
        );

        watchers.push(watcher);
      });

      // Clean up watchers and dev servers when the server is closed
      server.httpServer?.once("close", () => {
        watchers.forEach((watcher) => watcher.close());
        if (devServers.length > 0) {
          stopAllDevServers(devServers);
        }
      });
    },

    // Provide virtual modules to get slides data and config
    resolveId(id) {
      if (id === "slidev:content" || id === "slidev:config") {
        return id;
      }
    },

    load(id) {
      if (id === "slidev:content") {
        try {
          const slides = getAllSlidesFrontmatter();
          return `export const slidesData = ${JSON.stringify(slides, null, 2)};
export default slidesData;`;
        } catch (error) {
          console.error("Error loading slides data:", error);
          return `export const slidesData = [];
export default slidesData;`;
        }
      }

      if (id === "slidev:config") {
        try {
          const config = loadConfig();
          const configData = {
            hero: config.hero,
          };
          return `export const configData = ${JSON.stringify(configData, null, 2)};
export default configData;`;
        } catch (error) {
          console.error("Error loading config:", error);
          return `export const configData = { hero: {} };
export default configData;`;
        }
      }
    },
  };
}
