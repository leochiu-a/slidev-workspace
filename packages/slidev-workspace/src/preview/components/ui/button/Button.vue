<template>
  <component
    :is="as || 'button'"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { buttonVariants, type ButtonVariants } from './index'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes, ButtonVariants {
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})
</script>