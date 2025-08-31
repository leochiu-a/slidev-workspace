declare module 'virtual:slides-data' {
  interface SlideFrontmatter {
    theme?: string
    background?: string
    title?: string
    info?: string
    class?: string
    transition?: string
    seoMeta?: {
      ogImage?: string
      ogTitle?: string
      ogDescription?: string
    }
  }

  interface SlideData {
    path: string
    frontmatter: SlideFrontmatter
    content: string
  }

  const slidesData: SlideData[]
  export default slidesData
  export { slidesData }
}
