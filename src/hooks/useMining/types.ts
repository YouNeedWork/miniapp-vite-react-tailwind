export interface MiningState {
  isLoading: boolean;
  error: MiningError | null;
  lastMiningTime: number;
}

export interface MiningError {
  code: number;
  type: string;
  message: string;
}

export interface MiningConfig {
  cooldown: number;
  maxRetries: number;
  retryDelay: number;
}

export const MINING_ERRORS = {
  RATE_LIMIT: {
    code: 429,
    type: 'RATE_LIMIT',
    message: 'Please wait a moment before mining again'
  },
  SEQUENCE_NUMBER: {
    code: 1001,
    type: 'SEQUENCE_NUMBER',
    message: 'Mining too fast, please slow down'
  },
  INSUFFICIENT_GAS: {
    code: 1004,
    type: 'INSUFFICIENT_GAS',
    message: 'Insufficient gas for mining'
  }
} as const;