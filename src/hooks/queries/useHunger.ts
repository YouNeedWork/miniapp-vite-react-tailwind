import { useQuery } from '@tanstack/react-query';
import { RoochClient, Args } from '@roochnetwork/rooch-sdk';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';

const client = new RoochClient({ url: 'https://test-seed.rooch.network/' });

export const HUNGER_QUERY_KEY = ['hunger'] as const;

export const useHunger = () => {
  const address = useCurrentAddress();

  const { 
    data: hunger = 0, 
    isLoading: hungerLoading, 
    refetch: refetchHunger 
  } = useQuery({
    queryKey: [...HUNGER_QUERY_KEY, address],
    queryFn: async () => {
      if (!address) return 0;
      const result = await client.executeViewFunction({
        address: PKG,
        module: 'gold_miner',
        function: 'get_hunger_through_times',
        args: [Args.address(address)],
        typeArgs: [],
      });
      return result.return_values === undefined ? 0 : result.return_values[0].decoded_value;
    },
    enabled: !!address
  });

  return { hunger, hungerLoading, refetchHunger };
};