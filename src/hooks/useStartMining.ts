import { useCallback } from 'react';
import { Transaction, Args, RoochAddress } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';
import { useQueryClient } from '@tanstack/react-query';
import { MINE_INFO_QUERY_KEY } from './queries/useMineInfo';
import { createRoochClient } from '@/utils/rooch';
import toast from 'react-hot-toast';

const client = createRoochClient();

export const useStartMining = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();

  const startMining = useCallback(async () => {
    if (!sessionKey) {
      toast.error('Session key required');
      return false;
    }

    try {
      const inviter = localStorage.getItem('inviter');
      const txn = new Transaction();

      txn.callFunction({
        address: PKG,
        module: 'gold_miner',
        function: 'start',
        args: [
          inviter === null
            ? Args.address(
                new RoochAddress(
                  '0x0000000000000000000000000000000000000000000000000000000000000000'
                )
              )
            : Args.address(inviter),
        ],
        typeArgs: [],
      });

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === 'executed') {
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        toast.success('Mining started successfully!');
        return true;
      }

      toast.error('Failed to start mining');
      return false;
    } catch (error: any) {
      console.error('Start mining error:', error);
      if (error?.code === 1004 || error?.message?.includes('1004')) {
        toast.error('Insufficient RGas balance');
      } else {
        toast.error(error?.message || 'Failed to start mining');
      }
      return false;
    }
  }, [sessionKey, queryClient]);

  return { startMining };
};