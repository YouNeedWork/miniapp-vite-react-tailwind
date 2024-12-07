import React from 'react';
import { formatNumber } from '@/lib/utils';
import type { Referral } from '../../types';

interface ReferralItemProps {
  referral: Referral;
}

export const ReferralItem: React.FC<ReferralItemProps> = ({ referral }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#fdeeba] rounded-xl border border-black">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#afe1fa] border-2 border-black flex items-center justify-center">
          <span className="text-lg font-bold">{referral.username.charAt(0)}</span>
        </div>
        <div>
          <p className="font-bold">{referral.username}</p>
          <p className="text-sm text-gray-600">Joined {referral.joinedAt}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img src="/imgs/g_icon.png" alt="Gold" className="w-5 h-5" />
        <span className="font-bold text-[#999de4]">+{formatNumber(referral.reward)}</span>
      </div>
    </div>
  );
};