import React, { useState, useEffect } from 'react';
import Wallet from '@/components/Wallet';
import { useCurrentAddress, useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { Actions } from './components/Actions';
import { useMintActions } from './hooks/useMintActions';
import { useBalances } from './hooks/useBalances';
import { useHunger } from './hooks/useHunger';
import { AudioControl } from '@/components/AudioControl';
import { Backpack } from '@/components/Backpack';
import { Shop } from '@/components/Shop';
import { SessionKeyModal } from '@/components/SessionKeyModal';
import { useSessionKeyCheck } from '@/hooks/useSessionKeyCheck';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { useMineInfo } from '@/hooks/queries/useMineInfo';
import { useAutoMiningRate } from '@/hooks/queries/useAutoMiningRate';
import { DailyCheckIn } from '@/components/DailyCheckIn';
import { APP_CONFIG } from '@/constants/config';

export default function MintView() {
  const address = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const { handleMine, handleAutoMine, handleStart } = useMintActions();
  const { goldBalance, RgasBalance, refetchGoldBalance, refetchRgasBalance } = useBalances();
  const { hunger, refetchHunger } = useHunger();
  const { showModal: showSessionKeyModal, setShowModal: setShowSessionKeyModal, handleCreateSessionKey, isCreating, hasGas } = useSessionKeyCheck();
  const { data: mineInfo } = useMineInfo();
  const { refetch: refetchAutoMiningRate } = useAutoMiningRate();

  const [isBackpackOpen, setIsBackpackOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Check if session key is valid
  const isSessionKeyValid = sessionKey && 
    sessionKey.getCreateTime() !== null && 
    Date.now() - sessionKey.getCreateTime() <= APP_CONFIG.maxInactiveInterval * 1000;

  useEffect(() => {
    if (address) {
      handleRefresh();
    }
  }, [address]);

  // Show welcome dialog only after session key is created and valid
  useEffect(() => {
    if (address && !showSessionKeyModal && mineInfo?.id === "" && hasGas && isSessionKeyValid) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [address, showSessionKeyModal, mineInfo, hasGas, isSessionKeyValid]);

  const handleRefresh = () => {
    refetchGoldBalance();
    refetchRgasBalance();

    if (mineInfo?.type === "auto") {
      refetchAutoMiningRate();
    } else {
      refetchHunger();
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (address && mineInfo?.type === "auto") {
      intervalId = setInterval(() => {
        handleRefresh();
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [address, mineInfo?.type]);

  const onStart = async () => {
    setIsStarting(true);
    try {
      await handleStart();
      setShowWelcome(false);
    } finally {
      setIsStarting(false);
    }
    handleRefresh();
  };

  // Determine if we should show the DailyCheckIn
  const shouldShowDailyCheckIn = hasGas && mineInfo && isSessionKeyValid;

  return (
<div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover 
        pt-[60px] md:pt-[80px] lg:pt-[100px] relative"
      style={{ backgroundImage: "url('/imgs/mint/bg.png')" }}
    >
      <AudioControl className="absolute top-4 right-4 z-50" />

      <div className="w-full h-[90px] md:h-[120px] lg:h-[160px] flex items-center justify-center">
        <div
          className="w-full max-w-[500px] md:max-w-full lg:max-w-[1200px] xl:max-w-[1400px] h-full 
            bg-center bg-no-repeat bg-contain flex items-center justify-center gap-2 md:gap-4 lg:gap-6"
          style={{ backgroundImage: "url('/imgs/mint/title_bg.png')" }}
        >
          <img
            className="w-[42px] h-[42px] md:w-[56px] md:h-[56px] lg:w-[80px] lg:h-[80px]"
            src="/imgs/g_icon.png"
            alt="Gold icon"
          />
          <div className="text-[#edad4b] text-[30px] md:text-[40px] lg:text-[64px] font-black font-['Poppins'] uppercase">
            {goldBalance}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="h-[55px] md:h-[70px] lg:h-[100px] px-5 md:px-7 lg:px-10 py-[5px] md:py-[7px] lg:py-[10px]
          bg-[#999de4] rounded-xl shadow border border-black justify-start items-center gap-[18px] md:gap-[24px] lg:gap-[32px] inline-flex">
          <div className="w-[25px] md:w-[32px] lg:w-[48px] h-[37px] md:h-[46px] lg:h-[68px] relative">
            <div className="w-[19px] md:w-[24px] lg:w-[36px] h-[37px] md:h-[46px] lg:h-[68px] 
              left-0 top-0 absolute bg-[#5c5c5c] rounded-sm border border-black">
            </div>
            <div className="w-[15px] md:w-[20px] lg:w-[30px] h-[9px] md:h-[12px] lg:h-[18px] 
              left-[2px] top-[3px] absolute bg-[#fcebab] rounded-sm border border-black">
            </div>
            <div className="w-[8px] md:w-[10px] lg:w-[16px] h-[8px] md:h-[10px] lg:h-[16px] 
              left-[5px] md:left-[7px] lg:left-[10px] top-[16px] md:top-[20px] lg:top-[30px] 
              absolute bg-[#db433e] rounded-full border border-black">
            </div>
          </div>
          <div className="text-[#edad4b] text-3xl md:text-4xl lg:text-6xl font-black font-['Poppins'] uppercase">
            {RgasBalance}
          </div>
        </div>
      </div>

      {address ? (
        <>
          <Actions
            mine={handleMine}
            autoMine={handleAutoMine}
            hunger={String(hunger)}
            onOpenBackpack={() => setIsBackpackOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
            onRefresh={handleRefresh}
          />
          
          {/* Modals - Order is important */}
          <SessionKeyModal
            isOpen={showSessionKeyModal}
            onClose={() => setShowSessionKeyModal(false)}
            onCreateSessionKey={handleCreateSessionKey}
            isCreating={isCreating}
            hasGas={hasGas}
          />
          
          {!showSessionKeyModal && (
            <>
              <WelcomeDialog
                isOpen={showWelcome}
                onClose={() => setShowWelcome(false)}
                onStart={onStart}
                isStarting={isStarting}
              />
              {shouldShowDailyCheckIn && <DailyCheckIn />}
            </>
          )}
        </>
      ) : (
        <Wallet />
      )}

      <Backpack isOpen={isBackpackOpen} onClose={() => setIsBackpackOpen(false)} />
      <Shop isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
    </div>
  );
}