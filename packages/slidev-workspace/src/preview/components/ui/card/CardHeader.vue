<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn('@container/card-header gap-1.5 pt-6 px-6', props.class)"
  >
    <slot />
  </div>
</template>
