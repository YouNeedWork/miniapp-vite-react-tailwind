import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { ROOCH_APP } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const VOTE_LEVEL_QUERY_KEY = ["voteLevel"] as const;

export const useVoteLevel = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...VOTE_LEVEL_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address) return 0;

      try {
        const result = await client.executeViewFunction({
          address: ROOCH_APP,
          module: "grow_information_v3",
          function: "get_vote",
          args: [
            Args.string("goldminer"),
            Args.address(address),
          ],
          typeArgs: [],
        });

        return Number(result.return_values?.[0]?.decoded_value || 0);
      } catch (error) {
        console.error("Failed to fetch vote level:", error);
        return 0;
      }
    },
    enabled: !!address && !!ROOCH_APP,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};