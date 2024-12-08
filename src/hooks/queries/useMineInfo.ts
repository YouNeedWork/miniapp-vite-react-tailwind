import { useQuery } from "@tanstack/react-query";
import { RoochClient } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export interface MineInfo {
  id: string;
  type: "manual" | "auto";
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
        const objects: any = await client.getStates({
          accessPath: `/resource/${address
            .genRoochAddress()
            .toHexAddress()}/${PKG}::gold_miner::MineInfo`,
          stateOption: { decode: true },
        });

        if (objects.length == 0) {
          return { id: "", type: "manual" } as MineInfo;
        }

        const mineInfo = objects[0].decoded_value?.value.value.value;

        console.log("mineInfo", mineInfo);
        let id = objects[0].id;
        let type = "manual";
        if (mineInfo.auto_miner.value.vec.length > 0) {
          type = "auto";
        }

        return { id, type } as MineInfo;
      } catch (error) {
        console.error("Failed to fetch mine info:", error);
        return { id: "", type: "manual" } as MineInfo;
      }
    },
    enabled: !!address,
    staleTime: 5000,
    retry: 2,
    retryDelay: 1000,
  });
}
