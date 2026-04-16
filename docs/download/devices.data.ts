import { defineLoader } from 'vitepress'

export interface Device {
  model: string
  vendor: string
  codename: string
  codename_alt: string
  maintainer_name: string
  active: boolean
  version: string | null
  release: string
  last_updated: number | string | null
  download_link: string
  archive: string
  xda: string | null
}

export declare const data: Device[]

export default defineLoader({
  async load(): Promise<Device[]> {
    const url = 'https://raw.githubusercontent.com/AyakaUI/official_devices/sixteen/API/devices.json'

    try {
      console.log(`--- [Loader] Iniciando busca de dados da AyakaUI ---`)
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Falha ao buscar devices.json: ${response.status}`)
      }

      const payload = await response.json()
      
      const devices: Device[] = payload.devices || []

      console.log(`--- [Loader] ${devices.length} dispositivos carregados com sucesso ---`)

      return devices.sort((a, b) => a.model.localeCompare(b.model))

    } catch (e) {
      console.error('❌ Erro crítico no devices.data.ts:', e)
      return []
    }
  },

  async paths(data: Device[]) {
    return data.map((device) => {
      return {
        params: {
          device: device.codename
        }
      }
    })
  }
})
