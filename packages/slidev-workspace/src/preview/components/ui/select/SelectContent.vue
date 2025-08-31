<template>
  <div
    v-if="context.isOpen"
    :class="cn(
      'absolute top-full left-0 z-50 min-w-full overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md mt-1',
      props.class
    )"
    v-bind="$attrs"
  >
    <div class="p-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {}

const props = withDefaults(defineProps<Props>(), {})

const context = inject('selectContext') as any
</script>