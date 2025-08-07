'use client'

import { useEffect, useState } from 'react'
import { supabase, Avaliacao } from '@/lib/supabase'
import { useAvaliacaoStore } from '@/lib/store'
import { Search, Filter, Eye, Edit, Trash2, Calendar, Car } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Avaliacoes() {
  const { avaliacoes, setAvaliacoes, deleteAvaliacao } = useAvaliacaoStore()
  const [filteredAvaliacoes, setFilteredAvaliacoes] = useState<Avaliacao[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('')
  const [filterModel, setFilterModel] = useState('')
  const [filterAvaliador, setFilterAvaliador] = useState('')
  const [filterVendido, setFilterVendido] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAvaliacoes()
  }, [])

  useEffect(() => {
    filterAvaliacoes()
  }, [avaliacoes, searchTerm, filterYear, filterModel, filterAvaliador, filterVendido])

  const loadAvaliacoes = async () => {
    try {
      // Se estiver usando Supabase configurado
      if (process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url') {
        const { data, error } = await supabase
          .from('avaliacoes')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setAvaliacoes(data || [])
      } else {
        // Modo local - carrega do localStorage
        const localData = localStorage.getItem('avaliacoes')
        if (localData) {
          setAvaliacoes(JSON.parse(localData))
        }
      }
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error)
      toast.error('Erro ao carregar avaliações')
    } finally {
      setLoading(false)
    }
  }

  const filterAvaliacoes = () => {
    let filtered = [...avaliacoes]

    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.cliente_nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.veiculo_placa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.veiculo_modelo?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterYear) {
      filtered = filtered.filter(a => a.veiculo_ano === filterYear)
    }

    if (filterModel) {
      filtered = filtered.filter(a => 
        a.veiculo_modelo?.toLowerCase().includes(filterModel.toLowerCase())
      )
    }

    if (filterAvaliador) {
      filtered = filtered.filter(a => 
        a.avaliador_nome?.toLowerCase().includes(filterAvaliador.toLowerCase())
      )
    }

    if (filterVendido) {
      if (filterVendido === 'vendido') {
        filtered = filtered.filter(a => a.vendido)
      } else if (filterVendido === 'nao-vendido') {
        filtered = filtered.filter(a => !a.vendido)
      }
    }

    setFilteredAvaliacoes(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url') {
        const { error } = await supabase
          .from('avaliacoes')
          .delete()
          .eq('id', id)

        if (error) throw error
      } else {
        // Modo local
        const localData = localStorage.getItem('avaliacoes')
        if (localData) {
          const avaliacoes = JSON.parse(localData)
          const updated = avaliacoes.filter((a: Avaliacao) => a.id !== id)
          localStorage.setItem('avaliacoes', JSON.stringify(updated))
        }
      }

      deleteAvaliacao(id)
      toast.success('Avaliação excluída com sucesso')
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error)
      toast.error('Erro ao excluir avaliação')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando avaliações...</p>
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Avaliações</h1>
          <Link
            href="/nova-avaliacao"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Nova Avaliação
          </Link>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente, placa ou modelo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <input
              type="text"
              placeholder="Filtrar por ano"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Filtrar por modelo"
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Filtrar por avaliador"
              value={filterAvaliador}
              onChange={(e) => setFilterAvaliador(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <select
              value={filterVendido}
              onChange={(e) => setFilterVendido(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Todos os status</option>
              <option value="vendido">Vendidos</option>
              <option value="nao-vendido">Não vendidos</option>
            </select>
          </div>
        </div>

        {/* Lista de Avaliações */}
        {filteredAvaliacoes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma avaliação encontrada
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterYear || filterModel || filterAvaliador
                ? 'Tente ajustar os filtros de busca'
                : 'Comece criando sua primeira avaliação'}
            </p>
            {!searchTerm && !filterYear && !filterModel && !filterAvaliador && (
              <Link
                href="/nova-avaliacao"
                className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Criar Primeira Avaliação
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAvaliacoes.map((avaliacao, index) => (
              <motion.div
                key={avaliacao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {avaliacao.veiculo_modelo}
                        </h3>
                        {avaliacao.vendido && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            VENDIDO
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {avaliacao.veiculo_versao} - {avaliacao.veiculo_ano}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Link
                        href={`/avaliacoes/${avaliacao.id}`}
                        className="p-2 text-gray-600 hover:text-black transition"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/avaliacoes/${avaliacao.id}/editar`}
                        className="p-2 text-gray-600 hover:text-black transition"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(avaliacao.id!)}
                        className="p-2 text-gray-600 hover:text-red-600 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Cliente:</span>
                      {avaliacao.cliente_nome}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Origem:</span>
                      {avaliacao.cliente_origem || 'N/A'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Placa:</span>
                      {avaliacao.veiculo_placa || 'N/A'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">KM:</span>
                      {avaliacao.veiculo_km || 'N/A'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(avaliacao.data_avaliacao).toLocaleDateString('pt-BR')}
                    </div>
                    {avaliacao.vendido && avaliacao.data_venda && (
                      <div className="flex items-center text-green-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Vendido em: {new Date(avaliacao.data_venda).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    {avaliacao.vendido && avaliacao.valor_venda && (
                      <div className="flex items-center text-green-600">
                        <span className="font-medium mr-2">Valor:</span>
                        {avaliacao.valor_venda}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Avaliador: {avaliacao.avaliador_nome}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}