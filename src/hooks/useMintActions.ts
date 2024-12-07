import { useCallback } from "react";
import {
  useCurrentSession,
  useCurrentAddress,
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
import toast from "react-hot-toast";

const client = new RoochClient({ url: "https://test-seed.rooch.network/" });

export const useMintActions = () => {
  const address = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const { data: mineInfo } = useMineInfo();
  const queryClient = useQueryClient();

  const handleMine = useCallback(async () => {
    try {
      if (!address) {
        toast.error("Please connect your wallet first");
        return false;
      }

      // Check for auth token
      const authToken = localStorage.getItem("auth_token");
      if (!authToken) {
        toast.error("Authentication required");
        return false;
      }

      // Check if we have a valid session key
      const isSessionKeyValid =
        sessionKey &&
        sessionKey.getCreateTime() !== null &&
        Date.now() - sessionKey.getCreateTime() <=
          APP_CONFIG.maxInactiveInterval * 1000;

      if (!isSessionKeyValid) {
        toast.error("Valid session key required");
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
      } else {
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
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        toast.success("Mining successful!");
        return true;
      }

      // Check for ABORTED status with code 1001
      if (
        result.execution_info.status.type === "moveabort" &&
        result.execution_info.status.abort_code == "1001"
      ) {
        toast.error("Please slow down and take a break! Mining too fast.");
        return false;
      }

      return false;
    } catch (error: any) {
      console.error("Mining error:", error);

      // Check for ABORTED status in error object
      if (error.status?.sub_status === 1001) {
        toast.error("Please slow down and take a break! Mining too fast.");
      } else {
        toast.error("Mining failed: " + error.message);
      }

      return false;
    }
  }, [address, sessionKey, mineInfo, queryClient]);

  return { handleMine };
};
