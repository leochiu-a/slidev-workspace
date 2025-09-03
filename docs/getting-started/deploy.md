# Deploy

## 1. Set up GitHub Actions

Revise the `BASE_PATH` in the "Build all slides" job to match your base URL, e.g., `/slidev-workspace-starter`, which should be the same as `baseUrl` in `slidev-workspace.yaml`:

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

      - name: Build all slides
        run: |
          BASE_PATH="<base_url>" 

          for slide in slides/*; do
            slide_name=$(basename "$slide")
            pnpm --filter "./slides/$slide_name" run build --base $BASE_PATH/$slide_name/

            if [ -d "$slide/dist" ]; then
              mkdir -p "_gh-pages/$slide_name"
              cp -r "$slide/dist/." "_gh-pages/$slide_name/"
            fi
          done

      - name: Build preview app as index
        run: |
          pnpm build
          mkdir -p "_gh-pages"
          cp -r dist/. "_gh-pages/"

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
3. Select `GitHub Actions`
