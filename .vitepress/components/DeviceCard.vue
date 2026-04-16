<script setup>
const props = defineProps({
  device: { type: Object, required: true }
})

const formatMaintainers = (maintainers) => {
  if (!maintainers || !maintainers.length) return "N/A"
  return maintainers.map(m => m.display_name).join(' && ')
}
</script>

<template>
  <div class="relative p-[1px] rounded-[2.5rem] bg-stone-200 dark:bg-stone-800 shadow-sm">
    <div class="bg-[#FDFBF7] dark:bg-[#151515] p-7 md:p-8 rounded-[2.4rem] h-full flex flex-col">
      
      <div class="flex justify-between items-start mb-6">
        <div class="bg-stone-200/50 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 px-3 py-1 rounded-lg text-[10px] font-black tracking-[0.15em]">
          {{ device.codename.toUpperCase() }}
        </div>
        <div v-if="device.active" class="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-900/30">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Active
        </div>
      </div>

      <h2 class="text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100 leading-tight mb-6">
        {{ device.model }}
      </h2>
      
      <div class="grid grid-cols-2 border-y border-stone-100 dark:border-stone-800/50 py-5 mb-5">
        <div class="flex flex-col">
          <label class="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Version</label>
          <span class="font-bold text-stone-700 dark:text-stone-300">{{ device.version }}</span>
        </div>
        <div class="flex flex-col text-right">
          <label class="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Update</label>
          <span class="font-bold text-stone-700 dark:text-stone-300">{{ device.release }}</span>
        </div>
      </div>

      <div class="mb-8">
        <label class="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Maintainer</label>
        <p class="font-bold text-stone-700 dark:text-stone-300 leading-snug">{{ formatMaintainers(device.maintainer) }}</p>
      </div>

      <div class="mt-auto space-y-3">
	<a :href="device.codename + '/'" 

	   class="flex items-center justify-center gap-2 w-full py-4 bg-[#F8E4A1] hover:bg-[#F2D87F] text-[#423708] font-black rounded-2xl transition-all active:scale-[0.97] custom-link shadow-sm">

          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
          </svg>
          Download
        </a>
        <a v-if="device.xda" :href="device.xda" target="_blank"
           class="block text-center w-full py-4 bg-stone-100 dark:bg-stone-800/50 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold rounded-2xl transition-all active:scale-[0.97] custom-link">
          XDA Thread
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Classe customizada para garantir que o link não tenha underline */
.custom-link {
  text-decoration: none !important;
}
</style>

