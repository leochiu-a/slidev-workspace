import { computed, ref } from "vue";
import type { HeroConfig } from "../../types/config.js";

interface ConfigData {
  hero: HeroConfig;
}

export function useConfig() {
  const configData = ref<ConfigData>({
    hero: {
      title: "Slide Deck",
      description:
        "Browse all available slide decks and use the search function to quickly find what you need.",
    },
  });

  const loadConfigData = async () => {
    try {
      const module = await import("slidev:config");
      configData.value = module.default || configData.value;
    } catch (error) {
      console.warn("Failed to load config data:", error);
    }
  };

  loadConfigData();

  const hero = computed(() => configData.value.hero);

  return {
    hero,
    config: configData,
  };
}
