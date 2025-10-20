# Quick Start

Welcome to Slidev Workspace! This guide will help you get set up and running in 5 minutes.

## 1. Install Slidev Workspace

Install Slidev Workspace as a development dependency in your project:

```bash
pnpm add slidev-workspace
```

## 2. Set up npm scripts

Add these scripts to your `package.json` for easier command access:

```json
{
  "scripts": {
    "preview": "slidev-workspace preview",
    "build": "slidev-workspace build"
  }
}
```

## 3. Set up workspace

### Use pnpm-workspace (Recommended)

Create a `pnpm-workspace.yaml` file in your project root to organize multiple Slidev presentations:

```yaml
packages:
  - "slides/*"
```

Then move your Slidev projects into the `/slides` directory. Each presentation should be in its own subdirectory.

### Configure `slidev-workspace.yaml`

Create a `slidev-workspace.yaml` configuration file in your project root:

```yaml
hero:
  title: "My Slide Collection"
  description: "Browse all available slide decks and use the search function to quickly find what you need"

baseUrl: "/slidev-workspace-starter"
```

The `baseUrl` is related to your URL base path. If you use GitHub Pages, the `baseUrl` should match your repository name (e.g., if your repo is `github.com/username/my-slides`, use `baseUrl: "/my-slides"`).

The `hero` section allows you to customize the workspace title and description displayed on the preview page.

Finally, the project structure should look like this:

```yaml
slidev-workspace-starter/
├── slides/
│   ├── slidev-1/          # Will be auto-discovered
│   │   └── slides.md
│   └── slidev-2/          # Will be auto-discovered
│       └── slides.md
├── pnpm-workspace.yaml
└── slidev-workspace.yaml   # Configuration file
```

## 4. Start Development Server

Now launch Slidev Workspace:

```bash
# Using global installation
pnpm preview
```

Once the server starts:

1. **Browser opens automatically** - Opens at `http://localhost:3000/<baseUrl>` by default
2. **Shows presentation list** - You'll see all your available presentations with thumbnails

![preview mode](/preview.webp)

> **Tip:** The preview mode shows all your presentations in a clean, organized interface, making it easy to manage multiple slide decks in one workspace.

## 5. Deploy

See [Deploy Document](./deploy.md).

## Starter Template

Get started quickly with our ready-to-use template:

🚀 **[Slidev Workspace Starter](https://github.com/leochiu-a/slidev-workspace-starter)**

This template includes:

- Pre-configured workspace structure
- Sample presentations
- GitHub Actions for deployment
- All necessary configuration files

Online demo: https://leochiu-a.github.io/slidev-workspace-starter/

## Supported Commands

```bash
slidev-workspace preview  # Start development server
slidev-workspace build    # Build for production
slidev-workspace --help   # Show help information
```
