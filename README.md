# THE CAR - Sistema de Avaliação Técnica de Veículos

Sistema completo de avaliação técnica de veículos com design inspirado na Vaapty.

## 🚀 Funcionalidades

- ✅ Cadastro completo de avaliações técnicas
- ✅ Dados do cliente, veículo, documentação e avaliação técnica
- ✅ Sistema de busca e filtros avançados
- ✅ Visualização e edição de avaliações
- ✅ Geração de relatórios e exportação para CSV
- ✅ Dashboard com estatísticas
- ✅ Design responsivo para dispositivos móveis
- ✅ Modo offline com localStorage
- ✅ Preparado para integração com Supabase

## 📱 Seções da Avaliação

### Dados do Cliente
- Nome, celular, endereço, cidade

### Dados do Veículo
- Modelo, ano, versão, motor
- Placa, KM, valor FIPE
- Indicadores: manual, chave cópia, sinistro, leilão, batido

### Documentação
- Nome do proprietário
- Financiamento e valor de quitação
- Débitos DETRAN
- Histórico de KM

### Avaliação Técnica
- Lataria em geral
- Motor/barulhos/funcionamento
- Suspensão/embreagem
- Luzes acesas no painel
- Parabrisa e vidros
- Ar condicionado
- Pneus
- Parte interna

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados (opcional)
- **Zustand** - Gerenciamento de estado
- **Framer Motion** - Animações
- **React Hot Toast** - Notificações

## 🚀 Como Executar

### Modo Local (sem banco de dados)

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto:
```bash
npm run dev
```

3. Acesse: http://localhost:3000

**Nota:** No modo local, os dados são salvos no localStorage do navegador.

### Com Supabase (recomendado para produção)

1. Crie uma conta no [Supabase](https://supabase.com)

2. Crie um novo projeto

3. Execute o SQL para criar a tabela:
```sql
CREATE TABLE avaliacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dados do Cliente
  data_avaliacao DATE NOT NULL,
  cliente_nome TEXT NOT NULL,
  cliente_celular TEXT,
  cliente_endereco TEXT,
  cliente_cidade TEXT,
  
  -- Dados do Veículo
  veiculo_modelo TEXT NOT NULL,
  veiculo_ano TEXT,
  veiculo_versao TEXT,
  veiculo_motor TEXT,
  veiculo_placa TEXT,
  veiculo_km TEXT,
  veiculo_fipe TEXT,
  veiculo_manual BOOLEAN DEFAULT FALSE,
  veiculo_chave_copia BOOLEAN DEFAULT FALSE,
  veiculo_sinistro BOOLEAN DEFAULT FALSE,
  veiculo_leilao BOOLEAN DEFAULT FALSE,
  veiculo_batido BOOLEAN DEFAULT FALSE,
  veiculo_obs TEXT,
  
  -- Documentação
  doc_nome_proprietario TEXT,
  doc_financiamento BOOLEAN DEFAULT FALSE,
  doc_valor_quitacao TEXT,
  doc_debitos_detran TEXT,
  doc_historico_km TEXT,
  
  -- Avaliação
  aval_lataria TEXT,
  aval_motor TEXT,
  aval_suspensao TEXT,
  aval_luzes_painel TEXT,
  aval_parabrisa TEXT,
  aval_ar_condicionado TEXT,
  aval_pneus TEXT,
  aval_interna TEXT,
  
  -- Avaliador
  avaliador_nome TEXT NOT NULL,
  
  -- Status de Venda
  vendido BOOLEAN DEFAULT FALSE,
  data_venda DATE,
  valor_venda TEXT,
  
  -- Fotos
  fotos TEXT[]
);

-- Criar índices para melhor performance
CREATE INDEX idx_avaliacoes_cliente ON avaliacoes(cliente_nome);
CREATE INDEX idx_avaliacoes_modelo ON avaliacoes(veiculo_modelo);
CREATE INDEX idx_avaliacoes_data ON avaliacoes(data_avaliacao);
CREATE INDEX idx_avaliacoes_avaliador ON avaliacoes(avaliador_nome);
CREATE INDEX idx_avaliacoes_vendido ON avaliacoes(vendido);
```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

5. Execute o projeto:
```bash
npm run dev
```

## 📱 Uso Mobile

O sistema foi otimizado para uso em dispositivos móveis:
- Design responsivo
- Menu mobile
- Formulários adaptados para toque
- Botões grandes e espaçados

## 🎨 Design

Design moderno em preto e branco inspirado na Vaapty:
- Interface limpa e profissional
- Animações suaves
- Feedback visual para ações
- Modo de impressão otimizado

## 📊 Funcionalidades Extras

- **Busca Avançada**: Filtros por ano, modelo, data e avaliador
- **Estatísticas**: Dashboard com métricas importantes
- **Exportação**: Download de relatórios em CSV
- **Impressão**: Layout otimizado para impressão de avaliações

## 🔒 Segurança

- Validação de formulários
- Sanitização de dados
- Preparado para autenticação (pode ser adicionada)

## 📝 Licença

Projeto desenvolvido para uso interno.

---

Desenvolvido com ❤️ para avaliação técnica profissional de veículos.