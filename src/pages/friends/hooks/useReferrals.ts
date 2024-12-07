import { useState, useEffect } from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import type { Referral } from '../types';
import { API_BASE_URL } from '@/constants/config';

export const useReferrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const address = useCurrentAddress();

  useEffect(() => {
    const fetchReferrals = async () => {
      if (!address) return;

      try {
        const response = await fetch(`${API_BASE_URL}/referrals?address=${address.toStr()}`);
        const data = await response.json();
        setReferrals(data.referrals);
      } catch (error) {
        console.error('Failed to fetch referrals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, [address]);

  return {
    referrals,
    isLoading
  };
};