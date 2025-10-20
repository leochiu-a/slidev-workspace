export interface HeroConfig {
  title: string;
  description: string;
}

export interface SlidevWorkspaceConfig {
  slidesDir: string[];
  outputDir: string;
  baseUrl: string;
  exclude: string[];
  hero: HeroConfig;
}
