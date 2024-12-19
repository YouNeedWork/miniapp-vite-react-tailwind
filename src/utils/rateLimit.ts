import toast from 'react-hot-toast';

const RATE_LIMIT_COOLDOWN = 1000; // 1 second cooldown
const lastActionTimes = new Map<string, number>();

export const checkRateLimit = (actionKey: string): boolean => {
  const now = Date.now();
  const lastActionTime = lastActionTimes.get(actionKey) || 0;
  
  if (now - lastActionTime < RATE_LIMIT_COOLDOWN) {
    toast.error('Please slow down! Actions too frequent.');
    return false;
  }
  
  lastActionTimes.set(actionKey, now);
  return true;
};

export const handleApiError = (error: any): string => {
  if (error?.response?.status === 429) {
    return 'Please slow down! Too many requests.';
  }
  
  if (error?.code === 1001 || error?.message?.includes('1001')) {
    return 'Please slow down! Actions too frequent.';
  }
  
  return error?.message || 'Operation failed. Please try again.';
};