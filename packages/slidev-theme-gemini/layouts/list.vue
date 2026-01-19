<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, ref, watch } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

// NOTE: Layout output is not covered by automated tests; verify in slide preview.
type ListItem = {
  title: string;
  desc: string;
};

const listItems = ref<ListItem[]>([]);
const contentRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim();

// Extract list items rendered by Markdown so we can restyle them consistently.
const parseListItems = () => {
  const container = contentRef.value;
  if (!container) return;

  const list = container.querySelector("ul");
  if (!list) {
    if (listItems.value.length > 0) listItems.value = [];
    return;
  }

  const parsed = Array.from(list.children)
    .filter((child): child is HTMLElement => child.tagName === "LI")
    .map((item) => {
      const code = item.querySelector("code");
      const command = normalizeText(code?.textContent ?? "");
      let desc = normalizeText(item.textContent ?? "");

      if (command) {
        desc = normalizeText(desc.replace(command, ""));
      }

      desc = desc.replace(/^[-–—]\s*/, "");

      if (!command) {
        return {
          title: desc,
          desc: "",
        };
      }

      return {
        title: command,
        desc,
      };
    })
    .filter((item) => item.title || item.desc);

  const hasChanges =
    parsed.length !== listItems.value.length ||
    parsed.some(
      (item, index) =>
        item.title !== listItems.value[index]?.title ||
        item.desc !== listItems.value[index]?.desc,
    );

  if (hasChanges) listItems.value = parsed;
};

const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});

const listElements = computed(() => {
  const container = listRef.value;
  if (!container) return null;

  return Array.from(
    container.querySelectorAll<HTMLElement>(".gemini-list__item"),
  );
});

const hasParsedItems = computed(() => listItems.value.length > 0);
const badgeColors = [
  {
    badgeBg: "bg-pink-900/50",
    badgeText: "text-pink-400",
  },
  {
    badgeBg: "bg-purple-900/50",
    badgeText: "text-purple-400",
  },
  {
    badgeBg: "bg-blue-900/50",
    badgeText: "text-blue-400",
  },
];
const getBadgeColors = (index: number) =>
  badgeColors[index % badgeColors.length];

useStaggeredMotion(contentElements, {
  initialY: 28,
  baseDelay: 150,
  step: 150,
});

const listMotion = useStaggeredMotion(listElements, () => {
  const contentCount = contentElements.value?.length ?? 0;
  return {
    initialY: 24,
    baseDelay: contentCount * 150,
    step: 170,
  };
});

// List items are parsed after mount; replay once items exist so animations apply.
watch(
  () => listItems.value.length,
  async () => {
    await nextTick();
    listMotion.replay();
  },
);

onMounted(async () => {
  await nextTick();
  parseListItems();
});
</script>

<template>
  <div class="slidev-layout gemini-list">
    <div
      class="mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-8"
    >
      <div
        ref="contentRef"
        class="gemini-list__content text-left"
        :class="{ 'is-parsed': hasParsedItems }"
      >
        <slot />
      </div>
      <ul v-if="hasParsedItems" ref="listRef" class="space-y-2">
        <li
          v-for="(item, index) in listItems"
          :key="`${item.title}-${index}`"
          class="gemini-list__item flex items-start"
        >
          <span
            class="mr-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            :class="[
              getBadgeColors(index).badgeBg,
              getBadgeColors(index).badgeText,
            ]"
          >
            {{ index + 1 }}
          </span>
          <div class="min-w-0">
            <div class="mb-2 text-sm font-bold text-white">
              {{ item.title }}
            </div>
            <div v-if="item.desc" class="text-xs text-slate-400">
              {{ item.desc }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.slidev-layout.gemini-list {
  li {
    margin-left: 0;
    padding-left: 0;
  }

  .gemini-list__content {
    &.is-parsed {
      ul {
        display: none;
      }
    }
  }
}
</style>
