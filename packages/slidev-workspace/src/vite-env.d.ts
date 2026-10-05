/// <reference types="vite/client" />

declare module "slidev:content" {
  import type { SlideInfo } from "./types/slide.js";
  const slides: SlideInfo[];
  export default slides;
}

declare module "slidev:config" {
  import type {
    HeroConfig,
    PaginationConfig,
    SidebarConfig,
  } from "./types/config.js";
  interface ConfigData {
    hero: HeroConfig;
    sidebar: SidebarConfig;
    pagination: PaginationConfig;
  }
  const config: ConfigData;
  export default config;
}

declare const __SLIDEV_WORKSPACE_DEV_PORT_BASE__: number;
