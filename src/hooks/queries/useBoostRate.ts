import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const BOOST_RATE_QUERY_KEY = ["boostRate"] as const;

export const useBoostRate = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...BOOST_RATE_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address) return 1;

      try {
        const result = await client.executeViewFunction({
          address: PKG,
          module: "gold_miner",
          function: "get_boost_rate",
          args: [Args.address(address)],
          typeArgs: [],
        });

        return Number(result.return_values?.[0]?.decoded_value || 1);
      } catch (error) {
        console.error("Failed to fetch boost rate:", error);
        return 1;
      }
    },
    enabled: !!address,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};