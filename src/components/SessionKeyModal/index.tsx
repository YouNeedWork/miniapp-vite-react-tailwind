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
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-yellow-800 font-semibold mb-2">
                {t('auth.sessionKey.gasRequired.title')}
              </h4>
              <p className="text-yellow-700 text-sm">
                {t('auth.sessionKey.gasRequired.description')}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">{t('auth.sessionKey.gasRequired.steps.title')}</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
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
            onClick={() => window.open('https://test-portal.rooch.network/faucet', '_blank')}
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

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">{t('auth.sessionKey.features.title')}</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
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