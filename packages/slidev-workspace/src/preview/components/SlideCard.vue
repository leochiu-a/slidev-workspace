<template>
  <Card class="group hover:shadow-lg transition-all duration-200 cursor-pointer" @click="$emit('click')">
    <div class="relative overflow-hidden rounded-t-lg">
      <img
        :src="image || '/placeholder.svg'"
        :alt="title"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>

    <CardHeader class="pb-2">
      <CardTitle class="text-lg line-clamp-2 group-hover:text-primary transition-colors">
        {{ title }}
      </CardTitle>
    </CardHeader>

    <CardContent class="space-y-3">
      <CardDescription class="line-clamp-3 text-sm h-[40px]">{{ description }}</CardDescription>

      <div class="flex flex-wrap gap-1 mb-2">
        <span v-if="theme" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          {{ theme }}
        </span>
        <span v-if="sourceDir" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          {{ sourceDir.split('/').pop() }}
        </span>
      </div>

      <div class="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <div class="flex items-center gap-1">
          <User class="h-3 w-3" />
          <span>{{ author }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Calendar class="h-3 w-3" />
          <span>{{ date }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Calendar, User } from 'lucide-vue-next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
  title: string
  image?: string
  description?: string
  url: string
  author: string
  date: string
  theme?: string
  sourceDir?: string
}>()

defineEmits<{
  click: []
}>()
</script>
