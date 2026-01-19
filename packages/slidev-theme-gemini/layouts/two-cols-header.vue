<script setup lang="ts">
import StaggeredGroup from "../components/StaggeredGroup.vue";
</script>

<template>
  <div class="slidev-layout two-cols-header gemini-two-cols-header">
    <div class="gemini-two-cols-header__inner">
      <StaggeredGroup class="gemini-two-cols-header__header" :base-delay="200">
        <slot />
      </StaggeredGroup>

      <div class="gemini-two-cols-header__columns">
        <StaggeredGroup class="gemini-two-cols-header__col" :base-delay="500">
          <slot name="left" />
        </StaggeredGroup>
        <StaggeredGroup class="gemini-two-cols-header__col" :base-delay="650">
          <slot name="right" />
        </StaggeredGroup>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.gemini-two-cols-header,
.slidev-layout.two-cols-header {
  .gemini-two-cols-header__inner {
    @apply mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-10;
  }

  .gemini-two-cols-header__header {
    @apply text-center;

    h1,
    h2 {
      @apply text-4xl font-bold text-white md:text-5xl;
    }

    p {
      @apply mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-300;
    }
  }

  .gemini-two-cols-header__columns {
    @apply grid items-center gap-8 md:grid-cols-2;
  }

  .gemini-two-cols-header__col {
    @apply text-base leading-relaxed text-slate-200;

    h3 {
      @apply mb-3 text-xl font-semibold text-white;
    }

    p {
      @apply mb-3 text-base leading-relaxed text-slate-300;
    }

    strong {
      @apply text-white;
    }

    img {
      @apply w-full rounded-2xl border border-slate-700/60 shadow-2xl;
    }
  }
}
</style>
