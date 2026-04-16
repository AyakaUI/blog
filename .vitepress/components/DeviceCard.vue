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
  <div class="pixel-card-container">
    <div class="pixel-card-inner">
      
      <div class="flex justify-between items-start mb-4">
        <div class="flex flex-col">
          <label class="pixel-label">Model:</label>
          <h2 class="pixel-title">{{ device.model }}</h2>
        </div>
        <div v-if="device.active" class="pixel-status-badge">
          ACTIVE
        </div>
      </div>

      <div class="grid grid-cols-2 gap-y-6 mt-6">
        <div class="info-group">
          <label class="pixel-label">Codename:</label>
          <span class="pixel-value">{{ device.codename }}</span>
        </div>
        
        <div class="info-group">
          <label class="pixel-label">Version:</label>
          <span class="pixel-value">{{ device.version }}</span>
        </div>

        <div class="info-group">
          <label class="pixel-label">Release:</label>
          <span class="pixel-value capitalize">{{ device.release }}</span>
        </div>
      </div>

      <div class="mt-6">
        <label class="pixel-label">Maintainer:</label>
        <p class="pixel-value">{{ device.maintainer_name }}</p>
      </div>

      <div class="mt-auto pt-8">
        <a :href="device.codename + '/'" class="pixel-download-btn">
          Download
        </a>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Container Principal */
.pixel-card-container {
  padding: 1px;
  border-radius: 2.5rem;
  background: #E7E5E4; /* stone-200 */
  height: 100%;
}

.dark .pixel-card-container {
  background: #292524; /* stone-800 */
}

.pixel-card-inner {
  background: #FDFBF7; /* Fundo original do site */
  border-radius: 2.4rem;
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}

.dark .pixel-card-inner {
  background: #151515;
}

/* Tipografia */
.pixel-label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #A39E8D;
  margin-bottom: 4px;
}

.pixel-title {
  font-size: 24px;
  font-weight: 900;
  color: #3D3D3D;
  line-height: 1.2;
}

.dark .pixel-title {
  color: #F5F5F4;
}

.pixel-value {
  font-size: 20px;
  font-weight: 800;
  color: #4A4A4A;
}

.dark .pixel-value {
  color: #D6D3D1;
}

/* Badge de Status */
.pixel-status-badge {
  background-color: #D1E8D1;
  color: #072711;
  font-size: 11px;
  font-weight: 900;
  padding: 6px 14px;
  border-radius: 50px;
  letter-spacing: 0.5px;
}

.dark .pixel-status-badge {
  background-color: #1a3821;
  color: #c4eed0;
}

/* Botão de Download */
.pixel-download-btn {
  background-color: #F8E4A1;
  color: #423708 !important;
  text-align: center;
  display: block;
  width: 100%;
  padding: 18px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 900;
  text-decoration: none !important;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.pixel-download-btn:hover {
  background-color: #F2D87F;
  transform: translateY(-2px);
}

.pixel-download-btn:active {
  transform: scale(0.98);
}

.capitalize {
  text-transform: capitalize;
}
</style>

