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

const client = new RoochClient({ url: "https://test-seed.rooch.network/" });

export const useMintActions = () => {
  const address = useCurrentAddress();

  const {
    mutateAsync: createSessionKey,
    isPending: isCreatingSessionKey,
    error: createSessionKeyError,
    data: sessionKey,
  } = useCreateSessionKey();
  const { data: mineInfo } = useMineInfo();
  const queryClient = useQueryClient();

  const handleMine = useCallback(async () => {
    try {
      if (!address) return false;

      if (!sessionKey) {
        const newSessionKey = await createSessionKey({
          appName: "rooch",
          appUrl: window.location.href,
          scopes: ["0x1::*::*", "0x3::*::*", `${PKG}::*::*`],
          maxInactiveInterval: 60 * 60 * 8 * 1000,
        });
      }

      const isSessionKeyExpired =
        sessionKey?.getCreateTime() === null ||
        Date.now() - sessionKey?.getCreateTime()! > 60 * 60 * 8 * 1000;

      if (isSessionKeyExpired) {
        const newSessionKey = await createSessionKey({
          appName: "rooch",
          appUrl: window.location.href,
          scopes: ["0x1::*::*", "0x3::*::*", `${PKG}::*::*`],
          maxInactiveInterval: 60 * 60 * 8 * 1000,
        });

        if (!newSessionKey) return false;
      }

      if (!sessionKey) return false;
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
        signer: sessionKey as any,
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
  }, [address, sessionKey, createSessionKey, mineInfo, queryClient]);

  return { handleMine };
};
