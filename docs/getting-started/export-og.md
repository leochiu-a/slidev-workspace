# Export OG Images

## What is the Export OG Command?

The `export-og` command automatically generates cover images for all your presentations. It takes the first slide of each presentation and saves it as `og-image.png` in the presentation folder.

Think of it as **taking a screenshot of the first slide** and using it as the cover image when your presentations are shared online.

## Why Do You Need OG Images?

When you share your presentations on social media, messaging apps, or email, the platform shows a **preview card** with a thumbnail image. The OG image is that preview card.

Without a good OG image, the preview might look plain or empty. With the export-og command, every presentation automatically gets a beautiful cover image!

## Prerequisites

The `export-og` command is powered by Slidev's export functionality, which requires Chromium for rendering. Before using this command, you need to set up the necessary dependencies:

### Install playwright-chromium

Run these commands in your project root directory:

```bash
pnpm add -D playwright-chromium
```

Then install Chromium:

```bash
pnpm exec playwright-chromium install
```

This downloads the Chromium browser engine needed to generate the OG images from your slides.

> **Note:** This is a one-time setup. You only need to do this once per project.

## How to Use

### Step 1: Add npm script (Optional but Recommended)

Add this script to your `package.json` for easier access:

```json
{
  "scripts": {
    "export-og": "slidev-workspace export-og"
  }
}
```

### Step 2: Run the Command

Simply run this command in your terminal:

```bash
pnpm export-og
```

### Step 3: Done! ✅

The command will:

1. Generate cover images from the first slide of each presentation
2. Save them as `og-image.png` in each presentation folder

## What Happens Next?

Once the OG images are generated:

- **Preview Cards Look Better** - When you share presentations online, they'll show a beautiful cover image. See [OG Image Priority](./og-image-priority.md) to learn how the system chooses which image to use.
- **Automatic Detection** - The slidev automatically uses `og-image.png` as the og image.
