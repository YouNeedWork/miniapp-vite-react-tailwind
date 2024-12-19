import { useState, useEffect } from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import type { Referral } from '../types';
import { API_BASE_URL } from '@/constants/config';
import toast from 'react-hot-toast';

export const useReferrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const address = useCurrentAddress();

  useEffect(() => {
    const fetchReferrals = async () => {
      if (!address) return;

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/referrals?address=${address.toStr()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setReferrals(data.referrals || []);
      } catch (error) {
        console.error('Failed to fetch referrals:', error);
        setError('Failed to load referrals. Please try again later.');
        toast.error('Failed to load referrals');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, [address]);

  return {
    referrals,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      // Re-run the effect
      const controller = new AbortController();
      fetch(`${API_BASE_URL}/referrals?address=${address?.toStr()}`, {
        signal: controller.signal
      })
        .then(response => response.json())
        .then(data => setReferrals(data.referrals || []))
        .catch(error => {
          if (error.name === 'AbortError') return;
          console.error('Failed to fetch referrals:', error);
          setError('Failed to load referrals');
          toast.error('Failed to load referrals');
        })
        .finally(() => setIsLoading(false));

      return () => controller.abort();
    }
  };
};