import { useState, useCallback } from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';

export const useInviteRewards = () => {
  const address = useCurrentAddress();
  const [totalRewards, setTotalRewards] = useState(0);
  const inviteCode = address ? address.toStr().slice(0, 8) : '';

  const copyInviteLink = useCallback(() => {
    const link = `https://app.goldminer.fun?ref=${inviteCode}`;
    navigator.clipboard.writeText(link);
  }, [inviteCode]);

  return {
    totalRewards,
    inviteCode,
    copyInviteLink
  };
};