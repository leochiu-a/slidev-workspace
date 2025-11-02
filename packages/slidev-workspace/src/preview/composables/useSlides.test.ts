import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterEach,
  beforeAll,
} from "vitest";
import type { SlideInfo } from "../../types/slide";

/**
 * Helper function to create a mock SlideInfo object
 */
function createMockSlide(overrides: Partial<SlideInfo> = {}): SlideInfo {
  return {
    path: "/slides-presentation-1/",
    baseUrl: "/slidev-workspace-starter",
    hasOgImage: false,
    frontmatter: {
      title: "Test Slide",
      author: "Test Author",
      date: "2024-01-01",
    },
    ...overrides,
  } as SlideInfo;
}

describe("resolveImageUrl (Development Mode)", () => {
  beforeAll(async () => {
    vi.resetModules();
    vi.doMock("../constants/env", () => ({
      IS_DEVELOPMENT: true,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return og-image.png URL when hasOgImage is true in development", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({ hasOgImage: true });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toMatch(/^http:\/\/localhost:3001\/og-image\.png\?v=\d+$/);
  });

  it("should return seoMeta.ogImage when it's an absolute URL", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      frontmatter: {
        title: "Test",
        seoMeta: {
          ogImage: "https://example.com/image.jpg",
        },
      },
    });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://example.com/image.jpg");
  });

  it("should resolve relative seoMeta.ogImage URL in development", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      path: "/slides-presentation-1/",
      frontmatter: {
        title: "Test",
        seoMeta: {
          ogImage: "custom-image.jpg",
        },
      },
    });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("http://localhost:3001/custom-image.jpg");
  });

  it("should return absolute background URL unchanged", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      frontmatter: {
        title: "Test",
        background: "https://example.com/bg.jpg",
      },
    });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://example.com/bg.jpg");
  });

  it("should resolve relative background URL in development", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      path: "/slides-presentation-1/",
      frontmatter: {
        title: "Test",
        background: "background.jpg",
      },
    });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("http://localhost:3001/background.jpg");
  });

  it("should return default cover when no image sources provided", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      frontmatter: {
        title: "Test",
      },
    });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://cover.sli.dev");
  });

  it("should prioritize og-image.png over seoMeta.ogImage", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: true,
      frontmatter: {
        title: "Test",
        seoMeta: {
          ogImage: "https://example.com/image.jpg",
        },
      },
    });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toMatch(/^http:\/\/localhost:3001\/og-image\.png\?v=\d+$/);
    expect(result).not.toBe("https://example.com/image.jpg");
  });

  it("should prioritize seoMeta.ogImage over background", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      frontmatter: {
        title: "Test",
        seoMeta: {
          ogImage: "https://example.com/image.jpg",
        },
        background: "https://example.com/bg.jpg",
      },
    });
    const domain = "http://localhost:3001";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://example.com/image.jpg");
    expect(result).not.toBe("https://example.com/bg.jpg");
  });

  it("should return default cover on URL construction error", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const slide = createMockSlide({
      hasOgImage: false,
      frontmatter: {
        title: "Test",
        seoMeta: {
          ogImage: "not a valid url at all!!!",
        },
      },
    });
    const domain = "invalid domain";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://cover.sli.dev");
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});

describe("resolveImageUrl (Production Mode)", () => {
  beforeAll(async () => {
    vi.resetModules();
    vi.doMock("../constants/env", () => ({
      IS_DEVELOPMENT: false,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return og-image.png URL with baseUrl in production", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: true,
      baseUrl: "/slidev-workspace-starter",
      path: "/slides-presentation-1/",
    });
    const domain = "https://my-slides.com";

    const result = resolveImageUrl(slide, domain);

    expect(result).toMatch(
      /^https:\/\/my-slides\.com\/slidev-workspace-starter\/slides-presentation-1\/og-image\.png\?v=\d+$/,
    );
  });

  it("should resolve seoMeta.ogImage with baseUrl and path in production", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      baseUrl: "/slidev-workspace-starter",
      path: "/slides-presentation-1/",
      frontmatter: {
        title: "Test",
        seoMeta: {
          ogImage: "custom-image.jpg",
        },
      },
    });
    const domain = "https://my-slides.com";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe(
      "https://my-slides.com/slidev-workspace-starter/slides-presentation-1/custom-image.jpg",
    );
  });

  it("should resolve background with baseUrl and path in production", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      baseUrl: "/slidev-workspace-starter",
      path: "/slides-presentation-1/",
      frontmatter: {
        title: "Test",
        background: "background.jpg",
      },
    });
    const domain = "https://my-slides.com";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe(
      "https://my-slides.com/slidev-workspace-starter/slides-presentation-1/background.jpg",
    );
  });

  it("should keep absolute URL seoMeta.ogImage unchanged in production", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      baseUrl: "/slidev-workspace-starter",
      frontmatter: {
        title: "Test",
        seoMeta: {
          ogImage: "https://example.com/image.jpg",
        },
      },
    });
    const domain = "https://my-slides.com";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://example.com/image.jpg");
  });

  it("should keep absolute URL background unchanged in production", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      baseUrl: "/slidev-workspace-starter",
      frontmatter: {
        title: "Test",
        background: "https://example.com/bg.jpg",
      },
    });
    const domain = "https://my-slides.com";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://example.com/bg.jpg");
  });

  it("should return default cover when no image sources in production", async () => {
    const { resolveImageUrl } = await import("./useSlides");
    const slide = createMockSlide({
      hasOgImage: false,
      frontmatter: {
        title: "Test",
      },
    });
    const domain = "https://my-slides.com";

    const result = resolveImageUrl(slide, domain);

    expect(result).toBe("https://cover.sli.dev");
  });
});

describe("useSlides (Development Mode)", () => {
  beforeAll(async () => {
    vi.resetModules();
    vi.doMock("../constants/env", () => ({
      IS_DEVELOPMENT: true,
    }));
  });

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

  /**
   * Helper function to setup useSlides in development mode and wait for data to load
   */
  async function setupUseSlides() {
    const { useSlides } = await import("./useSlides");
    const result = useSlides();

    // Wait for data to finish loading using vitest's waitFor
    await vi.waitFor(
      () => {
        expect(result.isLoading.value).toBe(false);
      },
      { timeout: 1000, interval: 10 },
    );

    return result;
  }

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

      expect(thirdSlide.title).toBe("/slides-presentation-3/");
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

      expect(secondSlide.image).toBe("https://example.com/og-image.jpg");
    });

    it("should resolve relative background paths in development mode", async () => {
      const { slides } = await setupUseSlides();

      const firstSlide = slides.value[0];

      expect(firstSlide.image).toMatch(
        /^http:\/\/localhost:3001\/og-image\.png\?v=\d+$/,
      );
    });

    it("should use default cover when no background is provided", async () => {
      const { slides } = await setupUseSlides();

      const thirdSlide = slides.value[2];

      expect(thirdSlide.image).toBe("https://cover.sli.dev");
    });
  });

  describe("og-image.png priority", () => {
    it("should prioritize og-image.png when hasOgImage is true", async () => {
      const { slides } = await setupUseSlides();

      const firstSlide = slides.value[0];

      // First slide has hasOgImage: true, so should use og-image.png
      expect(firstSlide.image).toContain("og-image.png");
    });

    it("should use seoMeta.ogImage when hasOgImage is false", async () => {
      const { slides } = await setupUseSlides();

      const secondSlide = slides.value[1];

      // Second slide has hasOgImage: false, so should use seoMeta.ogImage
      expect(secondSlide.image).toBe("https://example.com/og-image.jpg");
    });

    it("should use background when hasOgImage is false and no seoMeta.ogImage", async () => {
      const { slides } = await setupUseSlides();

      const thirdSlide = slides.value[2];

      // Third slide has hasOgImage: false and no seoMeta, so should use background or default
      expect(thirdSlide.image).toBe("https://cover.sli.dev");
    });
  });
});

describe("useSlides (Production Mode)", () => {
  beforeAll(async () => {
    vi.resetModules();
    vi.doMock("../constants/env", () => ({
      IS_DEVELOPMENT: false,
    }));
  });

  beforeEach(() => {
    // Reset window.location
    delete (window as unknown as { location: unknown }).location;
    (window as unknown as { location: { origin: string } }).location = {
      origin: "https://my-slides.com",
    };

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Helper to setup production mode useSlides
   */
  async function setupUseSlidesProduction() {
    const { useSlides: useSlidesProduction } = await import("./useSlides");
    const result = useSlidesProduction();

    await vi.waitFor(
      () => {
        expect(result.isLoading.value).toBe(false);
      },
      { timeout: 1000, interval: 10 },
    );

    return result;
  }

  describe("URL generation in production", () => {
    it("should use slide path as URL in production mode", async () => {
      const result = await setupUseSlidesProduction();

      expect(result.slides.value[0].url).toBe("/slides-presentation-1/");
      expect(result.slides.value[1].url).toBe("/slides-presentation-2/");
      expect(result.slides.value[2].url).toBe("/slides-presentation-3/");
    });
  });

  describe("background image resolution in production", () => {
    it("should resolve relative background paths with window.location.origin", async () => {
      const result = await setupUseSlidesProduction();
      const firstSlide = result.slides.value[0];

      expect(firstSlide.image).toMatch(
        /^https:\/\/my-slides\.com\/slidev-workspace-starter\/slides-presentation-1\/og-image\.png\?v=\d+$/,
      );
    });

    it("should keep absolute URL backgrounds unchanged in production", async () => {
      const result = await setupUseSlidesProduction();
      const secondSlide = result.slides.value[1];

      expect(secondSlide.image).toBe("https://example.com/og-image.jpg");
    });

    it("should use default cover when no background in production", async () => {
      const result = await setupUseSlidesProduction();
      const thirdSlide = result.slides.value[2];

      expect(thirdSlide.image).toBe("https://cover.sli.dev");
    });
  });

  describe("og-image.png priority in production", () => {
    it("should prioritize og-image.png when hasOgImage is true in production", async () => {
      const result = await setupUseSlidesProduction();
      const firstSlide = result.slides.value[0];

      // First slide has hasOgImage: true, so should use og-image.png
      expect(firstSlide.image).toContain("og-image.png");
      expect(firstSlide.image).toMatch(
        /^https:\/\/my-slides\.com\/slidev-workspace-starter\/slides-presentation-1\/og-image\.png\?v=\d+$/,
      );
    });

    it("should use seoMeta.ogImage when hasOgImage is false in production", async () => {
      const result = await setupUseSlidesProduction();
      const secondSlide = result.slides.value[1];

      // Second slide has hasOgImage: false, so should use seoMeta.ogImage
      expect(secondSlide.image).toBe("https://example.com/og-image.jpg");
    });
  });
});
