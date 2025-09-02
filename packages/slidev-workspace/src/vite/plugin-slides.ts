import type { Plugin } from "vite";
import { watch } from "fs";
import { getAllSlidesFrontmatter } from "../scripts/getSlideFrontmatter.js";
import { loadConfig, resolveSlidesDirs } from "../scripts/config.js";

export function slidesPlugin(): Plugin {
  return {
    name: "vite-plugin-slides",

    configureServer(server) {
      const watchers: ReturnType<typeof watch>[] = [];

      // Resolve slides directories at runtime, not build time
      const config = loadConfig();
      const slidesDirs = resolveSlidesDirs(config);

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

      // Clean up watchers when the server is closed
      server.httpServer?.once("close", () => {
        watchers.forEach((watcher) => watcher.close());
      });
    },

    // Provide a virtual module to get slides data
    resolveId(id) {
      if (id === "slidev:content") {
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
    },
  };
}
