---
"slidev-workspace": minor
---

feat(slidev-workspace): add export-og command to generate OG images for all slides

- Adds new `export-og` CLI command that automatically generates cover images for all presentations
- Uses Slidev's export functionality with Chromium to render the first slide as OG image
- Copies generated `slides-export/1.png` to `og-image.png` in each slide directory
- Automatically cleans up temporary `slides-export` directories after copying
- Requires `playwright-chromium` to be installed as a development dependency
- Includes comprehensive documentation and VitePress integration with "Customizations" section
- Updates Quick Start guide with the new command reference
