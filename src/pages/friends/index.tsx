import React from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { InviteRewards } from './components/InviteRewards';
import { ReferralList } from './components/ReferralList';

export default function FriendsView() {
  const address = useCurrentAddress();

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Please connect your wallet</p>
      </div>
    );
  }

  return (
    <div
      className="w-screen min-h-screen bg-center bg-no-repeat bg-cover pt-[60px]"
      style={{ backgroundImage: "url('/imgs/friend/bg.png')" }}
    >
      <InviteRewards />
      <ReferralList />
    </div>
  );
};