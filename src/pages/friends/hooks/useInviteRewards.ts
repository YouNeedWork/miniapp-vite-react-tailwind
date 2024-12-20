import { useState, useEffect } from "react";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { createRoochClient } from "@/utils/rooch";
import { PKG } from "@/constants/config";
import { Args } from "@roochnetwork/rooch-sdk";

const client = createRoochClient();

export const useInviteRewards = () => {
  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const address = useCurrentAddress();
  const inviteCode = address?.genRoochAddress().toHexAddress() || "";

  useEffect(() => {
    const fetchRewards = async () => {
      if (!address) return;

      setIsLoading(true);
      try {
        const rewards = await client.executeViewFunction({
          address: PKG,
          module: "gold_miner",
          function: "get_invite_reward",
          args: [Args.address(address)],
          typeArgs: [],
        });
        setTotalRewards(
          Number(rewards?.return_values?.[0]?.decoded_value || 0)
        );
      } catch (error) {
        console.error("Failed to fetch invite rewards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewards();
  }, [address]);

  return {
    totalRewards,
    inviteCode,
    isLoading,
  };
};
