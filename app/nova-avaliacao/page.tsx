'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Avaliacao } from '@/lib/supabase'
import { useAvaliacaoStore } from '@/lib/store'
import toast from 'react-hot-toast'
import { Camera, Save, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NovaAvaliacao() {
  const router = useRouter()
  const { addAvaliacao } = useAvaliacaoStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Avaliacao>>({
    data_avaliacao: new Date().toISOString().split('T')[0],
    veiculo_manual: false,
    veiculo_chave_copia: false,
    veiculo_sinistro: false,
    veiculo_leilao: false,
    veiculo_batido: false,
    doc_financiamento: false,
    fotos: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validação básica
      if (!formData.cliente_nome || !formData.veiculo_modelo) {
        toast.error('Preencha os campos obrigatórios')
        return
      }

      // Se estiver usando Supabase configurado
      if (process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url') {
        const { data, error } = await supabase
          .from('avaliacoes')
          .insert([formData])
          .select()
          .single()

        if (error) throw error
        addAvaliacao(data)
      } else {
        // Modo local - salva no localStorage
        const localData = {
          ...formData,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        } as Avaliacao
        
        const existingData = localStorage.getItem('avaliacoes')
        const avaliacoes = existingData ? JSON.parse(existingData) : []
        avaliacoes.push(localData)
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))
        addAvaliacao(localData)
      }

      toast.success('Avaliação salva com sucesso!')
      router.push('/avaliacoes')
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error)
      toast.error('Erro ao salvar avaliação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Nova Avaliação Técnica</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados do Cliente */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Dados do Cliente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data da Avaliação *
                  </label>
                  <input
                    type="date"
                    name="data_avaliacao"
                    value={formData.data_avaliacao}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Cliente *
                  </label>
                  <input
                    type="text"
                    name="cliente_nome"
                    value={formData.cliente_nome || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Celular
                  </label>
                  <input
                    type="tel"
                    name="cliente_celular"
                    value={formData.cliente_celular || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    name="cliente_cidade"
                    value={formData.cliente_cidade || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="cliente_endereco"
                    value={formData.cliente_endereco || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Dados do Veículo */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Dados do Veículo</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    name="veiculo_modelo"
                    value={formData.veiculo_modelo || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ano
                  </label>
                  <input
                    type="text"
                    name="veiculo_ano"
                    value={formData.veiculo_ano || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Versão
                  </label>
                  <input
                    type="text"
                    name="veiculo_versao"
                    value={formData.veiculo_versao || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motor
                  </label>
                  <input
                    type="text"
                    name="veiculo_motor"
                    value={formData.veiculo_motor || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Placa
                  </label>
                  <input
                    type="text"
                    name="veiculo_placa"
                    value={formData.veiculo_placa || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KM
                  </label>
                  <input
                    type="text"
                    name="veiculo_km"
                    value={formData.veiculo_km || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor FIPE
                  </label>
                  <input
                    type="text"
                    name="veiculo_fipe"
                    value={formData.veiculo_fipe || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="veiculo_manual"
                    checked={formData.veiculo_manual}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-sm">Manual</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="veiculo_chave_copia"
                    checked={formData.veiculo_chave_copia}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-sm">Chave Cópia</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="veiculo_sinistro"
                    checked={formData.veiculo_sinistro}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-sm">Sinistro</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="veiculo_leilao"
                    checked={formData.veiculo_leilao}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-sm">Leilão</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="veiculo_batido"
                    checked={formData.veiculo_batido}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-sm">Batido</span>
                </label>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  name="veiculo_obs"
                  value={formData.veiculo_obs || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Documentação */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Documentação</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Em Nome de
                  </label>
                  <input
                    type="text"
                    name="doc_nome_proprietario"
                    value={formData.doc_nome_proprietario || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="doc_financiamento"
                      checked={formData.doc_financiamento}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-black focus:ring-black"
                    />
                    <span className="text-sm">Financiamento</span>
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="doc_valor_quitacao"
                      value={formData.doc_valor_quitacao || ''}
                      onChange={handleInputChange}
                      placeholder="Valor Quitação"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Débitos DETRAN
                  </label>
                  <input
                    type="text"
                    name="doc_debitos_detran"
                    value={formData.doc_debitos_detran || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Histórico KM
                  </label>
                  <input
                    type="text"
                    name="doc_historico_km"
                    value={formData.doc_historico_km || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Avaliação */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Avaliação Técnica</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lataria em Geral
                  </label>
                  <textarea
                    name="aval_lataria"
                    value={formData.aval_lataria || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motor/Barulhos/Funcionamento
                  </label>
                  <textarea
                    name="aval_motor"
                    value={formData.aval_motor || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Suspensão/Embreagem
                  </label>
                  <textarea
                    name="aval_suspensao"
                    value={formData.aval_suspensao || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Luzes Acesas no Painel
                  </label>
                  <textarea
                    name="aval_luzes_painel"
                    value={formData.aval_luzes_painel || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parabrisa e Vidros
                  </label>
                  <textarea
                    name="aval_parabrisa"
                    value={formData.aval_parabrisa || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ar Condicionado
                  </label>
                  <textarea
                    name="aval_ar_condicionado"
                    value={formData.aval_ar_condicionado || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pneus
                  </label>
                  <textarea
                    name="aval_pneus"
                    value={formData.aval_pneus || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parte Interna
                  </label>
                  <textarea
                    name="aval_interna"
                    value={formData.aval_interna || ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Avaliador */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Avaliador</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Avaliador *
                </label>
                <input
                  type="text"
                  name="avaliador_nome"
                  value={formData.avaliador_nome || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </div>

            {/* Fotos */}
            <div className="pb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Fotos</h2>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Upload de Fotos</p>
                <p className="text-sm text-gray-500">
                  Painel ligado, internas, motor, laterais, frente, traseira, teto, pneus, capô e defeitos
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
                >
                  Selecionar Fotos
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/avaliacoes')}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center"
              >
                <Save className="h-5 w-5 mr-2" />
                {loading ? 'Salvando...' : 'Salvar Avaliação'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}