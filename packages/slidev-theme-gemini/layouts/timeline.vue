<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useMotion } from "@vueuse/motion";

const props = defineProps<{
  timeline?: Array<{
    year: string;
    event: string;
    desc: string;
  }>;
}>();

const timelineItems = props.timeline ?? [];
const contentRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  let timelineDelayBase = 300;
  const content = contentRef.value;
  if (content) {
    const nodes = Array.from(content.children) as HTMLElement[];
    nodes.forEach((element, index) => {
      useMotion(element, {
        initial: {
          opacity: 0,
          y: 24,
        },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            delay: 150 + index * 150,
          },
        },
      });
    });
    timelineDelayBase = 150 + nodes.length * 150 + 100;
  }

  const container = timelineRef.value;
  if (!container) return;

  const items = Array.from(
    container.querySelectorAll<HTMLElement>(".gemini-timeline__item"),
  );

  items.forEach((element, index) => {
    useMotion(element, {
      initial: {
        opacity: 0,
        y: 24,
      },
      enter: {
        opacity: 1,
        y: 0,
        transition: {
          delay: timelineDelayBase + index * 200,
        },
      },
    });
  });
});
</script>

<template>
  <div class="slidev-layout gemini-timeline">
    <div
      class="mx-auto flex h-full w-full max-w-7xl flex-col justify-center items-center px-4 py-12 md:px-16"
    >
      <div ref="contentRef" class="gemini-timeline__content text-center">
        <slot />
      </div>

      <div
        v-if="timelineItems.length"
        class="relative flex items-end justify-center gap-6 pt-4"
        ref="timelineRef"
      >
        <div
          class="absolute right-[10%] bottom-[3px] left-[10%] z-0 h-1 bg-gradient-to-r from-slate-700/50 via-slate-600 to-slate-700/50"
        />

        <div
          v-for="(item, index) in timelineItems"
          :key="item.year"
          class="gemini-timeline__item relative z-10 flex flex-col items-center"
        >
          <div
            class="flex h-48 w-48 flex-col rounded-xl border p-5 backdrop-blur-sm"
            :class="
              index === timelineItems.length - 1
                ? 'scale-105 border-orange-500/50 bg-orange-500/20 shadow-lg shadow-orange-500/20'
                : 'border-slate-700/50 bg-slate-800/80'
            "
          >
            <div
              class="mb-2 text-xl font-bold"
              :class="
                index === timelineItems.length - 1
                  ? 'text-orange-400'
                  : 'text-blue-400'
              "
            >
              {{ item.year }}
            </div>
            <div class="mb-1.5 text-md leading-snug font-medium text-white">
              {{ item.event }}
            </div>
            <div class="flex-1 text-base leading-relaxed text-slate-300">
              {{ item.desc }}
            </div>
          </div>
          <div
            class="mt-3 h-4 w-4 rounded-full ring-4 ring-slate-950"
            :class="
              index === timelineItems.length - 1
                ? 'bg-orange-500'
                : 'bg-blue-500'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.gemini-timeline {
  .gemini-timeline__content {
    h1,
    h2 {
      @apply mb-4 text-5xl font-bold text-white;
    }

    p {
      @apply mx-auto max-w-3xl text-center text-xl leading-relaxed text-slate-300;
    }

    p + p {
      @apply mt-6 text-2xl font-bold text-yellow-400;
    }
  }
}
</style>
