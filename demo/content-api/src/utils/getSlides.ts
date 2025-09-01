import slidesData from 'slidev:content'

export function getSlides() {
  try {
    if (slidesData && slidesData.length > 0) {
      return slidesData.map((slide) => ({
        title: slide.frontmatter.title || slide.path,
        url: slide.path,
        description: slide.frontmatter.info || 'No description available',
        image: slide.frontmatter.background || 'https://picsum.photos/200/300',
        author: 'John Doe',
        date: '2021-01-01',
        theme: slide.frontmatter.theme,
        transition: slide.frontmatter.transition,
        class: slide.frontmatter.class,
      }))
    }
  } catch (error) {
    console.error('Error reading slides frontmatter:', error)
  }

  return []
}
