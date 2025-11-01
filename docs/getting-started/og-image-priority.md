# OG Image Priority

## What is OG Image Priority?

When you see slide cards in the preview interface, the system needs to decide which image to display. The OG Image Priority system automatically selects the best image from several sources in this order:

1. **`og-image.png`** (Highest Priority) - Your custom cover image
2. **`seoMeta.ogImage`** - Image specified in slide configuration
3. **`background`** - Slide background image
4. **Default Cover** (Fallback) - `https://cover.sli.dev`

## Easiest Method: Using og-image.png

If you want to add a beautiful cover image to your slides, simply place a file named `og-image.png` in your slide folder. The system will automatically detect and use it.

### Directory Structure Example

```
my-slides/
├── presentations/
│   ├── react-fundamentals/
│   │   ├── slides.md          ← Your slide file
│   │   └── og-image.png       ← Cover image (automatically used!)
│   └── vue-guide/
│       ├── slides.md
│       └── og-image.png       ← Each slide can have its own cover
```

### Image Recommendations

- **File Format**: PNG format (must be `.png`)
- **Filename**: Must be `og-image.png` (lowercase, case-sensitive)
- **Location**: Place in the slide folder's root directory
- **Image Size**: Recommended 1200×630 pixels (standard size)
- **File Size**: Keep it optimized, typically under 500KB

## Alternative Methods

If you don't have `og-image.png` yet, you can use these approaches:

### Method 2: Specify Image in Slide Configuration

Add this to your `slides.md` frontmatter:

```yaml
---
title: "My Presentation"
seoMeta:
  ogImage: "https://example.com/my-image.jpg"
---
```

### Method 3: Use Background Image

Set a background image in your `slides.md` frontmatter:

```yaml
---
title: "My Presentation"
background: "images/bg.jpg"
---
```

The system will also use this as the cover image.

### Method 4: Use Default Cover

If none of the above are configured, the system automatically uses the default Slidev cover.

## Priority Example

Suppose your slide has this configuration:

```yaml
---
title: "My Presentation"
seoMeta:
  ogImage: "https://example.com/seo-image.jpg"
background: "images/bg.jpg"
---
```

And your folder also contains `og-image.png`:

```
presentations/
└── my-slide/
    ├── slides.md
    ├── og-image.png           ← 1️⃣ This will be used (highest priority)
    └── images/
        └── bg.jpg
```

**Result**: The system will use `og-image.png`, and all other settings are ignored.
