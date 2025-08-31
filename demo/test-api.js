#!/usr/bin/env node

import { getAllSlidesFrontmatter } from 'slidev-workspace'

console.log('🧪 Testing Slidev Workspace API in Demo...\n')

try {
  console.log('📁 Loading slides using workspace API...')
  const slides = getAllSlidesFrontmatter()
  
  console.log(`✅ Found ${slides.length} slides via API:\n`)
  
  slides.forEach((slide, index) => {
    console.log(`${index + 1}. 📄 ${slide.frontmatter.title || slide.path}`)
    console.log(`   🆔 ID: ${slide.id}`)
    console.log(`   🎨 Theme: ${slide.frontmatter.theme}`)
    console.log(`   📝 Description: ${(slide.frontmatter.info || '').split('\n')[0] || 'No description'}`)
    console.log('')
  })
  
  // Test Contentful-like API
  console.log('🔍 Testing Contentful-like API patterns...')
  
  // Test by theme
  const seriphSlides = slides.filter(slide => slide.frontmatter.theme === 'seriph')
  console.log(`🎨 Slides with 'seriph' theme: ${seriphSlides.length}`)
  
  // Test search
  const slidevSlides = slides.filter(slide => 
    slide.frontmatter.title && slide.frontmatter.title.toLowerCase().includes('slidev')
  )
  console.log(`🔎 Slides with 'slidev' in title: ${slidevSlides.length}`)
  
  // Test by source
  const demoSlides = slides.filter(slide => slide.sourceDir.includes('demo'))
  console.log(`📂 Slides from demo directory: ${demoSlides.length}`)
  
  console.log('\n🎉 Slidev Workspace API test completed successfully!')
  console.log('✨ Ready to use in production applications!')
  
} catch (error) {
  console.error('❌ API test failed:', error.message)
  console.error('Stack:', error.stack)
  process.exit(1)
}