// Export core functionality
export {
  getAllSlidesFrontmatter,
  getSlideFrontmatter,
  getSlideFrontmatterByPath,
} from "./scripts/getSlideFrontmatter";
export { slidesPlugin } from "./scripts/vite-plugin-slides";
export {
  loadConfig,
  resolveSlidesDirs,
  type SlidevWorkspaceConfig,
} from "./scripts/config";

// Export types
export type {
  SlideInfo,
  SlideFrontmatter,
} from "./scripts/getSlideFrontmatter";
