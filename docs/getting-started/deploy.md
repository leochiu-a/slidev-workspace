# Deploy

## 1. Set up GitHub Actions

First, you need to create a GitHub Actions workflow file in your repository. This workflow will automatically build your Slidev presentations and deploy them to GitHub Pages.

Create a `.github/workflows/deploy.yml` file in your repository root directory and add the following content:

```yaml
name: Deploy pages

on:
  workflow_dispatch:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Setup @antfu/ni
        run: npm i -g @antfu/ni

      - name: Install dependencies
        run: nci

      - name: Prepare deploy folder
        run: rm -rf _gh-pages && mkdir _gh-pages

      - name: Build all slides and preview app as index
        run: |
          pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _gh-pages

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 2. Change GitHub Settings

Configure GitHub Pages to build and deploy using GitHub Actions:

1. Go to your repository settings
2. Navigate to `Settings > Pages > Build and deployment > Source`
3. Select `GitHub Actions` as the source

After completing these settings, GitHub Actions will automatically execute the build process and deploy your Slidev presentations to GitHub Pages whenever you push code to the main branch.
