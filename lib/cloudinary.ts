export interface CloudinaryUploadResult {
  url: string
  public_id: string
  error?: string
}

export const uploadToCloudinary = async (
  file: File,
  folder: string = 'the-car-avaliacoes'
): Promise<CloudinaryUploadResult> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
    formData.append('folder', folder)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const data = await response.json()

    if (data.error) {
      return { url: '', public_id: '', error: data.error.message }
    }

    return {
      url: data.secure_url,
      public_id: data.public_id
    }
  } catch (error) {
    return {
      url: '',
      public_id: '',
      error: 'Erro ao fazer upload da imagem'
    }
  }
}
