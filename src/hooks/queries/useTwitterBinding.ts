import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { ROOCH_APP } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const TWITTER_BINDING_QUERY_KEY = ["twitterBinding"] as const;

export const useTwitterBinding = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...TWITTER_BINDING_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address || !ROOCH_APP) return null;

      try {
        const result = await client.executeViewFunction({
          address: ROOCH_APP,
          module: "twitter_account",
          function: "resolve_author_id_by_address",
          args: [Args.address(address)],
          typeArgs: [],
        });

        // Check if we have a valid Twitter ID
        const returnValue: any = result.return_values?.[0]?.value;
        if (!returnValue) return null;
        if (returnValue.value == "0x00") return null;

        return returnValue.value;
      } catch (error) {
        console.error("Failed to fetch Twitter binding:", error);
        return null;
      }
    },
    enabled: !!address && !!ROOCH_APP,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};
