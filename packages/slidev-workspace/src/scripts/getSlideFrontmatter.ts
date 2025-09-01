import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname, basename } from "path";
import { parse as parseYaml } from "yaml";
import { fileURLToPath } from "url";
import { loadConfig, resolveSlidesDirs } from "./config.js";

// Define the structure for slide frontmatter
export interface SlideFrontmatter {
  theme?: string;
  background?: string;
  title?: string;
  info?: string;
  class?: string;
  drawings?: {
    persist?: boolean;
  };
  transition?: string;
  mdc?: boolean;
  seoMeta?: {
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  [key: string]: any;
}

// Define the structure for slide information
export interface SlideInfo {
  id: string; // unique identifier for the slide
  path: string; // relative path from slides directory
  fullPath: string; // absolute path to the slide file
  sourceDir: string; // which slides directory this came from
  frontmatter: SlideFrontmatter;
  content: string;
}

// Get the frontmatter and content of a single slide by ID
export function getSlideFrontmatter(slideId: string): SlideInfo | null {
  const allSlides = getAllSlidesFrontmatter();
  return allSlides.find(slide => slide.id === slideId) || null;
}

// Get the frontmatter and content of a slide from a specific path
export function getSlideFrontmatterByPath(slideDir: string, slideName: string): SlideInfo | null {
  try {
    const fullPath = join(slideDir, slideName, "slides.md");

    // Check if the slide file exists
    if (!existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      return null;
    }

    const content = readFileSync(fullPath, "utf8");

    // Parse frontmatter (YAML format between ---)
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);

    if (!frontmatterMatch) {
      console.warn(`Frontmatter not found in ${fullPath}`);
      return null;
    }

    const frontmatterYaml = frontmatterMatch[1];
    const frontmatter = parseYaml(frontmatterYaml) as SlideFrontmatter;

    // Create unique ID from source directory and slide name
    const sourceBasename = basename(slideDir);
    const slideId = `${sourceBasename}/${slideName}`;

    return {
      id: slideId,
      path: slideName,
      fullPath,
      sourceDir: slideDir,
      frontmatter,
      content: content.replace(frontmatterMatch[0], ""), // Remove frontmatter section
    };
  } catch (error) {
    console.error(`Error parsing frontmatter for ${slideName} in ${slideDir}:`, error);
    return null;
  }
}

// Get the frontmatter and content for all slides from all configured directories
export function getAllSlidesFrontmatter(): SlideInfo[] {
  const config = loadConfig();
  const slidesDirs = resolveSlidesDirs(config);
  
  const slides: SlideInfo[] = [];

  for (const slidesDir of slidesDirs) {
    if (!existsSync(slidesDir)) {
      console.warn(`Slides directory not found: ${slidesDir}`);
      continue;
    }

    try {
      // Get all directories inside the current slides directory
      const slideDirs = readdirSync(slidesDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .filter((dirent) => !(config.exclude || []).includes(dirent.name))
        .map((dirent) => dirent.name);

      // Collect slide info for each slide directory
      for (const slideDir of slideDirs) {
        const slideInfo = getSlideFrontmatterByPath(slidesDir, slideDir);
        if (slideInfo) {
          slides.push(slideInfo);
        }
      }
    } catch (error) {
      console.error(`Error reading slides directory ${slidesDir}:`, error);
    }
  }

  return slides;
}

// If this file is run directly, output all slides' frontmatter
if (import.meta.url === `file://${process.argv[1]}`) {
  const slides = getAllSlidesFrontmatter();
  console.log(JSON.stringify(slides, null, 2));
}
