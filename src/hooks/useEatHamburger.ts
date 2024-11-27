import { useCallback } from 'react';
import { Transaction, Args } from '@roochnetwork/rooch-sdk';
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit';
import { PKG } from '@/constants/config';

export const useEatHamburger = () => {
  const sessionKey = useCurrentSession();

  const eatHamburger = useCallback(async () => {
    if (!sessionKey) {
      throw new Error('No session key available');
    }

    const txn = new Transaction();
    txn.callFunction({
      address: PKG,
      module: 'hambuger',
      function: 'eat',
      args: [],
      typeArgs: [],
    });

    const result = await sessionKey.signAndExecuteTransaction({
      transaction: txn,
    });

    return result.execution_info.status.type === 'executed';
  }, [sessionKey]);

  return { eatHamburger };
};