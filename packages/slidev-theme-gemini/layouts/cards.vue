<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useMotion } from "@vueuse/motion";

type CardItem = {
  title: string;
  desc: string;
  tags?: string[];
};

const props = defineProps<{
  cards?: CardItem[];
}>();

const cards = props.cards ?? [];
const contentRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);
const cardColors = [
  {
    iconBg: "bg-blue-500/20",
    iconText: "text-blue-400",
    borderHover: "hover:border-blue-500/50",
    toolBadge: "bg-blue-500/10 text-blue-300 border border-blue-500/30",
  },
  {
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-400",
    borderHover: "hover:border-purple-500/50",
    toolBadge: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
  },
  {
    iconBg: "bg-green-500/20",
    iconText: "text-green-400",
    borderHover: "hover:border-green-500/50",
    toolBadge: "bg-green-500/10 text-green-300 border border-green-500/30",
  },
];

const getCardColors = (index: number) => cardColors[index] ?? cardColors[0];

onMounted(async () => {
  await nextTick();
  let cardDelayBase = 0;
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
    cardDelayBase = 150 + nodes.length * 150 + 100;
  }

  const container = cardsRef.value;
  if (!container) return;

  const items = Array.from(
    container.querySelectorAll<HTMLElement>(".gemini-cards__item"),
  );

  items.forEach((element, index) => {
    useMotion(element, {
      initial: {
        opacity: 0,
        y: 30,
      },
      enter: {
        opacity: 1,
        y: 0,
        transition: {
          delay: cardDelayBase + index * 200,
        },
      },
    });
  });
});
</script>

<template>
  <div class="slidev-layout gemini-cards">
    <div class="mx-auto flex h-full w-full flex-col justify-center">
      <div ref="contentRef" class="gemini-cards__content mb-6 text-center">
        <slot />
      </div>
      <div
        v-if="cards.length"
        ref="cardsRef"
        class="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
      >
        <div
          v-for="(card, index) in cards"
          :key="`${card.title}-${index}`"
          class="gemini-cards__item group rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/60"
          :class="getCardColors(index).borderHover"
        >
          <h3 class="mb-3 text-lg font-bold text-white">
            {{ card.title }}
          </h3>
          <p class="text-sm leading-relaxed text-slate-400">
            {{ card.desc }}
          </p>
          <div v-if="card.tags?.length" class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="(tag, tagIndex) in card.tags"
              :key="`${tag}-${tagIndex}`"
              class="rounded-full px-3 py-1.5 text-[9px] font-medium backdrop-blur-sm"
              :class="getCardColors(index).toolBadge"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.gemini-cards {
  .gemini-cards__content {
    h1,
    h2 {
      @apply text-3xl font-bold text-white md:text-4xl;
    }

    p {
      @apply text-lg text-slate-400;
    }
  }
}
</style>
