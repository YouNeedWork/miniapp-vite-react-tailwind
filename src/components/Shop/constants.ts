// Duration constants in seconds
export const DURATIONS = {
  THREE_DAYS: 3 * 24 * 60 * 60,
  SEVEN_DAYS: 7 * 24 * 60 * 60,
  TWENTY_ONE_DAYS: 21 * 24 * 60 * 60,
  THIRTY_DAYS: 30 * 24 * 60 * 60
} as const;

export const MINER_TYPES = {
  manual: 1,
  hydro: 2,
  electric: 3
} as const;