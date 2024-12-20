import { useCallback, useMemo } from 'react';
import { useVoteLevel } from '@/hooks/queries/useVoteLevel';
import { useTaskCompletion } from '@/hooks/queries/useTaskCompletion';
import { useVoteClaim } from '@/hooks/useVoteClaim';
import { calculateVoteSystemState, getVoteTaskId } from './utils';
import { checkRateLimit } from '@/utils/api/rateLimit';
import { handleApiError } from '@/utils/api/errors';
import toast from 'react-hot-toast';

const MAX_VOTE_LEVELS = 5;

export const useVoteSystem = () => {
  const { data: voteInfo, refetch: refetchVoteInfo } = useVoteLevel();
  const { claimVoteReward } = useVoteClaim();

  // Create an array of hooks for all possible levels
  const taskCompletions = Array.from({ length: MAX_VOTE_LEVELS }, (_, i) => 
    useTaskCompletion(getVoteTaskId(i))
  );

  // Calculate completed task IDs
  const completedTaskIds = useMemo(() => 
    taskCompletions
      .map((result, index) => result.data ? getVoteTaskId(index) : -1)
      .filter(id => id !== -1),
    [taskCompletions]
  );

  // Calculate vote state
  const voteState = useMemo(() => 
    calculateVoteSystemState(voteInfo, completedTaskIds),
    [voteInfo, completedTaskIds]
  );

  const handleVoteClaim = useCallback(async (level: number) => {
    if (!checkRateLimit('vote-claim')) {
      return false;
    }

    try {
      const success = await claimVoteReward(level);
      if (success) {
        await refetchVoteInfo();
        // Refetch task completion status
        await Promise.all(taskCompletions.map(task => task.refetch()));
        return true;
      }
      return false;
    } catch (error) {
      /*
      const apiError = handleApiError(error);
      console.error('Vote claim failed:', apiError);
      toast.error(apiError.message);
      return false;
      */
      return false;
    }
  }, [claimVoteReward, refetchVoteInfo, taskCompletions]);

  return {
    ...voteState,
    handleVoteClaim,
    refetchVoteInfo,
    isLoading: taskCompletions.some(task => task.isLoading)
  };
};

export * from './types';