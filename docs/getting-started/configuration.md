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

**Default:** `./dist`

Controls where the workspace preview app and copied slide builds are written when you run `slidev-workspace build`.

```yaml
outputDir: "_gh-pages"
```

## exclude

**Default:** `["node_modules", ".git"]`

An array of slide folder names to exclude from preview, build, and dev server startup.

```yaml
exclude:
  - "drafts"
  - "archived"
```

## favicon

**Default:** the bundled Slidev Workspace icon

The favicon URL for the workspace preview page. Use an absolute URL or a path served from your deployed site.

```yaml
favicon: "https://example.com/favicon.png"
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

## Sidebar Configuration

The `sidebar` section controls the title displayed at the top of the preview sidebar.

### sidebar.title

**Default:** `Slide Deck`

```yaml
sidebar:
  title: "Slidev Workspace"
```

### sidebar.githubUrl

**Default:** `""`

```yaml
sidebar:
  githubUrl: "https://github.com/your-org/your-repo"
```

## Complete Example

Here's a complete example configuration file:

```yaml
hero:
  title: "Company Presentations"
  description: "Browse our collection of training and conference presentations"

sidebar:
  title: "Company Library"
  githubUrl: "https://github.com/acme/presentations"

baseUrl: "/presentations"
favicon: "https://example.com/favicon.png"
outputDir: "./dist"
exclude:
  - "drafts"
```

`hero.title`, `hero.description`, `baseUrl`, `favicon`, `outputDir`, and `exclude` are optional and will use their default values if not specified.
