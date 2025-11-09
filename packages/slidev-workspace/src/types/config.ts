export interface HeroConfig {
  /** Main heading displayed at the top of the workspace page. */
  title: string;
  /** Supporting copy shown under the hero title. */
  description: string;
}

/**
 * Slidev Workspace configuration loaded from slidev-workspace.yaml.
 */
export interface SlidevWorkspaceConfig {
  /** One or more directories that contain slide packages. */
  slidesDir: string[];
  /** Where the aggregated preview app should output its build. */
  outputDir: string;
  /** Public base URL used when serving or building slides. */
  baseUrl: string;
  /** Folder names to ignore when scanning for slides. */
  exclude: string[];
  /** Hero content surfaced by the preview application. */
  hero: HeroConfig;
}
