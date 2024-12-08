import { RoochClient } from "@roochnetwork/rooch-sdk";

const ROOCH_NODE_URL = "https://test-seed.rooch.network/";

export const createRoochClient = () => {
  return new RoochClient({ url: ROOCH_NODE_URL });
};

export const handleRoochError = (error: any): string => {
  // Mining specific errors
  if (error?.code === 1001 || error?.type === "SequenceNuberTooOld") {
    return "Please slow down and take a break! Mining too fast.";
  }
  
  // Gas related errors
  if (error?.code === 1004 && error?.type === "CantPayGasDeposit") {
    return "Insufficient gas for operation";
  }

  // Transaction errors
  if (error?.status?.type === "moveabort") {
    switch (error.status.abort_code) {
      case 1001:
        return "Please slow down and take a break! Mining too fast.";
      case 4:
        return "Insufficient $GOLD balance";
      case 5:
        return "Invalid miner type";
      default:
        return `Transaction failed: Error ${error.status.abort_code}`;
    }
  }

  return error?.message || "Operation failed. Please try again.";
};