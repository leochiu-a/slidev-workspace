import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { loadConfig, resolveSlidesDirs } from "./config";

let tempRoot: string;

beforeEach(() => {
  tempRoot = mkdtempSync(join(tmpdir(), "slidev-workspace-config-"));
});

afterEach(() => {
  rmSync(tempRoot, { recursive: true, force: true });
});

describe("scripts config", () => {
  it("loadConfig returns defaults when no config exists", () => {
    const config = loadConfig(tempRoot);

    expect(config.baseUrl).toBe("/");
    expect(config.outputDir).toBe("./dist");
    expect(config.slidesDir).toEqual(["./slides"]);
    expect(config.exclude).toEqual(["node_modules", ".git"]);
    expect(config.hero.title).toBe("Slide Deck");
    expect(config.sidebar.title).toBe("Slide Deck");
    expect(config.sidebar.githubUrl).toBe("");
    expect(config.pagination).toEqual({ pageSize: 12 });
  });

  it("loadConfig reads pagination pageSize from yaml", () => {
    writeFileSync(
      join(tempRoot, "slidev-workspace.yaml"),
      ["pagination:", "  pageSize: 6"].join("\n"),
    );

    expect(loadConfig(tempRoot).pagination).toEqual({ pageSize: 6 });
  });

  it("loadConfig keeps default pageSize when pagination is empty", () => {
    writeFileSync(join(tempRoot, "slidev-workspace.yaml"), "pagination: {}");

    expect(loadConfig(tempRoot).pagination).toEqual({ pageSize: 12 });
  });

  it("loadConfig merges yaml values with defaults", () => {
    const yamlPath = join(tempRoot, "slidev-workspace.yaml");
    writeFileSync(
      yamlPath,
      [
        "baseUrl: /base/",
        "outputDir: dist-custom",
        "slidesDir:",
        "  - ./slides",
        "exclude:",
        "  - dist",
        "hero:",
        "  title: Custom Title",
        "  description: Custom Description",
        "sidebar:",
        "  title: Custom Sidebar",
        "  githubUrl: https://github.com/example/repo",
      ].join("\n"),
    );

    const config = loadConfig(tempRoot);

    expect(config.baseUrl).toBe("/base/");
    expect(config.outputDir).toBe("dist-custom");
    expect(config.slidesDir).toEqual(["./slides"]);
    expect(config.exclude).toEqual(["dist"]);
    expect(config.hero).toEqual({
      title: "Custom Title",
      description: "Custom Description",
    });
    expect(config.sidebar).toEqual({
      title: "Custom Sidebar",
      githubUrl: "https://github.com/example/repo",
    });
  });

  it("loadConfig preserves default hero when omitted", () => {
    const yamlPath = join(tempRoot, "slidev-workspace.yml");
    writeFileSync(yamlPath, "baseUrl: /custom/");

    const config = loadConfig(tempRoot);

    expect(config.baseUrl).toBe("/custom/");
    expect(config.hero.title).toBe("Slide Deck");
    expect(config.sidebar.title).toBe("Slide Deck");
    expect(config.sidebar.githubUrl).toBe("");
  });

  it("resolveSlidesDirs resolves existing relative and absolute paths", () => {
    const slidesDir = join(tempRoot, "slides");
    const extraDir = join(tempRoot, "extra");
    mkdirSync(slidesDir, { recursive: true });
    mkdirSync(extraDir, { recursive: true });

    const resolved = resolveSlidesDirs(
      {
        slidesDir: ["./slides", resolve(extraDir), "./missing"],
        outputDir: "dist",
        baseUrl: "/",
        exclude: [],
        hero: {
          title: "Slide Deck",
          description: "Default",
        },
        sidebar: {
          title: "Slide Deck",
        },
        pagination: {
          pageSize: 12,
        },
      },
      tempRoot,
    );

    expect(resolved).toEqual([resolve(tempRoot, "slides"), extraDir]);
  });
});
