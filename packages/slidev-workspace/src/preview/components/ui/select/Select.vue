<template>
  <div class="relative" ref="selectRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectRef = ref<HTMLElement>()
const isOpen = ref(false)

const selectContext = {
  modelValue: props.modelValue,
  isOpen,
  onValueChange: (value: string) => {
    emit('update:modelValue', value)
    isOpen.value = false
  },
  onToggle: () => {
    isOpen.value = !isOpen.value
  },
  close: () => {
    isOpen.value = false
  }
}

provide('selectContext', selectContext)
</script>