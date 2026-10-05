import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { build, createServer } from "vite";
import { loadConfig } from "../scripts/config";
import { buildSlides, copySlidesToOutputDir } from "./slides";

vi.mock("vite", () => ({
  build: vi.fn(),
  createServer: vi.fn(),
}));

vi.mock("@vitejs/plugin-vue", () => ({
  default: () => ({ name: "vue-plugin" }),
}));

vi.mock("@tailwindcss/vite", () => ({
  default: () => ({ name: "tailwind-plugin" }),
}));

vi.mock("../vite/plugin-slides", () => ({
  slidesPlugin: () => ({ name: "slides-plugin" }),
}));

vi.mock("../scripts/config", () => ({
  loadConfig: vi.fn(),
}));

vi.mock("./slides", () => ({
  buildSlides: vi.fn(),
  copySlidesToOutputDir: vi.fn(),
}));

describe("cli vite helpers", () => {
  const buildMock = vi.mocked(build);
  const createServerMock = vi.mocked(createServer);
  const loadConfigMock = vi.mocked(loadConfig);
  const buildSlidesMock = vi.mocked(buildSlides);
  const copySlidesMock = vi.mocked(copySlidesToOutputDir);

  const originalEnv = process.env.SLIDEV_WORKSPACE_CWD;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SLIDEV_WORKSPACE_CWD = "/tmp/slidev-workspace";
    loadConfigMock.mockReturnValue({
      baseUrl: "/base/",
      outputDir: "dist-out",
      slidesDir: ["slides"],
      exclude: [],
      hero: {
        title: "Slidev Workspace",
        description: "Test hero",
      },
      sidebar: {
        title: "Slidev Workspace",
        githubUrl: "https://github.com/example",
      },
      pagination: {
        pageSize: 12,
      },
    });
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.SLIDEV_WORKSPACE_CWD;
    } else {
      process.env.SLIDEV_WORKSPACE_CWD = originalEnv;
    }
  });

  it("createViteConfig builds config from workspace settings", async () => {
    const { createViteConfig } = await import("./vite");

    const config = createViteConfig(4321, "build");

    expect(config.base).toBe("/base/");
    expect(config.server.port).toBe(4321);
    expect(config.define.__SLIDEV_WORKSPACE_DEV_PORT_BASE__).toBe(4322);
    expect(config.root).toContain("slidev-workspace");
    expect(config.root.endsWith("src/preview")).toBe(true);
    expect(String(config.resolve.alias["@"])).toContain("slidev-workspace");
    expect(config.resolve.alias["@"].endsWith("src/preview")).toBe(true);
    expect(config.build.outDir.endsWith("dist-out")).toBe(true);
    expect(config.plugins).toEqual([
      { name: "vue-plugin" },
      { name: "tailwind-plugin" },
      { name: "slides-plugin" },
    ]);
  });

  it("createViteConfig uses root base in dev mode", async () => {
    const { createViteConfig } = await import("./vite");

    const config = createViteConfig(4321, "dev");

    expect(config.base).toBe("/");
  });

  it("runViteBuild calls build steps in order", async () => {
    const { runViteBuild } = await import("./vite");

    await runViteBuild(["alpha"]);

    expect(buildSlidesMock).toHaveBeenCalledWith(["alpha"]);
    expect(buildMock).toHaveBeenCalledTimes(1);
    expect(copySlidesMock).toHaveBeenCalledWith(["alpha"]);
  });

  it("runVitePreview starts the dev server", async () => {
    const listen = vi.fn().mockResolvedValue(undefined);
    const printUrls = vi.fn();
    createServerMock.mockResolvedValue({ listen, printUrls } as never);

    const { runVitePreview } = await import("./vite");

    await runVitePreview(3100);

    expect(createServerMock).toHaveBeenCalledTimes(1);
    const config = createServerMock.mock.calls[0]?.[0] as {
      server?: { port?: number };
    };
    expect(config.server?.port).toBe(3100);
    expect(listen).toHaveBeenCalled();
    expect(printUrls).toHaveBeenCalled();
  });
});
