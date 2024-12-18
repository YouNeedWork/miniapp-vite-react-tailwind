import { useQuery } from '@tanstack/react-query';
import { Args } from '@roochnetwork/rooch-sdk';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';
import { createRoochClient } from '@/utils/rooch';

export const HUNGER_QUERY_KEY = ['hunger'] as const;

export const useHunger = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  const { 
    data: hunger = 0, 
    isLoading: hungerLoading, 
    refetch: refetchHunger 
  } = useQuery({
    queryKey: [...HUNGER_QUERY_KEY, address?.toStr()],
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
    enabled: !!address,
    staleTime: 1000, // Only cache for 1 second to ensure fresh data
    retry: 2,
    retryDelay: 1000,
  });

  return { hunger, hungerLoading, refetchHunger };
};