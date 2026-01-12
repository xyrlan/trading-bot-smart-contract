import apiClient from './client';
import type { StrategyConfig, CreateStrategyDto, UpdateStrategyDto, PerformanceMetrics, TradeSignal } from '../types/strategy';

export const strategiesApi = {
  // List strategies for a user
  list: async (userId: string, params?: { status?: string; tokenPair?: string }) => {
    const response = await apiClient.get<StrategyConfig[]>(`/strategies/user/${userId}`, { params });
    return response.data;
  },

  // Get single strategy
  get: async (id: string) => {
    const response = await apiClient.get<StrategyConfig>(`/strategies/${id}`);
    return response.data;
  },

  // Create new strategy
  create: async (data: CreateStrategyDto) => {
    const response = await apiClient.post<StrategyConfig>('/strategies', data);
    return response.data;
  },

  // Update strategy
  update: async (id: string, data: UpdateStrategyDto) => {
    const response = await apiClient.put<StrategyConfig>(`/strategies/${id}`, data);
    return response.data;
  },

  // Delete strategy
  delete: async (id: string) => {
    const response = await apiClient.delete<{ success: boolean }>(`/strategies/${id}`);
    return response.data;
  },

  // Pause strategy
  pause: async (id: string) => {
    const response = await apiClient.post<{ success: boolean; status: string }>(`/strategies/${id}/pause`);
    return response.data;
  },

  // Resume strategy
  resume: async (id: string) => {
    const response = await apiClient.post<{ success: boolean; status: string }>(`/strategies/${id}/resume`);
    return response.data;
  },

  // Get performance metrics
  performance: async (id: string) => {
    const response = await apiClient.get<PerformanceMetrics>(`/strategies/${id}/performance`);
    return response.data;
  },

  // Get signals
  signals: async (id: string, params?: { limit?: number; executed?: string }) => {
    const response = await apiClient.get<TradeSignal[]>(`/strategies/${id}/signals`, { params });
    return response.data;
  },
};

export default strategiesApi;
