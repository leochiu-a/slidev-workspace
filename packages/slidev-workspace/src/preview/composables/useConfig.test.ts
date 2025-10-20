import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

describe("useConfig", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Helper function to setup useConfig and wait for data to load
   */
  async function setupUseConfig(configData?: {
    hero: { title: string; description: string };
  }) {
    vi.resetModules();

    // Mock the virtual module
    vi.doMock("slidev:config", () => ({
      default: configData || {
        hero: {
          title: "Slide Deck",
          description:
            "Browse all available slide decks and use the search function to quickly find what you need.",
        },
      },
    }));

    const { useConfig } = await import("./useConfig");
    const result = useConfig();

    // Wait for data to finish loading
    await vi.waitFor(
      () => {
        // Check if config has loaded by comparing with expected values
        if (configData) {
          expect(result.hero.value.title).toBe(configData.hero.title);
        } else {
          expect(result.hero.value.title).toBe("Slide Deck");
        }
      },
      { timeout: 1000, interval: 10 },
    );

    return result;
  }

  describe("hero config", () => {
    it("should return hero config from slidev:config", async () => {
      const result = await setupUseConfig({
        hero: {
          title: "Test Workspace",
          description: "Test Description",
        },
      });

      expect(result.hero.value.title).toBe("Test Workspace");
      expect(result.hero.value.description).toBe("Test Description");
    });

    it("should provide reactive hero config", async () => {
      const result = await setupUseConfig({
        hero: {
          title: "Initial Title",
          description: "Initial Description",
        },
      });

      // Initial values
      expect(result.hero.value.title).toBe("Initial Title");
      expect(result.hero.value.description).toBe("Initial Description");

      // Hero should be reactive
      expect(result.hero.value).toBeDefined();
      expect(typeof result.hero.value).toBe("object");
    });

    it("should return default hero values when no config provided", async () => {
      const result = await setupUseConfig();

      expect(result.hero.value.title).toBe("Slide Deck");
      expect(result.hero.value.description).toContain("Browse all available");
    });
  });

  describe("HeroConfig properties", () => {
    it("should have title and description properties", async () => {
      const result = await setupUseConfig({
        hero: {
          title: "Test Title",
          description: "Test Description",
        },
      });

      const hero = result.hero.value;

      expect("title" in hero).toBe(true);
      expect("description" in hero).toBe(true);
      expect(typeof hero.title).toBe("string");
      expect(typeof hero.description).toBe("string");
    });

    it("should handle long descriptions", async () => {
      const longDescription =
        "This is a very long description that could contain multiple sentences and paragraphs to describe the workspace";

      const result = await setupUseConfig({
        hero: {
          title: "My Workspace",
          description: longDescription,
        },
      });

      expect(result.hero.value.description).toBe(longDescription);
      expect(result.hero.value.description.length).toBeGreaterThan(50);
    });

    it("should handle special characters in title and description", async () => {
      const result = await setupUseConfig({
        hero: {
          title: "My Slides & Presentations",
          description: "Browse <all> available slides @ our company",
        },
      });

      expect(result.hero.value.title).toContain("&");
      expect(result.hero.value.description).toContain("<");
      expect(result.hero.value.description).toContain("@");
    });
  });

  describe("error handling", () => {
    it("should use default values when import fails", async () => {
      vi.resetModules();

      // Mock import to throw error
      vi.doMock("slidev:config", () => {
        throw new Error("Failed to load config");
      });

      const { useConfig } = await import("./useConfig");
      const result = useConfig();

      // Should fall back to default values
      await vi.waitFor(
        () => {
          expect(result.hero.value.title).toBe("Slide Deck");
          expect(result.hero.value.description).toContain(
            "Browse all available",
          );
        },
        { timeout: 1000, interval: 10 },
      );
    });
  });
});
