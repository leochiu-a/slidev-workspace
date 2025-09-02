<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click="$emit('close')"
  >
    <div
      class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="p-6">
        <div class="flex items-start justify-between mb-6">
          <div class="flex-1">
            <h1 class="text-2xl font-bold mb-2">{{ slide.title }}</h1>
            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <div class="flex items-center gap-1">
                <User class="h-4 w-4" />
                <span>{{ slide.author }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Calendar class="h-4 w-4" />
                <span>{{ slide.date }}</span>
              </div>
              <div v-if="slide.theme" class="flex items-center gap-1">
                <Palette class="h-4 w-4" />
                <span>{{ slide.theme }}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" @click="$emit('close')">
            <X class="h-4 w-4" />
          </Button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Preview Image -->
          <div class="space-y-4">
            <div
              class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden"
            >
              <img
                :src="slide.image"
                :alt="slide.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>

            <!-- Slide Actions -->
            <div class="flex gap-2">
              <Button @click="openInSlidev" class="flex-1">
                <ExternalLink class="h-4 w-4 mr-2" />
                Open in Slidev
              </Button>
              <Button variant="outline" @click="copyPath">
                <Copy class="h-4 w-4 mr-2" />
                Copy Path
              </Button>
            </div>
          </div>

          <!-- Slide Information -->
          <div class="space-y-6">
            <div>
              <h3 class="font-semibold mb-2">Description</h3>
              <p class="text-muted-foreground">{{ slide.description }}</p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Frontmatter</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <pre class="text-sm overflow-x-auto">{{
                  formatFrontmatter(slide.frontmatter)
                }}</pre>
              </div>
            </div>

            <div>
              <h3 class="font-semibold mb-2">File Information</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">ID:</span>
                  <code class="bg-gray-100 px-2 py-1 rounded">{{
                    slide.id
                  }}</code>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Path:</span>
                  <code class="bg-gray-100 px-2 py-1 rounded">{{
                    slide.path
                  }}</code>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Source:</span>
                  <span>{{
                    slide.sourceDir?.split("/").pop() || "Unknown"
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Full Path:</span>
                  <code class="bg-gray-100 px-2 py-1 rounded text-xs">{{
                    slide.fullPath
                  }}</code>
                </div>
              </div>
            </div>

            <div v-if="slide.content">
              <h3 class="font-semibold mb-2">Content Preview</h3>
              <div class="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                <pre class="text-sm whitespace-pre-wrap"
                  >{{ slide.content.substring(0, 500)
                  }}{{ slide.content.length > 500 ? "..." : "" }}</pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  X,
  User,
  Calendar,
  Palette,
  ExternalLink,
  Copy,
} from "lucide-vue-next";
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import type { SlideData } from "../../types/slide";

const props = defineProps<{
  slide: SlideData;
}>();

defineEmits<{
  close: [];
}>();

const slidevUrl = computed(() => {
  return `${window.location.href}/${props.slide.url}`;
});

const formatFrontmatter = (frontmatter: any) => {
  return JSON.stringify(frontmatter, null, 2);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = "https://cover.sli.dev";
};

const openInSlidev = () => {
  window.open(slidevUrl.value, "_blank");
};

const copyPath = () => {
  navigator.clipboard.writeText(slidevUrl.value);
  // You could add a toast notification here
};
</script>
