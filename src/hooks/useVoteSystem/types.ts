import { VoteInfo } from '@/hooks/queries/useVoteLevel';

export interface VoteTask {
  level: number;
  requiredVotes: number;
  reward: number;
  claimed: boolean;
}

export interface VoteSystemState {
  currentLevel: number;
  nextLevelVotes: number;
  completedTasks: VoteTask[];
  pendingTasks: VoteTask[];
  canClaimReward: boolean;
}

export interface VoteClaimError {
  code: string;
  message: string;
}