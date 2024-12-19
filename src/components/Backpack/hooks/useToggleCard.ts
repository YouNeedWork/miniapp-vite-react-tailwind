import { useCallback } from 'react';
import { Transaction, Args } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';
import { createRoochClient } from '@/utils/rooch';
import { useQueryClient } from '@tanstack/react-query';
import { BOOST_STATUS_QUERY_KEY } from '@/hooks/queries/useBoostStatus';
import toast from 'react-hot-toast';

const client = createRoochClient();

export const useToggleCard = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();

  const toggleCard = useCallback(async (objectId: string, isEquipped: boolean) => {
    if (!sessionKey) {
      toast.error('Session key required');
      return false;
    }

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: PKG,
        module: 'gold_miner',
        function: isEquipped ? 'remove_boost_nft' : 'boost_with_nft',
        args: [isEquipped ? "" : Args.objectId(objectId)],
        typeArgs: [],
      });

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === 'executed') {
        // Invalidate boost status query to refresh UI
        await queryClient.invalidateQueries({ queryKey: BOOST_STATUS_QUERY_KEY });
        toast.success(isEquipped ? 'Boost deactivated' : 'Boost activated');
        return true;
      }

      toast.error('Failed to toggle boost');
      return false;
    } catch (error) {
      console.error('Toggle boost error:', error);
      toast.error('Failed to toggle boost');
      return false;
    }
  }, [sessionKey, queryClient]);

  return { toggleCard };
};