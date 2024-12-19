import { useCallback } from 'react';
import { Args, Transaction } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';
import { ENV } from '@/config/env';
import { useQueryClient } from '@tanstack/react-query';
import { VOTE_LEVEL_QUERY_KEY } from './queries/useVoteLevel';
import { useTransaction } from './useTransaction';
import { checkRateLimit, handleApiError } from '@/utils/rateLimit';
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

    // Check rate limit
    if (!checkRateLimit('vote-claim')) {
      return false;
    }

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: PKG,
        module: 'tasks',
        function: 'complete_vote',
        args: [
          Args.objectId(ENV.VOTE_OBJECT),
          Args.u64(BigInt(11000 + level))
        ],
        typeArgs: [],
      });

      const success = await execute(txn, {
        showSuccessToast: false,
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: VOTE_LEVEL_QUERY_KEY });
          toast.success('Vote reward claimed successfully!');
        },
        onError: (error) => {
          const errorMessage = handleApiError(error);
          console.error('Vote claim error:', error);
          toast.error(errorMessage);
        },
      });

      return success;
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      console.error('Vote claim error:', error);
      toast.error(errorMessage);
      return false;
    }
  }, [sessionKey, queryClient, execute]);

  return { claimVoteReward };
};