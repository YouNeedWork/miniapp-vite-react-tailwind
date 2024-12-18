import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';
import { ShopItemCard } from './ShopItem';
import { SHOP_ITEMS, type ShopItem } from './types';
import { shopStyles } from '@/components/ui/Modal/styles';
import { useMineInfo } from '@/hooks/queries/useMineInfo';
import { useCurrentSession, useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { Transaction, Args } from "@roochnetwork/rooch-sdk";
import { PKG } from "@/constants/config";
import { MINE_INFO_QUERY_KEY } from "@/hooks/queries/useMineInfo";
import { useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { createRoochClient } from "@/utils/rooch";

const client = createRoochClient();

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Shop: React.FC<ShopProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const address = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const queryClient = useQueryClient();
  const { data: mineInfo } = useMineInfo();
  const hasAutoMiner = mineInfo?.type === 'auto';

  const handleRent = async (item: ShopItem, days: number) => {
    if (hasAutoMiner) {
      toast.error(t('shop.alreadyOwnedError'));
      return;
    }

    try {
      let duration = 0;
      if (days === 3) {
        duration = 259200;
      } else if (days === 7) {
        duration = 604800;
      } else if (days === 21) {
        duration = 1814400;
      }

      let ty = 1;
      if (item.type === "manual") {
        ty = 1;
      } else if (item.type === "hydro") {
        ty = 2;
      } else if (item.type === "electric") {
        ty = 3;
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
        toast.success(t('shop.rentSuccess'));
        onClose();
        return true;
      } else {
        let error = result.output.status.abort_code;
        if (error == 4) {
          error = t('shop.errors.insufficientGold');
        } else if (error == 5) {
          error = t('shop.errors.invalidMiner');
        } else if (error == 1) {
          error = t('shop.errors.purchaseFailed');
        } else if (error == 100008) {
          error = t('shop.errors.alreadyOwned');
        }

        toast.error(error);
        return false;
      }
    } catch (error) {
      console.error("Purchase miner error:", error);
      toast.error(t('shop.errors.generic'));
      return false;
    }
  };

  return (
    <Modal
      title={t('shop.title')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={shopStyles.container}>
        <div className={shopStyles.content}>
          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-gray-600">
              {hasAutoMiner 
                ? t('shop.alreadyOwnedMessage')
                : t('shop.description')}
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