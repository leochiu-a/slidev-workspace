#!/usr/bin/env node

// Simple test script to verify our slides functionality
import { getAllSlidesFrontmatter } from './scripts/getSlideFrontmatter.js'

console.log('🔍 Testing Slidev Workspace functionality...\n')

try {
  console.log('📁 Loading slides...')
  const slides = getAllSlidesFrontmatter()
  
  console.log(`✅ Found ${slides.length} slides:`)
  
  slides.forEach((slide, index) => {
    console.log(`\n${index + 1}. ${slide.frontmatter.title || slide.path}`)
    console.log(`   ID: ${slide.id}`)
    console.log(`   Source: ${slide.sourceDir}`)
    console.log(`   Theme: ${slide.frontmatter.theme || 'N/A'}`)
    console.log(`   Description: ${slide.frontmatter.info || slide.frontmatter.seoMeta?.ogDescription || 'N/A'}`)
  })
  
  console.log('\n🎉 Slidev Workspace is working correctly!')
  
} catch (error) {
  console.error('❌ Error:', error.message)
  console.error('Stack:', error.stack)
  process.exit(1)
}