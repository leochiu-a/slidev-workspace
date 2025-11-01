import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Slidev Workspace",
  description: "A unified tool for managing multiple Slidev presentations",
  base: "/slidev-workspace/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/getting-started/introduction" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/getting-started/introduction" },
          { text: "Quick Start", link: "/getting-started/quick-start" },
          { text: "Configuration", link: "/getting-started/configuration" },
          { text: "OG Image Priority", link: "/getting-started/og-image-priority" },
          { text: "Deploy", link: "/getting-started/deploy" },
          { text: "Troubleshooting", link: "/getting-started/troubleshooting" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/leochiu-a/slidev-workspace",
      },
    ],

    footer: {
      message: "Released under MIT License",
      copyright: "Copyright © 2025 Slidev Workspace",
    },

    search: {
      provider: "local",
    },
  },
});
