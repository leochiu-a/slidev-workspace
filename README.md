# Slidev Workspace

> A workspace tool for managing multiple Slidev presentations with API-based content management

[![npm version](https://badge.fury.io/js/slidev-workspace.svg)](https://badge.fury.io/js/slidev-workspace)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Slidev Workspace helps you organize and manage multiple [Slidev](https://sli.dev) presentations in a single workspace with a clean, organized interface.

🎯 **[Slidev Workspace Starter](https://github.com/leochiu-a/slidev-workspace-starter)** - Ready-to-use template  
👀 **[Live Demo](https://leochiu-a.github.io/slidev-workspace-starter/)** - See it in action

## Features

✨ **Multi-presentation management** - Organize multiple Slidev presentations in one workspace  
📱 **Responsive interface** - Clean, modern UI for presentation management  
🔧 **Easy configuration** - Simple YAML-based configuration  
📦 **Build & Deploy** - Built-in commands for production builds  
🎨 **Thumbnail previews** - Visual presentation previews in the workspace

## Quick Start

Get started in 5 minutes! See our [Quick Start Guide](./docs/getting-started/quick-start.md).

```bash
# Install
pnpm add slidev-workspace

# Set up your workspace
echo 'baseUrl: "/my-slides"' > slidev-workspace.yaml

# Start development server
pnpm slidev-workspace preview
```

## Documentation

- 📚 [Quick Start Guide](./docs/getting-started/quick-start.md) - Get up and running in 5 minutes
- 🚀 [Deployment Guide](./docs/getting-started/deploy.md) - Deploy to GitHub Pages
- 🛠️ [Configuration](./docs/configuration.md) - Advanced configuration options

## Commands

```bash
slidev-workspace preview   # Start development server
slidev-workspace build     # Build for production
slidev-workspace --help    # Show help information
```

## Project Structure

```
my-slidev-workspace/
├── slides/
│   ├── presentation-1/     # Auto-discovered
│   │   └── slides.md
│   └── presentation-2/     # Auto-discovered
│       └── slides.md
├── pnpm-workspace.yaml     # Workspace configuration
└── slidev-workspace.yaml   # Tool configuration
```

## Related Projects

- [Slidev](https://sli.dev) - Presentation slides for developers
- [Vue.js](https://vuejs.org) - The progressive JavaScript framework
- [Vite](https://vitejs.dev) - Next generation frontend tooling
