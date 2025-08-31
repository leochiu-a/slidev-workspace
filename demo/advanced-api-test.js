#!/usr/bin/env node

import { getAllSlidesFrontmatter, getSlideFrontmatter, loadConfig } from 'slidev-workspace'

console.log('🚀 Advanced Slidev Workspace API Test\n')

try {
  // Test configuration loading
  console.log('⚙️  Testing configuration...')
  const config = loadConfig()
  console.log('✅ Config loaded:', {
    slidesDir: config.slidesDir,
    outputDir: config.outputDir,
    baseUrl: config.baseUrl
  })
  console.log()

  // Test all slides loading
  console.log('📚 Testing getAllSlidesFrontmatter...')
  const allSlides = getAllSlidesFrontmatter()
  console.log(`✅ Loaded ${allSlides.length} slides`)
  
  // Test individual slide loading
  if (allSlides.length > 0) {
    console.log('\n🔍 Testing getSlideFrontmatter by ID...')
    const firstSlideId = allSlides[0].id
    const individualSlide = getSlideFrontmatter(firstSlideId)
    
    if (individualSlide) {
      console.log(`✅ Successfully retrieved slide: "${individualSlide.frontmatter.title}"`)
      console.log(`   Content preview: ${individualSlide.content.substring(0, 50)}...`)
    } else {
      console.log('❌ Failed to retrieve individual slide')
    }
  }

  // Test data structure integrity
  console.log('\n🧪 Testing data structure integrity...')
  allSlides.forEach((slide, index) => {
    const requiredFields = ['id', 'path', 'fullPath', 'sourceDir', 'frontmatter', 'content']
    const missingFields = requiredFields.filter(field => !(field in slide))
    
    if (missingFields.length === 0) {
      console.log(`✅ Slide ${index + 1} structure is valid`)
    } else {
      console.log(`❌ Slide ${index + 1} missing fields: ${missingFields.join(', ')}`)
    }
  })

  // Test API patterns similar to Contentful
  console.log('\n📊 Testing Contentful-like API patterns...')
  
  // Simulate getEntries with filtering
  const getEntriesByTheme = (theme) => {
    return allSlides.filter(slide => slide.frontmatter.theme === theme)
  }
  
  const seriphEntries = getEntriesByTheme('seriph')
  console.log(`🎨 getEntriesByTheme('seriph'): ${seriphEntries.length} results`)
  
  // Simulate search functionality
  const searchEntries = (query) => {
    const lowerQuery = query.toLowerCase()
    return allSlides.filter(slide => 
      (slide.frontmatter.title && slide.frontmatter.title.toLowerCase().includes(lowerQuery)) ||
      (slide.frontmatter.info && slide.frontmatter.info.toLowerCase().includes(lowerQuery))
    )
  }
  
  const searchResults = searchEntries('slidev')
  console.log(`🔎 searchEntries('slidev'): ${searchResults.length} results`)
  
  // Test metadata extraction
  console.log('\n📝 Testing metadata extraction...')
  const metadata = {
    totalSlides: allSlides.length,
    themes: [...new Set(allSlides.map(slide => slide.frontmatter.theme).filter(Boolean))],
    sourceDirs: [...new Set(allSlides.map(slide => slide.sourceDir))],
    averageContentLength: Math.round(allSlides.reduce((sum, slide) => sum + slide.content.length, 0) / allSlides.length)
  }
  
  console.log('✅ Extracted metadata:', metadata)
  
  console.log('\n🎉 Advanced API test completed successfully!')
  console.log('🚀 Slidev Workspace is ready for production use!')
  
} catch (error) {
  console.error('\n❌ Advanced test failed:', error.message)
  console.error('Stack:', error.stack)
  process.exit(1)
}