<script setup lang="ts">
const { type } = defineProps<{
  type?: 'primary'
}>()
</script>

<template>
  <button class="my-button">my button: type {{ type }}</button>
</template>
