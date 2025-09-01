<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-16 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Slide Deck</h1>
        <p class="text-muted-foreground">
          Browse all available slide decks and use the search function to quickly find what you
          need.
        </p>
      </div>

      <div class="relative mb-8">
        <Input
          placeholder="Search by title, description, category, or author..."
          v-model="searchTerm"
        />
      </div>
      <div class="mb-6">
        <p class="text-sm text-muted-foreground">
          Found {{ filteredSlides.length }} results
          <template v-if="searchTerm">
            <span>
              containing "
              <span class="font-medium">{{ searchTerm }} </span>
              "
            </span>
          </template>
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <SlideCard
          v-for="slide in filteredSlides"
          :key="slide.title"
          :title="slide.title"
          :image="slide.image"
          :description="slide.description"
          :url="slide.url"
          :author="slide.author"
          :date="slide.date"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { getSlides } from '@/utils/getSlides'
import { Input } from '@/components/ui/input'

import SlideCard from './SlideCard.vue'

const searchTerm = ref('')

const filteredSlides = computed(() => {
  return getSlides().filter((slide) => {
    return slide.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  })
})
</script>
