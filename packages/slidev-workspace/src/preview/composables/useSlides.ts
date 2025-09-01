import { computed } from "vue";
import slidesData from "slidev:content";
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
  const slides = computed<SlideData[]>(() => {
    if (!slidesData || slidesData.length === 0) return [];

    return (slidesData as SlideInfo[]).map((slide) => ({
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
    slidesCount
  };
}