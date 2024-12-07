import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ShopItemCard } from './ShopItem';
import { SHOP_ITEMS, type ShopItem } from './types';
import { shopStyles } from '@/components/ui/Modal/styles';

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
import toast from 'react-hot-toast';

const client = new RoochClient({ url: "https://test-seed.rooch.network/" });


interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Shop: React.FC<ShopProps> = ({ isOpen, onClose }) => {
  const address = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const { mutateAsync: createSessionKey } = useCreateSessionKey();


  const handleRent = async (item: ShopItem, days: number) => {
    console.log(`Renting ${item.name} for ${days} days`);
    // TODO: Implement rental logic

    try {

      let duration = 0;
      if (days === 3) {
        duration = 259200;
      } else if (days === 7) {
        duration = 604800;
      } else if (days === 21) {
        duration = 1814400;
      }

      let ty = 1
      if (item.type === "manual") {
        ty = 1;
      } else if (item.type === "hydro") {
        ty = 2
      } else if (item.type === "electric") {
        ty = 3
      }

      const txn = new Transaction();
      txn.callFunction({
        address: PKG,
        module: "gold_miner",
        function: "purchase_miner",
        args: [
          Args.u8(ty),
          Args.u64(BigInt(duration))
        ],
        typeArgs: [],
      });

      const result: any = await client.signAndExecuteTransaction({
        transaction: txn,
        signer: sessionKey as any,
      });

      if (result.output.status.type === "success") {
        await queryClient.invalidateQueries({ queryKey: MINE_INFO_QUERY_KEY });
        return true;
      } else {
        let error = result.output.status.abort_code;
        if (error == 4) {
          error = "Insufficient $GOLD balance";
        } else if (error == 5) {
          error = "Invalid miner type";
        }

        toast.error(error);
        return false;
      }

    } catch (error) {
      console.error("Purchase miner error:", error);
      return false;
    }
  };


  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal
      title="Mining Machines Shop"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={shopStyles.container} onClick={handleContentClick}>
        <div className={shopStyles.content}>
          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-gray-600">
              Rent mining machines to increase your mining efficiency
            </p>
          </div>

          {SHOP_ITEMS.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              onRent={handleRent}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};