import { useCallback } from 'react';
import { Transaction } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { ROOCH_APP } from '@/constants/config';
import toast from 'react-hot-toast';

export const useTwitterClaim = () => {
  const sessionKey = useCurrentSession();

  const claimTwitterReward = useCallback(async () => {
    if (!sessionKey) {
      toast.error('Session key required');
      return false;
    }

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: ROOCH_APP,
        module: 'twitter_account',
        function: 'claim_reward',
        args: [],
        typeArgs: [],
      });

      const result = await sessionKey.signAndExecuteTransaction({
        transaction: txn,
      });

      if (result.execution_info.status.type === 'executed') {
        toast.success('Twitter reward claimed successfully!');
        return true;
      }

      toast.error('Failed to claim reward');
      return false;
    } catch (error) {
      console.error('Twitter claim error:', error);
      toast.error('Failed to claim reward: ' + (error as Error).message);
      return false;
    }
  }, [sessionKey]);

  return { claimTwitterReward };
};