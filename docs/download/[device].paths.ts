// docs/download/[device].paths.ts
export default {
  async paths() {
    const apiFolderUrl = 'https://api.github.com/repos/AyakaUI/official_devices/contents/API/devices?ref=sixteen'
    
    try {
      const response = await fetch(apiFolderUrl)
      const files = await response.json()
      
      // Mapeia os arquivos .json para parâmetros de rota
      return files
        .filter((f: any) => f.name.endsWith('.json'))
        .map((f: any) => {
          return { 
            params: { device: f.name.replace('.json', '') } 
          }
        })
    } catch (e) {
      console.error("Erro ao gerar caminhos dinâmicos:", e)
      return []
    }
  }
}
