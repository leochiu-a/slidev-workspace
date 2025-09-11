# Troubleshooting

## GitHub Pages 404 Error on Refresh

When deploying to GitHub Pages, you may encounter 404 errors when refreshing the page. This happens because Slidev is a Single Page Application (SPA), and GitHub Pages doesn't handle client-side routing by default.

**Solution:** Add `routerMode: hash` to your `slides.md` frontmatter:

```yaml
---
title: My Presentation
routerMode: hash
---
```

This configures Slidev to use hash-based routing, which works correctly with GitHub Pages static hosting.
