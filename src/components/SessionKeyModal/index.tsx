import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { APP_CONFIG } from '@/constants/config';

interface SessionKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSessionKey: () => Promise<void>;
  isCreating: boolean;
  hasGas: boolean;
}

export const SessionKeyModal: React.FC<SessionKeyModalProps> = ({
  isOpen,
  onClose,
  onCreateSessionKey,
  isCreating,
  hasGas
}) => {
  const { t } = useTranslation();

  if (!hasGas) {
    return (
      <Modal
        title={t('auth.sessionKey.gasRequired.title')}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <h4 className="mb-2 font-semibold text-yellow-800">
                {t('auth.sessionKey.gasRequired.title')}
              </h4>
              <p className="text-sm text-yellow-700">
                {t('auth.sessionKey.gasRequired.description')}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">{t('auth.sessionKey.gasRequired.steps.title')}</h4>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>{t('auth.sessionKey.gasRequired.steps.visit')}</li>
                <li>{t('auth.sessionKey.gasRequired.steps.connect')}</li>
                <li>{t('auth.sessionKey.gasRequired.steps.request')}</li>
                <li>{t('auth.sessionKey.gasRequired.steps.return')}</li>
              </ol>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => window.open('https://portal.rooch.network/faucet', '_blank')}
          >
            {t('auth.sessionKey.gasRequired.button')}
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title={t('auth.sessionKey.title')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t('auth.sessionKey.title')}</h3>
          <p className="text-gray-600">
            {t('auth.sessionKey.description')}
            {t('auth.sessionKey.validity', { hours: APP_CONFIG.maxInactiveInterval / 3600 })}
          </p>

          <div className="p-4 rounded-lg bg-blue-50">
            <h4 className="mb-2 font-semibold">{t('auth.sessionKey.features.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              <li>{t('auth.sessionKey.features.automatic')}</li>
              <li>{t('auth.sessionKey.features.enhanced')}</li>
              <li>{t('auth.sessionKey.features.secure')}</li>
              <li>{t('auth.sessionKey.features.noConfirm')}</li>
            </ul>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isCreating}
          onClick={onCreateSessionKey}
        >
          {t('auth.sessionKey.create')}
        </Button>
      </div>
    </Modal>
  );
};