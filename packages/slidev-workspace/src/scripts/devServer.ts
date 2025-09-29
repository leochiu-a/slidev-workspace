import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";
import { loadConfig, resolveSlidesDirs } from "./config.js";

export interface DevServerInfo {
  name: string;
  port: number;
  process: any;
}

export async function startAllSlidesDevServer(
  workspaceCwd?: string,
): Promise<DevServerInfo[]> {
  const cwd = workspaceCwd || process.env.SLIDEV_WORKSPACE_CWD || process.cwd();
  const config = loadConfig(cwd);
  const slidesDirs = resolveSlidesDirs(config, cwd);

  let currentPort = 3001; // Start from 3001, 3000 is reserved for preview app
  const devServers: DevServerInfo[] = [];

  console.log("🚀 Starting Slidev dev servers for all slides...");

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

      console.log(
        `📦 Starting Slidev dev server for ${slideName} on port ${currentPort}...`,
      );

      try {
        // Start slidev dev server with custom port
        const devProcess = spawn(
          "pnpm",
          ["run", "dev", "--port", currentPort.toString()],
          {
            cwd: slideDir,
            stdio: ["ignore", "pipe", "pipe"],
            detached: false,
          },
        );

        devProcess.stdout?.on("data", (data) => {
          const output = data.toString();
          if (output.includes("Local:") || output.includes("ready")) {
            console.log(
              `✅ ${slideName} dev server ready on port ${currentPort}`,
            );
          }
        });

        devProcess.stderr?.on("data", (data) => {
          console.error(`❌ ${slideName} dev server error:`, data.toString());
        });

        devServers.push({
          name: slideName,
          port: currentPort,
          process: devProcess,
        });

        currentPort++;
      } catch (error) {
        console.error(`❌ Failed to start dev server for ${slideName}:`, error);
      }
    }
  }

  return devServers;
}

export function stopAllDevServers(devServers: DevServerInfo[]) {
  console.log("🛑 Shutting down all dev servers...");
  devServers.forEach(({ name, process }) => {
    console.log(`   Stopping ${name}...`);
    process.kill();
  });
}
