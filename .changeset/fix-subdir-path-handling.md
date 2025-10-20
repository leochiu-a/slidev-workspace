---
"slidev-workspace": patch
---

fix: use replace() instead of slice() for robust subDir path handling

Previously, using slice() to extract the subdirectory path would leave a leading slash, resulting in incorrect pnpm filter paths like ".//src/slidev1". Now using replace() to properly remove both the workspace path and any leading slash.
