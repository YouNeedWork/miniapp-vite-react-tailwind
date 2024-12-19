import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Transaction } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';
import { createRoochClient } from '@/utils/rooch';
import { MINE_INFO_QUERY_KEY } from '@/hooks/queries/useMineInfo';
import { checkRateLimit } from '@/utils/api/rateLimit';
import { handleMiningError, displayMiningError } from './errors';
import { useMiningState } from './state';
import { MINING_CONFIG, MINING_ACTIONS } from './config';

const client = createRoochClient();

export const useMining = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const { state, setLoading, setError, updateLastMiningTime } = useMiningState();

  const mine = useCallback(async () => {
    if (!sessionKey) {
      return false;
    }

    // Check rate limit
    if (!checkRateLimit(MINING_ACTIONS.MINE, MINING_CONFIG.COOLDOWN)) {
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: PKG,
        module: 'gold_miner',
        function: 'mine',
        args: [],
        typeArgs: [],
      });

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === 'executed') {
        updateLastMiningTime();
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        return true;
      }

      throw new Error('Mining failed');
    } catch (error: any) {
      const miningError = handleMiningError(error);
      setError(miningError);
      displayMiningError(miningError);
      return false;
    } finally {
      setLoading(false);
    }
  }, [sessionKey, queryClient, setLoading, setError, updateLastMiningTime]);

  const getRemainingCooldown = useCallback(() => {
    const now = Date.now();
    const timeSinceLastMining = now - state.lastMiningTime;
    return Math.max(0, MINING_CONFIG.COOLDOWN - timeSinceLastMining);
  }, [state.lastMiningTime]);

  return {
    mine,
    isLoading: state.isLoading,
    error: state.error,
    getRemainingCooldown,
    lastMiningTime: state.lastMiningTime
  };
};

export * from './config';
export * from './errors';
export * from './state';