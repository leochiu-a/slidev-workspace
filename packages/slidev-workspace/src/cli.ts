#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { build, createServer } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { slidesPlugin, loadConfig } from "./index.js";

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

async function runViteBuild() {
  try {
    console.log("📦 Building Slidev Workspace for production...");
    const config = createViteConfig();
    await build(config);
    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

async function runVitePreview() {
  try {
    console.log("🚀 Starting Slidev Workspace development server...");
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
  dev     Start the development server
  build   Build the project for production
  help    Show this help message

Examples:
  slidev-workspace dev    # Start development server
  slidev-workspace build  # Build for production

For more information, visit: https://github.com/author/slidev-workspace
`);
}

async function main() {
  switch (command) {
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
