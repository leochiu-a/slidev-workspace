import type { HeroConfig } from "../../../types/config";

interface ConfigData {
  hero: HeroConfig;
}

const mockConfigData: ConfigData = {
  hero: {
    title: "Slide Deck",
    description:
      "Browse all available slide decks and use the search function to quickly find what you need.",
  },
};

export default mockConfigData;
