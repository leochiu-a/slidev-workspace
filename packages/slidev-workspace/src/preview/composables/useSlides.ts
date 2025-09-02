import { computed, ref } from "vue";
import type { SlideInfo } from "../../types/slide.js";

export interface SlideData {
  title: string;
  url: string;
  description: string;
  image: string;
  author: string;
  date: string;
  theme?: string;
  transition?: string;
  class?: string;
}

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

    return slidesData.value.map((slide) => ({
      title: slide.frontmatter.title || slide.path,
      url: slide.path,
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
    }));
  });

  const slidesCount = computed(() => slides.value.length);

  return {
    slides,
    slidesCount,
    loadSlidesData,
  };
}
