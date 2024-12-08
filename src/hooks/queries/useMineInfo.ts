import { useQuery } from '@tanstack/react-query';
import { RoochClient } from '@roochnetwork/rooch-sdk';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';
import { createRoochClient } from '@/utils/rooch';

export interface MineInfo {
  id: string;
  type: "manual" | "auto";
  owner: string;
  last_mine_time: number;
  hunger: number;
}

export const MINE_INFO_QUERY_KEY = ['mineInfo'] as const;

export function useMineInfo() {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: MINE_INFO_QUERY_KEY,
    queryFn: async () => {
      if (!address) return null;

      try {
        const objects = await client.getStates({
          accessPath: `/resource/${address.genRoochAddress().toHexAddress()}/${PKG}::gold_miner::MineInfo`,
          stateOption: { decode: true }
        });

        if (objects.length === 0) {
          return null;
        }

        return objects[0] as MineInfo;
      } catch (error) {
        console.error("Failed to fetch mine info:", error);
        return null;
      }
    },
    enabled: !!address,
    staleTime: 5000,
    retry: 2,
    retryDelay: 1000,
  });
}