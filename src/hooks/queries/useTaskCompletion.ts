import { useQuery } from "@tanstack/react-query";
import { Args } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";

export const TASK_COMPLETION_QUERY_KEY = ["taskCompletion"] as const;

export const useTaskCompletion = (taskId: number) => {
  const address = useCurrentAddress();
  const client = createRoochClient();

  return useQuery({
    queryKey: [...TASK_COMPLETION_QUERY_KEY, address?.toStr(), taskId],
    queryFn: async () => {
      if (!address) return false;

      try {
        const result = await client.executeViewFunction({
          address: PKG,
          module: "tasks",
          function: "is_task_completed",
          args: [
            Args.address(address),
            Args.u64(BigInt(taskId)), // Add 11000 to get the correct contract task ID
          ],
          typeArgs: [],
        });

        return !!result.return_values?.[0]?.decoded_value;
      } catch (error) {
        console.error("Failed to fetch task completion:", error);
        return false;
      }
    },
    enabled: !!address,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
  });
};
