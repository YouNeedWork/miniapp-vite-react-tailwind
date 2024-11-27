import React from 'react';
import { createNetworkConfig, RoochProvider, WalletProvider } from '@roochnetwork/rooch-sdk-kit';
import { getRoochNodeUrl } from '@roochnetwork/rooch-sdk';
import { useTelegram } from './TelegramProvider';
import { ROOCH_CONFIG } from '../config/rooch';

const { networkConfig } = createNetworkConfig(ROOCH_CONFIG);

export default function RoochDappProvider({ children }: { children: React.ReactNode }) {
  const { ready } = useTelegram();
  const autoConnect = !ready;

  return (
    <RoochProvider networks={networkConfig} defaultNetwork="testnet">
      <WalletProvider chain="bitcoin" autoConnect={autoConnect}>
        {children}
      </WalletProvider>
    </RoochProvider>
  );
}