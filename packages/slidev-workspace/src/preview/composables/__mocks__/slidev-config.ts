import type {
  HeroConfig,
  PaginationConfig,
  SidebarConfig,
} from "../../../types/config";

interface ConfigData {
  hero: HeroConfig;
  sidebar: SidebarConfig;
  pagination: PaginationConfig;
}

const mockConfigData: ConfigData = {
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

export default mockConfigData;
