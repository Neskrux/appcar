import { create } from 'zustand'
import { Avaliacao } from './supabase'

interface AvaliacaoStore {
  avaliacoes: Avaliacao[]
  currentAvaliacao: Avaliacao | null
  loading: boolean
  setAvaliacoes: (avaliacoes: Avaliacao[]) => void
  setCurrentAvaliacao: (avaliacao: Avaliacao | null) => void
  setLoading: (loading: boolean) => void
  addAvaliacao: (avaliacao: Avaliacao) => void
  updateAvaliacao: (id: string, avaliacao: Partial<Avaliacao>) => void
  deleteAvaliacao: (id: string) => void
}

export const useAvaliacaoStore = create<AvaliacaoStore>((set) => ({
  avaliacoes: [],
  currentAvaliacao: null,
  loading: false,
  setAvaliacoes: (avaliacoes) => set({ avaliacoes }),
  setCurrentAvaliacao: (avaliacao) => set({ currentAvaliacao: avaliacao }),
  setLoading: (loading) => set({ loading }),
  addAvaliacao: (avaliacao) => 
    set((state) => ({ avaliacoes: [...state.avaliacoes, avaliacao] })),
  updateAvaliacao: (id, avaliacao) =>
    set((state) => ({
      avaliacoes: state.avaliacoes.map((a) => 
        a.id === id ? { ...a, ...avaliacao } : a
      ),
    })),
  deleteAvaliacao: (id) =>
    set((state) => ({
      avaliacoes: state.avaliacoes.filter((a) => a.id !== id),
    })),
}))