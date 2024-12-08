import { useCallback } from 'react';
import { Transaction } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { executeTransaction, type TransactionOptions } from '@/utils/transaction';
import toast from 'react-hot-toast';

export function useTransaction() {
  const sessionKey = useCurrentSession();

  const execute = useCallback(async (
    transaction: Transaction,
    options?: TransactionOptions
  ) => {
    if (!sessionKey) {
      toast.error('Session key required');
      return false;
    }

    return executeTransaction(sessionKey, transaction, options);
  }, [sessionKey]);

  return { execute };
}