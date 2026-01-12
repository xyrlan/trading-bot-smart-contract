import apiClient from './client';
import type { BackendStatus } from '../types/strategy';

export const healthApi = {
  // Check backend health
  check: async () => {
    const response = await apiClient.get<BackendStatus>('/health', {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_API?.replace('/api', '') || 'http://localhost:3001',
    });
    return response.data;
  },

  // Get queue stats
  queueStats: async () => {
    const response = await apiClient.get<{
      waiting: number;
      active: number;
      completed: number;
      failed: number;
    }>('/queue/stats');
    return response.data;
  },
};

export default healthApi;
