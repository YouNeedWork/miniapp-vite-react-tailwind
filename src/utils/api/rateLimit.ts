import toast from 'react-hot-toast';

const RATE_LIMIT_CONFIG = {
  DEFAULT: 250,  // 4 times per second
  MINING: 250,   // 4 times per second for mining
  QUERY: 250,    // 4 times per second for queries
  CLAIM: 250     // 4 times per second for claim actions
} as const;

class RateLimiter {
  private lastActionTimes = new Map<string, number>();

  check(actionKey: string, cooldown: number = RATE_LIMIT_CONFIG.DEFAULT): boolean {
    const now = Date.now();
    const lastActionTime = this.lastActionTimes.get(actionKey) || 0;
    
    if (now - lastActionTime < cooldown) {
      return false;
    }
    
    this.lastActionTimes.set(actionKey, now);
    return true;
  }

  reset(actionKey: string): void {
    this.lastActionTimes.delete(actionKey);
  }
}

export const rateLimiter = new RateLimiter();

export const checkRateLimit = (actionKey: string, cooldown?: number): boolean => {
  return rateLimiter.check(actionKey, cooldown);
};

export { RATE_LIMIT_CONFIG };