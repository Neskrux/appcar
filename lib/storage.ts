import { supabase } from './supabase'

export interface UploadResult {
  path: string
  url: string
  error?: string
}

export const uploadImage = async (
  file: File,
  folder: string = 'avaliacoes'
): Promise<UploadResult> => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      return { path: '', url: '', error: error.message }
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return {
      path: filePath,
      url: urlData.publicUrl
    }
  } catch (error) {
    return {
      path: '',
      url: '',
      error: 'Erro ao fazer upload da imagem'
    }
  }
}

export const deleteImage = async (path: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from('images')
      .remove([path])

    return !error
  } catch (error) {
    return false
  }
}

export const getImageUrl = (path: string): string => {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path)
  
  return data.publicUrl
}
