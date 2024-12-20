import { useCallback } from "react";
import { Transaction } from "@roochnetwork/rooch-sdk";
import { useCurrentSession } from "@roochnetwork/rooch-sdk-kit";
import { ROOCH_APP, PKG } from "@/constants/config";
import { useQueryClient } from "@tanstack/react-query";
import { TWITTER_BINDING_QUERY_KEY } from "./queries/useTwitterBinding";
import { useTransaction } from "./useTransaction";
import { checkRateLimit, handleApiError } from '@/utils/rateLimit';
import toast from "react-hot-toast";

export const useTwitterClaim = () => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const { execute } = useTransaction();

  const claimTwitterReward = useCallback(async () => {
    if (!sessionKey) {
      toast.error("Session key required");
      return false;
    }

    if (!ROOCH_APP) {
      toast.error("Configuration error: ROOCH_APP not defined");
      return false;
    }

    // Check rate limit
    if (!checkRateLimit('twitter-claim')) {
      return false;
    }

    try {
      const txn = new Transaction();
      txn.callFunction({
        address: PKG,
        module: "tasks",
        function: "complete_twitter_bind",
        args: [],
        typeArgs: [],
      });

      const success = await execute(txn, {
        showSuccessToast: false,
        showErrorToast: false,
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: TWITTER_BINDING_QUERY_KEY,
          });
          toast.success("Twitter reward claimed successfully!");
        },
        onError: (error) => {
          const errorMessage = handleApiError(error);
          console.error("Twitter claim error:", error);
          toast.error(errorMessage);
        },
      });

      return success;
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      console.error("Twitter claim error:", error);
      toast.error(errorMessage);
      return false;
    }
  }, [sessionKey, queryClient, execute]);

  return { claimTwitterReward };
};