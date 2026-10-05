import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig, resolveSlidesDirs } from "../scripts/config";
import { collectSlides } from "../scripts/collectSlides";

const execSyncMock = vi.hoisted(() => vi.fn());

vi.mock("node:child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:child_process")>();
  return {
    ...actual,
    execSync: execSyncMock,
    default: {
      ...actual,
      execSync: execSyncMock,
    },
  };
});

vi.mock("child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("child_process")>();
  return {
    ...actual,
    execSync: execSyncMock,
    default: {
      ...actual,
      execSync: execSyncMock,
    },
  };
});

vi.mock("../scripts/config", () => ({
  loadConfig: vi.fn(),
  resolveSlidesDirs: vi.fn(),
}));

vi.mock("../scripts/collectSlides", () => ({
  collectSlides: vi.fn(),
}));

describe("cli slides helpers", () => {
  let tempRoot: string;

  const loadConfigMock = vi.mocked(loadConfig);
  const resolveSlidesDirsMock = vi.mocked(resolveSlidesDirs);
  const collectSlidesMock = vi.mocked(collectSlides);

  beforeEach(() => {
    vi.clearAllMocks();
    tempRoot = mkdtempSync(join(tmpdir(), "slidev-workspace-cli-"));
    process.env.SLIDEV_WORKSPACE_CWD = tempRoot;

    loadConfigMock.mockReturnValue({
      baseUrl: "https://example.com/base",
      outputDir: "dist-output",
      exclude: [],
      slidesDir: ["slides"],
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
    resolveSlidesDirsMock.mockReturnValue([join(tempRoot, "slides")]);
  });

  afterEach(() => {
    rmSync(tempRoot, { recursive: true, force: true });
    delete process.env.SLIDEV_WORKSPACE_CWD;
  });

  it("buildSlides runs build commands for slides with package.json", async () => {
    const slidesRoot = join(tempRoot, "slides");
    const slideDir = join(slidesRoot, "alpha");
    mkdirSync(slideDir, { recursive: true });
    writeFileSync(join(slideDir, "package.json"), "{}");

    collectSlidesMock.mockReturnValue([
      { slidesDir: slidesRoot, slideDir, slideName: "alpha" },
    ]);

    const { buildSlides } = await import("./slides");

    await buildSlides();

    expect(execSyncMock).toHaveBeenCalledWith(
      'pnpm --filter "./slides/alpha" run build --base https://example.com/base/alpha/',
      {
        cwd: tempRoot,
        stdio: "inherit",
      },
    );
  });

  it("buildSlides warns when package.json is missing", async () => {
    const slidesRoot = join(tempRoot, "slides");
    const slideDir = join(slidesRoot, "missing");
    mkdirSync(slideDir, { recursive: true });

    collectSlidesMock.mockReturnValue([
      { slidesDir: slidesRoot, slideDir, slideName: "missing" },
    ]);

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { buildSlides } = await import("./slides");

    await buildSlides();

    expect(execSyncMock).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Skipping missing"),
    );

    warnSpy.mockRestore();
  });

  it("exportOgImages copies the exported image and cleans up", async () => {
    const slidesRoot = join(tempRoot, "slides");
    const slideDir = join(slidesRoot, "alpha");
    mkdirSync(join(slideDir, "slides-export"), { recursive: true });
    writeFileSync(join(slideDir, "package.json"), "{}");
    writeFileSync(join(slideDir, "slides-export", "1.png"), "image");

    collectSlidesMock.mockReturnValue([
      { slidesDir: slidesRoot, slideDir, slideName: "alpha" },
    ]);

    const { exportOgImages } = await import("./slides");

    await exportOgImages();

    expect(execSyncMock).toHaveBeenCalledWith(
      "pnpm -r export --format png --range 1",
      {
        cwd: tempRoot,
        stdio: "inherit",
      },
    );
    expect(existsSync(join(slideDir, "og-image.png"))).toBe(true);
    expect(existsSync(join(slideDir, "slides-export"))).toBe(false);
  });

  it("copySlidesToOutputDir copies built slide assets", async () => {
    const slidesRoot = join(tempRoot, "slides");
    const slideDir = join(slidesRoot, "alpha");
    const distDir = join(slideDir, "dist");
    mkdirSync(distDir, { recursive: true });
    writeFileSync(join(distDir, "index.html"), "ok");

    collectSlidesMock.mockReturnValue([
      { slidesDir: slidesRoot, slideDir, slideName: "alpha" },
    ]);

    const { copySlidesToOutputDir } = await import("./slides");

    await copySlidesToOutputDir();

    expect(
      existsSync(join(tempRoot, "dist-output", "alpha", "index.html")),
    ).toBe(true);
  });
});
