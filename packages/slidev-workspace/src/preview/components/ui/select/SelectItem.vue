<template>
  <div
    @click="handleClick"
    :class="
      cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        context.modelValue === value && 'bg-gray-100'
      )
    "
    v-bind="$attrs"
  >
    <span
      v-if="context.modelValue === value"
      class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
    >
      <svg
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const context = inject("selectContext") as any;

const handleClick = () => {
  if (!props.disabled) {
    context.onValueChange(props.value);
  }
};
</script>
