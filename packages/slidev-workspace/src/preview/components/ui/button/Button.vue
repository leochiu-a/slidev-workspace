<template>
  <component
    :is="as || 'button'"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }))"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { buttonVariants } from "./index";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface Props {
  as?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
});
</script>
