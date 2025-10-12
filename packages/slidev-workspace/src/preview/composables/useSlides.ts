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
 * Resolve background image path.
 * If the background is not a URL, construct the full path using slide.path as the base.
 *
 * Example (development mode):
 * {
 *   background: "/bg1.jpg",
 *   slidePath: "/slides-presentation-1",
 *   baseUrl: "/slidev-workspace-starter/",
 *   domain: "http://localhost:3001" // domain of the current server
 * }
 * returns: "http://localhost:3001/slides-presentation-1/bg1.jpg"
 *
 * Example (production mode):
 * {
 *   background: "/bg1.jpg",
 *   slidePath: "/slides-presentation-1",
 *   baseUrl: "/slidev-workspace-starter/",
 *   domain: "https://my-slides.com" // domain of the current server
 * }
 * returns: "https://my-slides.com/slidev-workspace-starter/slides-presentation-1/bg1.jpg"
 */
function resolveBackgroundPath(params: {
  background: string | undefined;
  slidePath: string;
  baseUrl: string;
  domain: string;
}): string {
  const { background, slidePath, domain, baseUrl } = params;

  if (!background) {
    return "";
  }

  if (isUrl(background)) {
    return background;
  }

  try {
    return IS_DEVELOPMENT
      ? new URL(pathJoin(slidePath, background), domain).href
      : new URL(pathJoin(baseUrl, slidePath, background), domain).href;
  } catch (error) {
    console.error("Failed to resolve background path:", error);
    return background;
  }
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

      // Resolve background image path
      const background =
        slide.frontmatter.seoMeta?.ogImage || slide.frontmatter.background;
      const imageUrl = background
        ? resolveBackgroundPath({
            background: slide.frontmatter.background,
            slidePath: slide.path,
            baseUrl: slide.baseUrl,
            domain: IS_DEVELOPMENT ? devServerUrl : window.location.origin,
          })
        : "https://cover.sli.dev";

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
