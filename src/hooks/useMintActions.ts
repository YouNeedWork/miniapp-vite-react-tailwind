import { useCallback } from "react";
import {
  useCurrentSession,
  useCurrentAddress,
} from "@roochnetwork/rooch-sdk-kit";
import { Transaction, Args, RoochAddress } from "@roochnetwork/rooch-sdk";
import { PKG } from "@/constants/config";
import { useMineInfo, MINE_INFO_QUERY_KEY } from "@/hooks/queries/useMineInfo";
import { useQueryClient } from "@tanstack/react-query";
import { APP_CONFIG } from "@/constants/config";
import { createRoochClient } from "@/utils/rooch";
import toast from "react-hot-toast";

const MINING_COOLDOWN = 1000; // 1 second cooldown
let lastMiningTime = 0;

export const useMintActions = () => {
  const address = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const { data: mineInfo } = useMineInfo();
  const queryClient = useQueryClient();
  const client = createRoochClient();

  const handleMine = useCallback(async () => {
    try {
      if (!address) {
        toast.error("Please connect your wallet first");
        return false;
      }

      // Check mining cooldown
      const now = Date.now();
      if (now - lastMiningTime < MINING_COOLDOWN) {
        toast.error("Please slow down! Mining too fast.");
        return false;
      }

      // Check if we have a valid session key
      const isSessionKeyValid =
        sessionKey &&
        sessionKey.getCreateTime() !== null &&
        Date.now() - sessionKey.getCreateTime() <=
          APP_CONFIG.maxInactiveInterval * 1000;

      if (!isSessionKeyValid) {
        toast.error("Session key required");
        return false;
      }

      const txn = new Transaction();

      if (!mineInfo) {
        const inviter = localStorage.getItem("inviter");
        txn.callFunction({
          address: PKG,
          module: "gold_miner",
          function: "start",
          args: [
            inviter === null
              ? Args.address(
                  new RoochAddress(
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                  ).toStr()
                )
              : Args.address(inviter),
          ],
          typeArgs: [],
        });
      } else if (mineInfo.type === "auto") {
        // Handle auto mining
        txn.callFunction({
          address: PKG,
          module: "gold_miner",
          function: "auto_mine",
          args: [],
          typeArgs: [],
        });
      } else {
        // Handle manual mining
        txn.callFunction({
          address: PKG,
          module: "gold_miner",
          function: "mine",
          args: [],
          typeArgs: [],
        });
      }

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === "executed") {
        lastMiningTime = now;
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        return true;
      }

      if (result.execution_info.status.type === "moveabort") {
        if (result.execution_info.status.abort_code == "1001") {
          toast.error("Please slow down and take a break! Mining too fast.");
        } else {
          toast.error(
            `Mining failed: Error ${result.execution_info.status.abort_code}`
          );
        }
      }

      return false;
    } catch (error: any) {
      console.error("Mining error:", error);

      if (error?.code === 1001 || error?.type === "SequenceNuberTooOld") {
        toast.error("Please slow down and take a break! Mining too fast.");
      } else {
        toast.error(error?.message || "Mining failed. Please try again.");
      }

      return false;
    }
  }, [address, sessionKey, mineInfo, queryClient, client]);

  return { handleMine };
};
