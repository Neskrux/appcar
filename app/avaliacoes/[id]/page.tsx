'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Avaliacao } from '@/lib/supabase'
import { ArrowLeft, Printer, Download, Edit, Car } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CarDamageMap from '@/components/CarDamageMap'

export default function VisualizarAvaliacao() {
  const params = useParams()
  const router = useRouter()
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAvaliacao()
  }, [params.id])

  const loadAvaliacao = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url') {
        const { data, error } = await supabase
          .from('avaliacoes')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error
        setAvaliacao(data)
      } else {
        // Modo local
        const localData = localStorage.getItem('avaliacoes')
        if (localData) {
          const avaliacoes = JSON.parse(localData)
          const found = avaliacoes.find((a: Avaliacao) => a.id === params.id)
          setAvaliacao(found || null)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar avaliação:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando avaliação...</p>
        </div>
      </div>
    )
  }

  if (!avaliacao) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Avaliação não encontrada
          </h3>
          <Link
            href="/avaliacoes"
            className="inline-block mt-4 text-black hover:underline"
          >
            Voltar para avaliações
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header com ações */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 no-print">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-black transition mb-4 md:mb-0"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Printer className="h-5 w-5 mr-2" />
              Imprimir
            </button>
            <Link
              href={`/avaliacoes/${params.id}/editar`}
              className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              <Edit className="h-5 w-5 mr-2" />
              Editar
            </Link>
          </div>
        </div>

        {/* Conteúdo da Avaliação */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Cabeçalho */}
          <div className="text-center mb-8 pb-6 border-b">
            <h1 className="text-3xl font-bold mb-2">AVALIAÇÃO TÉCNICA</h1>
            <p className="text-lg text-gray-600">THE CAR</p>
          </div>

          {/* Dados do Cliente */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              DADOS DO CLIENTE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Data:</span> {new Date(avaliacao.data_avaliacao).toLocaleDateString('pt-BR')}
              </div>
              <div>
                <span className="font-semibold">Cliente:</span> {avaliacao.cliente_nome}
              </div>
              <div>
                <span className="font-semibold">Celular:</span> {avaliacao.cliente_celular || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Cidade:</span> {avaliacao.cliente_cidade || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Por onde veio:</span> {avaliacao.cliente_origem || 'N/A'}
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold">Endereço:</span> {avaliacao.cliente_endereco || 'N/A'}
              </div>
            </div>
          </section>

          {/* Dados do Veículo */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              DADOS DO VEÍCULO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-semibold">Modelo:</span> {avaliacao.veiculo_modelo}
              </div>
              <div>
                <span className="font-semibold">Ano:</span> {avaliacao.veiculo_ano || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Versão:</span> {avaliacao.veiculo_versao || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Motor:</span> {avaliacao.veiculo_motor || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Placa:</span> {avaliacao.veiculo_placa || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">KM:</span> {avaliacao.veiculo_km || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">FIPE:</span> {avaliacao.veiculo_fipe || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Manual:</span> {avaliacao.veiculo_manual ? 'Sim' : 'Não'}
              </div>
              <div>
                <span className="font-semibold">Chave Cópia:</span> {avaliacao.veiculo_chave_copia ? 'Sim' : 'Não'}
              </div>
              <div>
                <span className="font-semibold">Sinistro:</span> {avaliacao.veiculo_sinistro ? 'Sim' : 'Não'}
              </div>
              <div>
                <span className="font-semibold">Leilão:</span> {avaliacao.veiculo_leilao ? 'Sim' : 'Não'}
              </div>
              <div>
                <span className="font-semibold">Batido:</span> {avaliacao.veiculo_batido ? 'Sim' : 'Não'}
              </div>
            </div>
            {avaliacao.veiculo_obs && (
              <div className="mt-4">
                <span className="font-semibold">Observações:</span>
                <p className="mt-1 text-gray-700">{avaliacao.veiculo_obs}</p>
              </div>
            )}
          </section>

          {/* Documentação */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              DOCUMENTAÇÃO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Em Nome de:</span> {avaliacao.doc_nome_proprietario || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Financiamento:</span> {avaliacao.doc_financiamento ? 'Sim' : 'Não'}
              </div>
              <div>
                <span className="font-semibold">Valor Quitação:</span> {avaliacao.doc_valor_quitacao || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Débitos DETRAN:</span> {avaliacao.doc_debitos_detran || 'N/A'}
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold">Histórico KM:</span> {avaliacao.doc_historico_km || 'N/A'}
              </div>
            </div>
          </section>

          {/* Avaliação */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              AVALIAÇÃO
            </h2>
            <div className="space-y-4">
              {avaliacao.aval_lataria && (
                <div>
                  <span className="font-semibold">Lataria em Geral:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_lataria}</p>
                </div>
              )}
              {avaliacao.aval_motor && (
                <div>
                  <span className="font-semibold">Motor/Barulhos/Funcionamento:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_motor}</p>
                </div>
              )}
              {avaliacao.aval_suspensao && (
                <div>
                  <span className="font-semibold">Suspensão/Embreagem:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_suspensao}</p>
                </div>
              )}
              {avaliacao.aval_luzes_painel && (
                <div>
                  <span className="font-semibold">Luzes Acesas no Painel:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_luzes_painel}</p>
                </div>
              )}
              {avaliacao.aval_parabrisa && (
                <div>
                  <span className="font-semibold">Parabrisa e Vidros:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_parabrisa}</p>
                </div>
              )}
              {avaliacao.aval_ar_condicionado && (
                <div>
                  <span className="font-semibold">Ar Condicionado:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_ar_condicionado}</p>
                </div>
              )}
              {avaliacao.aval_pneus && (
                <div>
                  <span className="font-semibold">Pneus:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_pneus}</p>
                </div>
              )}
              {avaliacao.aval_interna && (
                <div>
                  <span className="font-semibold">Parte Interna:</span>
                  <p className="mt-1 text-gray-700">{avaliacao.aval_interna}</p>
                </div>
              )}
            </div>
          </section>

                     {/* Avaliador */}
           <section className="mb-8">
             <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
               AVALIADOR
             </h2>
             <p className="text-lg">{avaliacao.avaliador_nome}</p>
             <div className="mt-8 pt-4 border-t">
               <p className="text-center text-gray-600">_____________________________</p>
               <p className="text-center text-sm text-gray-600 mt-2">Assinatura do Avaliador</p>
             </div>
           </section>

           {/* Status de Venda */}
           {avaliacao.vendido && (
             <section className="mb-8">
               <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                 STATUS DE VENDA
               </h2>
               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                 <div className="flex items-center mb-3">
                   <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                   <span className="font-semibold text-green-800">VEÍCULO VENDIDO</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {avaliacao.data_venda && (
                     <div>
                       <span className="font-semibold">Data da Venda:</span>
                       <p className="text-gray-700">{new Date(avaliacao.data_venda).toLocaleDateString('pt-BR')}</p>
                     </div>
                   )}
                   {avaliacao.valor_venda && (
                     <div>
                       <span className="font-semibold">Valor da Venda:</span>
                       <p className="text-gray-700">{avaliacao.valor_venda}</p>
                     </div>
                   )}
                 </div>
               </div>
             </section>
           )}

          {/* Mapa de Danos */}
          {avaliacao.danos_mapeados && avaliacao.danos_mapeados.length > 0 && (
            <section className="mb-8 no-print">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                MAPA DE DANOS
              </h2>
              <CarDamageMap 
                initialDamages={avaliacao.danos_mapeados}
                onDamageUpdate={() => {}} 
              />
            </section>
          )}

          {/* Fotos */}
          {avaliacao.fotos && avaliacao.fotos.length > 0 && (
            <section className="no-print">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                FOTOS
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {avaliacao.fotos.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      Foto {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-4">
                {avaliacao.fotos.length} foto(s) anexada(s)
              </p>
            </section>
          )}
        </div>
      </motion.div>
    </div>
  )
}