
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Transaction } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';
import { createRoochClient } from '@/utils/rooch';
import { MINE_INFO_QUERY_KEY } from '@/hooks/queries/useMineInfo';
import { AUTO_MINING_RATE_QUERY_KEY } from '@/hooks/queries/useAutoMiningRate';
import toast from 'react-hot-toast';

const client = createRoochClient();

export const useClaim = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const claim = useCallback(async () => {
    if (!sessionKey) {
      return false;
    }

    setIsLoading(true);

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: PKG,
        module: 'gold_miner',
        function: 'claim_auto_mine',
        args: [],
        typeArgs: [],
      });

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === 'executed') {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY }),
          queryClient.invalidateQueries({ queryKey: AUTO_MINING_RATE_QUERY_KEY })
        ]);
        toast.success('Claimed successfully');
        return true;
      }

      throw new Error('Claim failed');
    } catch (error: any) {
      console.error('Claim error:', error);
      toast.error(error.message || 'Failed to claim');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [sessionKey, queryClient]);

  return {
    claim,
    isLoading
  };
};
