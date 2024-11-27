import { useQuery } from '@tanstack/react-query';
import { RoochClient } from '@roochnetwork/rooch-sdk';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';

const client = new RoochClient({ url: 'https://test-seed.rooch.network/' });

export interface MineInfo {
  id: string;
  type: string;
  owner: string;
  last_mine_time: number;
  hunger: number;
}

export const MINE_INFO_QUERY_KEY = ['mineInfo'] as const;

export function useMineInfo() {
  const address = useCurrentAddress();

  return useQuery({
    queryKey: MINE_INFO_QUERY_KEY,
    queryFn: async () => {
      if (!address) return null;

      const objects = await client.getStates({
        accessPath: `/resource/${address.genRoochAddress().toHexAddress()}/${PKG}::gold_miner::MineInfo`,
        stateOption: { decode: true }
      });

      if (objects.length === 0) {
        return null;
      }

      return objects[0] as MineInfo;
    },
    enabled: !!address,
  });
}