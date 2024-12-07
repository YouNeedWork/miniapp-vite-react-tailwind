import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useConnectWallet, useWallets, Wallet } from '@roochnetwork/rooch-sdk-kit';
import { Button } from '@/components/ui/Button';

interface WalletModalProps {
  open: boolean;
  onCancel: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ open, onCancel }) => {
  const wallets = useWallets();
  const { mutateAsync: connectWallet } = useConnectWallet();

  const handleConnect = (wallet: Wallet) => {
    connectWallet({ wallet })
      .then(() => onCancel())
      .catch((error) => {
        console.error("Failed to connect wallet:", error);
      });
  };

  useEffect(() => {
    console.log("wallets", wallets);
  }, [wallets]);

  return (
    <Modal width={400} footer={null} onCancel={onCancel} open={open}>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-6">Connect Wallet</h2>
        <div className="space-y-3">
          {wallets.map(wallet => (
            <div key={wallet.getName()} className="flex items-center space-x-4 p-3 rounded-xl border border-gray-200">
              <img src={wallet.getIcon()} alt={wallet.getName()} className="w-10 h-10" />
              <span className="flex-1 font-semibold">{wallet.getName()}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleConnect(wallet)}
              >
                Connect
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};