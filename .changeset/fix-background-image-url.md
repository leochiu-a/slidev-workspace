---
"slidev-workspace": patch
---

fix(preview): resolve background image paths correctly in useSlides composable

- Add proper URL resolution for background images that are not absolute URLs
- Add loading state to useSlides composable
- Improve development and production mode handling for slide paths
