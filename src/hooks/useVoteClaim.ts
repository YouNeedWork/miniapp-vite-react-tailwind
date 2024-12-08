import { useCallback } from 'react';
import { Args, Transaction } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { ROOCH_APP } from '@/constants/config';
import { useQueryClient } from '@tanstack/react-query';
import { VOTE_LEVEL_QUERY_KEY } from './queries/useVoteLevel';
import { useTransaction } from './useTransaction';
import toast from 'react-hot-toast';

export const useVoteClaim = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const { execute } = useTransaction();

  const claimVoteReward = useCallback(async (level: number) => {
    if (!sessionKey) {
      toast.error('Session key required');
      return false;
    }

    if (!ROOCH_APP) {
      toast.error('Configuration error: ROOCH_APP not defined');
      return false;
    }

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: ROOCH_APP,
        module: 'vote_task',
        function: 'claim_reward',
        args: [Args.u64(level)],
        typeArgs: [],
      });

      const success = await execute(txn, {
        showSuccessToast: false,
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: VOTE_LEVEL_QUERY_KEY });
          toast.success('Vote reward claimed successfully!');
        },
        onError: (error) => {
          console.error('Vote claim error:', error);
          toast.error('Failed to claim vote reward. Please try again.');
        },
      });

      return success;
    } catch (error: any) {
      console.error('Vote claim error:', error);
      toast.error('Failed to claim vote reward. Please try again.');
      return false;
    }
  }, [sessionKey, queryClient, execute]);

  return { claimVoteReward };
};