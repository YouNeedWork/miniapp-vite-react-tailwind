import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { copyToClipboard } from '@/utils/clipboard';

export const useInviteLink = (inviteCode: string) => {
  const { t } = useTranslation();
  
  const getInviteLink = useCallback(() => {
    return `https://app.goldminer.life/?start_param=${inviteCode}`;
  }, [inviteCode]);

  const copyInviteLink = useCallback(async () => {
    const link = getInviteLink();
    return copyToClipboard(link, t('friends.copySuccess'));
  }, [getInviteLink, t]);

  return {
    getInviteLink,
    copyInviteLink
  };
};