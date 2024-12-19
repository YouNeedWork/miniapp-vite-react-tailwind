import { useCallback } from "react";
import { Transaction, Args } from "@roochnetwork/rooch-sdk";
import { useCurrentSession } from "@roochnetwork/rooch-sdk-kit";
import { useQueryClient } from "@tanstack/react-query";
import { PKG } from "@/constants/config";
import { MINE_INFO_QUERY_KEY } from "@/hooks/queries/useMineInfo";
import { createRoochClient } from "@/utils/rooch";
import { DURATIONS, MINER_TYPES } from "../constants";
import type { ShopItem } from "../types";
import toast from "react-hot-toast";

const client = createRoochClient();

export const useShopPurchase = (onSuccess?: () => void) => {
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();

  const handlePurchase = useCallback(
    async (item: ShopItem, days: number) => {
      if (!sessionKey) {
        toast.error("Session key required");
        return false;
      }

      try {
        let duration: number;
        switch (days) {
          case 3:
            duration = DURATIONS.THREE_DAYS;
            break;
          case 7:
            duration = DURATIONS.SEVEN_DAYS;
            break;
          case 21:
            duration = DURATIONS.TWENTY_ONE_DAYS;
            break;
          case 30:
            duration = DURATIONS.THIRTY_DAYS;
            break;
          default:
            throw new Error("Invalid duration");
        }

        const txn = new Transaction();

        if (item.type === "boost") {
          txn.callFunction({
            address: PKG,
            module: "boost_nft",
            function: "mint_3x_boost",
            args: [Args.u64(BigInt(duration))],
            typeArgs: [],
          });
        } else {
          txn.callFunction({
            address: PKG,
            module: "gold_miner",
            function: "purchase_miner",
            args: [
              Args.u8(MINER_TYPES[item.type as keyof typeof MINER_TYPES]),
              Args.u64(BigInt(duration)),
            ],
            typeArgs: [],
          });
        }

        const result: any = await client.signAndExecuteTransaction({
          transaction: txn,
          signer: sessionKey,
        });

        if (result.output.status.type === "executed") {
          await queryClient.invalidateQueries({
            queryKey: MINE_INFO_QUERY_KEY,
          });
          toast.success("Purchase successful!");
          onSuccess?.();
          return true;
        }

        console.log("result", result);

        const errorCode = result.output.status.abort_code;
        let errorMessage = "Purchase failed";

        switch (Number(errorCode)) {
          case 4:
            errorMessage = "Insufficient balance";
            break;
          case 5:
            errorMessage = "Invalid miner type";
            break;
          case 100008:
            errorMessage = "Already owned";
            break;
        }

        toast.error(errorMessage);
        return false;
      } catch (error) {
        console.error("Purchase error:", error);
        toast.error("Transaction failed. Please try again.");
        return false;
      }
    },
    [sessionKey, queryClient, onSuccess]
  );

  return { handlePurchase };
};
