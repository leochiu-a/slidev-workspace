import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useSlides } from "./useSlides";

// Mock IS_DEVELOPMENT environment variable
vi.mock("../../env", () => ({
  IS_DEVELOPMENT: true,
}));

// Helper function to setup useSlides and wait for data to load
async function setupUseSlides() {
  const result = useSlides();
  // Wait for async data loading
  await new Promise((resolve) => setTimeout(resolve, 0));

  return result;
}

describe("useSlides", () => {
  beforeEach(() => {
    // Reset window.location
    delete (window as unknown as { location: unknown }).location;
    (window as unknown as { location: { origin: string } }).location = {
      origin: "http://localhost:3000",
    };

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("slide data transformation", () => {
    it("should transform slide data correctly with all frontmatter fields", async () => {
      const { slides } = await setupUseSlides();

      const firstSlide = slides.value[0];

      expect(firstSlide.title).toBe("My First Presentation");
      expect(firstSlide.description).toBe("This is my first presentation");
      expect(firstSlide.author).toBe("John Doe");
      expect(firstSlide.date).toBe("2024-01-15");
      expect(firstSlide.theme).toBe("default");
      expect(firstSlide.transition).toBe("fade");
      expect(firstSlide.class).toBe("text-center");
    });

    it("should use path as title fallback", async () => {
      const { slides } = await setupUseSlides();

      const thirdSlide = slides.value[2];

      expect(thirdSlide.title).toBe("/slides/presentation-3/");
    });

    it("should use default description when no info available", async () => {
      const { slides } = await setupUseSlides();

      const thirdSlide = slides.value[2];

      expect(thirdSlide.description).toBe("No description available");
    });

    it("should use seoMeta.ogDescription as description fallback", async () => {
      const { slides } = await setupUseSlides();

      const secondSlide = slides.value[1];

      expect(secondSlide.description).toBe("SEO description");
    });

    it("should use 'Unknown Author' as author fallback", async () => {
      const { slides } = await setupUseSlides();

      const thirdSlide = slides.value[2];

      expect(thirdSlide.author).toBe("Unknown Author");
    });

    it("should use current date as date fallback", async () => {
      const { slides } = await setupUseSlides();

      const thirdSlide = slides.value[2];
      const expectedDate = new Date().toISOString().split("T")[0];

      expect(thirdSlide.date).toBe(expectedDate);
    });
  });

  describe("URL generation", () => {
    it("should generate correct dev server URLs with incremental ports", async () => {
      const { slides } = await setupUseSlides();

      expect(slides.value[0].url).toBe("http://localhost:3001");
      expect(slides.value[1].url).toBe("http://localhost:3002");
      expect(slides.value[2].url).toBe("http://localhost:3003");
    });
  });

  describe("background image resolution", () => {
    it("should keep absolute URL backgrounds unchanged", async () => {
      const { slides } = await setupUseSlides();

      const secondSlide = slides.value[1];

      expect(secondSlide.image).toBe("https://example.com/bg.jpg");
    });

    it("should resolve relative background paths", async () => {
      const { slides } = await setupUseSlides();

      const firstSlide = slides.value[0];

      expect(firstSlide.image).toBe(
        "http://localhost:3001/slides/presentation-1/images/bg1.jpg",
      );
    });

    it("should use default cover when no background is provided", async () => {
      const { slides } = await setupUseSlides();

      const thirdSlide = slides.value[2];

      expect(thirdSlide.image).toBe("https://cover.sli.dev");
    });
  });
});
