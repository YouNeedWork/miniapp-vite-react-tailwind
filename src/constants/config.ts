export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const PKG = import.meta.env.VITE_PKG as string;
export const GOLD_TREATURY = import.meta.env.VITE_GOLD_TREATURY as string;

export const APP_CONFIG = {
  name: 'Gold Miner',
  description: 'A mining game on the blockchain',
  version: '1.0.0',
  apiBaseUrl: API_BASE_URL,
  pkg: PKG,
  goldTreatury: GOLD_TREATURY,
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'zh'],
  maxInactiveInterval: 60 * 60 * 8, // 8 hours
  scopes: [
    '0x1::*::*',
    '0x3::*::*',
    `${PKG}::*::*`
  ]
} as const;