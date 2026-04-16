---
layout: page
---

<script setup>
import { data as devices } from './devices.data.ts'
import { useData } from 'vitepress'
import { computed } from 'vue'
// Importe o componente que você acabou de criar
import DeviceDetail from '../../.vitepress/theme/DeviceDetail.vue'

const { params } = useData()
const device = computed(() => devices.find(d => d.codename === params.value.device))
</script>

<div v-if="device">
  <DeviceDetail :device="device" />
</div>

<div v-else class="loading-box">
  <p>Loading device...</p>
</div>

<style scoped>
.loading-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-weight: bold;
  color: #888;
}
</style>
