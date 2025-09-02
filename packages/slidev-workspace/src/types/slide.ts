export interface SlideFrontmatter {
  theme?: string;
  background?: string;
  title?: string;
  info?: string;
  class?: string;
  drawings?: {
    persist?: boolean;
  };
  transition?: string;
  mdc?: boolean;
  seoMeta?: {
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  author?: string;
  date?: string;
}

export interface SlideInfo {
  id: string;
  path: string;
  fullPath: string;
  sourceDir: string;
  frontmatter: SlideFrontmatter;
  content: string;
}

export interface SlideData {
  title: string;
  url: string;
  description: string;
  image: string;
  author: string;
  date: string;
  theme?: string;
  transition?: string;
  class?: string;
}
