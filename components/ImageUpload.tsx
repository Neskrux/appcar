'use client'

import { useState } from 'react'
import { Camera, X, Upload } from 'lucide-react'
import { uploadImage } from '@/lib/storage'

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void
  maxImages?: number
  folder?: string
}

export default function ImageUpload({ 
  onImagesUploaded, 
  maxImages = 10, 
  folder = 'avaliacoes' 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setUploading(true)

    try {
      const uploadedUrls: string[] = []
      
      for (let i = 0; i < Math.min(files.length, maxImages - images.length); i++) {
        const file = files[i]
        
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
          continue
        }

        // Validar tamanho (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          continue
        }

        const result = await uploadImage(file, folder)
        
        if (result.url && !result.error) {
          uploadedUrls.push(result.url)
        }
      }

      const newImages = [...images, ...uploadedUrls]
      setImages(newImages)
      onImagesUploaded(newImages)
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onImagesUploaded(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
          <Camera size={20} />
          {uploading ? 'Enviando...' : 'Adicionar Fotos'}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading || images.length >= maxImages}
          />
        </label>
        
        {images.length > 0 && (
          <span className="text-sm text-gray-600">
            {images.length}/{maxImages} fotos
          </span>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Foto ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="flex items-center gap-2 text-primary">
          <Upload className="animate-spin" size={20} />
          Enviando imagens...
        </div>
      )}
    </div>
  )
}
