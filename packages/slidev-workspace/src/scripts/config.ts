import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

interface SlidevWorkspaceConfig {
  slidesDir?: string[];
  outputDir?: string;
  baseUrl?: string;
  exclude?: string[];
}

const DEFAULT_CONFIG: SlidevWorkspaceConfig = {
  slidesDir: ["../../demo/slides", "./slides"],
  outputDir: "./slide-decks/dist",
  baseUrl: "/",
  exclude: ["node_modules", ".git"],
};

export function loadConfig(): SlidevWorkspaceConfig {
  const configPaths = [
    "slidev-workspace.config.js",
    "slidev-workspace.config.ts",
    "slidev-workspace.yml",
    "slidev-workspace.yaml",
  ];

  const currentDir = dirname(fileURLToPath(import.meta.url));
  const projectRoot = resolve(currentDir, "..");

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

export function resolveSlidesDirs(config: SlidevWorkspaceConfig): string[] {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const projectRoot = resolve(currentDir, "..");

  return (config.slidesDir || []).map(dir => {
    if (resolve(dir) === dir) {
      // Absolute path
      return dir;
    } else {
      // Relative path
      return resolve(projectRoot, dir);
    }
  }).filter(dir => existsSync(dir));
}

export { type SlidevWorkspaceConfig };