import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => Promise<void>;
  isAuthenticating: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  isAuthenticating,
}) => {
  return (
    <Modal
      title="Authentication Required"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-blue-800 font-semibold mb-2">Secure Authentication</h4>
            <p className="text-blue-700 text-sm">
              To ensure the security of your account and game progress, we need you to sign a message
              using your BTC wallet.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">What happens when you authenticate:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Your wallet will ask you to sign a message</li>
              <li>This signature proves you own the wallet</li>
              <li>No transaction fees are involved</li>
              <li>Your game progress will be securely linked to your wallet</li>
            </ul>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isAuthenticating}
          onClick={onAuthenticate}
        >
          Authenticate with Wallet
        </Button>
      </div>
    </Modal>
  );
};