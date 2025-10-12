import { describe, it, expect } from "vitest";
import { pathJoin } from "./pathJoin";

describe("pathJoin", () => {
  describe("basic functionality", () => {
    it("should join simple path segments", () => {
      expect(pathJoin("a", "b", "c")).toBe("a/b/c");
    });

    it("should handle single segment", () => {
      expect(pathJoin("path")).toBe("path");
    });

    it("should return empty string for no arguments", () => {
      expect(pathJoin()).toBe("");
    });

    it("should return empty string for all empty segments", () => {
      expect(pathJoin("", "", "")).toBe("");
    });
  });

  describe("leading slashes", () => {
    it("should preserve leading slash for absolute paths", () => {
      expect(pathJoin("/a", "b", "c")).toBe("/a/b/c");
    });

    it("should not add leading slash for relative paths", () => {
      expect(pathJoin("a", "b", "c")).toBe("a/b/c");
    });

    it("should preserve leading slash with trailing slashes", () => {
      expect(pathJoin("/a/", "b/", "c/")).toBe("/a/b/c");
    });
  });

  describe("trailing slashes", () => {
    it("should remove trailing slashes from segments", () => {
      expect(pathJoin("a/", "b/", "c/")).toBe("a/b/c");
    });

    it("should handle segments with both leading and trailing slashes", () => {
      expect(pathJoin("/a/", "/b/", "/c/")).toBe("/a/b/c");
    });
  });

  describe("duplicate slashes", () => {
    it("should remove duplicate slashes between segments", () => {
      expect(pathJoin("a//", "//b", "c")).toBe("a/b/c");
    });

    it("should handle multiple consecutive slashes", () => {
      expect(pathJoin("a///", "///b///", "///c")).toBe("a/b/c");
    });

    it("should handle absolute paths with multiple slashes", () => {
      expect(pathJoin("///a", "b", "c")).toBe("/a/b/c");
    });
  });

  describe("empty segments", () => {
    it("should filter out empty segments", () => {
      expect(pathJoin("a", "", "b", "", "c")).toBe("a/b/c");
    });

    it("should handle empty segments with slashes", () => {
      expect(pathJoin("/a", "", "/b", "", "c")).toBe("/a/b/c");
    });
  });

  describe("real-world use cases", () => {
    it("should join base URL and relative path", () => {
      expect(pathJoin("/base/", "/path/", "file.jpg")).toBe(
        "/base/path/file.jpg",
      );
    });

    it("should join without leading slash", () => {
      expect(pathJoin("base", "path", "file.jpg")).toBe("base/path/file.jpg");
    });

    it("should join base and path segments", () => {
      expect(pathJoin("/base/", "path")).toBe("/base/path");
    });

    it("should handle slidev-workspace paths", () => {
      expect(
        pathJoin(
          "/slidev-workspace-starter",
          "/slides-presentation-1/",
          "bg1.jpg",
        ),
      ).toBe("/slidev-workspace-starter/slides-presentation-1/bg1.jpg");
    });

    it("should handle relative paths for slide backgrounds", () => {
      expect(pathJoin("slides-presentation-1/", "bg1.jpg")).toBe(
        "slides-presentation-1/bg1.jpg",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle only slashes", () => {
      expect(pathJoin("/", "/", "/")).toBe("/");
    });

    it("should handle single slash", () => {
      expect(pathJoin("/")).toBe("/");
    });

    it("should handle path with dots", () => {
      expect(pathJoin("path", "to", "../file.jpg")).toBe("path/to/../file.jpg");
    });

    it("should handle file extensions", () => {
      expect(pathJoin("/path", "file.name.ext")).toBe("/path/file.name.ext");
    });
  });
});
