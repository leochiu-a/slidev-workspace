<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

// NOTE: Layout output is not covered by automated tests; verify in slide preview.
const contentRef = ref<HTMLElement | null>(null);
const tableRef = ref<HTMLElement | null>(null);

const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});

const rowElements = computed(() => {
  const container = tableRef.value;
  if (!container) return null;
  return Array.from(container.querySelectorAll<HTMLElement>("tbody tr"));
});

useStaggeredMotion(contentElements, {
  initialY: 20,
  baseDelay: 150,
  step: 150,
});

useStaggeredMotion(rowElements, () => {
  const contentCount = contentElements.value?.length ?? 0;
  return {
    initialY: 18,
    baseDelay: contentCount * 150 + 100,
    step: 120,
  };
});
</script>

<template>
  <div class="slidev-layout gemini-table">
    <div
      ref="contentRef"
      class="mx-auto flex h-full w-full max-w-6xl flex-col justify-center"
    >
      <div ref="tableRef">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.gemini-table {
  table {
    @apply w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/30 shadow-2xl backdrop-blur-md;
    border-collapse: separate;
    border-spacing: 0;
  }

  thead {
    @apply bg-slate-900/80;
  }

  th {
    @apply px-6 py-4 text-[11px] font-bold tracking-[0.3em] uppercase text-slate-200 md:text-xs;
  }

  th:nth-child(2) {
    @apply text-blue-300;
  }

  th:nth-child(3) {
    @apply text-yellow-300;
  }

  tr:not(:last-child) td {
    @apply border-b border-slate-700/30;
  }

  td {
    @apply px-6 py-4 text-sm font-medium text-slate-100;
  }

  tbody tr {
    @apply transition-colors hover:bg-white/5;
  }

  td:nth-child(2) {
    @apply text-center;
  }

  td:nth-child(3) {
    @apply text-center;
  }

  td:nth-child(2) code,
  td:nth-child(3) code,
  td:nth-child(2) span,
  td:nth-child(3) span {
    @apply inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide;
  }

  td:nth-child(2) code,
  td:nth-child(2) span {
    @apply border border-blue-500/30 bg-blue-500/20 text-blue-300;
  }

  td:nth-child(3) code,
  td:nth-child(3) span {
    @apply border border-yellow-500/30 bg-yellow-500/20 text-yellow-300;
  }
}
</style>
