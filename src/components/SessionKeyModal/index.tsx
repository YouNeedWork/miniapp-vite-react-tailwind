import React from 'react';
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
  if (!hasGas) {
    return (
      <Modal
        title="Gas Required"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-yellow-800 font-semibold mb-2">Gas Required</h4>
              <p className="text-yellow-700 text-sm">
                You need RGas to create a session key and play the game. Please obtain some RGas first.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">How to get RGas:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Visit the Rooch faucet</li>
                <li>Connect your wallet</li>
                <li>Request RGas tokens</li>
                <li>Return here to create your session key</li>
              </ol>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => window.open('https://test-portal.rooch.network/faucet', '_blank')}
          >
            Get RGas
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Create Session Key"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">What is a Session Key?</h3>
          <p className="text-gray-600">
            A session key allows you to interact with the game without having to approve every transaction.
            It's valid for {APP_CONFIG.maxInactiveInterval / 3600} hours and makes your gaming experience smoother.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Session Key Features:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Automatic transaction signing</li>
              <li>Enhanced gaming experience</li>
              <li>Secure and time-limited access</li>
              <li>No need for repeated wallet confirmations</li>
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
          Create Session Key
        </Button>
      </div>
    </Modal>
  );
};