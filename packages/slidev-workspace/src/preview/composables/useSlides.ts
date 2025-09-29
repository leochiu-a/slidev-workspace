import { computed, ref } from "vue";
import type { SlideData, SlideInfo } from "../../types/slide.js";

export function useSlides() {
  const slidesData = ref<SlideInfo[]>([]);

  // Dynamically import slidev:content to avoid build-time issues
  const loadSlidesData = async () => {
    try {
      const module = await import("slidev:content");
      slidesData.value = module.default || [];
    } catch (error) {
      console.warn("Failed to load slides data:", error);
      slidesData.value = [];
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

      return {
        title: slide.frontmatter.title || slide.path,
        url: process.env.NODE_ENV === "development" ? devServerUrl : slide.path,
        description:
          slide.frontmatter.info ||
          slide.frontmatter.seoMeta?.ogDescription ||
          "No description available",
        image:
          slide.frontmatter.background ||
          slide.frontmatter.seoMeta?.ogImage ||
          "https://cover.sli.dev",
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
  };
}
