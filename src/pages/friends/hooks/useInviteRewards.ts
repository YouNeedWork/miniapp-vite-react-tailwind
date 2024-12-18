import { useState, useCallback } from "react";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";

export const useInviteRewards = () => {
  const address = useCurrentAddress();
  const [totalRewards, setTotalRewards] = useState(0);
  const inviteCode = address ? address.genRoochAddress().toHexAddress() : "";

  const copyInviteLink = useCallback(() => {
    const link = `https://app.goldminer.life/?start_param=${inviteCode}`;
    navigator.clipboard.writeText(link);
  }, [inviteCode]);

  return {
    totalRewards,
    inviteCode,
    copyInviteLink,
  };
};
