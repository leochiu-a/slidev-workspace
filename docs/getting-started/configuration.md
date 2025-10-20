# Configuration

Slidev Workspace is configured using the `slidev-workspace.yaml` configuration file in your project root.

## baseUrl

The base URL path for deployment. This is useful when deploying to GitHub Pages or other hosting services.

```yaml
baseUrl: "/slidev-workspace-starter"
```

For GitHub Pages, set this to your repository name (e.g., if your repo is `github.com/username/my-slides`, use `baseUrl: "/my-slides"`).

## Hero Configuration

The `hero` section allows you to customize the title and description displayed on the workspace preview page.

### hero.title

The main heading displayed on the preview page. Defaults to `"Slide Deck"`.

```yaml
hero:
  title: "My Slide Collection"
```

### hero.description

The subtitle or description text displayed below the title. Defaults to `"Browse all available slide decks and use the search function to quickly find what you need."`.

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
```

Both `hero.title`, `hero.description`, and `baseUrl` are optional and will use their default values if not specified.
