import { useCallback } from "react";
import { useBalances } from "@/hooks/queries/useBalances";
import { useTwitterBinding } from "@/hooks/queries/useTwitterBinding";
import { useTwitterClaim } from "@/hooks/useTwitterClaim";
import { useVoteSystem } from "@/hooks/useVoteSystem";
import toast from "react-hot-toast";
import type { EarnState } from "../types";

export const useEarnState = (): EarnState => {
  const { data: twitterId } = useTwitterBinding();
  const { RgasBalance } = useBalances();
  const { claimTwitterReward } = useTwitterClaim();
  const { handleVoteClaim } = useVoteSystem();

  const handleVoteAction = useCallback(
    async (level: number) => {
      try {
        const success = await handleVoteClaim(level);
        if (!success) {
          window.open("https://grow.rooch.network/project/goldminer", "_blank");
          return;
        }
      } catch (error) {
        console.error("Vote action failed:", error);
        toast.error("Failed to process vote action");
        return false;
      }
    },
    [handleVoteClaim]
  );

  const handleTwitterAction = useCallback(async () => {
    try {
      if (!twitterId) {
        window.open("https://portal.rooch.network/settings", "_blank");
        return;
      }
      await claimTwitterReward();
    } catch (error) {
      console.error("Twitter action failed:", error);
      toast.error("Failed to process Twitter action");
    }
  }, [twitterId, claimTwitterReward]);

  return {
    isTwitterBound: !!twitterId,
    needsRGas: parseFloat(RgasBalance) === 0,
    handleVoteAction,
    handleTwitterAction,
  };
};
