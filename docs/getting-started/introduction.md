# Introduction

## What is Slidev Workspace?

Slidev Workspace is a specialized command-line tool designed to manage and showcase multiple Slidev presentations. It provides a unified web interface to browse, search, and access Slidev presentations distributed across different directories.

## Core Features

### 🚀 Simple Command Line Interface

Slidev Workspace provides intuitive CLI commands:

```bash
# Start development server
slidev-workspace preview

# Build for production
slidev-workspace build
```

### 📁 Auto-Discovery of Presentations

The tool automatically scans configured directory structures, looking for folders containing `slides.md` files:

```yaml
tech-sharing-slides/
├── slides/
│   ├── slidev-1/          # Will be auto-discovered
│   │   └── slides.md
│   └── slidev-2/          # Will be auto-discovered
│       └── slides.md
└── slidev-workspace.yml   # Configuration file
```

### 🔍 Frontmatter Detection

Automatically detects and parses Slidev frontmatter configuration:

```yaml
---
title: My Presentation
info: This is a Vue.js tutorial
author: John Doe
date: 2024-01-01
theme: seriph
background: https://picsum.photos/800/600
transition: slide-left
---
```

## Usage Options

Slidev Workspace provides two flexible approaches to work with your presentations:

### 🖥️ Built-in Preview Interface

Launch the complete presentation management interface with a single command:

```bash
slidev-workspace preview
```

preview mode:

![preview mode](/preview.webp)

This provides a responsive web interface with presentation browsing, real-time search, and thumbnail previews. It's designed for users who want immediate presentation management without building custom UI.

### 🎯 Content API

For developers building custom interfaces, access presentation data programmatically:

```typescript
import { useSlides } from "slidev-workspace";

// In your Vue component
const { slides, slidesCount } = useSlides();

// slides: Array of all discovered presentations frontmatter
// slidesCount: Total number of presentations
```

The `useSlides` composable returns frontmatter data from all discovered presentations, enabling you to create entirely custom interfaces while leveraging Slidev Workspace's presentation discovery and parsing capabilities.

## Next Steps

Ready to get started?

- [Quick Start](./quick-start.md) - Get up and running in 5 minutes
- [Deploy Guide](./deploy.md) - Learn how to deploy to GitHub Pages
