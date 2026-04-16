import { defineLoader } from 'vitepress'

export interface Device {
  model: string
  vendor: string
  codename: string
  maintainer: { display_name: string; telegram: string; github: string }[]
  active: boolean
  version: string
  release: string
  last_updated: string
  download_link: string
  xda: string | null
}

export declare const data: Device[]

export default defineLoader({
  async load(): Promise<Device[]> {
    const apiFolderUrl = 'https://api.github.com/repos/AyakaUI/official_devices/contents/API/devices?ref=sixteen'
    const rawBaseUrl = 'https://raw.githubusercontent.com/AyakaUI/official_devices/sixteen/API/devices/'

    try {
      // 1. Busca a lista de arquivos no diretório do repositório
      const response = await fetch(apiFolderUrl)
      if (!response.ok) throw new Error(`Falha na API do GitHub: ${response.status}`)
      
      const files = await response.json()

      // 2. Filtra apenas arquivos .json e extrai o codename
      const codenames = files
        .filter((file: any) => file.name.endsWith('.json'))
        .map((file: any) => file.name.replace('.json', ''))

      console.log(`--- [Loader] Carregando ${codenames.length} dispositivos ---`)

      // 3. Busca o conteúdo de cada JSON
      const devices = await Promise.all(
        codenames.map(async (code) => {
          try {
            const res = await fetch(`${rawBaseUrl}${code}.json`)
            if (!res.ok) return null
            return await res.json()
          } catch (e) {
            console.error(`Erro ao buscar dados de ${code}`)
            return null
          }
        })
      )

      // Retorna a lista limpa e em ordem alfabética por modelo
      return devices
        .filter((d): d is Device => d !== null)
        .sort((a, b) => a.model.localeCompare(b.model))

    } catch (e) {
      console.error('Erro crítico no devices.data.ts:', e)
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

