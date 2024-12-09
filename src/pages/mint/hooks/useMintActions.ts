import { useCallback } from "react";
import {
  useCurrentSession,
  useCurrentAddress,
  useCreateSessionKey,
} from "@roochnetwork/rooch-sdk-kit";
import {
  RoochClient,
  Transaction,
  Args,
  RoochAddress,
} from "@roochnetwork/rooch-sdk";
import { PKG } from "@/constants/config";
import { useMineInfo, MINE_INFO_QUERY_KEY } from "@/hooks/queries/useMineInfo";
import { useQueryClient } from "@tanstack/react-query";
import { APP_CONFIG } from "@/constants/config";
import { toast } from "react-hot-toast";
import { createRoochClient } from "@/utils/rooch";

const MINING_COOLDOWN = 1000; // 1 second cooldown
let lastMiningTime = 0;

let client = createRoochClient();

export const useMintActions = () => {
  const address = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const { mutateAsync: createSessionKey } = useCreateSessionKey();
  const { data: mineInfo } = useMineInfo();
  const queryClient = useQueryClient();

  const handleMine = useCallback(async () => {
    try {
      if (!address) return false;

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
        toast.error("Session key is invalid");
        return false;
      }

      const txn = new Transaction();

      txn.callFunction({
        address: PKG,
        module: "gold_miner",
        function: "mine",
        args: [],
        typeArgs: [],
      });

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === "executed") {
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        return true;
      }

      return false;
    } catch (error: any) {
      console.error("Mining error:", error);
      if (error?.code === 1004 || error?.message?.includes("1004")) {
        toast.error("You don't have enough RGas");
        return false;
      }

      if (error?.code === 1001 || error?.message.includes("1001")) {
        toast.error("Please slow down and take a break! Mining too fast.");
        return;
      } else {
        toast.error(error?.message || "Mining failed. Please try again.");
      }

      return false;
    }
  }, [address, sessionKey, mineInfo, queryClient]);

  const handleAutoMine = useCallback(async () => {
    try {
      if (!address) return false;

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
        toast.error("Session key is invalid");
        return false;
      }

      const txn = new Transaction();

      txn.callFunction({
        address: PKG,
        module: "gold_miner",
        function: "auto_mine",
        args: [],
        typeArgs: [],
      });

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === "executed") {
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        return true;
      }

      return false;
    } catch (error: any) {

      if (error?.code === 1004 || error?.message?.includes("1004")) {
        toast.error("You don't have enough RGas");
        return false;
      }

      if (error?.code === 1001 || error?.message.includes("1001")) {
        toast.error("Please slow down and take a break! Mining too fast.");
        return;
      } else {
        toast.error(error?.message || "Mining failed. Please try again.");
      }



      return false;
    }
  }, [address, sessionKey, mineInfo, queryClient]);

  const handleStart = useCallback(async () => {
    try {
      if (!address) return false;

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
        toast.error("Session key is invalid");
        return false;
      }
      const inviter = localStorage.getItem("inviter");
      const txn = new Transaction();

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

      const result = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey,
      });

      if (result.execution_info.status.type === "executed") {
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Mining error:", error);
      return false;
    }
  }, [address]);

  return { handleMine, handleAutoMine, handleStart };
};
