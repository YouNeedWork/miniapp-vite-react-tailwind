import React from 'react';
import { InviteRewards } from './components/InviteRewards';
import { ReferralList } from './components/ReferralList';

export default function FriendsView() {
  return (
    <div
      className="w-screen min-h-screen bg-center bg-no-repeat bg-cover pt-[60px]"
      style={{ backgroundImage: "url('/imgs/friend/bg.png')" }}
    >
      <InviteRewards />
      <ReferralList />
    </div>
  );
}