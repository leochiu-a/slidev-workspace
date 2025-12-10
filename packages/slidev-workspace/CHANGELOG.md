# slidev-workspace

## 0.7.1

### Patch Changes

- 362d57c: keep slide dev servers alive on slidev 52.10+ by leaving stdin open

## 0.7.0

### Minor Changes

- 494705a: Use unhead for hero metadata so title/og tags are injected both at runtime and during Vite index transforms.

## 0.6.3

### Patch Changes

- 28f5d17: Make the build step copy slide bundles into whatever `outputDir` is configured (default `./dist`) and expand the docs with the new option plus GitHub Pages/Vercel deployment guidance.

## 0.6.2

### Patch Changes

- ac9e633: Fix the build copy step to respect the configured `outputDir` (defaulting to `_gh-pages`) so deployments can target custom directories, and document the option.

## 0.6.1

### Patch Changes

- 0dfc599: Fix test assertions to properly handle cache-busting query parameters in og-image.png URLs and add test execution to CI workflow

## 0.6.0

### Minor Changes

- 3d7ba14: feat(slidev-workspace): add export-og command to generate OG images for all slides

  - Adds new `export-og` CLI command that automatically generates cover images for all presentations
  - Uses Slidev's export functionality with Chromium to render the first slide as OG image
  - Copies generated `slides-export/1.png` to `og-image.png` in each slide directory
  - Automatically cleans up temporary `slides-export` directories after copying
  - Requires `playwright-chromium` to be installed as a development dependency
  - Includes comprehensive documentation and VitePress integration with "Customizations" section
  - Updates Quick Start guide with the new command reference

## 0.5.2

### Patch Changes

- 7a57909: feat: implement post-build process to copy og-image with hash to dist directories

  Implemented a post-build process that automatically copies og-image files with content hash to the distribution directories, ensuring proper cache busting for Open Graph images.

## 0.5.1

### Patch Changes

- 1f5bd62: fix: update image URL resolution in development mode to include slide path

  Fixed an issue where background images were not resolving correctly in development mode by ensuring the slide path is properly included in the URL construction.

## 0.5.0

### Minor Changes

- 272d523: feat: add og-image.png priority handling for slide cards

  Implemented a new image resolution system with prioritized fallback options:

  1. **og-image.png** (Highest Priority) - Custom cover image placed in slide directory
  2. **seoMeta.ogImage** - Image specified in slide frontmatter configuration
  3. **background** - Slide background image from frontmatter
  4. **Default Cover** - https://cover.sli.dev (Fallback)

  **Breaking Changes:**

  - Added `hasOgImage: boolean` field to `SlideInfo` type
  - Updated image URL resolution logic in `resolveImageUrl` function

  **New Features:**

  - Automatic detection of `og-image.png` in slide directories
  - Separate path resolution logic for development and production modes
  - Comprehensive test coverage for all image resolution scenarios
  - Documentation added at `/docs/getting-started/og-image-priority.md`

## 0.4.2

### Patch Changes

- e1ee9d7: Prevent Slidev dev servers from automatically opening browser tabs during preview

  Changed the `startAllSlidesDevServer` function to pass `--open false` flag when launching individual Slidev development servers. This allows the main Vite preview server (port 3000) to open automatically while keeping Slidev instances running in the background without opening additional browser tabs.

## 0.4.1

### Patch Changes

- 98da0bb: chore: update metadata in package.json
- e151945: chore: move prettier settings to root

## 0.4.0

### Minor Changes

- 6b7f2f3: feat: optimize slide deck UI with dark mode and improved styling

  - Add dark mode toggle functionality with system preference detection
  - Enhance search input with icon and improved styling
  - Update color variables to HSL format for better theming
  - Add cursor pointer to interactive elements

## 0.3.0

### Minor Changes

- 2d2df60: Add hero configuration support for customizing workspace title and description

  - Add `hero.title` and `hero.description` fields to slidev-workspace.yml
  - Create `slidev:config` virtual module for frontend access
  - Add `useConfig()` composable for Vue components
  - Update preview page to display customizable hero section
  - Add comprehensive configuration documentation

### Patch Changes

- 6fd99c3: fix: use replace() instead of slice() for robust subDir path handling

  Previously, using slice() to extract the subdirectory path would leave a leading slash, resulting in incorrect pnpm filter paths like ".//src/slidev1". Now using replace() to properly remove both the workspace path and any leading slash.

## 0.2.3

### Patch Changes

- e935a8d: fix: resolve path with base url

## 0.2.2

### Patch Changes

- 15de6e4: fix: move env to constants

## 0.2.1

### Patch Changes

- 3211225: fix(preview): resolve background image paths correctly in useSlides composable

  - Add proper URL resolution for background images that are not absolute URLs
  - Add loading state to useSlides composable
  - Improve development and production mode handling for slide paths

## 0.2.0

### Minor Changes

- feat: start all slides dev server in vite plugin
