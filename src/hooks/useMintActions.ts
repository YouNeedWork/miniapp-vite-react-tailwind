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

const client = new RoochClient({ url: "https://test-seed.rooch.network/" });

export const useMintActions = () => {
  const address = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const { data: mineInfo } = useMineInfo();
  const queryClient = useQueryClient();

  const handleMine = useCallback(async () => {
    try {
      if (!address) return false;

      // Check for auth token
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        console.error('Authentication required');
        return false;
      }

      // Check if we have a valid session key
      const isSessionKeyValid = sessionKey && 
        sessionKey.getCreateTime() !== null && 
        Date.now() - sessionKey.getCreateTime() <= APP_CONFIG.maxInactiveInterval * 1000;

      if (!isSessionKeyValid) {
        console.error('Valid session key required');
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
        return true;
      }

      return false;
    } catch (error) {
      console.error("Mining error:", error);
      return false;
    }
  }, [address, sessionKey, mineInfo, queryClient]);

  return { handleMine };
};