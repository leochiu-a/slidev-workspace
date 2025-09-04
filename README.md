# Slidev Workspace

[![npm version](https://badge.fury.io/js/slidev-workspace.svg)](https://badge.fury.io/js/slidev-workspace)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Slidev Workspace is a specialized command-line tool designed to manage and showcase multiple [Slidev](https://sli.dev) presentations. It provides a unified web interface to browse, search, and access Slidev presentations distributed across different directories.

- **[Slidev Workspace Starter](https://github.com/leochiu-a/slidev-workspace-starter)** - Ready-to-use template
- **[Live Demo](https://leochiu-a.github.io/slidev-workspace-starter/)** - See it in action
- **[Documentation](https://leochiu-a.github.io/slidev-workspace/)**

## Features

✨ **Multi-presentation management** - Organize multiple Slidev presentations in one workspace  
📱 **Responsive interface** - Clean, modern UI for presentation management  
🔧 **Easy configuration** - Simple YAML-based configuration  
📦 **Build & Deploy** - Built-in commands for production builds  
🎨 **Thumbnail previews** - Visual presentation previews in the workspace

## Usage

Slidev Workspace provides two flexible ways to work with your presentations:

### Built-in Preview Interface

Use the command-line tool for an out-of-the-box solution:

```bash
slidev-workspace preview
```

This launches a responsive web interface with presentation management, search functionality, and thumbnail previews - perfect for users who want to get started quickly without building custom UI.

### Content API

For developers who need custom UI integration, access slide data programmatically:

```typescript
import { useSlides } from "slidev-workspace";

const { slides } = useSlides();
```

The `useSlides` composable returns frontmatter data from all discovered presentations, enabling you to build entirely custom interfaces while leveraging Slidev Workspace's presentation discovery and parsing capabilities.

## Quick Start

Get started in 5 minutes! See our [Quick Start Guide](https://leochiu-a.github.io/slidev-workspace/getting-started/quick-start.html).

## Documentation

- 📚 [Quick Start Guide](https://leochiu-a.github.io/slidev-workspace/getting-started/quick-start.html) - Get up and running in 5 minutes
- 🚀 [Deployment Guide](https://leochiu-a.github.io/slidev-workspace/getting-started/deploy.html) - Deploy to GitHub Pages

## Related Projects

- [Slidev](https://sli.dev) - Presentation slides for developers
- [Vue.js](https://vuejs.org) - The progressive JavaScript framework
- [Vite](https://vitejs.dev) - Next generation frontend tooling
