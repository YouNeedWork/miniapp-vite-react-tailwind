import { useState } from "react";
import { useCurrentSession } from "@roochnetwork/rooch-sdk-kit";
import { useMining } from "@/hooks/useMining";
import { useStartMining } from "@/hooks/useStartMining";
import { useBalances } from "@/hooks/queries/useBalances";
import { useHunger } from "@/hooks/queries/useHunger";
import { useSessionKeyCheck } from "@/hooks/useSessionKeyCheck";
import { useMineInfo } from "@/hooks/queries/useMineInfo";
import { useAutoMiningRate } from "@/hooks/queries/useAutoMiningRate";
import { APP_CONFIG } from "@/constants/config";
import { useClaim } from "@/hooks/useClaim";
import { MintState } from "@/pages/mint/types";

export const useMintState = (): MintState => {
  const sessionKey = useCurrentSession();
  const { mine, isLoading: isMining } = useMining();
  const { claim, isLoading: isClaiming } = useClaim();
  const { startMining } = useStartMining();
  const { goldBalance, RgasBalance, refetchGoldBalance, refetchRgasBalance } =
    useBalances();
  const { hunger, refetchHunger } = useHunger();
  const {
    showModal: showSessionKeyModal,
    setShowModal: setShowSessionKeyModal,
    handleCreateSessionKey,
    isCreating,
    hasGas,
  } = useSessionKeyCheck();
  const { data: mineInfo } = useMineInfo();
  const { refetch: refetchAutoMiningRate } = useAutoMiningRate();

  const [isBackpackOpen, setIsBackpackOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Check if session key is valid
  const isSessionKeyValid =
    sessionKey &&
    sessionKey.getCreateTime() !== null &&
    Date.now() - sessionKey.getCreateTime() <=
      APP_CONFIG.maxInactiveInterval * 1000;

  // Check if user has already started mining
  const hasStartedMining = mineInfo?.hasMiner ?? false;

  const handleRefresh = () => {
    refetchGoldBalance();
    refetchRgasBalance();
    refetchHunger();
    if (mineInfo?.type === "auto") {
      refetchAutoMiningRate();
    }
  };

  const handleMining = async () => {
    const success = await mine();
    if (success) {
      handleRefresh();
    }
  };

  const handleClaim = async () => {
    const success = await claim();
    if (success) {
      handleRefresh();
    }
  };

  const handleStart = async () => {
    setIsStarting(true);
    try {
      const success = await startMining();
      if (success) {
        handleRefresh();
        setShowWelcome(false);
      }
    } finally {
      setIsStarting(false);
    }
  };

  return {
    // State
    goldBalance,
    rgasBalance: RgasBalance,
    hunger,
    isMining,
    isCreating,
    isStarting,
    showSessionKeyModal,
    showWelcome: !hasStartedMining && !showSessionKeyModal && hasGas,
    isBackpackOpen,
    isShopOpen,
    hasGas,
    shouldShowDailyCheckIn: hasGas && mineInfo && isSessionKeyValid,

    // Actions
    handleMining,
    handleClaim,
    handleStart,
    handleRefresh,
    handleCreateSessionKey,

    // Setters
    setShowSessionKeyModal,
    setShowWelcome,
    setIsBackpackOpen,
    setIsShopOpen,
  };
};