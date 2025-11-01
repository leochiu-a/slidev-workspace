<template>
  <a :href="url" target="_blank">
    <Card
      class="group hover:shadow-lg transition-all duration-200 cursor-pointer"
      @click="$emit('click')"
    >
      <div class="relative overflow-hidden rounded-t-lg">
        <Skeleton
          v-if="isLoading && image"
          class="w-full h-48 rounded-b-none"
        />
        <img
          v-if="image"
          ref="imageRef"
          v-show="!isLoading"
          :src="image"
          :alt="title"
          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          @load="onImageLoad"
          @error="onImageError"
        />
        <div
          v-if="!image"
          class="w-full h-48 bg-muted flex items-center justify-center"
        >
          <span class="text-muted-foreground">No Image</span>
        </div>
      </div>

      <CardHeader class="pb-2">
        <CardTitle
          class="text-lg line-clamp-2 group-hover:text-primary transition-colors"
        >
          {{ title }}
        </CardTitle>
      </CardHeader>

      <CardContent class="space-y-3">
        <CardDescription class="line-clamp-3 text-sm h-[40px]">{{
          description
        }}</CardDescription>

        <div class="flex flex-wrap gap-1 mb-2">
          <span
            v-if="theme"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
          >
            {{ theme }}
          </span>
          <span
            v-if="sourceDir"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
          >
            {{ sourceDir.split("/").pop() }}
          </span>
        </div>

        <div
          class="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t"
        >
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
  </a>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { Calendar, User } from "lucide-vue-next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const props = defineProps<{
  title: string;
  image?: string;
  description?: string;
  url: string;
  author: string;
  date: string;
  theme?: string;
  sourceDir?: string;
}>();

defineEmits<{
  click: [];
}>();

const imageRef = useTemplateRef<HTMLImageElement>("imageRef");
const isLoading = ref(true);
const retryCount = ref(0);

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // 1 second

const onImageLoad = () => {
  isLoading.value = false;
};

const onImageError = () => {
  if (retryCount.value < MAX_RETRIES) {
    retryCount.value++;

    setTimeout(() => {
      if (imageRef.value && props.image) {
        imageRef.value.src = props.image;
      }
    }, RETRY_DELAY);
  } else {
    isLoading.value = false;
  }
};
</script>
