import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const MINER_INFO_QUERY_KEY = ["minerInfo"] as const;

export interface MinerInfo {
  id: string;
  type: "manual" | "auto";
  boostInfo?: {
    type: "boost" | "og" | "early";
    multiplier: number;
    objectId: string;
  };
}

export const useMinerInfo = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...MINER_INFO_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address) return null;

      try {
        // Get miner info
        const minerResult = await client.getStates({
          accessPath: `/resource/${address.genRoochAddress().toHexAddress()}/${PKG}::gold_miner::MineInfo`,
          stateOption: { decode: true },
        });

        if (!minerResult.length) {
          return { id: "", type: "manual" } as MinerInfo;
        }

        const mineInfo = minerResult[0].decoded_value?.value.value.value;
        const id = minerResult[0].id;
        const type = mineInfo.auto_miner.value.vec?.value?.length > 0 ? "auto" : "manual";

        // Get boost info
        const boostResult = await client.executeViewFunction({
          address: PKG,
          module: "gold_miner",
          function: "get_boost_info",
          args: [Args.address(address)],
          typeArgs: [],
        });

        const [multiplier, objectId] = boostResult.return_values?.map(v => v.decoded_value) || [1, null];
        
        // Only include boost info if there's an active boost
        const boostInfo = multiplier > 1 && objectId ? {
          type: "boost", // For now we only support boost type
          multiplier: Number(multiplier),
          objectId: objectId as string
        } : undefined;

        return { id, type, boostInfo } as MinerInfo;
      } catch (error) {
        console.error("Failed to fetch miner info:", error);
        return { id: "", type: "manual" } as MinerInfo;
      }
    },
    enabled: !!address,
    staleTime: 5000,
    retry: 2,
    retryDelay: 1000,
  });
};