import { computed, ref } from "vue";
import type {
  HeroConfig,
  PaginationConfig,
  SidebarConfig,
} from "../../types/config.js";

const DEFAULT_CONFIG = {
  hero: {
    title: "Slide Deck",
    description:
      "Browse all available slide decks and use the search function to quickly find what you need.",
  },
  sidebar: {
    title: "Slide Deck",
    githubUrl: "",
  },
  pagination: {
    pageSize: 12,
  },
};

export function useConfig() {
  const heroData = ref<HeroConfig>(DEFAULT_CONFIG.hero);
  const sidebarData = ref<SidebarConfig>(DEFAULT_CONFIG.sidebar);
  const paginationData = ref<PaginationConfig>(DEFAULT_CONFIG.pagination);

  const loadConfigData = async () => {
    try {
      const module = await import("slidev:config");
      heroData.value = module.default?.hero || heroData.value;
      sidebarData.value = module.default?.sidebar || sidebarData.value;
      paginationData.value = module.default?.pagination || paginationData.value;
    } catch (error) {
      console.warn("Failed to load config data:", error);
    }
  };

  loadConfigData();

  const hero = computed(() => heroData.value);
  const sidebar = computed(() => sidebarData.value);
  const pagination = computed(() => paginationData.value);

  return {
    hero,
    sidebar,
    pagination,
  };
}
