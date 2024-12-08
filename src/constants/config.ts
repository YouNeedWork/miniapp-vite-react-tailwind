import { ENV } from '@/config/env';

export const API_BASE_URL = ENV.API_BASE_URL;
export const PKG = ENV.PKG;
export const ROOCH_APP = ENV.ROOCH_APP;

export const APP_CONFIG = {
  name: 'Gold Miner',
  description: 'A mining game on the blockchain',
  version: '1.0.0',
  apiBaseUrl: API_BASE_URL,
  pkg: PKG,
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'zh'],
  maxInactiveInterval: 60 * 60 * 8, // 8 hours
  scopes: [
    '0x1::*::*',
    '0x3::*::*',
    `${PKG}::*::*`
  ]
} as const;