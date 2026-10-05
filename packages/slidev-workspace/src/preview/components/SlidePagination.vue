<template>
  <PaginationRoot
    v-if="total > itemsPerPage"
    v-model:page="page"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="1"
    show-edges
    aria-label="Pagination"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationPrev :class="itemClass" aria-label="Previous page">
        <ChevronLeft class="size-4" />
      </PaginationPrev>
      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem
          v-if="item.type === 'page'"
          :value="item.value"
          :class="[
            itemClass,
            'data-[selected]:bg-foreground data-[selected]:text-background',
          ]"
        >
          {{ item.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :index="index"
          class="inline-flex size-9 items-center justify-center text-muted-foreground"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext :class="itemClass" aria-label="Next page">
        <ChevronRight class="size-4" />
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from "reka-ui";

defineProps<{
  total: number;
  itemsPerPage: number;
}>();

const page = defineModel<number>("page", { required: true });

const itemClass =
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40";
</script>
