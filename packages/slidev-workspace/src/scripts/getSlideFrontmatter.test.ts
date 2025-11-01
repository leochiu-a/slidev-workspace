import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getSlideFrontmatterByPath } from "./getSlideFrontmatter";
import * as fs from "fs";
import type { PathLike } from "fs";

// Mock fs module
vi.mock("fs");
vi.mock("./config.js", () => ({
  loadConfig: () => ({
    baseUrl: "/test-base/",
    exclude: ["excluded"],
  }),
  resolveSlidesDirs: () => ["/test/slides"],
}));

describe("getSlideFrontmatterByPath", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should detect og-image.png when it exists", () => {
    const mockContent = `---
title: Test Slide
---
# Content`;

    vi.mocked(fs.existsSync).mockImplementation((path: PathLike) => {
      const pathStr = String(path);
      // Check if path is for og-image.png or slides.md
      return pathStr.endsWith("og-image.png") || pathStr.endsWith("slides.md");
    });

    vi.mocked(fs.readFileSync).mockReturnValue(
      mockContent as unknown as string,
    );

    const result = getSlideFrontmatterByPath("/test/slides", "slide-1");

    expect(result).not.toBeNull();
    expect(result?.hasOgImage).toBe(true);
  });

  it("should detect missing og-image.png", () => {
    const mockContent = `---
title: Test Slide
---
# Content`;

    vi.mocked(fs.existsSync).mockImplementation((path: PathLike) => {
      const pathStr = String(path);
      // Only slides.md exists, not og-image.png
      return pathStr.endsWith("slides.md");
    });

    vi.mocked(fs.readFileSync).mockReturnValue(
      mockContent as unknown as string,
    );

    const result = getSlideFrontmatterByPath("/test/slides", "slide-2");

    expect(result).not.toBeNull();
    expect(result?.hasOgImage).toBe(false);
  });

  it("should include hasOgImage in returned SlideInfo", () => {
    const mockContent = `---
title: My Slide
author: John Doe
background: /bg.jpg
---
# Slide Content`;

    vi.mocked(fs.existsSync).mockImplementation((path: PathLike) => {
      const pathStr = String(path);
      return pathStr.endsWith("slides.md") || pathStr.endsWith("og-image.png");
    });

    vi.mocked(fs.readFileSync).mockReturnValue(
      mockContent as unknown as string,
    );

    const result = getSlideFrontmatterByPath("/test/slides", "test-slide");

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("hasOgImage");
    expect(typeof result?.hasOgImage).toBe("boolean");
  });

  it("should correctly parse frontmatter and include hasOgImage", () => {
    const mockContent = `---
title: Test Presentation
author: Jane Doe
date: 2024-01-15
---
# Presentation Content`;

    vi.mocked(fs.existsSync).mockImplementation((path: PathLike) => {
      const pathStr = String(path);
      // slides.md exists, og-image.png does not
      return pathStr.endsWith("slides.md");
    });

    vi.mocked(fs.readFileSync).mockReturnValue(
      mockContent as unknown as string,
    );

    const result = getSlideFrontmatterByPath("/test/slides", "test-pres");

    expect(result).not.toBeNull();
    expect(result?.frontmatter.title).toBe("Test Presentation");
    expect(result?.frontmatter.author).toBe("Jane Doe");
    expect(result?.hasOgImage).toBe(false);
  });

  it("should handle seoMeta in frontmatter with hasOgImage", () => {
    const mockContent = `---
title: SEO Test
seoMeta:
  ogImage: /custom-og.jpg
  ogDescription: Custom description
---
# Content`;

    vi.mocked(fs.existsSync).mockImplementation((path: PathLike) => {
      const pathStr = String(path);
      return pathStr.endsWith("slides.md");
    });

    vi.mocked(fs.readFileSync).mockReturnValue(
      mockContent as unknown as string,
    );

    const result = getSlideFrontmatterByPath("/test/slides", "seo-slide");

    expect(result).not.toBeNull();
    expect(result?.frontmatter.seoMeta?.ogImage).toBe("/custom-og.jpg");
    expect(result?.hasOgImage).toBe(false); // og-image.png doesn't exist
  });

  it("should prioritize og-image.png detection correctly", () => {
    const mockContent = `---
title: Priority Test
seoMeta:
  ogImage: /seo-og.jpg
background: /bg.jpg
---
# Content`;

    vi.mocked(fs.existsSync).mockImplementation((path: PathLike) => {
      const pathStr = String(path);
      // On the og-image.png check, return true
      if (pathStr.endsWith("og-image.png")) {
        return true;
      }
      // On the slides.md check, return true
      return pathStr.endsWith("slides.md");
    });

    vi.mocked(fs.readFileSync).mockReturnValue(
      mockContent as unknown as string,
    );

    const result = getSlideFrontmatterByPath("/test/slides", "priority-test");

    expect(result).not.toBeNull();
    // Even though seoMeta.ogImage and background exist, hasOgImage should be true
    expect(result?.hasOgImage).toBe(true);
    expect(result?.frontmatter.seoMeta?.ogImage).toBe("/seo-og.jpg");
    expect(result?.frontmatter.background).toBe("/bg.jpg");
  });
});
