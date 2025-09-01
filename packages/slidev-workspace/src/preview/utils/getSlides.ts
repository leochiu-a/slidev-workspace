import slidesData from "virtual:slides-data";

export interface SlideData {
  id: string;
  title: string;
  url: string;
  description: string;
  image: string;
  author: string;
  date: string;
  theme?: string;
  transition?: string;
  class?: string;
  sourceDir: string;
  path: string;
  fullPath: string;
  frontmatter: any;
  content: string;
}

export function getSlides(): SlideData[] {
  try {
    if (slidesData && slidesData.length > 0) {
      return slidesData.map((slide) => ({
        id: slide.id,
        title: slide.frontmatter.title || slide.path,
        url: slide.path,
        description:
          slide.frontmatter.info ||
          slide.frontmatter.seoMeta?.ogDescription ||
          "No description available",
        image:
          slide.frontmatter.background ||
          slide.frontmatter.seoMeta?.ogImage ||
          "https://cover.sli.dev",
        author: slide.frontmatter.author || "Unknown Author",
        date: slide.frontmatter.date || new Date().toISOString().split("T")[0],
        theme: slide.frontmatter.theme,
        transition: slide.frontmatter.transition,
        class: slide.frontmatter.class,
        sourceDir: slide.sourceDir,
        path: slide.path,
        fullPath: slide.fullPath,
        frontmatter: slide.frontmatter,
        content: slide.content,
      }));
    }
  } catch (error) {
    console.error("Error reading slides frontmatter:", error);
  }

  return [];
}

export function getSlideById(id: string): SlideData | null {
  const slides = getSlides();
  return slides.find((slide) => slide.id === id) || null;
}

export function getSlidesBySourceDir(sourceDir: string): SlideData[] {
  const slides = getSlides();
  return slides.filter((slide) => slide.sourceDir === sourceDir);
}

export function searchSlides(query: string): SlideData[] {
  const slides = getSlides();
  const lowerQuery = query.toLowerCase();

  return slides.filter(
    (slide) =>
      slide.title.toLowerCase().includes(lowerQuery) ||
      slide.description.toLowerCase().includes(lowerQuery) ||
      slide.author.toLowerCase().includes(lowerQuery) ||
      (slide.theme && slide.theme.toLowerCase().includes(lowerQuery))
  );
}

if (import.meta.hot) {
  import.meta.hot.accept("virtual:slides-data", (newSlidesData) => {
    console.log("Slides data updated");
  });
}
