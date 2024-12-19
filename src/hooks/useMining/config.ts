export const MINING_CONFIG = {
  COOLDOWN: 1000, // 1 second cooldown
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  ERROR_DISPLAY_DURATION: 3000
} as const;

export const MINING_ACTIONS = {
  MINE: 'mine',
  AUTO_MINE: 'auto-mine',
  CLAIM: 'claim'
} as const;