import { useCallback } from "react";
import { Transaction } from "@roochnetwork/rooch-sdk";
import { useCurrentSession } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { useQueryClient } from "@tanstack/react-query";
import { DAILY_CHECKIN_QUERY_KEY } from "./queries/useDailyCheckIn";
import { useTransaction } from "./useTransaction";
import toast from "react-hot-toast";

export const useCheckIn = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const { execute } = useTransaction();

  const checkIn = useCallback(async () => {
    if (!sessionKey) {
      toast.error("Session key required");
      return false;
    }

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: PKG,
        module: "daily_check_in",
        function: "check_in",
        args: [],
        typeArgs: [],
      });

      console.log({
        address: PKG,
        module: "daily_check_in",
        function: "check_in",
        args: [],
        typeArgs: [],
      });

      const success = await execute(txn, {
        showSuccessToast: false,
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: DAILY_CHECKIN_QUERY_KEY,
          });
          toast.success("Daily check-in successful!");
        },
        onError: (error) => {
          console.error("Check-in error:", error);
          toast.error("Failed to check in. Please try again.");
        },
      });

      return success;
    } catch (error) {
      console.error("Check-in error:", error);
      toast.error("Failed to check in. Please try again.");
      return false;
    }
  }, [sessionKey, queryClient, execute]);

  return { checkIn };
};
