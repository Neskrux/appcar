'use client'

import { useEffect, useState } from 'react'
import { supabase, Avaliacao } from '@/lib/supabase'
import { FileText, Download, Calendar, TrendingUp, Car, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Relatorios() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [loading, setLoading] = useState(true)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    loadAvaliacoes()
  }, [])

  const loadAvaliacoes = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url') {
        const { data, error } = await supabase
          .from('avaliacoes')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setAvaliacoes(data || [])
      } else {
        // Modo local
        const localData = localStorage.getItem('avaliacoes')
        if (localData) {
          setAvaliacoes(JSON.parse(localData))
        }
      }
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredAvaliacoes = () => {
    let filtered = [...avaliacoes]
    
    if (dateFrom) {
      filtered = filtered.filter(a => 
        new Date(a.data_avaliacao) >= new Date(dateFrom)
      )
    }
    
    if (dateTo) {
      filtered = filtered.filter(a => 
        new Date(a.data_avaliacao) <= new Date(dateTo)
      )
    }
    
    return filtered
  }

  const exportToCSV = () => {
    const filtered = getFilteredAvaliacoes()
    
    const headers = [
      'Data', 'Cliente', 'Celular', 'Cidade', 'Endereço',
      'Modelo', 'Ano', 'Versão', 'Motor', 'Placa', 'KM', 'FIPE',
      'Manual', 'Chave Cópia', 'Sinistro', 'Leilão', 'Batido',
      'Proprietário', 'Financiamento', 'Valor Quitação', 'Débitos DETRAN',
      'Avaliador'
    ]
    
    const rows = filtered.map(a => [
      a.data_avaliacao,
      a.cliente_nome,
      a.cliente_celular || '',
      a.cliente_cidade || '',
      a.cliente_endereco || '',
      a.veiculo_modelo,
      a.veiculo_ano || '',
      a.veiculo_versao || '',
      a.veiculo_motor || '',
      a.veiculo_placa || '',
      a.veiculo_km || '',
      a.veiculo_fipe || '',
      a.veiculo_manual ? 'Sim' : 'Não',
      a.veiculo_chave_copia ? 'Sim' : 'Não',
      a.veiculo_sinistro ? 'Sim' : 'Não',
      a.veiculo_leilao ? 'Sim' : 'Não',
      a.veiculo_batido ? 'Sim' : 'Não',
      a.doc_nome_proprietario || '',
      a.doc_financiamento ? 'Sim' : 'Não',
      a.doc_valor_quitacao || '',
      a.doc_debitos_detran || '',
      a.avaliador_nome || ''
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `relatorio_avaliacoes_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const getStatistics = () => {
    const filtered = getFilteredAvaliacoes()
    
    const totalAvaliacoes = filtered.length
    const veiculosUnicos = new Set(filtered.map(a => a.veiculo_modelo)).size
    const avaliadoresUnicos = new Set(filtered.map(a => a.avaliador_nome)).size
    const clientesUnicos = new Set(filtered.map(a => a.cliente_nome)).size
    
    const veiculosPorModelo = filtered.reduce((acc, a) => {
      const modelo = a.veiculo_modelo || 'N/A'
      acc[modelo] = (acc[modelo] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const topModelos = Object.entries(veiculosPorModelo)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
    
    return {
      totalAvaliacoes,
      veiculosUnicos,
      avaliadoresUnicos,
      clientesUnicos,
      topModelos
    }
  }

  const stats = getStatistics()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando relatórios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Relatórios</h1>
          <button
            onClick={exportToCSV}
            className="flex items-center bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportar CSV
          </button>
        </div>

        {/* Filtros de Data */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 mr-2 text-gray-600" />
            <h2 className="text-lg font-semibold">Filtrar por Período</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Inicial
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Final
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
              <span className="text-3xl font-bold">{stats.totalAvaliacoes}</span>
            </div>
            <p className="text-gray-600">Total de Avaliações</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Car className="h-8 w-8 text-gray-400" />
              <span className="text-3xl font-bold">{stats.veiculosUnicos}</span>
            </div>
            <p className="text-gray-600">Modelos Diferentes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-gray-400" />
              <span className="text-3xl font-bold">{stats.clientesUnicos}</span>
            </div>
            <p className="text-gray-600">Clientes Atendidos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-gray-400" />
              <span className="text-3xl font-bold">{stats.avaliadoresUnicos}</span>
            </div>
            <p className="text-gray-600">Avaliadores Ativos</p>
          </motion.div>
        </div>

        {/* Top Modelos */}
        {stats.topModelos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Top 5 Modelos Avaliados</h2>
            <div className="space-y-3">
              {stats.topModelos.map(([modelo, count], index) => (
                <div key={modelo} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-400 mr-3">
                      {index + 1}º
                    </span>
                    <span className="font-medium">{modelo}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full h-2 w-32 mr-3">
                      <div
                        className="bg-black rounded-full h-2"
                        style={{
                          width: `${(count / stats.totalAvaliacoes) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{count} avaliações</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Aviso sobre dados */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Os dados apresentados são baseados nas avaliações registradas no sistema.
            Para configurar o banco de dados Supabase, adicione as credenciais no arquivo .env.local
          </p>
        </div>
      </motion.div>
    </div>
  )
}