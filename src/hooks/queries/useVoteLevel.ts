import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { ROOCH_APP } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

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

      console.log("address", [
        Args.objectId(
          "0x709cd79cc01a0159a3258e3b90c80398d762d42d0f2c3ed9527938eeafdeaabb"
        ),
        Args.address(address.genRoochAddress().toHexAddress()),
        Args.string("goldminer"),
      ]);

      try {
        const result = await client.executeViewFunction({
          address: ROOCH_APP,
          module: "grow_information_v3",
          function: "get_vote",
          args: [
            Args.objectId(
              "0x709cd79cc01a0159a3258e3b90c80398d762d42d0f2c3ed9527938eeafdeaabb"
            ),
            Args.address(address.genRoochAddress().toHexAddress()),
            Args.string("goldminer"),
          ],
          typeArgs: [],
        });

        const votes = Number(result.return_values?.[0]?.decoded_value || 0);

        // Calculate level based on votes
        let level = 0;
        let nextLevelVotes = 10000; // Base requirement for level 1

        while (votes >= nextLevelVotes && level < 5) {
          level++;
          nextLevelVotes *= 10;
        }

        const progress =
          level < 5
            ? ((votes - nextLevelVotes / 10) /
                (nextLevelVotes - nextLevelVotes / 10)) *
              100
            : 100;

        return {
          level,
          votes,
          nextLevelVotes,
          progress: Math.min(Math.max(progress, 0), 100),
        } as VoteInfo;
      } catch (error) {
        console.error("Failed to fetch vote level:", error);
        return null;
      }
    },
    enabled: !!address && !!ROOCH_APP,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};
