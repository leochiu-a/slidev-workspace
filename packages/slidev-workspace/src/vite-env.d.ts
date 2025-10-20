/// <reference types="vite/client" />

declare module "slidev:content" {
  import type { SlideInfo } from "./types/slide.js";
  const slides: SlideInfo[];
  export default slides;
}

declare module "slidev:config" {
  import type { HeroConfig } from "./types/config.js";
  interface ConfigData {
    hero: HeroConfig;
  }
  const config: ConfigData;
  export default config;
}
