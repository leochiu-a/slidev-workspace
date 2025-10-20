import { computed, ref } from "vue";
import type { HeroConfig } from "../../types/config.js";

import config from "slidev:config";

interface ConfigData {
  hero: HeroConfig;
}

const configData = ref<ConfigData>(config);

export function useConfig() {
  const hero = computed(() => configData.value.hero);

  return {
    hero,
    config: configData,
  };
}
