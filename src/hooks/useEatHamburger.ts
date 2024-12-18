import { useCallback } from "react";
import { Args, Transaction } from "@roochnetwork/rooch-sdk";
import { useCurrentSession } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { useQueryClient } from "@tanstack/react-query";
import { MINE_INFO_QUERY_KEY } from "./queries/useMineInfo";
import { HUNGER_QUERY_KEY } from "./queries/useHunger";
import { useTransaction } from "./useTransaction";
import toast from "react-hot-toast";

export const useEatHamburger = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const { execute } = useTransaction();

  const eatHamburger = useCallback(
    async (objectId: string) => {
      if (!sessionKey) {
        toast.error("Session key required");
        return false;
      }

      try {
        const txn = new Transaction();
        txn.callFunction({
          address: PKG,
          module: "gold_miner",
          function: "eat_hambuger",
          args: [Args.objectId(objectId)],
          typeArgs: [],
        });

        const success = await execute(txn, {
          showSuccessToast: false,
          showErrorToast: false,
          onSuccess: async () => {
            // Invalidate both mine info and hunger queries
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY }),
              queryClient.invalidateQueries({ queryKey: HUNGER_QUERY_KEY })
            ]);
            toast.success("Hamburger eaten successfully!");
          },
          onError: (error) => {
            console.error("Failed to eat hamburger:", error);
            toast.error("Failed to eat hamburger. Please try again.");
          },
        });

        return success;
      } catch (error) {
        console.error("Failed to eat hamburger:", error);
        toast.error("Failed to eat hamburger. Please try again.");
        return false;
      }
    },
    [sessionKey, queryClient, execute]
  );

  return { eatHamburger };
};