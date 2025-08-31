<template>
  <component
    :is="as || 'button'"
    :class="cn(buttonVariants({ variant, size }))"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { buttonVariants, type ButtonVariants } from "./index";
import { cn } from "@/lib/utils";

interface Props {
  as?: string;
}

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
});
</script>
