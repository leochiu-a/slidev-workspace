<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { onSlideEnter } from "@slidev/client";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

type TopicItem = {
  title: string;
  desc: string;
  audience: string;
  hot?: boolean;
  hotLabel?: string;
  icon?: string;
};

const props = defineProps<{
  topics?: TopicItem[];
}>();

const topics = props.topics ?? [];
const revealed = ref(true);
const topicsRef = ref<HTMLElement | null>(null);
const topicElements = computed(() => {
  const container = topicsRef.value;
  if (!container) return null;
  return Array.from(
    container.querySelectorAll<HTMLElement>(".gemini-topics__item"),
  );
});

const iconMap: Record<string, string> = {
  brain: "🧠",
  sparkles: "✨",
  terminal: "⌨️",
  code: "💻",
};

const resolveIcon = (name?: string) => iconMap[name ?? ""] ?? "⚡";

const onReveal = () => {
  if (!revealed.value) revealed.value = true;
};

useStaggeredMotion(topicElements, {
  initialY: 20,
  step: 150,
});
</script>

<template>
  <div class="slidev-layout gemini-topics">
    <div
      class="mx-auto flex h-full w-full max-w-6xl cursor-pointer flex-col justify-center px-4 md:px-8"
      @click="onReveal"
    >
      <div class="gemini-topics__content mb-4 text-center">
        <slot />
      </div>

      <div
        v-if="topics.length"
        ref="topicsRef"
        class="grid grid-cols-1 gap-2.5 md:grid-cols-2"
      >
        <div
          v-for="(topic, index) in topics"
          :key="`${topic.title}-${index}`"
          class="gemini-topics__item group relative rounded-lg border p-2.5 shadow-xl backdrop-blur-sm transition-all duration-500"
          :class="
            revealed
              ? topic.hot
                ? 'border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/5 hover:border-orange-400/50'
                : 'border-slate-600/30 bg-gradient-to-br from-slate-500/10 to-slate-600/5 hover:border-slate-500/50'
              : 'border-slate-600/30 bg-gradient-to-br from-slate-700/20 to-slate-800/10 hover:border-slate-500/50'
          "
        >
          <transition name="gemini-topics-reveal">
            <div
              v-if="revealed && topic.hotLabel"
              class="absolute top-2.5 right-2.5 flex items-center gap-2 rounded-full border px-2 py-0.5 text-[10px] font-bold"
              :class="
                topic.hot
                  ? 'border-orange-500/30 bg-orange-500/20 text-orange-400'
                  : 'border-slate-600/30 bg-slate-700/50 text-slate-400'
              "
            >
              {{ topic.hotLabel }}
            </div>
          </transition>

          <div
            class="mb-2 inline-flex items-center justify-center rounded-md p-2 transition-colors duration-500"
            :class="
              revealed
                ? topic.hot
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-slate-600/20 text-slate-400'
                : 'bg-slate-600/20 text-slate-300'
            "
          >
            <span class="text-base">{{ resolveIcon(topic.icon) }}</span>
          </div>
          <h3
            class="mb-2 text-[13px] font-semibold transition-colors duration-500"
            :class="
              revealed
                ? topic.hot
                  ? 'text-white'
                  : 'text-slate-300'
                : 'text-white'
            "
          >
            {{ topic.title }}
          </h3>
          <p class="mb-2 text-[11px] leading-relaxed text-slate-300">
            {{ topic.desc }}
          </p>
          <div
            class="inline-block rounded-full px-2 py-0.5 font-mono text-[10px] transition-colors duration-500"
            :class="
              revealed
                ? topic.hot
                  ? 'bg-orange-500/10 text-orange-300'
                  : 'bg-slate-700/50 text-slate-400'
                : 'bg-slate-700/50 text-slate-400'
            "
          >
            👤 {{ topic.audience }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.gemini-topics {
  .gemini-topics__content {
    h1,
    h2 {
      @apply mb-2 text-2xl font-bold text-white md:text-3xl;
    }
  }
}

.gemini-topics-reveal-enter-active,
.gemini-topics-reveal-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.gemini-topics-reveal-enter-from,
.gemini-topics-reveal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-6px);
}
</style>
