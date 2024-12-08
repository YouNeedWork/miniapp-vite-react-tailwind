import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { DailyCheckInResult, useDailyCheckIn } from '@/hooks/queries/useDailyCheckIn';
import { useCheckIn } from '@/hooks/useCheckIn';

export const DailyCheckIn: React.FC = () => {
    const { data: checkInInfo, isLoading, refetch } = useDailyCheckIn();
    const { checkIn } = useCheckIn();
    const [isChecking, setIsChecking] = useState(false);


    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleCheckIn = async () => {
        setIsChecking(true);
        try {
            await checkIn();
        } finally {
            setIsChecking(false);
        }
    };

    if (isLoading || !checkInInfo) return null;

    return (
        <Modal
            title="Daily Check-in"
            isOpen={checkInInfo.canCheckIn}
            onClose={() => {

            }}
        >
            <div className="p-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <img
                            src="/imgs/g_icon.png"
                            alt="Gold"
                            className="w-24 h-24 animate-bounce"
                        />
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-gray-800">Daily Rewards Available!</h3>
                        <p className="text-gray-600">
                            Check in daily to earn rewards and keep your mining streak going!
                        </p>
                    </div>

                    <div className="bg-[#fdeeba] p-4 rounded-xl border border-[#edad4b] text-center">
                        <h4 className="font-bold text-lg text-[#edad4b]">Today's Reward</h4>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <img src="/imgs/g_icon.png" alt="Gold" className="w-6 h-6" />
                            <span className="text-2xl font-bold">{checkInInfo.reward}</span>
                        </div>
                    </div>
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isChecking}
                    onClick={handleCheckIn}
                >
                    Claim Daily Reward
                </Button>
            </div>
        </Modal>
    );
};