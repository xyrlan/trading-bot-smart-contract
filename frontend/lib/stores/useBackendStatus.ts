import { create } from 'zustand';
import type { BackendStatus } from '../types/strategy';

interface BackendStatusState {
  status: BackendStatus | null;
  isConnected: boolean;
  lastCheck: number | null;
  
  setStatus: (status: BackendStatus) => void;
  setConnected: (isConnected: boolean) => void;
  updateLastCheck: () => void;
}

export const useBackendStatus = create<BackendStatusState>((set) => ({
  status: null,
  isConnected: false,
  lastCheck: null,

  setStatus: (status) =>
    set({ status, isConnected: status.status === 'ok' }),
  
  setConnected: (isConnected) => set({ isConnected }),
  
  updateLastCheck: () => set({ lastCheck: Date.now() }),
}));
