import React from 'react';
import { useVoteLevel } from '@/hooks/queries/useVoteLevel';
import { formatNumber } from '@/lib/utils';

interface VoteLevelProps {
  className?: string;
}

export const VoteLevel: React.FC<VoteLevelProps> = ({ className }) => {
  const { data: voteInfo } = useVoteLevel();

  if (!voteInfo) return null;

  const { level, votes, nextLevelVotes, progress } = voteInfo;

  return (
    <div className={className}>
      <div className="bg-white rounded-xl border-2 border-black p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Vote Level {level}</h3>
            <p className="text-sm text-gray-600">
              {formatNumber(votes)} / {formatNumber(nextLevelVotes)} votes
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#999de4] flex items-center justify-center border-2 border-black">
            <span className="text-white font-bold text-lg">{level}</span>
          </div>
        </div>

        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#999de4] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center text-sm text-gray-600">
          {level < 5 ? (
            <>
              <p>Next level at {formatNumber(nextLevelVotes)} votes</p>
              <p className="text-[#999de4] font-medium">
                {formatNumber(nextLevelVotes - votes)} votes to go!
              </p>
            </>
          ) : (
            <p className="text-[#999de4] font-medium">Maximum level reached!</p>
          )}
        </div>
      </div>
    </div>
  );
};