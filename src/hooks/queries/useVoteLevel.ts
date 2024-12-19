import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { ENV } from '@/config/env';
import { createRoochClient } from "@/utils/rooch";
import { VOTE_TASKS } from '@/constants/voteTasks';

export const VOTE_LEVEL_QUERY_KEY = ["voteLevel"] as const;

export interface VoteInfo {
  level: number;
  votes: number;
  nextLevelVotes: number;
  progress: number;
}

export const useVoteLevel = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...VOTE_LEVEL_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address) return null;

      try {
        const result = await client.executeViewFunction({
          address: ENV.ROOCH_APP,
          module: "grow_information_v3",
          function: "get_vote",
          args: [
            Args.objectId(ENV.VOTE_OBJECT),
            Args.address(address.genRoochAddress().toHexAddress()),
            Args.string("goldminer"),
          ],
          typeArgs: [],
        });

        const votes = Number(result.return_values?.[0]?.decoded_value || 0);

        // Find current level and next level requirements
        let currentLevel = 0;
        let currentLevelVotes = 0;
        let nextLevelVotes = VOTE_TASKS[0].requiredVotes;

        for (const task of VOTE_TASKS) {
          if (votes >= task.requiredVotes) {
            currentLevel = task.level;
            currentLevelVotes = task.requiredVotes;
            const nextTask = VOTE_TASKS[task.level + 1];
            if (nextTask) {
              nextLevelVotes = nextTask.requiredVotes;
            }
          } else {
            break;
          }
        }

        // Calculate progress percentage
        const progressVotes = votes - currentLevelVotes;
        const votesNeeded = nextLevelVotes - currentLevelVotes;
        const progress = (progressVotes / votesNeeded) * 100;

        return {
          level: currentLevel,
          votes,
          nextLevelVotes,
          progress: Math.min(Math.max(progress, 0), 100),
        } as VoteInfo;
      } catch (error) {
        console.error("Failed to fetch vote level:", error);
        return null;
      }
    },
    enabled: !!address,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};