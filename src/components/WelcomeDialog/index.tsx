import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface WelcomeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onStart: () => Promise<void>;
    isStarting: boolean;
}

export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({
    isOpen,
    onClose,
    onStart,
    isStarting
}) => {
    return (
        <Modal
            title="Welcome to Gold Miner!"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="p-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <img
                            src="/imgs/icon.png"
                            alt="Gold Miner"
                            className="w-24 h-24 rounded-full border-4 border-[#edad4b] shadow-lg"
                        />
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-gray-800">Start Your Mining Journey!</h3>
                        <p className="text-gray-600">
                            Get ready to embark on an exciting adventure in the world of Gold Mining.
                        </p>
                    </div>

                    <div className="bg-[#fdeeba] p-4 rounded-xl border border-[#edad4b]">
                        <h4 className="font-bold mb-2">Game Features:</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <img src="/imgs/mint/mint_icon.png" alt="Mine" className="w-5 h-5" />
                                <span>Mine valuable resources</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <img src="/imgs/g_icon.png" alt="Earn" className="w-5 h-5" />
                                <span>Earn $GOLD tokens</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <img src="/imgs/mint/bag.png" alt="Collect" className="w-5 h-5" />
                                <span>Collect unique items</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <img src="/imgs/friends.png" alt="Friends" className="w-5 h-5" />
                                <span>Invite friends & earn together</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isStarting}
                    onClick={onStart}
                >
                    Start Mining
                </Button>
            </div>
        </Modal>
    );
};