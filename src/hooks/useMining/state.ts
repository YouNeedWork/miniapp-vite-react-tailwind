import { useState } from 'react';
import type { ApiError } from '@/utils/api/errors';

export interface MiningState {
  isLoading: boolean;
  error: ApiError | null;
  lastMiningTime: number;
}

export const useMiningState = () => {
  const [state, setState] = useState<MiningState>({
    isLoading: false,
    error: null,
    lastMiningTime: 0
  });

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  const setError = (error: ApiError | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const updateLastMiningTime = () => {
    setState(prev => ({ ...prev, lastMiningTime: Date.now() }));
  };

  const resetState = () => {
    setState({
      isLoading: false,
      error: null,
      lastMiningTime: 0
    });
  };

  return {
    state,
    setLoading,
    setError,
    updateLastMiningTime,
    resetState
  };
};