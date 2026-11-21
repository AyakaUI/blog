<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const stepsRef = ref<HTMLElement | null>(null);
let observer: MutationObserver | null = null;

function updateCounters() {
  if (!stepsRef.value) return;
  // Force a reflow to update CSS counters
  stepsRef.value.style.counterReset = "step-counter";
  // Trigger reflow
  void stepsRef.value.offsetHeight;
  stepsRef.value.style.counterReset = "";
}

function setupObserver() {
  if (!stepsRef.value) return;
  observer = new MutationObserver(updateCounters);
  observer.observe(stepsRef.value, { childList: true, subtree: true, characterData: true });
  updateCounters();
}

onMounted(setupObserver);
onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="vp-steps" ref="stepsRef">
    <slot />
  </div>
</template>

<style scoped>
.vp-steps {
  position: relative;
  padding-left: 0;
  margin: 1.5rem 0;
  counter-reset: step-counter;
}

.vp-steps :deep(h3) {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-left: 48px; /* 36px circle + 12px gap */
  margin: 0 0 1.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  /* Remove default VitePress h3 divider/border */
  border: none;
  border-bottom: none;
  padding-bottom: 0;
}

/* The numbered circle */
.vp-steps :deep(h3)::before {
  counter-increment: step-counter;
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}

/* Vertical connecting line */
.vp-steps :deep(h3)::after {
  content: "";
  position: absolute;
  left: 17px; /* center of 36px circle */
  top: 36px;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

/* Remove line from last h3 */
.vp-steps :deep(h3:last-child)::after {
  display: none;
}

/* Content after h3 (paragraphs, lists, etc.) - indent to align with h3 text */
.vp-steps :deep(h3 + *),
.vp-steps :deep(h3 ~ *:not(h3)) {
  margin-left: 48px;
  margin-top: 0.5rem;
}

/* Ensure first element after h3 has proper spacing */
.vp-steps :deep(h3 + p),
.vp-steps :deep(h3 + ul),
.vp-steps :deep(h3 + ol),
.vp-steps :deep(h3 + div),
.vp-steps :deep(h3 + blockquote),
.vp-steps :deep(h3 + pre),
.vp-steps :deep(h3 + table) {
  margin-top: 0.5rem;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .vp-steps :deep(h3) {
    font-size: 1rem;
    padding-left: 44px; /* 32px circle + 12px gap */
    gap: 0.75rem;
  }

  .vp-steps :deep(h3)::before {
    width: 32px;
    height: 32px;
    min-width: 32px;
    font-size: 0.8125rem;
  }

  .vp-steps :deep(h3)::after {
    left: 15px; /* center of 32px circle */
    top: 32px;
  }

  .vp-steps :deep(h3 + *),
  .vp-steps :deep(h3 ~ *:not(h3)) {
    margin-left: 44px;
  }
}

/* Ensure code blocks and other elements don't overflow on mobile */
.vp-steps :deep(pre),
.vp-steps :deep(table) {
  max-width: 100%;
  overflow-x: auto;
}

/* Handle nested elements properly */
.vp-steps :deep(h3) ~ h3 {
  margin-top: 1.5rem;
}
</style>