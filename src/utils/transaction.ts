import { Transaction } from '@roochnetwork/rooch-sdk';
import type { SessionKey } from '@roochnetwork/rooch-sdk-kit';
import { createRoochClient } from './rooch';
import toast from 'react-hot-toast';

export interface TransactionOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export async function executeTransaction(
  sessionKey: SessionKey,
  transaction: Transaction,
  options: TransactionOptions = {}
) {
  const {
    showSuccessToast = true,
    showErrorToast = true,
    onSuccess,
    onError
  } = options;

  try {
    const client = createRoochClient();
    const result = await client.signAndExecuteTransaction({
      transaction,
      signer: sessionKey,
    });

    if (result.execution_info.status.type === 'executed') {
      if (showSuccessToast) {
        toast.success('Transaction successful');
      }
      onSuccess?.();
      return true;
    }

    // Handle specific error codes
    if (result.execution_info.status.type === 'moveabort') {
      const errorMessage = handleMoveAbortError(result.execution_info.status.abort_code);
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      onError?.(new Error(errorMessage));
      return false;
    }

    throw new Error('Transaction failed');
  } catch (error: any) {
    const errorMessage = handleTransactionError(error);
    if (showErrorToast) {
      toast.error(errorMessage);
    }
    onError?.(error);
    return false;
  }
}

function handleMoveAbortError(code: number): string {
  switch (code) {
    case 1001:
      return 'Please slow down and take a break! Mining too fast.';
    case 4:
      return 'Insufficient $GOLD balance';
    case 5:
      return 'Invalid miner type';
    default:
      return `Transaction failed: Error ${code}`;
  }
}

function handleTransactionError(error: any): string {
  if (error?.code === 1001 || error?.type === 'SequenceNuberTooOld') {
    return 'Please slow down and take a break! Mining too fast.';
  }
  return error?.message || 'Transaction failed. Please try again.';
}