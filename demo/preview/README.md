# Slidev Workspace Starter

This starter helps you manage multiple **Slidev** presentations in a single monorepo. Since each Slidev project is an independent package, using a **pnpm workspace** makes it easy to manage, develop, and deploy them together.

## ✨ Features

- **Workspace-friendly**: Manage all your Slidev presentations as separate packages within a single workspace.
- **Automated deployment**: Use GitHub Actions to automatically deploy each presentation to GitHub Pages.
- **Easy to scale**: Quickly add new Slidev projects by creating new packages in the workspace.

## 🚀 Quick Start

1. Clone the repository and install dependencies

  ```bash
  git clone https://github.com/leochiu-a/slidev-workspace-starter.git
  cd slidev-workspace-starter
  pnpm install
  ```

2. Change `base` of `slidev-workspace.yaml`. This is the base path for GitHub Pages, typically the same as the repository name.

3. Set up the GitHub Pages build and deploy based on GitHub Actions. `Settings > Pages > Build and deployment > Source > GitHub Actions`

## 📦 Demo

Check out the live demo: https://leochiu-a.github.io/slidev-workspace-starter/
