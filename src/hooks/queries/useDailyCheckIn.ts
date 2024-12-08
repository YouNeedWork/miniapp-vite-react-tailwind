import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const DAILY_CHECKIN_QUERY_KEY = ["dailyCheckIn"] as const;

export interface DailyCheckInResult {
  canCheckIn: boolean;
  reward: number;
}

export const useDailyCheckIn = () => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...DAILY_CHECKIN_QUERY_KEY, address?.toStr()],
    queryFn: async () => {
      if (!address) return false;

      try {
        const result = await client.executeViewFunction({
          address: PKG,
          module: "daily_check_in",
          function: "can_check_in",
          args: [Args.address(address)],
          typeArgs: [],
        });

        let reward = result.return_values?.[0]?.decoded_value;

        if (reward == 0) {
          return { canCheckIn: false, reward: 0 } as DailyCheckInResult;
        } else {
          return {
            canCheckIn: true,
            reward: Number(reward) / 1e6,
          } as DailyCheckInResult;
        }
      } catch (error) {
        console.error("Failed to fetch daily check-in status:", error);
        return { canCheckIn: false, reward: 0 };
      }
    },
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
};
