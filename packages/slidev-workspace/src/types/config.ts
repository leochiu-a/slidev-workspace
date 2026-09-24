export interface HeroConfig {
  /** Main heading displayed at the top of the workspace page. */
  title: string;
  /** Supporting copy shown under the hero title. */
  description: string;
}

export interface SidebarConfig {
  /** Title displayed at the top of the sidebar. */
  title: string;
  /** Optional GitHub URL shown in the sidebar. */
  githubUrl?: string;
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
  /** Sidebar content surfaced by the preview application. */
  sidebar: SidebarConfig;
  /** Favicon URL for the workspace preview page. Falls back to the bundled icon. */
  favicon?: string;
}
