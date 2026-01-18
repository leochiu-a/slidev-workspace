<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { useMotion } from "@vueuse/motion";
import { handleBackground } from "../layoutHelper";

const props = defineProps<{
  background?: string;
}>();

const backgroundStyle = computed(() => handleBackground(props.background));
const contentRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  const content = contentRef.value;
  if (!content) return;

  Array.from(content.children).forEach((element, index) => {
    useMotion(element as HTMLElement, {
      initial: {
        opacity: 0,
        y: 32,
      },
      enter: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 200 + index * 200,
        },
      },
    });
  });
});
</script>

<template>
  <div class="slidev-layout gemini-cover cover block content-center">
    <div class="gemini-cover__bg" :style="backgroundStyle" />
    <div
      ref="contentRef"
      class="gemini-cover__content relative z-10 flex flex-col items-center justify-center text-center"
    >
      <slot />
    </div>
  </div>
</template>

<style>
.slidev-layout.gemini-cover {
  position: relative;
  overflow: hidden;

  .gemini-cover__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.2);
    transform-origin: center;
    animation: gemini-cover-zoom 1s ease-out forwards;
    isolation: isolate;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      pointer-events: none;
    }
  }

  h1 {
    @apply text-6xl font-bold tracking-tight text-white italic drop-shadow-2xl;
  }

  p {
    @apply max-w-2xl text-lg leading-relaxed font-light tracking-wide whitespace-pre-line text-slate-300/90 italic md:text-xl;
  }
}

@keyframes gemini-cover-zoom {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
</style>
