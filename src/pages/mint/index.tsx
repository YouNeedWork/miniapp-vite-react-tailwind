import React from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { MintLayout } from './components/MintLayout';
import { MintHeader } from './components/MintHeader';
import { MintActions } from './components/MintActions';
import { MintModals } from './components/MintModals';
import { useMintState } from './hooks/useMintState';
import { useMintEffects } from './hooks/useMintEffects';
import Wallet from '@/components/Wallet';

export default function MintView() {
  const address = useCurrentAddress();
  const state = useMintState();
  useMintEffects(state);

  if (!address) {
    return (
      <MintLayout>
        <Wallet />
      </MintLayout>
    );
  }

  return (
    <MintLayout>
      <MintHeader
        goldBalance={state.goldBalance}
        rgasBalance={state.rgasBalance}
        showSessionKeyModal={state.showSessionKeyModal}
      />

      <MintActions
        claim={state.handleClaim}
        mine={state.handleMining}
        hunger={String(state.hunger)}
        onOpenBackpack={() => state.setIsBackpackOpen(true)}
        onOpenShop={() => state.setIsShopOpen(true)}
        onRefresh={state.handleRefresh}
        isLoading={state.isMining}
      />

      <MintModals
        state={state}
        onStart={state.handleStart}
      />
    </MintLayout>
  );
}