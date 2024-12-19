import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const BOOST_STATUS_QUERY_KEY = ["boostStatus"] as const;

export interface BoostStatus {
  isActive: boolean;
  multiplier: number;
  timeRemaining?: number;
  objectId?: string;
}

export const useBoostStatus = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...BOOST_STATUS_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address) return { isActive: false, multiplier: 1 };

      try {
        // Get boost rate and active NFT object ID
        const result = await client.executeViewFunction({
          address: PKG,
          module: "gold_miner",
          function: "get_boost_rate",
          args: [Args.address(address)],
          typeArgs: [],
        });

        const [multiplier, objectId] = result.return_values?.map(
          (v) => v.decoded_value
        ) || [1, null];
        const isActive = Number(multiplier) > 1 && objectId;

        console.log("multiplier", multiplier);
        return {
          isActive,
          multiplier: Number(multiplier),
          timeRemaining: 0,
          objectId: objectId as string | undefined,
        };
      } catch (error) {
        console.error("Failed to fetch boost status:", error);
        return { isActive: false, multiplier: 1 };
      }
    },
    enabled: !!address,
    staleTime: 5000,
    refetchInterval: 5000,
  });
};
