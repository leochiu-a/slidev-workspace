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

      <div class="space-y-4 mb-8">
        <div class="relative">
          <Input
            placeholder="Search by title, description, or author..."
            v-model="searchTerm"
          />
        </div>
        
        <div class="flex flex-wrap gap-4">
          <Select v-model="selectedTheme">
            <SelectTrigger class="w-[200px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All themes</SelectItem>
              <SelectItem v-for="theme in slidesApi.availableThemes.value" :key="theme" :value="theme">
                {{ theme }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select v-model="selectedSourceDir">
            <SelectTrigger class="w-[200px]">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All sources</SelectItem>
              <SelectItem v-for="dir in slidesApi.availableSourceDirs.value" :key="dir" :value="dir">
                {{ dir.split('/').pop() }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select v-model="sortBy">
            <SelectTrigger class="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>

          <Select v-model="sortOrder">
            <SelectTrigger class="w-[120px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A-Z</SelectItem>
              <SelectItem value="desc">Z-A</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" @click="clearFilters">
            Clear filters
          </Button>
        </div>
      </div>
      
      <div class="mb-6 flex items-center justify-between">
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
        <p class="text-sm text-muted-foreground">
          Total slides: {{ slidesApi.slidesCount.value }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <SlideCard
          v-for="slide in filteredSlides"
          :key="slide.id"
          :title="slide.title"
          :image="slide.image"
          :description="slide.description"
          :url="slide.url"
          :author="slide.author"
          :date="slide.date"
          :theme="slide.theme"
          :sourceDir="slide.sourceDir"
          @click="() => openSlide(slide)"
        />
      </div>
    </div>

    <!-- Slide Detail Modal -->
    <SlideDetail 
      v-if="selectedSlide" 
      :slide="selectedSlide" 
      @close="closeSlide" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { slidesApi } from '@/composables/useSlidesApi'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import SlideCard from './SlideCard.vue'
import SlideDetail from './SlideDetail.vue'

const searchTerm = ref('')
const selectedTheme = ref('')
const selectedSourceDir = ref('')
const sortBy = ref<'title' | 'date' | 'author'>('title')
const sortOrder = ref<'asc' | 'desc'>('asc')

const queryOptions = computed(() => ({
  search: searchTerm.value,
  theme: selectedTheme.value || undefined,
  sourceDir: selectedSourceDir.value || undefined,
  sort: sortBy.value,
  order: sortOrder.value
}))

const filteredSlides = slidesApi.createLiveQuery(queryOptions)

const selectedSlide = ref(null)

const clearFilters = () => {
  searchTerm.value = ''
  selectedTheme.value = ''
  selectedSourceDir.value = ''
  sortBy.value = 'title'
  sortOrder.value = 'asc'
}

const openSlide = (slide: any) => {
  selectedSlide.value = slide
}

const closeSlide = () => {
  selectedSlide.value = null
}
</script>
