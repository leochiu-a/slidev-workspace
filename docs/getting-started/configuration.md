# Configuration

Slidev Workspace is configured using the `slidev-workspace.yaml` configuration file in your project root.

## baseUrl

**Default:** `/`

The base URL path for deployment. This is useful when deploying to GitHub Pages or other hosting services.

```yaml
baseUrl: "/slidev-workspace-starter"
```

For GitHub Pages, set this to your repository name (e.g., if your repo is `github.com/username/my-slides`, use `baseUrl: "/my-slides"`).

## outputDir

**Default:** `_gh-pages`

Controls where the workspace preview app and copied slide builds are written when you run `slidev-workspace build`. The `_gh-pages` directory matches the folder GitHub Pages typically serves from; change this if your deployment platform expects a different directory (e.g., `dist` for Vercel).

```yaml
outputDir: "./dist"
```

## Hero Configuration

The `hero` section allows you to customize the title and description displayed on the workspace preview page.

### hero.title

**Default:** `Slide Deck`

The main heading displayed on the preview page.

```yaml
hero:
  title: "My Slide Collection"
```

### hero.description

**Default:** `Browse all available slide decks and use the search function to quickly find what you need.`

The subtitle or description text displayed below the title.

```yaml
hero:
  description: "A collection of all my presentations"
```

## Complete Example

Here's a complete example configuration file:

```yaml
hero:
  title: "Company Presentations"
  description: "Browse our collection of training and conference presentations"

baseUrl: "/presentations"
outputDir: "_gh-pages"
```

`hero.title`, `hero.description`, `baseUrl`, and `outputDir` are optional and will use their default values if not specified.
