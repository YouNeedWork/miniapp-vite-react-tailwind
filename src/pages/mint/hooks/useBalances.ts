import { useQuery } from '@tanstack/react-query';
import { RoochClient } from '@roochnetwork/rooch-sdk';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';

const client = new RoochClient({ url: 'https://test-seed.rooch.network/' });

export const useBalances = () => {
  const address = useCurrentAddress();

  const { data: goldBalance = "0.00", isLoading: goldBalanceLoading, refetch: refetchGoldBalance } = useQuery({
    queryKey: ['goldBalance', address],
    queryFn: async () => {
      if (!address) return "0.00";
      const objects = await client.getBalance({
        coinType: `${PKG}::gold::Gold`,
        owner: address.genRoochAddress().toStr(),
      });
      return objects.balance ? (Number(objects.balance || 0) / 1e6).toFixed(2) : "0.00";
    },
    enabled: address !== undefined
  });

  const { data: RgasBalance = "0.00", isLoading: RgasBalanceLoading, refetch: refetchRgasBalance } = useQuery({
    queryKey: ['RgasBalance', address],
    queryFn: async () => {
      if (!address) return "0.00";
      const objects = await client.getBalance({
        coinType: '0x3::gas_coin::RGas',
        owner: address.genRoochAddress().toStr(),
      });
      return objects.balance ? (Number(objects.balance || 0) / 1e8).toFixed(2) : "0.00";
    },
    enabled: address !== undefined
  });

  return {
    goldBalance,
    goldBalanceLoading,
    refetchGoldBalance,
    RgasBalance,
    RgasBalanceLoading,
    refetchRgasBalance
  };
};