import { useQuery } from "@tanstack/react-query";
import { Args, RoochClient } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { ROOCH_APP } from "@/constants/config";

const client = new RoochClient({ url: "https://test-seed.rooch.network/" });

export const TWITTER_BINDING_QUERY_KEY = ["twitterBinding"] as const;

export const useTwitterBinding = () => {
  const address = useCurrentAddress();

  return useQuery({
    queryKey: [...TWITTER_BINDING_QUERY_KEY, address],
    queryFn: async () => {
      const result = await client.executeViewFunction({
        address: ROOCH_APP,
        module: "twitter_account",
        function: "resolve_author_id_by_address",
        args: [Args.address(address!)],
        typeArgs: [],
      });

      console.log(result);

      return result.return_values?.[0]?.decoded_value || null;
    },
    enabled: address !== undefined,
  });
};
