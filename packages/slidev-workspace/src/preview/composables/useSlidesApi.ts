import { ref, computed, readonly, type Ref } from "vue";
import slidesData from "slidev:content";
import { type SlideData } from "@/utils/getSlides";

// Type for the raw slides data from virtual module
interface RawSlideData {
  id: string;
  path: string;
  fullPath: string;
  sourceDir: string;
  frontmatter: {
    title?: string;
    info?: string;
    background?: string;
    author?: string;
    date?: string;
    theme?: string;
    transition?: string;
    class?: string;
    seoMeta?: {
      ogImage?: string;
      ogDescription?: string;
    };
    [key: string]: any;
  };
  content: string;
}

export interface SlidesApiResponse<T = any> {
  data: T;
  total: number;
  limit?: number;
  skip?: number;
}

export interface QueryOptions {
  limit?: number;
  skip?: number;
  search?: string;
  sourceDir?: string;
  theme?: string;
  sort?: "title" | "date" | "author";
  order?: "asc" | "desc";
}

export function useSlidesApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Contentful-like API methods
  const getEntries = async (
    options: QueryOptions = {}
  ): Promise<SlidesApiResponse<SlideData[]>> => {
    loading.value = true;
    error.value = null;

    try {
      let slides = allSlides.value;

      // Apply filters
      if (options.search) {
        const query = options.search.toLowerCase();
        slides = slides.filter(
          (slide) =>
            slide.title.toLowerCase().includes(query) ||
            slide.description.toLowerCase().includes(query) ||
            slide.author.toLowerCase().includes(query)
        );
      }

      if (options.sourceDir) {
        slides = slides.filter((slide) =>
          slide.sourceDir.includes(options.sourceDir!)
        );
      }

      if (options.theme) {
        slides = slides.filter((slide) => slide.theme === options.theme);
      }

      // Apply sorting
      if (options.sort) {
        slides.sort((a, b) => {
          const aValue = a[options.sort!] || "";
          const bValue = b[options.sort!] || "";
          const comparison = aValue.localeCompare(bValue);
          return options.order === "desc" ? -comparison : comparison;
        });
      }

      // Apply pagination
      const total = slides.length;
      const skip = options.skip || 0;
      const limit = options.limit;

      if (limit) {
        slides = slides.slice(skip, skip + limit);
      }

      return {
        data: slides,
        total,
        limit: options.limit,
        skip: options.skip,
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Unknown error occurred";
      return {
        data: [],
        total: 0,
      };
    } finally {
      loading.value = false;
    }
  };

  const getEntry = async (
    id: string
  ): Promise<SlidesApiResponse<SlideData | null>> => {
    loading.value = true;
    error.value = null;

    try {
      const slide = allSlides.value.find((s) => s.id === id) || null;
      return {
        data: slide,
        total: slide ? 1 : 0,
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Unknown error occurred";
      return {
        data: null,
        total: 0,
      };
    } finally {
      loading.value = false;
    }
  };

  // Additional convenience methods
  const getEntriesByCollection = async (
    sourceDir: string
  ): Promise<SlidesApiResponse<SlideData[]>> => {
    return getEntries({ sourceDir });
  };

  const getEntriesByContentType = async (
    theme: string
  ): Promise<SlidesApiResponse<SlideData[]>> => {
    return getEntries({ theme });
  };

  // Reactive computed properties
  const allSlides = computed(() => {
    if (!slidesData || slidesData.length === 0) return [];

    return (slidesData as RawSlideData[]).map((slide) => ({
      id: slide.id,
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
      sourceDir: slide.sourceDir,
      path: slide.path,
      fullPath: slide.fullPath,
      frontmatter: slide.frontmatter,
      content: slide.content,
    }));
  });
  const slidesCount = computed(() => allSlides.value.length);
  const availableThemes = computed(() => {
    const themes = new Set(
      allSlides.value.map((slide) => slide.theme).filter(Boolean)
    );
    return Array.from(themes);
  });
  const availableSourceDirs = computed(() => {
    const dirs = new Set(allSlides.value.map((slide) => slide.sourceDir));
    return Array.from(dirs);
  });

  // Real-time search
  const createLiveQuery = (options: Ref<QueryOptions>) => {
    return computed(() => {
      let slides = allSlides.value;

      if (options.value.search) {
        const query = options.value.search.toLowerCase();
        slides = slides.filter(
          (slide) =>
            slide.title.toLowerCase().includes(query) ||
            slide.description.toLowerCase().includes(query) ||
            slide.author.toLowerCase().includes(query)
        );
      }

      if (options.value.sourceDir) {
        slides = slides.filter((slide) =>
          slide.sourceDir.includes(options.value.sourceDir!)
        );
      }

      if (options.value.theme) {
        slides = slides.filter((slide) => slide.theme === options.value.theme);
      }

      // Apply sorting
      if (options.value.sort) {
        slides.sort((a, b) => {
          const aValue = a[options.value.sort!] || "";
          const bValue = b[options.value.sort!] || "";
          const comparison = aValue.localeCompare(bValue);
          return options.value.order === "desc" ? -comparison : comparison;
        });
      }

      return slides;
    });
  };

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),

    // API methods (Contentful-style)
    getEntries,
    getEntry,
    getEntriesByCollection,
    getEntriesByContentType,

    // Computed properties
    allSlides,
    slidesCount,
    availableThemes,
    availableSourceDirs,

    // Live query
    createLiveQuery,
  };
}

// Export a default instance for simple usage
export const slidesApi = useSlidesApi();
