<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, ref, watch } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

// NOTE: Animation behavior isn't covered by automated tests in this repo.
const props = withDefaults(
  defineProps<{
    initialY?: number;
    baseDelay?: number;
    step?: number;
  }>(),
  {
    initialY: 24,
    baseDelay: 0,
    step: 150,
  },
);

const containerRef = ref<HTMLElement | null>(null);

const childElements = computed(() => {
  const container = containerRef.value;
  if (!container) return null;
  return Array.from(container.children) as HTMLElement[];
});

useStaggeredMotion(childElements, () => ({
  initialY: props.initialY,
  baseDelay: props.baseDelay,
  step: props.step,
}));
</script>

<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>
