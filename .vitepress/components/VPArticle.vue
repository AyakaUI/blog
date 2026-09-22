<template>
  <a :href="href" class="card-container !no-underline group block rounded-2xl p-5 sm:p-6">
    <h3 class="!m-0 !border-0 !pt-0 text-lg sm:text-xl font-bold group-hover:underline">
      {{ title }}
    </h3>
    <p v-if="description" class="card-description !my-2 !text-base">
      {{ description }}
    </p>
  </a>
</template>

<style scoped>
.card-container {
  border: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s, transform 0.2s;
}

.card-container:hover {
  border-color: var(--vp-text-color);
}

.card-container:active {
  transform: scale(0.99);
}

a {
  color: var(--vp-text-color);
}

a:hover {
  color: var(--vp-text-color);
}

.card-description {
  color: var(--vp-c-text-2);
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    authors: {
      type: Array,
      required: false,
      default: () => [],
    },
    href: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>
