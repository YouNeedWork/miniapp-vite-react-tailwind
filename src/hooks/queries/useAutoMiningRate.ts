import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const AUTO_MINING_RATE_QUERY_KEY = ["autoMiningRate"] as const;

export const useAutoMiningRate = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...AUTO_MINING_RATE_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address) return 0;

      try {
        const result = await client.executeViewFunction({
          address: PKG,
          module: "gold_miner",
          function: "get_auto_mine_harvest_amount",
          args: [Args.address(address)],
          typeArgs: [],
        });

        return Number(result.return_values?.[0]?.decoded_value || 0);
      } catch (error) {
        console.error("Failed to fetch auto mining rate:", error);
        return 0;
      }
    },
    enabled: !!address,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};
