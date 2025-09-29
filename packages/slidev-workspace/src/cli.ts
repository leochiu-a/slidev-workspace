#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { cp } from "node:fs/promises";
import { execSync } from "node:child_process";
import { build, createServer } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

import { slidesPlugin } from "./vite/plugin-slides.js";
import { loadConfig, resolveSlidesDirs } from "./scripts/config.js";
import {
  startAllSlidesDevServer,
  stopAllDevServers,
} from "./scripts/devServer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const packageRoot = join(__dirname, "..");

function createViteConfig() {
  const workspaceCwd = process.env.SLIDEV_WORKSPACE_CWD || process.cwd();
  const config = loadConfig(workspaceCwd);

  return {
    root: resolve(packageRoot, "src/preview"),
    base: config.baseUrl,
    plugins: [vue(), tailwindcss(), slidesPlugin()],
    resolve: {
      alias: {
        "@": resolve(packageRoot, "src/preview"),
      },
    },
    build: {
      outDir: resolve(workspaceCwd, config.outputDir),
    },
    server: {
      port: 3000,
      open: true,
    },
  };
}

async function buildAllSlides() {
  const workspaceCwd = process.env.SLIDEV_WORKSPACE_CWD || process.cwd();
  const config = loadConfig(workspaceCwd);
  const slidesDirs = resolveSlidesDirs(config, workspaceCwd);

  console.log("🔨 Building all slides...");

  for (const slidesDir of slidesDirs) {
    if (!existsSync(slidesDir)) {
      console.warn(`⚠️ Slides directory not found: ${slidesDir}`);
      continue;
    }

    const slides = readdirSync(slidesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const slideName of slides) {
      const slideDir = join(slidesDir, slideName);
      const packageJsonPath = join(slideDir, "package.json");

      if (!existsSync(packageJsonPath)) {
        console.warn(`⚠️ Skipping ${slideName}: no package.json found`);
        continue;
      }

      console.log(`📦 Building slide: ${slideName}`);

      try {
        // Use execSync to run pnpm build command for each slide
        const baseUrl = config.baseUrl.endsWith("/")
          ? config.baseUrl
          : config.baseUrl + "/";
        const buildCmd = `pnpm --filter "./slides/${slideName}" run build --base ${baseUrl}${slideName}/`;
        execSync(buildCmd, {
          cwd: workspaceCwd,
          stdio: "inherit",
        });
        console.log(`✅ Built slide: ${slideName}`);
      } catch (error) {
        console.error(`❌ Failed to build slide ${slideName}:`, error);
        process.exit(1);
      }
    }
  }
}

async function copyToGhPages() {
  const workspaceCwd = process.env.SLIDEV_WORKSPACE_CWD || process.cwd();
  const config = loadConfig(workspaceCwd);
  const slidesDirs = resolveSlidesDirs(config, workspaceCwd);
  const ghPagesDir = join(workspaceCwd, "_gh-pages");

  console.log("📁 Copying files to _gh-pages directory...");

  // Create _gh-pages directory if it doesn't exist
  if (!existsSync(ghPagesDir)) {
    mkdirSync(ghPagesDir, { recursive: true });
  }

  // Copy slides
  for (const slidesDir of slidesDirs) {
    if (!existsSync(slidesDir)) continue;

    const slides = readdirSync(slidesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const slideName of slides) {
      const slideDistDir = join(slidesDir, slideName, "dist");
      const targetDir = join(ghPagesDir, slideName);

      if (existsSync(slideDistDir)) {
        console.log(`📋 Copying ${slideName} to _gh-pages...`);
        await cp(slideDistDir, targetDir, { recursive: true });
      }
    }
  }

  // Copy preview app as index
  const previewDistDir = join(workspaceCwd, config.outputDir);
  if (existsSync(previewDistDir)) {
    console.log("📋 Copying preview app as index...");
    await cp(previewDistDir, ghPagesDir, { recursive: true });
  }

  console.log("✅ All files copied to _gh-pages successfully!");
}

async function runViteBuild() {
  try {
    await buildAllSlides();

    console.log("📦 Building Slidev Workspace for production...");
    const config = createViteConfig();
    await build(config);

    // Copy everything to _gh-pages
    await copyToGhPages();

    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

async function runVitePreview() {
  try {
    console.log("🚀 Starting Slidev Workspace development server...");

    // Start all slides dev servers first
    const devServers = await startAllSlidesDevServer();

    // Then start the preview app
    const config = createViteConfig();
    const server = await createServer(config);
    await server.listen();
    server.printUrls();

    // Handle graceful shutdown
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutting down all dev servers...");
      stopAllDevServers(devServers);
      server.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Development server failed:", error);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Slidev Workspace - A tool for managing multiple Slidev presentations

Usage:
  slidev-workspace <command> [options]

Commands:
  dev     Start the development server
  build   Build the project for production
  help    Show this help message

Examples:
  slidev-workspace dev                                    # Start development server
  slidev-workspace build                                  # Build all slides and preview app

Configuration:
  Use slidev-workspace.yml to set baseUrl for all builds

For more information, visit: https://github.com/author/slidev-workspace
`);
}

async function main() {
  switch (command) {
    case "dev":
    case "preview":
      // Set the working directory for the configuration system
      process.env.SLIDEV_WORKSPACE_CWD = process.cwd();
      await runVitePreview();
      break;

    case "build":
      // Set the working directory for the configuration system
      process.env.SLIDEV_WORKSPACE_CWD = process.cwd();
      await runViteBuild();
      break;

    case "help":
    case "--help":
    case "-h":
      showHelp();
      break;

    default:
      if (!command) {
        showHelp();
      } else {
        console.error(`Unknown command: ${command}`);
        console.error('Run "slidev-workspace help" for available commands.');
        process.exit(1);
      }
  }
}

main().catch((error) => {
  console.error("❌ An error occurred:", error);
  process.exit(1);
});
