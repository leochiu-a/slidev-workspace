import { readFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import { parse as parseYaml } from "yaml";
import type { SlidevWorkspaceConfig } from "../types/config.js";

const DEFAULT_CONFIG: SlidevWorkspaceConfig = {
  slidesDir: ["./slides"],
  outputDir: "./dist",
  baseUrl: "/",
  exclude: ["node_modules", ".git"],
};

export function loadConfig(workingDir?: string): SlidevWorkspaceConfig {
  const configPaths = [
    "slidev-workspace.config.js",
    "slidev-workspace.config.ts",
    "slidev-workspace.yml",
    "slidev-workspace.yaml",
  ];

  // Use provided working directory, environment variable, or fallback to process.cwd()
  const projectRoot =
    workingDir || process.env.SLIDEV_WORKSPACE_CWD || process.cwd();

  for (const configPath of configPaths) {
    const fullPath = join(projectRoot, configPath);

    if (existsSync(fullPath)) {
      try {
        if (configPath.endsWith(".yml") || configPath.endsWith(".yaml")) {
          const content = readFileSync(fullPath, "utf8");
          const config = parseYaml(content) as SlidevWorkspaceConfig;
          return { ...DEFAULT_CONFIG, ...config };
        }
        // For JS/TS config files, we'd need dynamic import here
        // For now, just use YAML configs
      } catch (error) {
        console.warn(`Failed to load config from ${fullPath}:`, error);
      }
    }
  }

  return DEFAULT_CONFIG;
}

export function resolveSlidesDirs(
  config: SlidevWorkspaceConfig,
  workingDir?: string,
): string[] {
  const projectRoot =
    workingDir || process.env.SLIDEV_WORKSPACE_CWD || process.cwd();

  const resolvedDirs = (config.slidesDir || [])
    .map((dir) => {
      if (resolve(dir) === dir) {
        // Absolute path
        return dir;
      } else {
        // Relative path
        return resolve(projectRoot, dir);
      }
    })
    .filter((dir) => {
      const exists = existsSync(dir);
      return exists;
    });
  return resolvedDirs;
}
