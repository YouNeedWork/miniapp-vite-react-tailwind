import React, { useState } from 'react';
import { ConnectButton } from './ConnectButton';
import { WalletModal } from './WalletModal';

const Wallet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnect = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ConnectButton onClick={handleConnect} />
      <WalletModal 
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Wallet;