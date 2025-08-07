import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Avaliacao {
  id?: string
  created_at?: string
  // Dados do Cliente
  data_avaliacao: string
  cliente_nome: string
  cliente_celular: string
  cliente_endereco: string
  cliente_cidade: string
  cliente_origem: string // Por onde veio: Instagram, Google, Indicação, Outros
  // Dados do Veículo
  veiculo_modelo: string
  veiculo_ano: string
  veiculo_versao: string
  veiculo_motor: string
  veiculo_placa: string
  veiculo_km: string
  veiculo_fipe: string
  veiculo_manual: boolean
  veiculo_chave_copia: boolean
  veiculo_sinistro: boolean
  veiculo_leilao: boolean
  veiculo_batido: boolean
  veiculo_obs: string
  // Documentação
  doc_nome_proprietario: string
  doc_financiamento: boolean
  doc_valor_quitacao: string
  doc_debitos_detran: string
  doc_historico_km: string
  // Avaliação
  aval_lataria: string
  aval_motor: string
  aval_suspensao: string
  aval_luzes_painel: string
  aval_parabrisa: string
  aval_ar_condicionado: string
  aval_pneus: string
  aval_interna: string
  // Avaliador
  avaliador_nome: string
  // Status
  vendido: boolean
  data_venda?: string
  valor_venda?: string
  // Fotos
  fotos: string[] // URLs das fotos
  // Mapa de Danos
  danos_mapeados: string[] // IDs das áreas danificadas
}