import { create } from 'zustand';
import type { StrategyConfig } from '../types/strategy';

interface StrategiesState {
  strategies: StrategyConfig[];
  selectedStrategy: StrategyConfig | null;
  isLoading: boolean;
  error: string | null;
  
  setStrategies: (strategies: StrategyConfig[]) => void;
  setSelectedStrategy: (strategy: StrategyConfig | null) => void;
  addStrategy: (strategy: StrategyConfig) => void;
  updateStrategy: (id: string, strategy: Partial<StrategyConfig>) => void;
  removeStrategy: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStrategiesStore = create<StrategiesState>((set) => ({
  strategies: [],
  selectedStrategy: null,
  isLoading: false,
  error: null,

  setStrategies: (strategies) => set({ strategies }),
  
  setSelectedStrategy: (strategy) => set({ selectedStrategy: strategy }),
  
  addStrategy: (strategy) =>
    set((state) => ({ strategies: [...state.strategies, strategy] })),
  
  updateStrategy: (id, updatedStrategy) =>
    set((state) => ({
      strategies: state.strategies.map((s) =>
        s.id === id ? { ...s, ...updatedStrategy } : s
      ),
      selectedStrategy:
        state.selectedStrategy?.id === id
          ? { ...state.selectedStrategy, ...updatedStrategy }
          : state.selectedStrategy,
    })),
  
  removeStrategy: (id) =>
    set((state) => ({
      strategies: state.strategies.filter((s) => s.id !== id),
      selectedStrategy:
        state.selectedStrategy?.id === id ? null : state.selectedStrategy,
    })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
}));
