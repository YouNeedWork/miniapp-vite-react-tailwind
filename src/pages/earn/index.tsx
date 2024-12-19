import React from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { EarnLayout } from './components/EarnLayout';
import { EarnHeader } from './components/EarnHeader';
import { EarnTasks } from './components/EarnTasks';
import { VoteLevel } from '@/components/VoteLevel';
import { useEarnState } from './hooks/useEarnState';

export default function EarnView() {
  const address = useCurrentAddress();
  const state = useEarnState();

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Please connect your wallet</p>
      </div>
    );
  }

  return (
    <EarnLayout>
      <EarnHeader />
      <VoteLevel className="px-4 mb-6" />
      <EarnTasks state={state} />
    </EarnLayout>
  );
}