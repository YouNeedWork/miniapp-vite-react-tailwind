import { ApiError, createApiError } from '@/utils/api/errors';
import { MINING_CONFIG } from './config';
import toast from 'react-hot-toast';

export const MINING_ERROR_TYPES = {
  RATE_LIMIT: 'RATE_LIMIT',
  SEQUENCE_NUMBER: 'SEQUENCE_NUMBER',
  INSUFFICIENT_GAS: 'INSUFFICIENT_GAS',
  SESSION_INVALID: 'SESSION_INVALID',
  UNKNOWN: 'UNKNOWN'
} as const;

export const handleMiningError = (error: any): ApiError => {
  // Rate limit error
  if (error?.response?.status === 429) {
    return createApiError(
      'RATE_LIMIT',
      'Please wait before mining again',
      error
    );
  }

  // Sequence number error
  if (error?.code === 1001 || error?.type === 'SequenceNuberTooOld') {
    return createApiError(
      'SEQUENCE_NUMBER',
      'Mining too fast, please slow down',
      error
    );
  }

  // Gas error
  if (error?.code === 1004 || error?.message?.includes('CantPayGasDeposit')) {
    return createApiError(
      'INSUFFICIENT_GAS',
      'Insufficient gas for mining',
      error
    );
  }

  // Session key error
  if (error?.code === 1002 || error?.message?.includes('session')) {
    return createApiError(
      'SESSION_INVALID',
      'Session key invalid or expired',
      error
    );
  }

  return createApiError(
    'UNKNOWN',
    error?.message || 'Mining failed. Please try again.',
    error
  );
};

export const displayMiningError = (error: ApiError): void => {
  toast.error(error.message, {
    duration: MINING_CONFIG.ERROR_DISPLAY_DURATION,
    icon: getMiningErrorIcon(error.code)
  });
};

const getMiningErrorIcon = (errorType: string): string => {
  switch (errorType) {
    case 'RATE_LIMIT':
    case 'SEQUENCE_NUMBER':
      return '⏳';
    case 'INSUFFICIENT_GAS':
    case 'SESSION_INVALID':
      return '⚠️';
    default:
      return '❌';
  }
};