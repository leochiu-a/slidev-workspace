# slidev-workspace

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
