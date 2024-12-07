import React from 'react';
import { useReferrals } from '../../hooks/useReferrals';
import { ReferralItem } from './ReferralItem';

export const ReferralList: React.FC = () => {
  const { referrals, isLoading } = useReferrals();

  if (isLoading) {
    return (
      <div className="w-full px-4 mt-6">
        <div className="bg-white rounded-2xl border-2 border-black p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (referrals.length === 0) {
    return (
      <div className="w-full px-4 mt-6">
        <div className="bg-white rounded-2xl border-2 border-black p-6 text-center">
          <p className="text-gray-500">No referrals yet</p>
          <p className="text-sm text-gray-400">Share your invite link to start earning rewards!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 mt-6">
      <div className="bg-white rounded-2xl border-2 border-black p-6">
        <h3 className="text-xl font-bold mb-4">Your Referrals</h3>
        <div className="space-y-4">
          {referrals.map((referral) => (
            <ReferralItem key={referral.id} referral={referral} />
          ))}
        </div>
      </div>
    </div>
  );
};