import { useQuery } from "@tanstack/react-query";
import { Args, RoochClient } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { ROOCH_APP } from "@/constants/config";

const client = new RoochClient({ url: "https://test-seed.rooch.network/" });

export const VOTE_LEVEL_QUERY_KEY = ["voteLevel"] as const;

export const useVoteLevel = () => {
  const address = useCurrentAddress();

  return useQuery({
    queryKey: [...VOTE_LEVEL_QUERY_KEY],
    queryFn: async () => {
      const result = await client.executeViewFunction({
        address: ROOCH_APP,
        module: "grow_information_v3",
        function: "get_vote",
        args: [
          Args.objectId(
            "0x01709cd79cc01a0159a3258e3b90c80398d762d42d0f2c3ed9527938eeafdeaabb"
          ),
          Args.address(address!),
          Args.string("goldminer"),
        ],
        typeArgs: [],
      });

      return result.return_values?.[0]?.decoded_value || 0;
    },
    enabled: !!address
  });
};
