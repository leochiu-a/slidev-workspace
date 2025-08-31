<template>
  <span v-if="context.modelValue">
    {{ displayValue || context.modelValue }}
  </span>
  <span v-else class="text-gray-500">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{
  placeholder?: string
  displayValue?: string
}>()

const context = inject('selectContext') as any
</script>