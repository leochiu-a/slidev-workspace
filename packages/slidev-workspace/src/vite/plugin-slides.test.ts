import { describe, it, expect, vi, beforeEach } from "vitest";
import { EventEmitter } from "node:events";

const watchMock = vi.hoisted(() => vi.fn());
const readdirSyncMock = vi.hoisted(() => vi.fn());
const cpSyncMock = vi.hoisted(() => vi.fn());
const existsSyncMock = vi.hoisted(() => vi.fn());
const getAllSlidesFrontmatterMock = vi.hoisted(() => vi.fn());
const loadConfigMock = vi.hoisted(() => vi.fn());
const resolveSlidesDirsMock = vi.hoisted(() => vi.fn());
const startAllSlidesDevServerMock = vi.hoisted(() => vi.fn());
const stopAllDevServersMock = vi.hoisted(() => vi.fn());
const collectSlidesMock = vi.hoisted(() => vi.fn());
const transformIndexHtmlMock = vi.hoisted(() => vi.fn());

vi.mock("fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("fs")>();
  return {
    ...actual,
    watch: watchMock,
    readdirSync: readdirSyncMock,
    cpSync: cpSyncMock,
    existsSync: existsSyncMock,
    default: {
      ...actual,
      watch: watchMock,
      readdirSync: readdirSyncMock,
      cpSync: cpSyncMock,
      existsSync: existsSyncMock,
    },
  };
});

vi.mock("../scripts/getSlideFrontmatter", () => ({
  getAllSlidesFrontmatter: getAllSlidesFrontmatterMock,
}));

vi.mock("../scripts/config", () => ({
  loadConfig: loadConfigMock,
  resolveSlidesDirs: resolveSlidesDirsMock,
}));

vi.mock("../scripts/devServer", () => ({
  startAllSlidesDevServer: startAllSlidesDevServerMock,
  stopAllDevServers: stopAllDevServersMock,
}));

vi.mock("../scripts/collectSlides", () => ({
  collectSlides: collectSlidesMock,
}));

vi.mock("./transformIndexHtml", () => ({
  transformIndexHtml: transformIndexHtmlMock,
}));

const getHookHandler = <T extends (...args: any[]) => any>(
  hook: T | { handler: T } | undefined,
): T | undefined => {
  if (!hook) {
    return undefined;
  }
  return typeof hook === "function" ? hook : hook.handler;
};

describe("vite slidesPlugin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    loadConfigMock.mockReturnValue({
      slidesDir: ["./slides"],
      outputDir: "dist",
      baseUrl: "/",
      exclude: [],
      hero: {
        title: "Hero",
        description: "Description",
      },
      sidebar: {
        title: "Sidebar",
        githubUrl: "https://github.com/example",
      },
    });
    resolveSlidesDirsMock.mockReturnValue(["/workspace/slides"]);
    startAllSlidesDevServerMock.mockResolvedValue([
      { name: "alpha", port: 3001, process: {} },
    ]);
  });

  it("delegates transformIndexHtml with the resolved base", async () => {
    transformIndexHtmlMock.mockResolvedValue("<html>ok</html>");
    const { slidesPlugin } = await import("./plugin-slides");

    const plugin = slidesPlugin();
    const configResolvedHook = getHookHandler(plugin.configResolved);
    await configResolvedHook?.call(
      {} as never,
      {
        base: "/presentations/",
      } as never,
    );
    const transformHook = getHookHandler(plugin.transformIndexHtml);
    const result = await transformHook?.call(
      {} as never,
      "<html></html>",
      {} as never,
    );

    expect(transformIndexHtmlMock).toHaveBeenCalledWith(
      "<html></html>",
      "/presentations/",
    );
    expect(result).toBe("<html>ok</html>");
  });

  it("provides slidev virtual modules", async () => {
    const { slidesPlugin } = await import("./plugin-slides");
    const plugin = slidesPlugin();

    const resolveIdHook = getHookHandler(plugin.resolveId);
    expect(
      resolveIdHook?.call({} as never, "slidev:content", undefined, {
        isEntry: false,
      }),
    ).toBe("slidev:content");
    expect(
      resolveIdHook?.call({} as never, "slidev:config", undefined, {
        isEntry: false,
      }),
    ).toBe("slidev:config");

    getAllSlidesFrontmatterMock.mockReturnValue([{ title: "Alpha" }]);
    const loadHook = getHookHandler(plugin.load);
    const content = loadHook?.call(
      {} as never,
      "slidev:content",
      undefined,
    ) as string;
    expect(content).toContain("slidesData");
    expect(content).toContain('"title": "Alpha"');

    const config = loadHook?.call(
      {} as never,
      "slidev:config",
      undefined,
    ) as string;
    expect(config).toContain("configData");
    expect(config).toContain('"title": "Hero"');
  });

  it("watches slides and sends HMR updates", async () => {
    const watcherClose = vi.fn();
    let watcherCallback:
      | ((event: string, filename: string) => void)
      | undefined;

    watchMock.mockImplementation(
      (_path: string, _options: unknown, callback: typeof watcherCallback) => {
        watcherCallback = callback as typeof watcherCallback;
        return { close: watcherClose };
      },
    );

    getAllSlidesFrontmatterMock.mockReturnValue([{ title: "Alpha" }]);

    const server = {
      ws: { send: vi.fn() },
      httpServer: new EventEmitter(),
    };

    const { slidesPlugin } = await import("./plugin-slides");
    const plugin = slidesPlugin({ devServerBasePort: 4500 });

    const configureServerHook = getHookHandler(plugin.configureServer);
    await configureServerHook?.call({} as never, server as never);

    watcherCallback?.("change", "slides.md");

    expect(getAllSlidesFrontmatterMock).toHaveBeenCalled();
    expect(server.ws.send).toHaveBeenCalledWith({
      type: "custom",
      event: "slides-updated",
      data: [{ title: "Alpha" }],
    });

    server.httpServer.emit("close");
    expect(watcherClose).toHaveBeenCalled();
    expect(stopAllDevServersMock).toHaveBeenCalledWith([
      { name: "alpha", port: 3001, process: {} },
    ]);
    expect(startAllSlidesDevServerMock).toHaveBeenCalledWith({
      basePort: 4500,
    });
  });

  it("copies hashed og-image on closeBundle", async () => {
    existsSyncMock.mockImplementation((path) =>
      String(path).endsWith("/assets"),
    );
    readdirSyncMock.mockReturnValue(["og-image-abc123.png", "other.png"]);
    collectSlidesMock.mockReturnValue([
      {
        slideDir: "/workspace/slides/alpha",
        slideName: "alpha",
        slidesDir: "/workspace/slides",
      },
    ]);

    const { slidesPlugin } = await import("./plugin-slides");
    const plugin = slidesPlugin();

    const closeBundleHook = getHookHandler(plugin.closeBundle);
    await closeBundleHook?.call({} as never);

    expect(cpSyncMock).toHaveBeenCalledWith(
      "/workspace/slides/alpha/dist/assets/og-image-abc123.png",
      "/workspace/slides/alpha/dist/og-image.png",
      { force: true },
    );
  });
});
