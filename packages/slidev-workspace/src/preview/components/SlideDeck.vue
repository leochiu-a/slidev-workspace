<template>
  <div class="min-h-screen transition-colors sw-page">
    <div class="min-h-screen sw-layout">
      <aside
        class="sw-sidebar w-full border-r border-border text-sidebar-foreground"
      >
        <SlideSidebar
          :title="sidebar.title"
          :github-url="sidebar.githubUrl"
          :categories="categoryOptions"
          :is-dark="isDark"
          variant="desktop"
          v-model:search-term="searchTerm"
          v-model:selected-category="selectedCategory"
          @toggle-dark="toggleDarkMode"
        />
      </aside>

      <header class="sw-header">
        <div class="max-w-[900px]">
          <div class="px-6 py-8 lg:px-12 lg:py-10">
            <Drawer direction="left">
              <DrawerTrigger as-child>
                <button
                  type="button"
                  class="sw-drawer-trigger mb-6 inline-flex items-center justify-center rounded-xl border border-border bg-background p-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Open sidebar"
                >
                  <PanelLeft class="size-5" />
                </button>
              </DrawerTrigger>
              <DrawerContent class="sw-drawer text-sidebar-foreground">
                <SlideSidebar
                  :title="sidebar.title"
                  :github-url="sidebar.githubUrl"
                  :categories="categoryOptions"
                  :is-dark="isDark"
                  variant="drawer"
                  v-model:search-term="searchTerm"
                  v-model:selected-category="selectedCategory"
                  @toggle-dark="toggleDarkMode"
                />
              </DrawerContent>
            </Drawer>

            <div
              class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
            >
              <div>
                <h1 class="text-3xl font-semibold">{{ hero.title }}</h1>
                <p class="mt-2 text-sm text-muted-foreground">
                  {{ hero.description }}
                </p>
              </div>
              <div class="self-start" />
            </div>

            <div
              class="flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:justify-between"
            >
              <p class="text-sm text-muted-foreground">
                Found {{ filteredSlides.length }} of {{ slidesCount }} slides
                <template v-if="searchTerm">
                  <span>
                    containing "
                    <span class="font-medium">{{ searchTerm }}</span>
                    "
                  </span>
                </template>
              </p>
              <div />
            </div>
          </div>
        </div>
      </header>

      <section class="sw-main">
        <div class="max-w-[900px]">
          <div
            class="grid grid-cols-1 gap-6 px-6 pb-12 sm:grid-cols-2 xl:grid-cols-3 lg:px-12"
          >
            <SlideCard
              v-for="slide in pagedSlides"
              :key="slide.url"
              :title="slide.title"
              :image="slide.image"
              :description="slide.description"
              :url="slide.url"
              :author="slide.author"
              :date="slide.date"
            />
          </div>
          <SlidePagination
            v-model:page="currentPage"
            :total="filteredSlides.length"
            :items-per-page="pagination.pageSize"
            class="flex justify-center px-6 pb-12 lg:px-12"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { PanelLeft } from "lucide-vue-next";

import { useSlides } from "../composables/useSlides";
import { useConfig } from "../composables/useConfig";
import { useDarkMode } from "../composables/useDarkMode";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/ui/drawer";
import SlideCard from "./SlideCard.vue";
import SlideSidebar from "./SlideSidebar.vue";
import SlidePagination from "./SlidePagination.vue";

const searchTerm = ref("");
const { slides, slidesCount } = useSlides();
const { hero, sidebar, pagination } = useConfig();
const { isDark, toggleDarkMode } = useDarkMode();

const uncategorizedLabel = "Uncategorized";
const selectedCategory = ref("All");

const categoryOptions = computed(() => {
  const counts = new Map<string, number>();
  slides.value.forEach((slide) => {
    const category = slide.category || uncategorizedLabel;
    counts.set(category, (counts.get(category) || 0) + 1);
  });

  const categories = Array.from(counts.entries()).map(([name, count]) => ({
    name,
    count,
  }));

  if (categories.length <= 1) {
    return [
      {
        name: "All",
        count: slidesCount.value,
      },
    ];
  }

  return [
    {
      name: "All",
      count: slidesCount.value,
    },
    ...categories,
  ];
});

watch(categoryOptions, (next) => {
  const hasSelected = next.some(
    (category) => category.name === selectedCategory.value,
  );
  if (!hasSelected) {
    selectedCategory.value = "All";
  }
});

const filteredSlides = computed(() => {
  let result = slides.value;

  if (selectedCategory.value !== "All") {
    result = result.filter(
      (slide) =>
        (slide.category || uncategorizedLabel) === selectedCategory.value,
    );
  }

  if (!searchTerm.value) return result;
  return result.filter(
    (slide) =>
      slide.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      slide.description
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase()) ||
      slide.author.toLowerCase().includes(searchTerm.value.toLowerCase()),
  );
});

const currentPage = ref(1);

watch([searchTerm, selectedCategory, () => pagination.value.pageSize], () => {
  currentPage.value = 1;
});

watch(currentPage, () => {
  window.scrollTo({ top: 0 });
});

const pagedSlides = computed(() => {
  const { pageSize } = pagination.value;
  const start = (currentPage.value - 1) * pageSize;
  return filteredSlides.value.slice(start, start + pageSize);
});
</script>

<style scoped>
.sw-layout {
  display: grid;
  width: 100%;
  max-width: var(--sw-layout-width, 97rem);
  margin: 0 auto;
  grid-template-columns: var(--sw-sidebar-width, 270px) minmax(0, 1fr);
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar main";
}

.sw-sidebar {
  grid-area: sidebar;
  position: relative;
  display: flex;
  justify-content: flex-end;
  background: var(--sw-sidebar-bg);
  z-index: 0;
}

.sw-sidebar::before {
  content: "";
  position: absolute;
  inset: 0;
  left: -100vw;
  background: var(--sw-sidebar-bg);
  z-index: -1;
}

.sw-header {
  grid-area: header;
  display: flex;
  justify-content: flex-start;
}

.sw-main {
  grid-area: main;
  display: flex;
  justify-content: flex-start;
}

.sw-drawer-trigger {
  display: inline-flex;
}

.sw-page {
  background: var(--sw-main-bg);
}

:global(:root) {
  --sw-sidebar-bg: #f1f1f1;
}

:global(.dark) {
  --sw-sidebar-bg: #191919;
}

:global(.sw-drawer) {
  background: var(--sw-sidebar-bg);
}

@media (max-width: 1024px) {
  .sw-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      "sidebar"
      "header"
      "main";
  }

  .sw-sidebar {
    display: none;
  }

  .sw-drawer-trigger {
    display: inline-flex;
  }
}

@media (min-width: 1024px) {
  .sw-drawer-trigger {
    display: none;
  }
}
</style>
