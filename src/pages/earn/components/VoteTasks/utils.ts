import { formatNumber } from '@/lib/utils';

export const formatVotes = (votes: number): string => {
  return formatNumber(votes, 0);
};

export const calculateProgress = (current: number, required: number): number => {
  return Math.min(Math.round((current / required) * 100), 100);
};