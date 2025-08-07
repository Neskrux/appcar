'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, RotateCcw, Save } from 'lucide-react'

interface DamageArea {
  id: string
  name: string
  path: string
  damaged: boolean
}

interface CarDamageMapProps {
  onDamageUpdate?: (damages: string[]) => void
  initialDamages?: string[]
}

export default function CarDamageMap({ onDamageUpdate, initialDamages = [] }: CarDamageMapProps) {
  const [selectedView, setSelectedView] = useState<'lateral' | 'frontal' | 'traseira' | 'topo'>('lateral')
  const [damages, setDamages] = useState<Set<string>>(new Set(initialDamages))
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  // Sincronizar danos apenas na inicialização
  useEffect(() => {
    if (initialDamages && initialDamages.length > 0) {
      setDamages(new Set(initialDamages))
    }
  }, []) // Executar apenas uma vez na montagem do componente

  // Áreas clicáveis do veículo - Vista Lateral
  const lateralAreas: DamageArea[] = [
    { id: 'porta-dianteira', name: 'Porta Dianteira', path: 'M 150,180 L 230,180 L 230,280 L 150,280 Z', damaged: false },
    { id: 'porta-traseira', name: 'Porta Traseira', path: 'M 235,180 L 315,180 L 315,280 L 235,280 Z', damaged: false },
    { id: 'paralama-dianteiro', name: 'Paralama Dianteiro', path: 'M 80,200 L 145,200 L 145,280 L 80,280 Z', damaged: false },
    { id: 'paralama-traseiro', name: 'Paralama Traseiro', path: 'M 320,200 L 385,200 L 385,280 L 320,280 Z', damaged: false },
    { id: 'capo', name: 'Capô', path: 'M 80,150 L 180,130 L 180,175 L 80,195 Z', damaged: false },
    { id: 'teto', name: 'Teto', path: 'M 180,130 L 320,130 L 320,175 L 180,175 Z', damaged: false },
    { id: 'porta-malas', name: 'Porta-malas', path: 'M 320,130 L 385,150 L 385,195 L 320,175 Z', damaged: false },
    { id: 'para-choque-dianteiro', name: 'Para-choque Dianteiro', path: 'M 50,250 L 75,250 L 75,290 L 50,290 Z', damaged: false },
    { id: 'para-choque-traseiro', name: 'Para-choque Traseiro', path: 'M 390,250 L 415,250 L 415,290 L 390,290 Z', damaged: false },
    { id: 'roda-dianteira', name: 'Roda Dianteira', path: 'M 90,280 L 130,280 L 130,320 L 90,320 Z', damaged: false },
    { id: 'roda-traseira', name: 'Roda Traseira', path: 'M 330,280 L 370,280 L 370,320 L 330,320 Z', damaged: false },
    { id: 'retrovisor', name: 'Retrovisor', path: 'M 145,165 L 165,165 L 165,180 L 145,180 Z', damaged: false },
    { id: 'macaneta-dianteira', name: 'Maçaneta Dianteira', path: 'M 200,220 L 220,220 L 220,235 L 200,235 Z', damaged: false },
    { id: 'macaneta-traseira', name: 'Maçaneta Traseira', path: 'M 285,220 L 305,220 L 305,235 L 285,235 Z', damaged: false },
  ]

  // Áreas clicáveis - Vista Frontal
  const frontalAreas: DamageArea[] = [
    { id: 'capo-frontal', name: 'Capô', path: 'M 150,180 L 350,180 L 340,250 L 160,250 Z', damaged: false },
    { id: 'para-brisa', name: 'Para-brisa', path: 'M 160,130 L 340,130 L 350,175 L 150,175 Z', damaged: false },
    { id: 'grade', name: 'Grade', path: 'M 200,255 L 300,255 L 300,280 L 200,280 Z', damaged: false },
    { id: 'farol-esquerdo', name: 'Farol Esquerdo', path: 'M 160,255 L 195,255 L 195,275 L 160,275 Z', damaged: false },
    { id: 'farol-direito', name: 'Farol Direito', path: 'M 305,255 L 340,255 L 340,275 L 305,275 Z', damaged: false },
    { id: 'para-choque-frontal', name: 'Para-choque', path: 'M 150,285 L 350,285 L 350,310 L 150,310 Z', damaged: false },
    { id: 'retrovisor-esquerdo', name: 'Retrovisor Esquerdo', path: 'M 120,180 L 145,180 L 145,210 L 120,210 Z', damaged: false },
    { id: 'retrovisor-direito', name: 'Retrovisor Direito', path: 'M 355,180 L 380,180 L 380,210 L 355,210 Z', damaged: false },
    { id: 'roda-frontal-esquerda', name: 'Roda Frontal Esquerda', path: 'M 130,310 L 170,310 L 170,350 L 130,350 Z', damaged: false },
    { id: 'roda-frontal-direita', name: 'Roda Frontal Direita', path: 'M 330,310 L 370,310 L 370,350 L 330,350 Z', damaged: false },
  ]

  // Áreas clicáveis - Vista Traseira
  const traseiraAreas: DamageArea[] = [
    { id: 'porta-malas-traseira', name: 'Tampa Traseira', path: 'M 160,180 L 340,180 L 340,250 L 160,250 Z', damaged: false },
    { id: 'vidro-traseiro', name: 'Vidro Traseiro', path: 'M 170,130 L 330,130 L 340,175 L 160,175 Z', damaged: false },
    { id: 'lanterna-esquerda', name: 'Lanterna Esquerda', path: 'M 160,255 L 195,255 L 195,275 L 160,275 Z', damaged: false },
    { id: 'lanterna-direita', name: 'Lanterna Direita', path: 'M 305,255 L 340,255 L 340,275 L 305,275 Z', damaged: false },
    { id: 'para-choque-traseiro-view', name: 'Para-choque Traseiro', path: 'M 150,285 L 350,285 L 350,310 L 150,310 Z', damaged: false },
    { id: 'placa', name: 'Placa', path: 'M 220,260 L 280,260 L 280,280 L 220,280 Z', damaged: false },
    { id: 'roda-traseira-esquerda', name: 'Roda Traseira Esquerda', path: 'M 130,310 L 170,310 L 170,350 L 130,350 Z', damaged: false },
    { id: 'roda-traseira-direita', name: 'Roda Traseira Direita', path: 'M 330,310 L 370,310 L 370,350 L 330,350 Z', damaged: false },
  ]

  // Áreas clicáveis - Vista Superior
  const topoAreas: DamageArea[] = [
    { id: 'capo-topo', name: 'Capô', path: 'M 150,100 L 250,100 L 250,180 L 150,180 Z', damaged: false },
    { id: 'teto-topo', name: 'Teto', path: 'M 150,185 L 250,185 L 250,315 L 150,315 Z', damaged: false },
    { id: 'porta-malas-topo', name: 'Porta-malas', path: 'M 150,320 L 250,320 L 250,400 L 150,400 Z', damaged: false },
    { id: 'lateral-esquerda', name: 'Lateral Esquerda', path: 'M 100,100 L 145,100 L 145,400 L 100,400 Z', damaged: false },
    { id: 'lateral-direita', name: 'Lateral Direita', path: 'M 255,100 L 300,100 L 300,400 L 255,400 Z', damaged: false },
    { id: 'para-brisa-topo', name: 'Para-brisa', path: 'M 160,150 L 240,150 L 240,175 L 160,175 Z', damaged: false },
    { id: 'vidro-traseiro-topo', name: 'Vidro Traseiro', path: 'M 160,325 L 240,325 L 240,350 L 160,350 Z', damaged: false },
  ]

  const getAreas = () => {
    switch (selectedView) {
      case 'frontal': return frontalAreas
      case 'traseira': return traseiraAreas
      case 'topo': return topoAreas
      default: return lateralAreas
    }
  }

  const toggleDamage = (areaId: string) => {
    try {
      const newDamages = new Set(damages)
      if (newDamages.has(areaId)) {
        newDamages.delete(areaId)
      } else {
        newDamages.add(areaId)
      }
      setDamages(newDamages)
      if (onDamageUpdate) {
        onDamageUpdate(Array.from(newDamages))
      }
    } catch (error) {
      console.error('Erro ao alternar dano:', error)
    }
  }

  const clearAll = () => {
    try {
      setDamages(new Set())
      if (onDamageUpdate) {
        onDamageUpdate([])
      }
    } catch (error) {
      console.error('Erro ao limpar danos:', error)
    }
  }

  const getCarSvg = () => {
    switch (selectedView) {
      case 'frontal':
        return (
          <g>
            {/* Carroceria frontal */}
            <path d="M 150,130 L 350,130 L 360,180 L 350,310 L 370,350 L 130,350 L 150,310 L 140,180 Z" 
                  fill="none" stroke="#333" strokeWidth="2"/>
            {/* Para-brisa */}
            <path d="M 160,130 L 340,130 L 350,175 L 150,175 Z" 
                  fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
            {/* Grade */}
            <rect x="200" y="255" width="100" height="25" fill="none" stroke="#333" strokeWidth="1"/>
            {/* Faróis */}
            <ellipse cx="177" cy="265" rx="17" ry="10" fill="none" stroke="#333" strokeWidth="1"/>
            <ellipse cx="323" cy="265" rx="17" ry="10" fill="none" stroke="#333" strokeWidth="1"/>
            {/* Rodas */}
            <ellipse cx="150" cy="330" rx="20" ry="20" fill="none" stroke="#333" strokeWidth="2"/>
            <ellipse cx="350" cy="330" rx="20" ry="20" fill="none" stroke="#333" strokeWidth="2"/>
            {/* Retrovisores */}
            <rect x="120" y="180" width="25" height="30" fill="none" stroke="#333" strokeWidth="1"/>
            <rect x="355" y="180" width="25" height="30" fill="none" stroke="#333" strokeWidth="1"/>
          </g>
        )
      case 'traseira':
        return (
          <g>
            {/* Carroceria traseira */}
            <path d="M 150,130 L 350,130 L 360,180 L 350,310 L 370,350 L 130,350 L 150,310 L 140,180 Z" 
                  fill="none" stroke="#333" strokeWidth="2"/>
            {/* Vidro traseiro */}
            <path d="M 170,130 L 330,130 L 340,175 L 160,175 Z" 
                  fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
            {/* Lanternas */}
            <rect x="160" y="255" width="35" height="20" rx="5" fill="none" stroke="#333" strokeWidth="1"/>
            <rect x="305" y="255" width="35" height="20" rx="5" fill="none" stroke="#333" strokeWidth="1"/>
            {/* Placa */}
            <rect x="220" y="260" width="60" height="20" fill="none" stroke="#333" strokeWidth="1"/>
            {/* Rodas */}
            <ellipse cx="150" cy="330" rx="20" ry="20" fill="none" stroke="#333" strokeWidth="2"/>
            <ellipse cx="350" cy="330" rx="20" ry="20" fill="none" stroke="#333" strokeWidth="2"/>
          </g>
        )
      case 'topo':
        return (
          <g>
            {/* Contorno do carro vista superior */}
            <path d="M 150,100 Q 200,80 250,100 L 250,400 Q 200,420 150,400 Z" 
                  fill="none" stroke="#333" strokeWidth="2"/>
            {/* Laterais */}
            <line x1="100" y1="100" x2="100" y2="400" stroke="#333" strokeWidth="2"/>
            <line x1="300" y1="100" x2="300" y2="400" stroke="#333" strokeWidth="2"/>
            {/* Para-brisa */}
            <rect x="160" y="150" width="80" height="25" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
            {/* Vidro traseiro */}
            <rect x="160" y="325" width="80" height="25" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
            {/* Rodas */}
            <rect x="110" y="140" width="30" height="15" rx="5" fill="none" stroke="#333" strokeWidth="1"/>
            <rect x="260" y="140" width="30" height="15" rx="5" fill="none" stroke="#333" strokeWidth="1"/>
            <rect x="110" y="345" width="30" height="15" rx="5" fill="none" stroke="#333" strokeWidth="1"/>
            <rect x="260" y="345" width="30" height="15" rx="5" fill="none" stroke="#333" strokeWidth="1"/>
            {/* Retrovisores */}
            <ellipse cx="95" cy="200" rx="8" ry="15" fill="none" stroke="#333" strokeWidth="1"/>
            <ellipse cx="305" cy="200" rx="8" ry="15" fill="none" stroke="#333" strokeWidth="1"/>
          </g>
        )
      default: // lateral
        return (
          <g>
            {/* Carroceria lateral */}
            <path d="M 80,200 L 80,280 L 90,290 L 90,320 L 130,320 L 130,290 L 330,290 L 330,320 L 370,320 L 370,290 L 385,280 L 385,200 L 380,195 L 320,130 L 180,130 L 80,200 Z" 
                  fill="none" stroke="#333" strokeWidth="2"/>
            {/* Janelas */}
            <path d="M 150,180 L 230,180 L 230,130 L 180,130 Z" 
                  fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
            <path d="M 235,180 L 315,180 L 320,130 L 235,130 Z" 
                  fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
            {/* Portas */}
            <line x1="230" y1="180" x2="230" y2="280" stroke="#333" strokeWidth="1"/>
            <line x1="315" y1="180" x2="315" y2="280" stroke="#333" strokeWidth="1"/>
            {/* Rodas */}
            <circle cx="110" cy="300" r="20" fill="none" stroke="#333" strokeWidth="2"/>
            <circle cx="350" cy="300" r="20" fill="none" stroke="#333" strokeWidth="2"/>
            {/* Maçanetas */}
            <rect x="200" y="220" width="20" height="15" rx="3" fill="none" stroke="#333" strokeWidth="1"/>
            <rect x="285" y="220" width="20" height="15" rx="3" fill="none" stroke="#333" strokeWidth="1"/>
            {/* Retrovisor */}
            <ellipse cx="155" cy="172" rx="10" ry="7" fill="none" stroke="#333" strokeWidth="1"/>
            {/* Faróis/Lanternas */}
            <ellipse cx="65" cy="240" rx="8" ry="15" fill="none" stroke="#333" strokeWidth="1"/>
            <ellipse cx="400" cy="240" rx="8" ry="15" fill="none" stroke="#333" strokeWidth="1"/>
          </g>
        )
    }
  }

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Mapa de Danos do Veículo
          </h3>
                     <button
             type="button"
             onClick={(e) => {
               e.preventDefault()
               e.stopPropagation()
               clearAll()
             }}
             className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
           >
             <RotateCcw className="h-4 w-4" />
             Limpar Tudo
           </button>
        </div>

                 {/* Seletor de Vista */}
         <div className="flex gap-2 mb-4">
           <button
             type="button"
             onClick={(e) => {
               e.preventDefault()
               e.stopPropagation()
               setSelectedView('lateral')
             }}
             className={`px-4 py-2 rounded-lg transition-colors ${
               selectedView === 'lateral' 
                 ? 'bg-black text-white' 
                 : 'bg-gray-100 hover:bg-gray-200'
             }`}
           >
             Vista Lateral
           </button>
           <button
             type="button"
             onClick={(e) => {
               e.preventDefault()
               e.stopPropagation()
               setSelectedView('frontal')
             }}
             className={`px-4 py-2 rounded-lg transition-colors ${
               selectedView === 'frontal' 
                 ? 'bg-black text-white' 
                 : 'bg-gray-100 hover:bg-gray-200'
             }`}
           >
             Vista Frontal
           </button>
           <button
             type="button"
             onClick={(e) => {
               e.preventDefault()
               e.stopPropagation()
               setSelectedView('traseira')
             }}
             className={`px-4 py-2 rounded-lg transition-colors ${
               selectedView === 'traseira' 
                 ? 'bg-black text-white' 
                 : 'bg-gray-100 hover:bg-gray-200'
             }`}
           >
             Vista Traseira
           </button>
           <button
             type="button"
             onClick={(e) => {
               e.preventDefault()
               e.stopPropagation()
               setSelectedView('topo')
             }}
             className={`px-4 py-2 rounded-lg transition-colors ${
               selectedView === 'topo' 
                 ? 'bg-black text-white' 
                 : 'bg-gray-200 hover:bg-gray-300'
             }`}
           >
             Vista Superior
           </button>
         </div>

        {/* SVG do Carro */}
        <div className="relative bg-gray-50 rounded-lg p-4 mb-4">
          <svg 
            viewBox="0 0 500 450" 
            className="w-full h-auto max-w-2xl mx-auto"
            style={{ minHeight: '300px' }}
          >
            {/* Desenho do carro */}
            {getCarSvg()}
            
                         {/* Áreas clicáveis */}
             {getAreas().map(area => {
               if (!area || !area.id || !area.path) return null
               return (
                 <path
                   key={area.id}
                   d={area.path}
                   fill={damages.has(area.id) ? 'rgba(239, 68, 68, 0.5)' : 
                         hoveredArea === area.id ? 'rgba(239, 68, 68, 0.2)' : 'transparent'}
                   stroke={damages.has(area.id) ? '#dc2626' : 'transparent'}
                   strokeWidth="2"
                   className="cursor-pointer transition-all"
                   onClick={(e) => {
                     e.preventDefault()
                     e.stopPropagation()
                     toggleDamage(area.id)
                   }}
                   onMouseEnter={() => setHoveredArea(area.id)}
                   onMouseLeave={() => setHoveredArea(null)}
                 />
               )
             })}
          </svg>

          {/* Tooltip */}
          {hoveredArea && (
            <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-sm pointer-events-none">
              {getAreas().find(a => a.id === hoveredArea)?.name}
            </div>
          )}
        </div>

                 {/* Lista de Danos Selecionados */}
         {damages.size > 0 && (
           <div className="border-t pt-4">
             <h4 className="font-medium mb-2">Áreas com Danos ({damages.size}):</h4>
             <div className="flex flex-wrap gap-2">
               {Array.from(damages).map(damageId => {
                 if (!damageId) return null
                 const area = [...lateralAreas, ...frontalAreas, ...traseiraAreas, ...topoAreas]
                   .find(a => a.id === damageId)
                 return (
                   <span
                     key={damageId}
                     className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                   >
                     {area?.name || damageId}
                     <button
                       type="button"
                       onClick={(e) => {
                         e.preventDefault()
                         e.stopPropagation()
                         toggleDamage(damageId)
                       }}
                       className="ml-2 hover:text-red-600"
                     >
                       ×
                     </button>
                   </span>
                 )
               })}
             </div>
           </div>
         )}

        <div className="mt-4 text-sm text-gray-600">
          <p>💡 Clique nas áreas do veículo para marcar os danos. As áreas selecionadas ficarão em vermelho.</p>
        </div>
      </div>
    </div>
  )
}
