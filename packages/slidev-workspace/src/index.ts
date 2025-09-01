// Export core functionality
export {
  getAllSlidesFrontmatter,
  getSlideFrontmatter,
  getSlideFrontmatterByPath,
} from "./scripts/getSlideFrontmatter";
export { slidesPlugin } from "./scripts/vite-plugin-slides";
export { loadConfig, resolveSlidesDirs } from "./scripts/config";

// Export types
export type { SlideInfo, SlideFrontmatter, SlideData } from "./types/slide";
export type { SlidevWorkspaceConfig } from "./types/config";
