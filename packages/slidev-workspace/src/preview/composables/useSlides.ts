import { computed, ref } from "vue";
import type { SlideData, SlideInfo } from "../../types/slide";
import { IS_DEVELOPMENT } from "../constants/env";
import { pathJoin } from "../lib/pathJoin";

/**
 * Check if a string is a valid URL
 */
function isUrl(str: string | undefined): boolean {
  if (!str) return false;

  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolve image URL with fallback priority:
 * 1. og-image.png (if it exists in the slides root directory)
 * 2. seoMeta.ogImage (explicit og-image config)
 * 3. background (background image)
 * 4. default cover image (https://cover.sli.dev)
 *
 * Example (development mode with og-image.png):
 * returns: "http://localhost:3001/og-image.png"
 *
 * Example (production mode with og-image.png):
 * returns: "https://my-slides.com/slidev-workspace-starter/og-image.png?v=<hash>"
 */
export function resolveImageUrl(slide: SlideInfo, domain: string): string {
  const { hasOgImage, path: slidePath, baseUrl, frontmatter } = slide;
  const seoOgImage = frontmatter.seoMeta?.ogImage;
  const background = frontmatter.background;

  // Priority 1: og-image.png (if exists)
  if (hasOgImage) {
    const imagePath = `og-image.png?v=${Date.now()}`;
    try {
      const path = IS_DEVELOPMENT
        ? imagePath
        : pathJoin(baseUrl, slidePath, imagePath);

      return new URL(path, domain).href;
    } catch (error) {
      console.error("Failed to resolve og-image.png path:", error);
      return "https://cover.sli.dev";
    }
  }

  // Priority 2: seoMeta.ogImage
  if (seoOgImage) {
    if (isUrl(seoOgImage)) {
      return seoOgImage;
    }

    try {
      return IS_DEVELOPMENT
        ? new URL(seoOgImage, domain).href
        : new URL(pathJoin(baseUrl, slidePath, seoOgImage), domain).href;
    } catch (error) {
      console.error("Failed to resolve seoMeta.ogImage path:", error);
      return "https://cover.sli.dev";
    }
  }

  // Priority 3: background
  if (background) {
    if (isUrl(background)) {
      return background;
    }

    try {
      return IS_DEVELOPMENT
        ? new URL(background, domain).href
        : new URL(pathJoin(baseUrl, slidePath, background), domain).href;
    } catch (error) {
      console.error("Failed to resolve background path:", error);
      return "https://cover.sli.dev";
    }
  }

  // Priority 4: default cover
  return "https://cover.sli.dev";
}

export function useSlides() {
  const slidesData = ref<SlideInfo[]>([]);
  const isLoading = ref(true);

  // Dynamically import slidev:content to avoid build-time issues
  const loadSlidesData = async () => {
    try {
      const module = await import("slidev:content");
      slidesData.value = module.default || [];
    } catch (error) {
      console.warn("Failed to load slides data:", error);
      slidesData.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Load slides data on initialization
  loadSlidesData();

  const slides = computed<SlideData[]>(() => {
    if (!slidesData.value || slidesData.value.length === 0) return [];

    return slidesData.value.map((slide, index) => {
      // Generate port based on slide index: 3001, 3002, 3003...
      const port = 3001 + index;
      // Create dev server URL
      const devServerUrl = `http://localhost:${port}`;
      const domain = IS_DEVELOPMENT ? devServerUrl : window.location.origin;

      const imageUrl = resolveImageUrl(slide, domain);

      return {
        title: slide.frontmatter.title || slide.path,
        url: IS_DEVELOPMENT ? devServerUrl : slide.path,
        description:
          slide.frontmatter.info ||
          slide.frontmatter.seoMeta?.ogDescription ||
          "No description available",
        image: imageUrl,
        author: slide.frontmatter.author || "Unknown Author",
        date: slide.frontmatter.date || new Date().toISOString().split("T")[0],
        theme: slide.frontmatter.theme,
        transition: slide.frontmatter.transition,
        class: slide.frontmatter.class,
      };
    });
  });

  const slidesCount = computed(() => slides.value.length);

  return {
    slides,
    slidesCount,
    loadSlidesData,
    isLoading,
  };
}
