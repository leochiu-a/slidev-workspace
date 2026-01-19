<script setup lang="ts">
import { computed, ref } from "vue";
import { onSlideLeave } from "@slidev/client";
import { handleBackground } from "../layoutHelper";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

const props = defineProps<{
  background?: string;
}>();

const backgroundStyle = computed(() => handleBackground(props.background));
const contentRef = ref<HTMLElement | null>(null);
const backgroundRef = ref<HTMLElement | null>(null);
const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});

useStaggeredMotion(contentElements, {
  initialY: 32,
  baseDelay: 200,
  step: 200,
});

const resetBackgroundAnimation = () => {
  const background = backgroundRef.value;
  if (!background) return;
  background.style.animation = "none";
  // Force reflow so the CSS animation can replay.
  void background.offsetHeight;
  background.style.animation = "";
};

onSlideLeave(() => {
  resetBackgroundAnimation();
});
</script>

<template>
  <div class="slidev-layout gemini-cover cover block content-center">
    <div
      ref="backgroundRef"
      class="gemini-cover__bg"
      :style="backgroundStyle"
    />
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

    &::before {
      content: "";
      @apply absolute inset-0 bg-slate-900/60 mix-blend-multiply pointer-events-none;
    }

    &::after {
      content: "";
      @apply absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-900/20 pointer-events-none;
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
