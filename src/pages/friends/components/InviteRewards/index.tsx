import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { formatNumber } from '@/lib/utils';
import { useInviteLink } from '@/hooks/useInviteLink';
import { useInviteRewards } from '../../hooks/useInviteRewards';

export const InviteRewards: React.FC = () => {
  const { t } = useTranslation();
  const { totalRewards, inviteCode, isLoading } = useInviteRewards();
  const { copyInviteLink } = useInviteLink(inviteCode);

  if (isLoading) {
    return (
      <div className="w-full px-4">
        <div className="bg-white rounded-2xl border-2 border-black p-6 space-y-6 animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg" />
          <div className="h-32 bg-gray-200 rounded-lg" />
          <div className="h-16 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <div className="bg-white rounded-2xl border-2 border-black p-6 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-[#efac57]">{t('friends.totalRewards')}</h3>
          <div className="flex items-center justify-center gap-2">
            <img src="/imgs/g_icon.png" alt="Gold" className="w-6 h-6" />
            <span className="text-3xl font-bold">{formatNumber(totalRewards / 1e6)}</span>
          </div>
        </div>

        <div className="bg-[#fdeeba] rounded-xl p-4 space-y-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">{t('friends.inviteCode')}</p>
            <p className="text-lg font-bold">{inviteCode ? inviteCode.slice(0, 8) : '-'}</p>
          </div>

          <Button
            variant="primary"
            size="lg"
            rounded="full"
            fullWidth
            onClick={copyInviteLink}
            disabled={!inviteCode}
          >
            {t('friends.shareLink')}
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>{t('friends.rewardDesc')}</p>
          <p>{t('friends.rewardDetails')}</p>
        </div>
      </div>
    </div>
  );
};