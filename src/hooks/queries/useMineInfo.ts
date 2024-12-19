import { useQuery } from "@tanstack/react-query";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export interface MineInfo {
  id: string;
  type: "manual" | "auto";
    hasMiner: boolean;
  minerCreate: boolean;
}

export const MINE_INFO_QUERY_KEY = ["mineInfo"] as const;

export function useMineInfo() {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: MINE_INFO_QUERY_KEY,
    queryFn: async () => {
      if (!address) return null;

      try {
        const objects = await client.getStates({
          accessPath: `/resource/${address
            .genRoochAddress()
            .toHexAddress()}/${PKG}::gold_miner::MineInfo`,
          stateOption: { decode: true },
        });

        if (objects.length === 0) {
          return { id: "", type: "manual", hasMiner: false,minerCreate:false, } as MineInfo;
        }

        const mineInfo = objects[0].decoded_value?.value.value.value;
        const id = objects[0].id;
        let type = "manual";
        let hasMiner = false;

        if (
          mineInfo.auto_miner.value.vec &&
          mineInfo.auto_miner.value.vec.value && 
          mineInfo.auto_miner.value.vec.value.length > 0
        ) {
          type = "auto";
          hasMiner = true;
        }

        // Check if user has started mining
        hasMiner = hasMiner || (mineInfo.manual_miner && mineInfo.manual_miner.value);

        return { id, type, hasMiner,minerCreate:true } as MineInfo;
      } catch (error) {
        console.error("Failed to fetch mine info:", error);
        return { id: "", type: "manual", hasMiner: false } as MineInfo;
      }
    },
    enabled: !!address,
    staleTime: 5000,
    retry: 2,
    retryDelay: 1000,
  });
}