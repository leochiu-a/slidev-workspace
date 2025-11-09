#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { cp, rm } from "node:fs/promises";
import { execSync } from "node:child_process";
import { build, createServer } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

import { slidesPlugin } from "./vite/plugin-slides.js";
import { loadConfig, resolveSlidesDirs } from "./scripts/config.js";

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
        const subDir = slideDir.startsWith(workspaceCwd)
          ? slideDir.replace(workspaceCwd, "").replace(/^\//, "")
          : slideDir;
        const buildCmd = `pnpm --filter "./${subDir}" run build --base ${baseUrl}${slideName}/`;
        console.log(buildCmd);
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

async function exportOgImages() {
  const workspaceCwd = process.env.SLIDEV_WORKSPACE_CWD || process.cwd();
  const config = loadConfig(workspaceCwd);
  const slidesDirs = resolveSlidesDirs(config, workspaceCwd);

  console.log("🖼️ Exporting OG images for all slides...");

  try {
    // Run export command for all slides
    execSync("pnpm -r export --format png --range 1", {
      cwd: workspaceCwd,
      stdio: "inherit",
    });

    console.log("📦 Copying exported images to og-image.png...");

    // Copy the exported files to og-image.png for each slide
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
          continue;
        }

        const exportedFile = join(slideDir, "slides-export", "1.png");
        const targetFile = join(slideDir, "og-image.png");
        const exportDir = join(slideDir, "slides-export");

        if (existsSync(exportedFile)) {
          await cp(exportedFile, targetFile);
          console.log(`✅ Generated OG image for: ${slideName}`);

          // Clean up the slides-export directory
          await rm(exportDir, { recursive: true, force: true });
        } else {
          console.warn(
            `⚠️ Export file not found for ${slideName}: ${exportedFile}`,
          );
        }
      }
    }

    console.log("✅ All OG images exported successfully!");
  } catch (error) {
    console.error("❌ Failed to export OG images:", error);
    process.exit(1);
  }
}

async function copySlidesToOutputDir() {
  const workspaceCwd = process.env.SLIDEV_WORKSPACE_CWD || process.cwd();
  const config = loadConfig(workspaceCwd);
  const slidesDirs = resolveSlidesDirs(config, workspaceCwd);
  const deployDir = resolve(workspaceCwd, config.outputDir);

  console.log(`📁 Copying slide builds into ${deployDir}...`);

  // Ensure the deployment directory exists. Vite build should create it, but guard just in case.
  if (!existsSync(deployDir)) {
    mkdirSync(deployDir, { recursive: true });
  }

  // Copy slides
  for (const slidesDir of slidesDirs) {
    if (!existsSync(slidesDir)) continue;

    const slides = readdirSync(slidesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const slideName of slides) {
      const slideDistDir = join(slidesDir, slideName, "dist");
      const targetDir = join(deployDir, slideName);

      if (existsSync(slideDistDir)) {
        console.log(`📋 Copying ${slideName}...`);
        await cp(slideDistDir, targetDir, { recursive: true });
      }
    }
  }

  console.log(`✅ All slide assets copied into ${deployDir}!`);
}

async function runViteBuild() {
  try {
    await buildAllSlides();

    console.log("📦 Building Slidev Workspace for production...");
    const config = createViteConfig();
    await build(config);

    // Copy slides into the workspace output directory
    await copySlidesToOutputDir();

    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

async function runVitePreview() {
  try {
    console.log("🚀 Starting Slidev Workspace development server...");

    // The slidesPlugin will automatically start all slides dev servers
    const config = createViteConfig();
    const server = await createServer(config);
    await server.listen();
    server.printUrls();
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
  dev        Start the development server
  build      Build the project for production
  export-og  Export OG images for all slides
  help       Show this help message

Examples:
  slidev-workspace dev                                    # Start development server
  slidev-workspace build                                  # Build all slides and preview app
  slidev-workspace export-og                              # Export OG images for all slides

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

    case "export-og":
      // Set the working directory for the configuration system
      process.env.SLIDEV_WORKSPACE_CWD = process.cwd();
      await exportOgImages();
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
