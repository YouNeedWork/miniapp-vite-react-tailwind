import { useState, useEffect } from "react";
import {
  useCurrentSession,
  useCreateSessionKey,
} from "@roochnetwork/rooch-sdk-kit";
import { APP_CONFIG } from "@/constants/config";
import { useBalances } from "@/hooks/queries/useBalances";
import { Scope } from "@roochnetwork/rooch-sdk/dist/cjs/session/types";

export const useSessionKeyCheck = () => {
  const [showModal, setShowModal] = useState(false);
  const sessionKey = useCurrentSession();
  const { mutateAsync: createSessionKey, isPending: isCreating } =
    useCreateSessionKey();
  const { RgasBalance } = useBalances();

  const hasGas = parseFloat(RgasBalance) > 0;

  useEffect(() => {
    // Only show modal if there's no session key or if it's expired
    if (sessionKey) {
      const isValid =
        sessionKey.getCreateTime() !== null &&
        Date.now() - sessionKey.getCreateTime() <=
          APP_CONFIG.maxInactiveInterval * 1000;

      if (!isValid) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  }, [sessionKey]);

  const handleCreateSessionKey = async () => {
    if (!hasGas) return;

    try {
      await createSessionKey({
        appName: APP_CONFIG.name,
        appUrl: window.location.href,
        scopes: APP_CONFIG.scopes as any,
        maxInactiveInterval: APP_CONFIG.maxInactiveInterval,
      });
      setShowModal(false);
    } catch (error) {
      if (
        (error as any)?.code === 1004 &&
        (error as any)?.type === "CantPayGasDeposit"
      ) {
        console.error("Insufficient gas for session key creation");
      } else {
        console.error("Failed to create session key:", error);
      }
    }
  };

  return {
    showModal,
    setShowModal,
    handleCreateSessionKey,
    isCreating,
    hasGas,
  };
};
