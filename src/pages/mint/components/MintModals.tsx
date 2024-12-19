import React from 'react';
import { SessionKeyModal } from '@/components/SessionKeyModal';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { DailyCheckIn } from '@/components/DailyCheckIn';
import { Backpack } from '@/components/Backpack';
import { Shop } from '@/components/Shop';
import type { MintState } from '../types';
import { useMineInfo } from '@/hooks/queries';

interface MintModalsProps {
  state: MintState;
  onStart: () => Promise<void>;
}

export const MintModals: React.FC<MintModalsProps> = ({ state, onStart }) => {
  const { data: mineInfo } = useMineInfo();


  return (
    <>
      <SessionKeyModal
        isOpen={state.showSessionKeyModal}
        onClose={() => state.setShowSessionKeyModal(false)}
        onCreateSessionKey={state.handleCreateSessionKey}
        isCreating={state.isCreating}
        hasGas={state.hasGas}
      />

      {!state.showSessionKeyModal && !mineInfo?.minerCreate && (
        <>
          <WelcomeDialog
            isOpen={state.showWelcome}
            onClose={() => state.setShowWelcome(false)}
            onStart={onStart}
            isStarting={state.isStarting}
          />
        </>
      )}

      {state.shouldShowDailyCheckIn && <DailyCheckIn />}
      <Backpack
        isOpen={state.isBackpackOpen}
        onClose={() => state.setIsBackpackOpen(false)}
      />

      <Shop
        isOpen={state.isShopOpen}
        onClose={() => state.setIsShopOpen(false)}
      />
    </>
  );
};