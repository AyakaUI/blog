<template>
  <div v-if="device" class="pixel-wrapper">
    <div class="pixel-bg-blob"></div>

    <div class="pixel-container">
      <div v-for="(val, key) in displayData" :key="key" class="pixel-row">
        <span class="pixel-label">{{ key }}:</span>
        <h1 v-if="key === 'Model'" class="pixel-title">{{ val }}</h1>
        <p v-else class="pixel-data" :class="{ capitalize: key === 'Release' }">{{ val }}</p>
      </div>

      <div class="pixel-actions">
        <div class="btn-group">
          <span class="pixel-label">Latest build:</span>
          <a :href="buildData?.url || device.download_link" target="_blank" class="pixel-btn">Download</a>
        </div>
        <div v-if="device.xda" class="btn-group">
          <span class="pixel-label">XDA Thread:</span>
          <a :href="device.xda" target="_blank" class="pixel-btn">XDA</a>
        </div>
        <div class="btn-group">
          <span class="pixel-label">Previous Builds:</span>
          <a href="#" class="pixel-btn">Archive</a>
        </div>
      </div>

      <div class="pixel-accordions">

        <details class="pixel-item" @toggle="loadBuildInfo">
          <summary>Latest Build Info</summary>
          <div class="item-content">
            <div v-if="loadingBuild" class="loading-text">Fetching build details...</div>
            <div v-else-if="buildData">
              <div class="info-sub-row">
                <span class="pixel-label-small">Filename</span>
                <p class="pixel-value-small">{{ buildData.filename }}</p>
              </div>
              <div class="info-sub-row">
                <span class="pixel-label-small">Size</span>
                <p class="pixel-value-small">{{ formatBytes(buildData.size) }}</p>
              </div>
              <div class="info-sub-row">
                <span class="pixel-label-small">MD5</span>
                <p class="pixel-value-small mono">{{ buildData.id }}</p>
              </div>
            </div>
            <div v-else class="loading-text">Build info unavailable.</div>
          </div>
        </details>

        <details v-if="additionalImages.length > 0" class="pixel-item">
          <summary>Additional Images</summary>
          <div class="item-content">
            <div v-for="img in additionalImages" :key="img.filename" class="additional-img-row">
              <div class="img-info">
                <span class="pixel-label-small">{{ img.name }}</span>
                <p class="pixel-value-small">{{ img.filename }}</p>
              </div>
              <a :href="img.url" target="_blank" class="pixel-btn-mini">Download</a>
            </div>
          </div>
        </details>

        <details class="pixel-item" @toggle="loadPlatformChangelog">
          <summary>Platform Changelog</summary>
          <div class="item-content">
            <div v-if="loadingPlatform" class="loading-text">Fetching platform updates...</div>
            <div v-else-if="renderedPlatform" class="scroll-container">
              <div class="markdown-body" v-html="renderedPlatform"></div>
            </div>
            <div v-else class="loading-text">No changelog available.</div>
          </div>
        </details>

        <details class="pixel-item" @toggle="loadDeviceChangelog">
          <summary>Device Changelog</summary>
          <div class="item-content">
            <div v-if="loadingDevice" class="loading-text">Fetching device updates...</div>
            <pre class="changelog-text">{{ deviceChangelog }}</pre>
          </div>
        </details>

        <details class="pixel-item" @toggle="loadInstructions">
          <summary>Instructions</summary>
          <div class="item-content">
            <div v-if="loadingInstructions" class="loading-text">Fetching instructions...</div>
            <pre class="changelog-text">{{ instructionsText }}</pre>
          </div>
        </details>

      </div>

      <p class="pixel-footer">
        If you are looking for builds of previous versions, check <a href="#">here</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import mdIt from 'markdown-it'

const props = defineProps(['device'])
const md = mdIt()

// States
const buildData = ref(null)
const loadingBuild = ref(false)
const renderedPlatform = ref('')
const loadingPlatform = ref(false)
const deviceChangelog = ref('No device changes recorded.')
const loadingDevice = ref(false)
const instructionsText = ref('No instructions found.')
const loadingInstructions = ref(false)

// Helpers
const formatBytes = (bytes) => {
  if (!bytes) return 'N/A'
  const gbs = bytes / (1024 * 1024 * 1024)
  return gbs.toFixed(2) + ' GB'
}

const displayData = computed(() => ({
  'Model': props.device?.model || 'Unknown',
  'Codename': props.device?.codename || 'N/A',
  'Status': props.device?.active ? 'Active' : 'Inactive',
  'Version': props.device?.version || 'N/A',
  'Release': props.device?.release || 'N/A',
  'Maintainer': props.device?.maintainer_name || 'N/A'
}))

const additionalImages = computed(() => {
  const zipUrl = buildData.value?.url || props.device?.download_link

  if (!zipUrl) return []

  if (!zipUrl.includes('gitlab.com') || !zipUrl.includes('/generic/builds/')) {
    return []
  }

  try {
    const cleanUrl = zipUrl.split('?')[0]
    
    const lastSlashIndex = cleanUrl.lastIndexOf('/')
    if (lastSlashIndex === -1) return []

    const baseUrl = cleanUrl.substring(0, lastSlashIndex)

    return [
      {
        name: 'Boot Image',
        filename: 'boot.img',
        url: `${baseUrl}/boot.img`
      },
      {
        name: 'Vendor Boot',
        filename: 'vendor_boot.img',
        url: `${baseUrl}/vendor_boot.img`
      }
    ]
  } catch (e) {
    console.error("Erro ao processar URLs do GitLab:", e)
    return []
  }
})


// Fetches
async function loadBuildInfo() {
  if (buildData.value || !props.device?.codename) return
  loadingBuild.value = true
  try {
    const res = await fetch(`https://raw.githubusercontent.com/AyakaUI/official_devices/sixteen/API/updater/${props.device.codename}.json`)
    const json = await res.json()
    if (json.response && json.response[0]) buildData.value = json.response[0]
  } catch (e) { console.error(e) }
  finally { loadingBuild.value = false }
}

async function loadPlatformChangelog(e) {
  if (!e.target.open || renderedPlatform.value) return
  loadingPlatform.value = true
  try {
    const res = await fetch(`https://raw.githubusercontent.com/AyakaUI/blog/main/changelogs/index.md`)
    if (res.ok) {
      let text = await res.text()
      text = text.replace(/^#\sChangelogs/i, '')
      renderedPlatform.value = md.render(text)
    }
  } finally { loadingPlatform.value = false }
}

async function loadDeviceChangelog(e) {
  if (!e.target.open || loadingDevice.value) return
  loadingDevice.value = true
  try {
    const res = await fetch(`https://raw.githubusercontent.com/AyakaUI/official_devices/sixteen/API/updater/changelogs/${props.device.codename}.md`)
    deviceChangelog.value = res.ok ? await res.text() : 'Not found.'
  } finally { loadingDevice.value = false }
}

async function loadInstructions(e) {
  if (!e.target.open || loadingInstructions.value) return
  loadingInstructions.value = true
  try {
    const res = await fetch(`https://raw.githubusercontent.com/AyakaUI/official_devices/sixteen/API/instructions/${props.device.codename}.md`)
    instructionsText.value = res.ok ? await res.text() : 'Not found.'
  } finally { loadingInstructions.value = false }
}

onMounted(() => { loadBuildInfo() })
</script>

<style scoped>
/* Layout */
.pixel-wrapper { position: relative; padding: 40px 20px; min-height: 100vh; background: #FDFBF7; color: #3D3D3D; overflow-x: hidden; font-family: sans-serif; }
.pixel-bg-blob { position: absolute; top: -50px; left: -50px; width: 300px; height: 300px; background: #F8E4A1; border-radius: 50%; filter: blur(80px); opacity: 0.4; z-index: 0; }
.pixel-container { position: relative; z-index: 1; max-width: 500px; margin: 0 auto; }

/* Textos e Botões */
.pixel-row { margin-bottom: 25px; }
.pixel-label { display: block; font-size: 14px; font-weight: 700; color: #A39E8D; margin-bottom: 4px; }
.pixel-title { font-size: 28px !important; font-weight: 900 !important; color: #3D3D3D !important; border: none !important; margin: 0 !important; }
.pixel-data { font-size: 24px; font-weight: 800; color: #4A4A4A; margin: 0; }
.pixel-actions { margin-top: 40px; display: flex; flex-direction: column; gap: 30px; margin-bottom: 50px; }
.pixel-btn { display: block; width: 100%; padding: 18px; background: #F8E4A1; color: #423708 !important; text-align: center; border-radius: 50px; font-weight: 900; text-decoration: none !important; transition: 0.2s ease; }
.pixel-btn:hover { background: #F2D87F; transform: translateY(-2px); }

/* Estilo para as Imagens Adicionais */
.additional-img-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-top: 1px solid #e5e1d566; }
.additional-img-row:first-child { border-top: none; }
.pixel-btn-mini { background: #F8E4A1; color: #423708; padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 900; text-decoration: none; transition: 0.2s; text-transform: uppercase; }
.pixel-btn-mini:hover { background: #F2D87F; }

/* Acordeões */
.pixel-accordions { border-top: 1px solid #E5E1D5; }
.pixel-item { border-bottom: 1px solid #E5E1D5; background: #F8F5ED; }
summary { padding: 20px; font-weight: 800; font-size: 18px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; }
summary::after { content: '▼'; font-size: 12px; color: #A39E8D; transition: transform 0.3s; }
details[open] summary::after { transform: rotate(180deg); }
.item-content { padding: 0 20px 20px 20px; }

/* Scroll Container */
.scroll-container { max-height: 350px; overflow-y: auto; border-radius: 12px; background: #f1ede1; border: 1px solid #e5e1d5; padding: 15px; }
.scroll-container::-webkit-scrollbar { width: 6px; }
.scroll-container::-webkit-scrollbar-thumb { background: #d4cfbc; border-radius: 10px; }

/* Markdown Renderizado */
:deep(.markdown-body) { font-size: 13px; line-height: 1.6; color: #444; }
:deep(.markdown-body h2) { font-size: 16px; margin-top: 15px; border-bottom: 1px solid #d4cfbc; color: #333; padding-bottom: 4px; }
:deep(.markdown-body a) { color: #D4B44A; text-decoration: none; font-family: monospace; font-weight: bold; }
:deep(.markdown-body a:hover) { text-decoration: underline; }

/* Auxiliares */
.changelog-text { white-space: pre-wrap; font-family: monospace; background: #f1ede1; padding: 15px; border-radius: 12px; font-size: 13px; border: 1px solid #e5e1d5; color: #444; }
.info-sub-row { margin-bottom: 15px; }
.pixel-label-small { display: block; font-size: 11px; font-weight: 800; color: #A39E8D; text-transform: uppercase; }
.pixel-value-small { font-size: 15px; font-weight: 700; color: #444; margin: 2px 0 0 0; word-break: break-all; }
.mono { font-family: monospace; font-size: 13px; color: #666; }
.loading-text { font-style: italic; color: #A39E8D; padding: 10px; }
.pixel-footer { margin-top: 30px; font-size: 14px; color: #888; text-align: center; padding-bottom: 60px; }
.pixel-footer a { color: #D4B44A; font-weight: bold; }
.capitalize { text-transform: capitalize; }
</style>

