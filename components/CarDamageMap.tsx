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
    { id: 'porta-dianteira', name: 'Porta Dianteira', path: 'M 150,200 L 230,200 L 230,280 L 150,280 Z', damaged: false },
    { id: 'porta-traseira', name: 'Porta Traseira', path: 'M 235,200 L 315,200 L 315,280 L 235,280 Z', damaged: false },
    { id: 'paralama-dianteiro', name: 'Paralama Dianteiro', path: 'M 82,270 Q 82,240 110,240 Q 138,240 138,270 L 138,300 Q 110,310 82,300 Z', damaged: false },
    { id: 'paralama-traseiro', name: 'Paralama Traseiro', path: 'M 322,270 Q 322,240 350,240 Q 378,240 378,270 L 378,300 Q 350,310 322,300 Z', damaged: false },
    { id: 'capo', name: 'Capô', path: 'M 90,210 Q 100,140 180,130 L 120,145 L 100,200 L 90,210 Z', damaged: false },
    { id: 'teto', name: 'Teto', path: 'M 180,130 L 320,130 L 325,200 L 175,200 Z', damaged: false },
    { id: 'porta-malas', name: 'Porta-malas', path: 'M 320,130 Q 380,140 390,210 L 390,200 L 375,145 L 330,140 Z', damaged: false },
    { id: 'para-choque-dianteiro', name: 'Para-choque Dianteiro', path: 'M 45,270 L 80,270 L 80,295 L 45,295 Z', damaged: false },
    { id: 'para-choque-traseiro', name: 'Para-choque Traseiro', path: 'M 390,270 L 425,270 L 425,295 L 390,295 Z', damaged: false },
    { id: 'retrovisor', name: 'Retrovisor', path: 'M 133,157 L 157,157 L 157,173 L 133,173 Z', damaged: false },
  ]

  // Áreas clicáveis - Vista Frontal
  const frontalAreas: DamageArea[] = [
    { id: 'capo-frontal', name: 'Capô', path: 'M 160,200 L 340,200 L 340,250 L 160,250 Z', damaged: false },
    { id: 'para-brisa', name: 'Para-brisa', path: 'M 170,160 L 330,160 L 340,200 L 160,200 Z', damaged: false },
    { id: 'grade', name: 'Grade', path: 'M 220,250 L 280,250 L 280,275 L 220,275 Z', damaged: false },
    { id: 'farol-esquerdo', name: 'Farol Esquerdo', path: 'M 155,245 L 195,245 L 195,270 L 155,270 Z', damaged: false },
    { id: 'farol-direito', name: 'Farol Direito', path: 'M 305,245 L 345,245 L 345,270 L 305,270 Z', damaged: false },
    { id: 'para-choque-frontal', name: 'Para-choque', path: 'M 140,280 L 360,280 L 360,305 L 140,305 Z', damaged: false },
    { id: 'retrovisor-esquerdo', name: 'Retrovisor Esquerdo', path: 'M 115,180 L 145,180 L 145,210 L 115,210 Z', damaged: false },
    { id: 'retrovisor-direito', name: 'Retrovisor Direito', path: 'M 355,180 L 385,180 L 385,210 L 355,210 Z', damaged: false },
  ]

  // Áreas clicáveis - Vista Traseira
  const traseiraAreas: DamageArea[] = [
    { id: 'porta-malas-traseira', name: 'Tampa Traseira', path: 'M 160,200 L 340,200 L 340,250 L 160,250 Z', damaged: false },
    { id: 'vidro-traseiro', name: 'Vidro Traseiro', path: 'M 170,160 L 330,160 L 340,200 L 160,200 Z', damaged: false },
    { id: 'lanterna-esquerda', name: 'Lanterna Esquerda', path: 'M 145,250 L 185,250 L 185,280 L 145,280 Z', damaged: false },
    { id: 'lanterna-direita', name: 'Lanterna Direita', path: 'M 315,250 L 355,250 L 355,280 L 315,280 Z', damaged: false },
    { id: 'para-choque-traseiro-view', name: 'Para-choque Traseiro', path: 'M 140,280 L 360,280 L 360,305 L 140,305 Z', damaged: false },
    { id: 'placa', name: 'Placa', path: 'M 210,255 L 290,255 L 290,275 L 210,275 Z', damaged: false },
  ]

  // Áreas clicáveis - Vista Superior
  const topoAreas: DamageArea[] = [
    { id: 'capo-topo', name: 'Capô', path: 'M 130,110 L 270,110 L 270,180 L 130,180 Z', damaged: false },
    { id: 'teto-topo', name: 'Teto', path: 'M 130,195 L 270,195 L 270,305 L 130,305 Z', damaged: false },
    { id: 'porta-malas-topo', name: 'Porta-malas', path: 'M 130,335 L 270,335 L 270,390 L 130,390 Z', damaged: false },
    { id: 'lateral-esquerda', name: 'Lateral Esquerda', path: 'M 95,110 L 125,110 L 125,390 L 95,390 Z', damaged: false },
    { id: 'lateral-direita', name: 'Lateral Direita', path: 'M 275,110 L 305,110 L 305,390 L 275,390 Z', damaged: false },
    { id: 'para-brisa-topo', name: 'Para-brisa', path: 'M 140,170 L 260,170 L 255,190 L 145,190 Z', damaged: false },
    { id: 'vidro-traseiro-topo', name: 'Vidro Traseiro', path: 'M 145,310 L 255,310 L 260,330 L 140,330 Z', damaged: false },
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
            {/* Vista Frontal - Carro Realista Moderno */}
            {/* Sombra dinâmica */}
            <ellipse cx="250" cy="350" rx="130" ry="15" fill="url(#shadow)" opacity="0.3"/>
            <defs>
              <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
              </radialGradient>
            </defs>
            
            {/* Carroceria principal - design moderno */}
            <path d="M 130,270 L 130,200 Q 130,180 150,170 L 350,170 Q 370,180 370,200 L 370,270" 
                  fill="url(#bodyGradient)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc"/>
                <stop offset="50%" stopColor="#e2e8f0"/>
                <stop offset="100%" stopColor="#cbd5e1"/>
              </linearGradient>
            </defs>
            
            {/* Capô com linhas de design */}
            <path d="M 150,270 L 150,200 L 350,200 L 350,270" 
                  fill="url(#hoodGradient)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="hoodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9"/>
                <stop offset="100%" stopColor="#e2e8f0"/>
              </linearGradient>
            </defs>
            
            {/* Linhas de design do capô */}
            <path d="M 200,200 L 200,270" stroke="#cbd5e1" strokeWidth="1" opacity="0.6"/>
            <path d="M 300,200 L 300,270" stroke="#cbd5e1" strokeWidth="1" opacity="0.6"/>
            
            {/* Para-brisa com reflexo */}
            <path d="M 160,200 L 180,160 L 320,160 L 340,200" 
                  fill="url(#windshieldGradient)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <linearGradient id="windshieldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            
            {/* Reflexo no para-brisa */}
            <path d="M 170,170 L 310,170 L 305,185 L 175,185 Z" 
                  fill="url(#reflectionGradient)" opacity="0.4"/>
            <defs>
              <linearGradient id="reflectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            
            {/* Teto com design moderno */}
            <rect x="180" y="150" width="140" height="15" fill="url(#roofGradient)" stroke="#1f2937" strokeWidth="1" rx="8"/>
            <defs>
              <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8"/>
                <stop offset="100%" stopColor="#64748b"/>
              </linearGradient>
            </defs>
            
            {/* Grade frontal moderna */}
            <rect x="210" y="240" width="80" height="25" fill="url(#grilleGradient)" stroke="#1f2937" strokeWidth="1" rx="3"/>
            <defs>
              <linearGradient id="grilleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b"/>
                <stop offset="100%" stopColor="#0f172a"/>
              </linearGradient>
            </defs>
            
            {/* Barras da grade */}
            <line x1="220" y1="240" x2="220" y2="265" stroke="#475569" strokeWidth="2"/>
            <line x1="230" y1="240" x2="230" y2="265" stroke="#475569" strokeWidth="2"/>
            <line x1="240" y1="240" x2="240" y2="265" stroke="#475569" strokeWidth="2"/>
            <line x1="250" y1="240" x2="250" y2="265" stroke="#475569" strokeWidth="2"/>
            <line x1="260" y1="240" x2="260" y2="265" stroke="#475569" strokeWidth="2"/>
            <line x1="270" y1="240" x2="270" y2="265" stroke="#475569" strokeWidth="2"/>
            <line x1="280" y1="240" x2="280" y2="265" stroke="#475569" strokeWidth="2"/>
            <line x1="290" y1="240" x2="290" y2="265" stroke="#475569" strokeWidth="2"/>
            
            {/* Faróis modernos com LED */}
            <ellipse cx="175" cy="245" rx="20" ry="15" fill="url(#headlightGradient)" stroke="#1f2937" strokeWidth="2"/>
            <ellipse cx="325" cy="245" rx="20" ry="15" fill="url(#headlightGradient)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <radialGradient id="headlightGradient" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#fef3c7"/>
                <stop offset="50%" stopColor="#fbbf24"/>
                <stop offset="100%" stopColor="#f59e0b"/>
              </radialGradient>
            </defs>
            
            {/* LED dos faróis */}
            <ellipse cx="175" cy="245" rx="8" ry="5" fill="#ffffff" opacity="0.9"/>
            <ellipse cx="325" cy="245" rx="8" ry="5" fill="#ffffff" opacity="0.9"/>
            
            {/* Para-choque moderno */}
            <rect x="130" y="275" width="240" height="25" fill="url(#bumperGradient)" stroke="#1f2937" strokeWidth="1" rx="5"/>
            <defs>
              <linearGradient id="bumperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
            </defs>
            
            {/* Aberturas do para-choque */}
            <rect x="150" y="280" width="35" height="8" fill="#1e293b" rx="2"/>
            <rect x="315" y="280" width="35" height="8" fill="#1e293b" rx="2"/>
            
            {/* Retrovisores aerodinâmicos */}
            <ellipse cx="120" cy="180" rx="15" ry="20" fill="url(#mirrorGradient)" stroke="#1f2937" strokeWidth="1"/>
            <ellipse cx="380" cy="180" rx="15" ry="20" fill="url(#mirrorGradient)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="mirrorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
            </defs>
            
            {/* Rodas modernas com aro esportivo */}
            <ellipse cx="170" cy="320" rx="25" ry="30" fill="url(#wheelGradient)" stroke="#1f2937" strokeWidth="2"/>
            <ellipse cx="330" cy="320" rx="25" ry="30" fill="url(#wheelGradient)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <radialGradient id="wheelGradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#1e293b"/>
                <stop offset="70%" stopColor="#0f172a"/>
                <stop offset="100%" stopColor="#000000"/>
              </radialGradient>
            </defs>
            
            {/* Aros das rodas */}
            <ellipse cx="170" cy="320" rx="15" ry="20" fill="url(#rimGradient)"/>
            <ellipse cx="330" cy="320" rx="15" ry="20" fill="url(#rimGradient)"/>
            <defs>
              <radialGradient id="rimGradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#e2e8f0"/>
                <stop offset="50%" stopColor="#cbd5e1"/>
                <stop offset="100%" stopColor="#94a3b8"/>
              </radialGradient>
            </defs>
            
            {/* Detalhes dos aros */}
            <ellipse cx="170" cy="320" rx="10" ry="12" fill="#64748b"/>
            <ellipse cx="330" cy="320" rx="10" ry="12" fill="#64748b"/>
            <ellipse cx="170" cy="320" rx="5" ry="6" fill="#475569"/>
            <ellipse cx="330" cy="320" rx="5" ry="6" fill="#475569"/>
            
            {/* Logo da marca (exemplo) */}
            <text x="250" y="165" textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="bold">H</text>
            
            {/* Detalhes finais */}
            <rect x="240" y="160" width="20" height="3" fill="#1f2937" rx="1"/>
            <rect x="240" y="165" width="20" height="1" fill="#64748b" rx="0.5"/>
          </g>
        )
      case 'traseira':
        return (
          <g>
            {/* Vista Traseira - Carro Realista Moderno */}
            {/* Sombra dinâmica */}
            <ellipse cx="250" cy="350" rx="130" ry="15" fill="url(#shadowTraseira)" opacity="0.3"/>
            <defs>
              <radialGradient id="shadowTraseira" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
              </radialGradient>
            </defs>
            
            {/* Carroceria principal - design moderno */}
            <path d="M 130,270 L 130,200 Q 130,180 150,170 L 350,170 Q 370,180 370,200 L 370,270" 
                  fill="url(#bodyGradientTraseira)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <linearGradient id="bodyGradientTraseira" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc"/>
                <stop offset="50%" stopColor="#e2e8f0"/>
                <stop offset="100%" stopColor="#cbd5e1"/>
              </linearGradient>
            </defs>
            
            {/* Teto com design moderno */}
            <rect x="180" y="150" width="140" height="15" fill="url(#roofGradientTraseira)" stroke="#1f2937" strokeWidth="1" rx="8"/>
            <defs>
              <linearGradient id="roofGradientTraseira" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8"/>
                <stop offset="100%" stopColor="#64748b"/>
              </linearGradient>
            </defs>
            
            {/* Porta-malas com design moderno */}
            <rect x="150" y="190" width="180" height="50" fill="url(#trunkGradient)" stroke="#1f2937" strokeWidth="1" rx="3"/>
            <defs>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9"/>
                <stop offset="100%" stopColor="#e2e8f0"/>
              </linearGradient>
            </defs>
            
            {/* Linha de separação do porta-malas */}
            <line x1="150" y1="215" x2="330" y2="215" stroke="#cbd5e1" strokeWidth="1" opacity="0.6"/>
            
            {/* Lanternas modernas com LED */}
            <rect x="160" y="200" width="40" height="25" fill="url(#taillightGradientTraseira)" stroke="#1f2937" strokeWidth="1.5" rx="4"/>
            <rect x="300" y="200" width="40" height="25" fill="url(#taillightGradientTraseira)" stroke="#1f2937" strokeWidth="1.5" rx="4"/>
            <defs>
              <radialGradient id="taillightGradientTraseira" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#fca5a5"/>
                <stop offset="50%" stopColor="#dc2626"/>
                <stop offset="100%" stopColor="#b91c1c"/>
              </radialGradient>
            </defs>
            
            {/* LED das lanternas */}
            <rect x="165" y="205" width="30" height="15" fill="#fecaca" opacity="0.9" rx="3"/>
            <rect x="305" y="205" width="30" height="15" fill="#fecaca" opacity="0.9" rx="3"/>
            
            {/* Luz de freio */}
            <rect x="210" y="205" width="70" height="15" fill="url(#brakeLightGradient)" stroke="#1f2937" strokeWidth="1" rx="3"/>
            <defs>
              <radialGradient id="brakeLightGradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fca5a5"/>
                <stop offset="50%" stopColor="#dc2626"/>
                <stop offset="100%" stopColor="#b91c1c"/>
              </radialGradient>
            </defs>
            
            {/* Placa moderna */}
            <rect x="220" y="235" width="70" height="20" fill="url(#plateGradient)" stroke="#1f2937" strokeWidth="1" rx="3"/>
            <defs>
              <linearGradient id="plateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc"/>
                <stop offset="100%" stopColor="#e2e8f0"/>
              </linearGradient>
            </defs>
            <text x="255" y="248" textAnchor="middle" fontSize="9" fill="#1f2937" fontWeight="bold">ABC-1234</text>
            
            {/* Para-choque moderno */}
            <rect x="130" y="275" width="240" height="25" fill="url(#bumperGradientTraseira)" stroke="#1f2937" strokeWidth="1" rx="5"/>
            <defs>
              <linearGradient id="bumperGradientTraseira" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
            </defs>
            
            {/* Aberturas do para-choque */}
            <rect x="150" y="280" width="35" height="8" fill="#1e293b" rx="2"/>
            <rect x="315" y="280" width="35" height="8" fill="#1e293b" rx="2"/>
            
            {/* Escapamento moderno */}
            <ellipse cx="180" cy="295" rx="8" ry="5" fill="url(#exhaustGradient)"/>
            <ellipse cx="320" cy="295" rx="8" ry="5" fill="url(#exhaustGradient)"/>
            <defs>
              <radialGradient id="exhaustGradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#374151"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </radialGradient>
            </defs>
            
            {/* Rodas modernas com aro esportivo */}
            <ellipse cx="170" cy="320" rx="25" ry="30" fill="url(#wheelGradientTraseira)" stroke="#1f2937" strokeWidth="2"/>
            <ellipse cx="330" cy="320" rx="25" ry="30" fill="url(#wheelGradientTraseira)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <radialGradient id="wheelGradientTraseira" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#1e293b"/>
                <stop offset="70%" stopColor="#0f172a"/>
                <stop offset="100%" stopColor="#000000"/>
              </radialGradient>
            </defs>
            
            {/* Aros das rodas */}
            <ellipse cx="170" cy="320" rx="15" ry="20" fill="url(#rimGradientTraseira)"/>
            <ellipse cx="330" cy="320" rx="15" ry="20" fill="url(#rimGradientTraseira)"/>
            <defs>
              <radialGradient id="rimGradientTraseira" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#e2e8f0"/>
                <stop offset="50%" stopColor="#cbd5e1"/>
                <stop offset="100%" stopColor="#94a3b8"/>
              </radialGradient>
            </defs>
            
            {/* Detalhes dos aros */}
            <ellipse cx="170" cy="320" rx="10" ry="12" fill="#64748b"/>
            <ellipse cx="330" cy="320" rx="10" ry="12" fill="#64748b"/>
            <ellipse cx="170" cy="320" rx="5" ry="6" fill="#475569"/>
            <ellipse cx="330" cy="320" rx="5" ry="6" fill="#475569"/>
            
            {/* Logo da marca */}
            <text x="250" y="165" textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="bold">H</text>
            
            {/* Detalhes finais */}
            <rect x="240" y="160" width="20" height="3" fill="#1f2937" rx="1"/>
            <rect x="240" y="165" width="20" height="1" fill="#64748b" rx="0.5"/>
          </g>
        )
      case 'topo':
        return (
          <g>
            {/* Vista Superior - Carro Realista Moderno */}
            {/* Sombra dinâmica */}
            <ellipse cx="200" cy="250" rx="110" ry="180" fill="url(#shadowTopo)" opacity="0.2"/>
            <defs>
              <radialGradient id="shadowTopo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
              </radialGradient>
            </defs>
            
            {/* Carroceria principal - design aerodinâmico */}
            <path d="M 120,160 Q 120,110 150,100 L 250,100 Q 280,110 280,160 L 280,340 Q 280,390 250,400 L 150,400 Q 120,390 120,340 Z" 
                  fill="url(#bodyGradientTopo)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <linearGradient id="bodyGradientTopo" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc"/>
                <stop offset="50%" stopColor="#e2e8f0"/>
                <stop offset="100%" stopColor="#cbd5e1"/>
              </linearGradient>
            </defs>
            
            {/* Capô com design moderno */}
            <path d="M 130,100 L 270,100 L 270,170 L 130,170 Z" 
                  fill="url(#hoodGradientTopo)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="hoodGradientTopo" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9"/>
                <stop offset="100%" stopColor="#e2e8f0"/>
              </linearGradient>
            </defs>
            
            {/* Linhas de design do capô */}
            <line x1="200" y1="100" x2="200" y2="170" stroke="#cbd5e1" strokeWidth="1" opacity="0.6"/>
            
            {/* Para-brisa frontal com reflexo */}
            <path d="M 140,160 L 260,160 L 255,180 L 145,180 Z" 
                  fill="url(#windshieldGradientTopo)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="windshieldGradientTopo" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            
            {/* Reflexo no para-brisa */}
            <path d="M 150,165 L 250,165 L 245,175 L 155,175 Z" 
                  fill="url(#reflectionGradientTopo)" opacity="0.4"/>
            <defs>
              <linearGradient id="reflectionGradientTopo" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            
            {/* Teto com design moderno */}
            <rect x="130" y="185" width="140" height="100" fill="url(#roofGradientTopo)" stroke="#1f2937" strokeWidth="1" rx="5"/>
            <defs>
              <linearGradient id="roofGradientTopo" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8"/>
                <stop offset="50%" stopColor="#64748b"/>
                <stop offset="100%" stopColor="#475569"/>
              </linearGradient>
            </defs>
            
            {/* Vidro traseiro com reflexo */}
            <path d="M 145,290 L 255,290 L 260,310 L 140,310 Z" 
                  fill="url(#windshieldGradientTopo)" stroke="#1f2937" strokeWidth="1"/>
            
            {/* Porta-malas com design moderno */}
            <path d="M 130,320 L 270,320 L 270,380 L 130,380 Z" 
                  fill="url(#trunkGradientTopo)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="trunkGradientTopo" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9"/>
                <stop offset="100%" stopColor="#e2e8f0"/>
              </linearGradient>
            </defs>
            
            {/* Linha de separação do porta-malas */}
            <line x1="130" y1="350" x2="270" y2="350" stroke="#cbd5e1" strokeWidth="1" opacity="0.6"/>
            
            {/* Portas laterais com design moderno */}
            <rect x="120" y="190" width="8" height="90" fill="url(#doorGradient)" stroke="#1f2937" strokeWidth="1" rx="2"/>
            <rect x="272" y="190" width="8" height="90" fill="url(#doorGradient)" stroke="#1f2937" strokeWidth="1" rx="2"/>
            <defs>
              <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748b"/>
                <stop offset="100%" stopColor="#475569"/>
              </linearGradient>
            </defs>
            
            {/* Retrovisores aerodinâmicos */}
            <ellipse cx="110" cy="180" rx="12" ry="8" fill="url(#mirrorGradientTopo)" stroke="#1f2937" strokeWidth="1"/>
            <ellipse cx="290" cy="180" rx="12" ry="8" fill="url(#mirrorGradientTopo)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="mirrorGradientTopo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
            </defs>
            
            {/* Rodas modernas com aro esportivo */}
            <rect x="95" y="150" width="30" height="45" fill="url(#wheelGradientTopo)" stroke="#1f2937" strokeWidth="2" rx="8"/>
            <rect x="275" y="150" width="30" height="45" fill="url(#wheelGradientTopo)" stroke="#1f2937" strokeWidth="2" rx="8"/>
            <rect x="95" y="305" width="30" height="45" fill="url(#wheelGradientTopo)" stroke="#1f2937" strokeWidth="2" rx="8"/>
            <rect x="275" y="305" width="30" height="45" fill="url(#wheelGradientTopo)" stroke="#1f2937" strokeWidth="2" rx="8"/>
            <defs>
              <radialGradient id="wheelGradientTopo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#1e293b"/>
                <stop offset="70%" stopColor="#0f172a"/>
                <stop offset="100%" stopColor="#000000"/>
              </radialGradient>
            </defs>
            
            {/* Aros das rodas */}
            <rect x="102" y="165" width="16" height="20" fill="url(#rimGradientTopo)" rx="4"/>
            <rect x="282" y="165" width="16" height="20" fill="url(#rimGradientTopo)" rx="4"/>
            <rect x="102" y="320" width="16" height="20" fill="url(#rimGradientTopo)" rx="4"/>
            <rect x="282" y="320" width="16" height="20" fill="url(#rimGradientTopo)" rx="4"/>
            <defs>
              <radialGradient id="rimGradientTopo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#e2e8f0"/>
                <stop offset="50%" stopColor="#cbd5e1"/>
                <stop offset="100%" stopColor="#94a3b8"/>
              </radialGradient>
            </defs>
            
            {/* Detalhes dos aros */}
            <rect x="108" y="175" width="4" height="10" fill="#64748b" rx="2"/>
            <rect x="288" y="175" width="4" height="10" fill="#64748b" rx="2"/>
            <rect x="108" y="330" width="4" height="10" fill="#64748b" rx="2"/>
            <rect x="288" y="330" width="4" height="10" fill="#64748b" rx="2"/>
            
            {/* Faróis modernos */}
            <ellipse cx="145" cy="110" rx="15" ry="8" fill="url(#headlightGradientTopo)" opacity="0.8"/>
            <ellipse cx="255" cy="110" rx="15" ry="8" fill="url(#headlightGradientTopo)" opacity="0.8"/>
            <defs>
              <radialGradient id="headlightGradientTopo" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#fef3c7"/>
                <stop offset="50%" stopColor="#fbbf24"/>
                <stop offset="100%" stopColor="#f59e0b"/>
              </radialGradient>
            </defs>
            
            {/* Lanternas traseiras modernas */}
            <ellipse cx="145" cy="390" rx="15" ry="8" fill="url(#taillightGradientTopo)" opacity="0.8"/>
            <ellipse cx="255" cy="390" rx="15" ry="8" fill="url(#taillightGradientTopo)" opacity="0.8"/>
            <defs>
              <radialGradient id="taillightGradientTopo" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#fca5a5"/>
                <stop offset="50%" stopColor="#dc2626"/>
                <stop offset="100%" stopColor="#b91c1c"/>
              </radialGradient>
            </defs>
            
            {/* Logo da marca */}
            <text x="200" y="235" textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="bold">H</text>
            
            {/* Detalhes finais */}
            <line x1="130" y1="235" x2="270" y2="235" stroke="#64748b" strokeWidth="1" opacity="0.6"/>
          </g>
        )
      default: // lateral
        return (
          <g>
            {/* Vista Lateral - Carro Realista Moderno */}
            {/* Sombra dinâmica */}
            <ellipse cx="250" cy="320" rx="180" ry="10" fill="url(#shadowLateral)" opacity="0.3"/>
            <defs>
              <radialGradient id="shadowLateral" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
              </radialGradient>
            </defs>
            
            {/* Carroceria inferior - proporções corretas */}
            <path d="M 80,280 L 80,220 Q 80,200 100,190 L 400,190 Q 420,200 420,220 L 420,280" 
                  fill="url(#bodyGradientLateral)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <linearGradient id="bodyGradientLateral" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc"/>
                <stop offset="50%" stopColor="#e2e8f0"/>
                <stop offset="100%" stopColor="#cbd5e1"/>
              </linearGradient>
            </defs>
            
            {/* Carroceria superior/teto - proporções corretas */}
            <path d="M 100,190 Q 110,130 180,120 L 320,120 Q 400,130 420,190" 
                  fill="url(#roofGradientLateral)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <linearGradient id="roofGradientLateral" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8"/>
                <stop offset="50%" stopColor="#64748b"/>
                <stop offset="100%" stopColor="#475569"/>
              </linearGradient>
            </defs>
            
            {/* Janelas com reflexos realistas - proporções corretas */}
            {/* Para-brisa */}
            <path d="M 110,180 L 140,125 L 190,120 L 200,180 Z" 
                  fill="url(#windshieldGradientLateral)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <linearGradient id="windshieldGradientLateral" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            
            {/* Reflexo no para-brisa */}
            <path d="M 120,140 L 180,140 L 175,160 L 125,160 Z" 
                  fill="url(#reflectionGradientLateral)" opacity="0.4"/>
            <defs>
              <linearGradient id="reflectionGradientLateral" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            
            {/* Janela dianteira */}
            <rect x="205" y="140" width="75" height="40" fill="url(#windowGradient)" stroke="#1f2937" strokeWidth="1.5" rx="3" opacity="0.8"/>
            <defs>
              <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            
            {/* Janela traseira */}
            <rect x="285" y="140" width="75" height="40" fill="url(#windowGradient)" stroke="#1f2937" strokeWidth="1.5" rx="3" opacity="0.8"/>
            
            {/* Vidro traseiro */}
            <path d="M 365,180 L 380,120 L 420,125 L 435,180 Z" 
                  fill="url(#windshieldGradientLateral)" stroke="#1f2937" strokeWidth="2"/>
            
            {/* Portas com design moderno - proporções corretas */}
            <rect x="160" y="180" width="90" height="85" fill="none" stroke="#1f2937" strokeWidth="2" rx="3"/>
            <rect x="255" y="180" width="90" height="85" fill="none" stroke="#1f2937" strokeWidth="2" rx="3"/>
            
            {/* Linhas de design das portas */}
            <path d="M 160,220 L 250,220" stroke="#cbd5e1" strokeWidth="1" opacity="0.6"/>
            <path d="M 255,220 L 345,220" stroke="#cbd5e1" strokeWidth="1" opacity="0.6"/>
            
            {/* Maçanetas modernas */}
            <rect x="210" y="215" width="25" height="10" fill="url(#handleGradient)" rx="5"/>
            <rect x="305" y="215" width="25" height="10" fill="url(#handleGradient)" rx="5"/>
            <defs>
              <linearGradient id="handleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
            </defs>
            
            {/* Para-choques modernos */}
            <path d="M 60,265 Q 55,265 55,275 L 55,285 Q 55,290 60,290 L 100,290 L 100,265 Z" 
                  fill="url(#bumperGradientLateral)" stroke="#1f2937" strokeWidth="1"/>
            <path d="M 400,265 L 440,265 Q 445,265 445,275 L 445,285 Q 445,290 440,290 L 400,290 Z" 
                  fill="url(#bumperGradientLateral)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="bumperGradientLateral" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
            </defs>
            
            {/* Rodas modernas com aro esportivo - proporções corretas */}
            <circle cx="130" cy="300" r="30" fill="url(#wheelGradientLateral)" stroke="#1f2937" strokeWidth="2"/>
            <circle cx="370" cy="300" r="30" fill="url(#wheelGradientLateral)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <radialGradient id="wheelGradientLateral" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#1e293b"/>
                <stop offset="70%" stopColor="#0f172a"/>
                <stop offset="100%" stopColor="#000000"/>
              </radialGradient>
            </defs>
            
            {/* Aros das rodas */}
            <circle cx="130" cy="300" r="20" fill="url(#rimGradientLateral)"/>
            <circle cx="370" cy="300" r="20" fill="url(#rimGradientLateral)"/>
            <defs>
              <radialGradient id="rimGradientLateral" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#e2e8f0"/>
                <stop offset="50%" stopColor="#cbd5e1"/>
                <stop offset="100%" stopColor="#94a3b8"/>
              </radialGradient>
            </defs>
            
            {/* Detalhes dos aros */}
            <circle cx="130" cy="300" r="12" fill="#64748b"/>
            <circle cx="370" cy="300" r="12" fill="#64748b"/>
            <circle cx="130" cy="300" r="6" fill="#475569"/>
            <circle cx="370" cy="300" r="6" fill="#475569"/>
            
            {/* Paralamas com design aerodinâmico */}
            <path d="M 102,300 Q 102,265 130,265 Q 158,265 158,300" 
                  fill="none" stroke="#1f2937" strokeWidth="2.5"/>
            <path d="M 342,300 Q 342,265 370,265 Q 398,265 398,300" 
                  fill="none" stroke="#1f2937" strokeWidth="2.5"/>
            
            {/* Retrovisor aerodinâmico */}
            <ellipse cx="155" cy="145" rx="12" ry="8" fill="url(#mirrorGradientLateral)" stroke="#1f2937" strokeWidth="1"/>
            <defs>
              <linearGradient id="mirrorGradientLateral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
            </defs>
            
            {/* Farol dianteiro moderno */}
            <ellipse cx="85" cy="225" rx="15" ry="12" fill="url(#headlightGradientLateral)" stroke="#1f2937" strokeWidth="2"/>
            <defs>
              <radialGradient id="headlightGradientLateral" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#fef3c7"/>
                <stop offset="50%" stopColor="#fbbf24"/>
                <stop offset="100%" stopColor="#f59e0b"/>
              </radialGradient>
            </defs>
            <ellipse cx="85" cy="225" rx="8" ry="6" fill="#ffffff" opacity="0.9"/>
            
            {/* Lanterna traseira moderna */}
            <rect x="415" y="215" width="15" height="15" fill="url(#taillightGradient)" stroke="#1f2937" strokeWidth="1.5" rx="3"/>
            <defs>
              <radialGradient id="taillightGradient" cx="0.3" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#fca5a5"/>
                <stop offset="50%" stopColor="#dc2626"/>
                <stop offset="100%" stopColor="#b91c1c"/>
              </radialGradient>
            </defs>
            <rect x="418" y="218" width="9" height="9" fill="#fecaca" opacity="0.8" rx="2"/>
            
            {/* Linha de cintura */}
            <line x1="100" y1="265" x2="420" y2="265" stroke="#64748b" strokeWidth="1" opacity="0.6"/>
            
            {/* Detalhes finais */}
            <rect x="130" y="245" width="35" height="4" fill="#1f2937" rx="2"/>
            <rect x="335" y="245" width="35" height="4" fill="#1f2937" rx="2"/>
            
            {/* Logo da marca */}
            <text x="250" y="135" textAnchor="middle" fontSize="10" fill="#1f2937" fontWeight="bold">H</text>
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
        <div className="relative bg-gradient-to-b from-sky-100 to-gray-100 rounded-lg p-4 mb-4 shadow-inner">
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
          <p>💡 Clique nas áreas do veículo para marcar os locais com danos</p>
        </div>
      </div>
    </div>
  )
}