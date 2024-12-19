import { useEffect } from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import type { MintState } from '../types';

export const useMintEffects = (state: MintState) => {
  const address = useCurrentAddress();

  // Initial refresh effect
  useEffect(() => {
    if (address) {
      state.handleRefresh();
    }
  }, [address]);

  // Auto-refresh effect for auto mining
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (address && state.shouldShowDailyCheckIn) {
      intervalId = setInterval(state.handleRefresh, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [address, state.shouldShowDailyCheckIn]);

  // Welcome dialog effect
  useEffect(() => {
    if (address && !state.showSessionKeyModal && state.hasGas) {
      state.setShowWelcome(true);
    } else {
      state.setShowWelcome(false);
    }
  }, [address, state.showSessionKeyModal, state.hasGas]);
};