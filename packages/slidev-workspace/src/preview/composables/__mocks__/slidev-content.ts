import type { SlideInfo } from "../../../types/slide";

const mockSlidesData: SlideInfo[] = [
  {
    id: "slide-1",
    path: "/slides-presentation-1/",
    fullPath: "/path/to/slides-presentation-1",
    sourceDir: "/path/to/slides",
    frontmatter: {
      title: "My First Presentation",
      background: "/bg1.jpg",
      info: "This is my first presentation",
      author: "John Doe",
      date: "2024-01-15",
      theme: "default",
      transition: "fade",
      class: "text-center",
    },
    content: "# Slide content",
    baseUrl: "/slidev-workspace-starter/",
    hasOgImage: true,
  },
  {
    id: "slide-2",
    path: "/slides-presentation-2/",
    fullPath: "/path/to/slides-presentation-2",
    sourceDir: "/path/to/slides",
    frontmatter: {
      title: "Second Presentation",
      background: "https://example.com/bg.jpg",
      seoMeta: {
        ogImage: "https://example.com/og-image.jpg",
        ogDescription: "SEO description",
      },
    },
    content: "# Another slide",
    baseUrl: "/slidev-workspace-starter/",
    hasOgImage: false,
  },
  {
    id: "slide-3",
    path: "/slides-presentation-3/",
    fullPath: "/path/to/slides-presentation-3",
    sourceDir: "/path/to/slides",
    frontmatter: {},
    content: "# Minimal slide",
    baseUrl: "/slidev-workspace-starter/",
    hasOgImage: false,
  },
];

export default mockSlidesData;
