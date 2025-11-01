---
"slidev-workspace": minor
---

feat: add og-image.png priority handling for slide cards

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
