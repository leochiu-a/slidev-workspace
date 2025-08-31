import type { Plugin } from "vite";
import { watch } from "node:fs";
import { getAllSlidesFrontmatter } from "./getSlideFrontmatter.js";
import { loadConfig, resolveSlidesDirs } from "./config.js";

export function slidesPlugin(): Plugin {
  const config = loadConfig();
  const slidesDirs = resolveSlidesDirs(config);

  return {
    name: "vite-plugin-slides",

    configureServer(server) {
      const watchers: ReturnType<typeof watch>[] = [];

      // Watch for changes in all slides directories
      slidesDirs.forEach((slidesDir) => {
        const watcher = watch(
          slidesDir,
          { recursive: true },
          (eventType, filename) => {
            if (filename && filename.endsWith("slides.md")) {
              console.log(
                `🔄 Detected change in slides.md: ${filename} (from ${slidesDir})`
              );

              // Reload frontmatter
              try {
                const slides = getAllSlidesFrontmatter();
                console.log(
                  "📊 Updated slides data:",
                  slides.map((s) => ({
                    id: s.id,
                    path: s.path,
                    title: s.frontmatter.title,
                    theme: s.frontmatter.theme,
                    sourceDir: s.sourceDir,
                    seoMeta: s.frontmatter.seoMeta,
                  }))
                );

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
          }
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
      if (id === "virtual:slides-data") {
        return id;
      }
    },

    load(id) {
      if (id === "virtual:slides-data") {
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
