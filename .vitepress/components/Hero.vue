<script setup>
defineProps({
  src: { type: String, default: null },
  title: { type: String, default: "Latest releases and blogs" },
  href: { type: String, default: null },
});
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    class="hero-banner group block relative w-full overflow-hidden rounded-3xl !no-underline"
  >
    <img
      v-if="src"
      :src="src"
      alt=""
      loading="eager"
      class="hero-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div v-else class="hero-fallback h-full w-full"></div>

    <div class="hero-overlay absolute inset-0"></div>

    <div class="absolute inset-x-0 bottom-0 p-2 sm:p-3">
      <h1 class="hero-title !m-0 !border-0 !pt-0 !text-base sm:!text-lg !font-semibold text-white drop-shadow-md">
        {{ title }}
      </h1>
    </div>
  </component>
</template>

<style scoped>
.hero-banner {
  aspect-ratio: 16 / 9;
  border: 1px solid var(--vp-c-bg-soft);
}

@media (min-width: 640px) {
  .hero-banner {
    aspect-ratio: 21 / 9;
  }
}

.hero-fallback {
  background: linear-gradient(
    135deg,
    var(--vp-c-brand-3),
    var(--vp-c-brand-1)
  );
}

.hero-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.15) 55%,
    rgba(0, 0, 0, 0) 100%
  );
}

.hero-title {
  line-height: 1.15;
}
</style>
