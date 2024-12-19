import { MiningError, MINING_ERRORS } from './types';
import { checkRateLimit } from '@/utils/api/rateLimit';
import toast from 'react-hot-toast';

export const MINING_COOLDOWN = 1000; // 1 second

export const handleMiningError = (error: any): MiningError => {
  // Rate limit error
  if (error?.response?.status === 429) {
    return MINING_ERRORS.RATE_LIMIT;
  }

  // Sequence number error
  if (error?.code === 1001 || error?.type === 'SequenceNuberTooOld') {
    return MINING_ERRORS.SEQUENCE_NUMBER;
  }

  // Gas error
  if (error?.code === 1004 || error?.message?.includes('CantPayGasDeposit')) {
    return MINING_ERRORS.INSUFFICIENT_GAS;
  }

  // Default error
  return {
    code: error?.code || 500,
    type: error?.type || 'UNKNOWN',
    message: error?.message || 'Mining failed. Please try again.'
  };
};

export const displayMiningError = (error: MiningError): void => {
  switch (error.code) {
    case MINING_ERRORS.RATE_LIMIT.code:
    case MINING_ERRORS.SEQUENCE_NUMBER.code:
      toast.error(error.message, {
        duration: 2000,
        icon: '⏳'
      });
      break;
    case MINING_ERRORS.INSUFFICIENT_GAS.code:
      toast.error(error.message, {
        duration: 3000,
        icon: '⚠️'
      });
      break;
    default:
      toast.error(error.message);
  }
};

export const validateMiningAction = (lastMiningTime: number): boolean => {
  return checkRateLimit('mining', MINING_COOLDOWN);
};