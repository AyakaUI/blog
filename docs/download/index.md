---
layout: page
---

<script setup>
import { data as devices } from './devices.data.ts'
</script>

<div class="download-header mt-10 mb-12 text-center md:text-left">
  <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-4">
    Download AyakaUI
  </h1>
  <p class="text-lg text-stone-500 dark:text-stone-400 max-w-2xl">
    Get the latest official builds for your device. All builds are verified and maintained by our community experts.
  </p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
  <DeviceCard 
    v-for="device in devices" 
    :key="device.codename" 
    :device="device" 
  />
</div>

<div v-if="devices.length === 0" class="py-20 text-center text-stone-400">
  <div class="animate-pulse">Searching for official devices...</div>
</div>

