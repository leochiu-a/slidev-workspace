/// <reference types="vite/client" />

declare module "slidev:content" {
  import type { SlideInfo } from "./types/slide.js";
  const slides: SlideInfo[];
  export default slides;
}
