import React from 'react';
import { Button } from '@/components/ui/Button';
import { formatNumber } from '@/lib/utils';
import { useInviteRewards } from '../../hooks/useInviteRewards';

export const InviteRewards: React.FC = () => {
  const { totalRewards, inviteCode, copyInviteLink } = useInviteRewards();

  return (
    <div className="w-full px-4">
      <div className="bg-white rounded-2xl border-2 border-black p-6 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-[#efac57]">Total Rewards</h3>
          <div className="flex items-center justify-center gap-2">
            <img src="/imgs/g_icon.png" alt="Gold" className="w-6 h-6" />
            <span className="text-3xl font-bold">{formatNumber(totalRewards)}</span>
          </div>
        </div>

        <div className="bg-[#fdeeba] rounded-xl p-4 space-y-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Your Invite Code</p>
            <p className="text-lg font-bold">{inviteCode.slice(0, 8)}</p>
          </div>

          <Button
            variant="primary"
            size="lg"
            rounded="full"
            fullWidth
            onClick={copyInviteLink}
          >
            Share Invite Link
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>For every friend that plays,</p>
          <p>you both get <span className="text-[#777cd9] font-medium">+100 Gold!</span> and  <span className="text-[#777cd9] font-medium">15%</span> of their rewards!</p>
        </div>
      </div>
    </div>
  );
};