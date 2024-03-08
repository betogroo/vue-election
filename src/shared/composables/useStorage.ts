import { supabase } from '@/plugins/supabase'
import { ref } from 'vue'

const useStorage = () => {
  const _file = ref<File | null>(null)
  const _src = ref<string | undefined>('')

  const downloadImage = async (avatar_url: string | null | undefined) => {
    try {
      if (!avatar_url) return
      const { data, error: err } = await supabase.storage
        .from('avatars')
        .download(avatar_url)
      if (err) throw err
      _src.value = URL.createObjectURL(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const handleFile = (evt: Event): void => {
    const input = evt.target as HTMLInputElement
    const file = input.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') _src.value = result
      }
      reader.readAsDataURL(file)
      _file.value = file
    }
  }

  const updateAvatar = async () => {
    try {
      if (!_file.value) throw new Error('Nenhuma imagem foi selecionada')
      const fileExt = _file.value.name.split('.').pop()
      const filePath = `${Date.now()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, _file.value)
      if (uploadError) throw uploadError
      return data.path
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  return { updateAvatar, handleFile, downloadImage, _file, _src }
}

export default useStorage
