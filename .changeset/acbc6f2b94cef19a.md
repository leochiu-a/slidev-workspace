---
"slidev-workspace": patch
---

Prevent Slidev dev servers from automatically opening browser tabs during preview

Changed the `startAllSlidesDevServer` function to pass `--open false` flag when launching individual Slidev development servers. This allows the main Vite preview server (port 3000) to open automatically while keeping Slidev instances running in the background without opening additional browser tabs.
